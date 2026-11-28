# Security Specification — IIT Indore EBSB Portal

## 1. Data Invariants
1. **PII Isolation (`users/{userId}`)**: A user profile containing email and display metadata may ONLY be read (`get`), created, or updated by its authenticated, email-verified owner (`request.auth.uid == userId`). Blanket `list` queries on `/users` are strictly forbidden.
2. **Volunteer Application Integrity (`volunteerApplications/{applicationId}`)**:
   - Cannot be created unless the user is authenticated, email-verified, has an existing `/users/{uid}` profile, sets `userId == request.auth.uid`, sets `status == 'submitted'`, and uses server timestamps (`createdAt == request.time`, `updatedAt == request.time`).
   - Only the owning user can `get` or `list` (enforced via `resource.data.userId == request.auth.uid`) their own applications.
   - Terminal state locking: Once `status` reaches `'approved'`, no further updates or deletes are permitted.
   - Regular users cannot self-promote `status` or mutate immutable fields (`userId`, `createdAt`).
3. **Quiz Attempt Immutability (`quizAttempts/{attemptId}`)**:
   - Can only be created by an authenticated, email-verified user with an existing `/users/{uid}` profile, with `userId == request.auth.uid`, `0 <= score <= totalQuestions <= 20`, and `createdAt == request.time`.
   - `update` and `delete` are permanently denied.
4. **Path Hardening & Bounded Payloads**: Every single-document ID variable (`userId`, `applicationId`, `attemptId`) must pass `isValidId()`, every string has explicit `.size()` bounds matching `firebase-blueprint.json`, and every `create`/`update` enforces strict `hasAll`/`hasOnly`/`affectedKeys().hasOnly()` checks.

## 2. The "Dirty Dozen" Attack Payloads (All Must Return PERMISSION_DENIED)
1. **Unauthenticated Volunteer Write**: `create /volunteerApplications/app1` with `auth = null`.
2. **Unverified Email Spoof**: `create /volunteerApplications/app2` with `auth.token.email_verified = false`.
3. **Identity Spoofing on Create**: User A (`uid: "userA"`) attempts `create /volunteerApplications/app3` with `userId: "userB"`.
4. **Shadow / Ghost Field Injection on Create**: User A sends valid `VolunteerApplication` plus `"isAdmin": true` or `"isVerified": true`.
5. **Status Escalation on Create**: User A attempts `create /volunteerApplications/app4` with `status: "approved"`.
6. **Status Escalation on Update**: User A attempts `update /volunteerApplications/app1` changing `status` from `"submitted"` to `"approved"`.
7. **Terminal State Mutation**: Attempt to update `preferredCell` on a `VolunteerApplication` whose existing `status` is `"approved"`.
8. **PII Cross-User Read**: User B attempts `get /users/userA` or `get /volunteerApplications/app1` (owned by User A).
9. **Blanket Collection Scraping**: User A attempts `list /users` or unfiltered `list /volunteerApplications` without `where('userId', '==', 'userA')`.
10. **ID Poisoning / Denial of Wallet**: User A attempts `create /volunteerApplications/<200-char-invalid-id$%>` or injects a 10KB string into `department`.
11. **Timestamp Forgery**: User A attempts `create /quizAttempts/q1` with a backdated client timestamp (`createdAt != request.time`).
12. **Score Inflation / Immutable Tampering**: User A attempts `create /quizAttempts/q2` with `score: 99, totalQuestions: 5`, or attempts `update /quizAttempts/q1` to raise their score.
