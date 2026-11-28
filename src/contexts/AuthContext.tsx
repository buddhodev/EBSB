import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { User, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  addDoc,
  query,
  where,
  onSnapshot,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { auth, db, googleProvider, handleFirestoreError, OperationType } from '../firebase';

export type PreferredCellOption =
  | 'Youth Delegation Hosting'
  | 'Bhasha Sangam Circle'
  | 'Cultural Stage & Events'
  | 'Media & Graphic Design';

export interface VolunteerApplicationInput {
  name: string;
  email: string;
  rollNo: string;
  department: string;
  preferredCell: PreferredCellOption;
}

export interface VolunteerApplicationRecord extends VolunteerApplicationInput {
  id: string;
  userId: string;
  status: 'submitted' | 'under_review' | 'approved';
  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
}

export interface QuizAttemptInput {
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  score: number;
  totalQuestions: number;
}

export interface QuizAttemptRecord extends QuizAttemptInput {
  id: string;
  userId: string;
  createdAt: Timestamp | null;
}

interface AuthContextValue {
  user: User | null;
  authReady: boolean;
  userProfileReady: boolean;
  signingIn: boolean;
  authError: string | null;
  clearAuthError: () => void;
  volunteerApplications: VolunteerApplicationRecord[];
  quizAttempts: QuizAttemptRecord[];
  signInWithGoogle: () => Promise<User | null>;
  signOutUser: () => Promise<void>;
  submitVolunteerApplication: (input: VolunteerApplicationInput) => Promise<void>;
  recordQuizAttempt: (input: QuizAttemptInput) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const ALLOWED_CELLS: PreferredCellOption[] = [
  'Youth Delegation Hosting',
  'Bhasha Sangam Circle',
  'Cultural Stage & Events',
  'Media & Graphic Design',
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState<boolean>(false);
  const [userProfileReady, setUserProfileReady] = useState<boolean>(false);
  const [signingIn, setSigningIn] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [volunteerApplications, setVolunteerApplications] = useState<VolunteerApplicationRecord[]>([]);
  const [quizAttempts, setQuizAttempts] = useState<QuizAttemptRecord[]>([]);
  const profileSyncedUidRef = useRef<string | null>(null);

  const ensureUserProfile = useCallback(async (currentUser: User) => {
    if (!currentUser.email) {
      throw new Error('Your Google account must have a verified email address.');
    }

    const userDocRef = doc(db, 'users', currentUser.uid);
    const displayName = (currentUser.displayName?.trim() || currentUser.email.split('@')[0] || 'EBSB Member').slice(
      0,
      120
    );
    const email = currentUser.email.trim().slice(0, 254);
    const photoURL = currentUser.photoURL?.trim() ? currentUser.photoURL.trim().slice(0, 500) : undefined;

    try {
      const existingSnap = await getDoc(userDocRef);
      if (!existingSnap.exists()) {
        const createPayload: Record<string, unknown> = {
          uid: currentUser.uid,
          displayName,
          email,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        };
        if (photoURL) {
          createPayload.photoURL = photoURL;
        }
        await setDoc(userDocRef, createPayload);
      } else {
        const updatePayload: Record<string, unknown> = {
          displayName,
          email,
          updatedAt: serverTimestamp(),
        };
        if (photoURL) {
          updatePayload.photoURL = photoURL;
        }
        await updateDoc(userDocRef, updatePayload);
      }
      profileSyncedUidRef.current = currentUser.uid;
      setUserProfileReady(true);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `users/${currentUser.uid}`);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (nextUser) => {
      setUser(nextUser);
      setAuthReady(true);

      if (!nextUser) {
        profileSyncedUidRef.current = null;
        setUserProfileReady(false);
        setVolunteerApplications([]);
        setQuizAttempts([]);
        return;
      }

      try {
        await ensureUserProfile(nextUser);
      } catch (err) {
        console.error('Failed to sync user profile:', err);
        setAuthError('Signed in, but could not sync your profile right now. Please try again.');
      }
    });

    return () => unsubscribe();
  }, [ensureUserProfile]);

  useEffect(() => {
    if (!authReady || !user || !userProfileReady) {
      return;
    }

    const appsQuery = query(
      collection(db, 'volunteerApplications'),
      where('userId', '==', user.uid)
    );
    const unsubApps = onSnapshot(
      appsQuery,
      (snapshot) => {
        const records: VolunteerApplicationRecord[] = snapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            userId: data.userId,
            name: data.name,
            email: data.email,
            rollNo: data.rollNo,
            department: data.department,
            preferredCell: data.preferredCell,
            status: data.status,
            createdAt: data.createdAt ?? null,
            updatedAt: data.updatedAt ?? null,
          };
        });
        records.sort((a, b) => (b.createdAt?.toMillis() ?? 0) - (a.createdAt?.toMillis() ?? 0));
        setVolunteerApplications(records);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, 'volunteerApplications');
      }
    );

    const quizQuery = query(
      collection(db, 'quizAttempts'),
      where('userId', '==', user.uid)
    );
    const unsubQuiz = onSnapshot(
      quizQuery,
      (snapshot) => {
        const records: QuizAttemptRecord[] = snapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            userId: data.userId,
            topic: data.topic,
            difficulty: data.difficulty,
            score: data.score,
            totalQuestions: data.totalQuestions,
            createdAt: data.createdAt ?? null,
          };
        });
        records.sort((a, b) => (b.createdAt?.toMillis() ?? 0) - (a.createdAt?.toMillis() ?? 0));
        setQuizAttempts(records);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, 'quizAttempts');
      }
    );

    return () => {
      unsubApps();
      unsubQuiz();
    };
  }, [authReady, user, userProfileReady]);

  const signInWithGoogle = useCallback(async (): Promise<User | null> => {
    setSigningIn(true);
    setAuthError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await ensureUserProfile(result.user);
      return result.user;
    } catch (error: unknown) {
      const code =
        typeof error === 'object' && error !== null && 'code' in error
          ? String((error as { code?: unknown }).code)
          : '';
      if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') {
        setAuthError(null);
      } else if (code === 'auth/popup-blocked') {
        setAuthError('Sign-in popup was blocked by your browser. Please allow popups and try again.');
      } else {
        setAuthError('Google sign-in could not be completed. Please try again.');
      }
      return null;
    } finally {
      setSigningIn(false);
    }
  }, [ensureUserProfile]);

  const signOutUser = useCallback(async () => {
    setAuthError(null);
    await signOut(auth);
  }, []);

  const submitVolunteerApplication = useCallback(
    async (input: VolunteerApplicationInput) => {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error('Please sign in with Google before submitting your volunteer application.');
      }

      if (profileSyncedUidRef.current !== currentUser.uid) {
        await ensureUserProfile(currentUser);
      }

      const name = input.name.trim().slice(0, 100);
      const email = input.email.trim().slice(0, 254);
      const rollNo = input.rollNo.trim().slice(0, 40);
      const department = input.department.trim().slice(0, 100);
      const preferredCell: PreferredCellOption = ALLOWED_CELLS.includes(input.preferredCell)
        ? input.preferredCell
        : 'Youth Delegation Hosting';

      if (name.length < 2) {
        throw new Error('Please enter your full name (at least 2 characters).');
      }
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        throw new Error('Please enter a valid email address.');
      }
      if (rollNo.length < 2 || !/^[a-zA-Z0-9_\-\/\s]+$/.test(rollNo)) {
        throw new Error('Roll number may only contain letters, numbers, spaces, hyphens, or slashes.');
      }
      if (department.length < 2) {
        throw new Error('Please enter your academic department.');
      }

      try {
        await addDoc(collection(db, 'volunteerApplications'), {
          userId: currentUser.uid,
          name,
          email,
          rollNo,
          department,
          preferredCell,
          status: 'submitted',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      } catch (error) {
        handleFirestoreError(error, OperationType.CREATE, 'volunteerApplications');
      }
    },
    [ensureUserProfile]
  );

  const recordQuizAttempt = useCallback(
    async (input: QuizAttemptInput) => {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error('Please sign in with Google to save your quiz score.');
      }

      if (profileSyncedUidRef.current !== currentUser.uid) {
        await ensureUserProfile(currentUser);
      }

      const topic = input.topic.trim().slice(0, 120);
      const difficulty =
        input.difficulty === 'Easy' || input.difficulty === 'Medium' || input.difficulty === 'Hard'
          ? input.difficulty
          : 'Medium';
      const totalQuestions = Math.max(1, Math.min(20, Math.round(input.totalQuestions)));
      const score = Math.max(0, Math.min(totalQuestions, Math.round(input.score)));

      try {
        await addDoc(collection(db, 'quizAttempts'), {
          userId: currentUser.uid,
          topic: topic.length >= 2 ? topic : 'EBSB National Integration Quiz',
          difficulty,
          score,
          totalQuestions,
          createdAt: serverTimestamp(),
        });
      } catch (error) {
        handleFirestoreError(error, OperationType.CREATE, 'quizAttempts');
      }
    },
    [ensureUserProfile]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        authReady,
        userProfileReady,
        signingIn,
        authError,
        clearAuthError: () => setAuthError(null),
        volunteerApplications,
        quizAttempts,
        signInWithGoogle,
        signOutUser,
        submitVolunteerApplication,
        recordQuizAttempt,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
