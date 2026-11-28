import React, { useState, useRef, useEffect } from 'react';
import {
  Zap,
  X,
  Award,
  Heart,
  Compass,
  LogOut,
  ChevronRight,
  CheckCircle2,
  Loader2,
  AlertCircle,
  User as UserIcon,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

interface QuickActionsMenuProps {
  onOpenBhashaQuiz: () => void;
  onOpenVolunteerApplication: () => void;
  onOpenCulturalGuide: () => void;
}

const GoogleIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="#4285F4"
      d="M23.49 12.27c0-.79-.07-1.54-.2-2.27H12v4.3h6.45a5.52 5.52 0 0 1-2.39 3.62v3.01h3.87c2.26-2.08 3.56-5.15 3.56-8.66z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.07 7.93-2.9l-3.87-3.01c-1.07.72-2.45 1.15-4.06 1.15-3.12 0-5.77-2.11-6.71-4.95H1.29v3.1A12 12 0 0 0 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.29 14.29A7.18 7.18 0 0 1 4.91 12c0-.79.14-1.56.38-2.29V6.61H1.29A12 12 0 0 0 0 12c0 1.94.46 3.77 1.29 5.39l4-3.1z"
    />
    <path
      fill="#EA4335"
      d="M12 4.76c1.76 0 3.34.61 4.58 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.29 6.61l4 3.1C6.23 6.87 8.88 4.76 12 4.76z"
    />
  </svg>
);

export const QuickActionsMenu: React.FC<QuickActionsMenuProps> = ({
  onOpenBhashaQuiz,
  onOpenVolunteerApplication,
  onOpenCulturalGuide,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const {
    user,
    authReady,
    signingIn,
    authError,
    clearAuthError,
    volunteerApplications,
    quizAttempts,
    signInWithGoogle,
    signOutUser,
  } = useAuth();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleActionClick = (action: () => void) => {
    setIsOpen(false);
    action();
  };

  const hasApplied = volunteerApplications.length > 0;
  const userInitials = (user?.displayName || user?.email || 'U')
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      ref={containerRef}
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end"
    >
      {/* Expandable Quick Actions Popover Panel */}
      {isOpen && (
        <div
          id="ebsb-quick-actions-panel"
          role="dialog"
          aria-label="EBSB Quick Actions Menu"
          className="mb-3 w-[320px] sm:w-[352px] bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden text-slate-900 animate-fadeIn"
        >
          {/* Official Tricolor Top Bar */}
          <div className="h-1.5 w-full ebsb-tricolor-bar" />

          {/* Panel Header */}
          <div className="bg-[#163c6b] text-white px-4 py-3.5 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-[#ff9933]" />
                <h3 className="text-sm font-extrabold tracking-tight">{t.quickActions.title}</h3>
              </div>
              <p className="text-[11px] text-slate-200 mt-0.5">
                {t.quickActions.subtitle}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-100 transition-colors"
              aria-label="Close Quick Actions menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 space-y-3.5">
            {/* Account & Sign-In Card */}
            <div className="rounded-xl bg-[#f4f6f9] border border-slate-200 p-3 space-y-2.5">
              {!authReady ? (
                <div className="flex items-center gap-2 text-xs text-slate-500 py-1">
                  <Loader2 className="w-4 h-4 animate-spin text-[#163c6b]" />
                  <span>Checking sign-in session...</span>
                </div>
              ) : user ? (
                <>
                  <div className="flex items-center justify-between gap-2.5">
                    <div className="flex items-center gap-2.5 min-w-0">
                      {user.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt={user.displayName || 'User profile'}
                          referrerPolicy="no-referrer"
                          className="w-9 h-9 rounded-full border-2 border-[#f26522] object-cover shrink-0"
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-[#163c6b] text-white font-bold text-xs flex items-center justify-center shrink-0">
                          {userInitials}
                        </div>
                      )}
                      <div className="min-w-0">
                        <div className="text-xs font-extrabold text-[#163c6b] truncate">
                          {user.displayName || 'EBSB Member'}
                        </div>
                        <div className="text-[11px] text-slate-500 truncate">{user.email}</div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => void signOutUser()}
                      className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white hover:bg-rose-50 text-slate-700 hover:text-rose-700 border border-slate-200 hover:border-rose-200 text-[11px] font-bold transition-colors"
                      title="Sign out of EBSB Portal"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>{t.quickActions.signOut}</span>
                    </button>
                  </div>

                  {/* Live Activity Summary */}
                  <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-200/80 text-[11px]">
                    <div className="bg-white rounded-lg px-2.5 py-1.5 border border-slate-200 flex items-center justify-between">
                      <span className="text-slate-600 font-medium">{t.quickActions.quizzesLabel}</span>
                      <span className="font-extrabold text-[#138808]">{quizAttempts.length}</span>
                    </div>
                    <div className="bg-white rounded-lg px-2.5 py-1.5 border border-slate-200 flex items-center justify-between">
                      <span className="text-slate-600 font-medium">{t.quickActions.volunteerLabel}</span>
                      <span className={`font-extrabold ${hasApplied ? 'text-[#138808]' : 'text-slate-500'}`}>
                        {hasApplied ? t.quickActions.submittedStatus : t.quickActions.openStatus}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-2.5">
                  <div className="flex items-start gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#163c6b]/10 text-[#163c6b] flex items-center justify-center shrink-0 mt-0.5">
                      <UserIcon className="w-4 h-4" />
                    </div>
                    <div className="text-[11px] text-slate-600 leading-snug">
                      <span className="font-bold text-[#163c6b] block">{t.quickActions.signInHeading}</span>
                      {t.quickActions.signInDesc}
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={signingIn}
                    onClick={() => void signInWithGoogle()}
                    className="w-full py-2.5 px-3 rounded-lg bg-white hover:bg-slate-50 disabled:opacity-60 text-slate-800 border border-slate-300 shadow-xs font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                  >
                    {signingIn ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-[#163c6b]" />
                        <span>{t.quickActions.signingIn}</span>
                      </>
                    ) : (
                      <>
                        <GoogleIcon className="w-4 h-4" />
                        <span>{t.quickActions.signInGoogle}</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {authError && (
                <div className="flex items-start gap-2 rounded-lg bg-rose-50 border border-rose-200 p-2 text-[11px] text-rose-800">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-rose-600" />
                  <span className="flex-1">{authError}</span>
                  <button
                    type="button"
                    onClick={clearAuthError}
                    className="text-rose-500 hover:text-rose-700"
                    aria-label="Dismiss sign-in error"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Quick Action Items */}
            <div className="space-y-2">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 px-1">
                {t.quickActions.frequentlyUsed}
              </div>

              {/* 1. Bhasha Quiz */}
              <button
                type="button"
                onClick={() => handleActionClick(onOpenBhashaQuiz)}
                className="w-full text-left p-3 rounded-xl bg-white hover:bg-emerald-50/70 border border-slate-200 hover:border-[#138808]/40 transition-all flex items-center gap-3 group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#e8f5e9] text-[#138808] border border-[#138808]/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Award className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-extrabold text-[#163c6b] group-hover:text-[#138808] transition-colors">
                      {t.quickActions.bhashaQuizTitle}
                    </span>
                    {user && quizAttempts.length > 0 && (
                      <span className="text-[10px] font-bold text-[#138808] bg-[#e8f5e9] px-1.5 py-0.5 rounded">
                        {quizAttempts.length} {t.quickActions.savedSuffix}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">
                    {t.quickActions.bhashaQuizDesc}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#138808] group-hover:translate-x-0.5 transition-all shrink-0" />
              </button>

              {/* 2. Volunteer Application */}
              <button
                type="button"
                onClick={() => handleActionClick(onOpenVolunteerApplication)}
                className="w-full text-left p-3 rounded-xl bg-white hover:bg-orange-50/70 border border-slate-200 hover:border-[#f26522]/40 transition-all flex items-center gap-3 group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#fff2e6] text-[#f26522] border border-[#fed7ba] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Heart className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-extrabold text-[#163c6b] group-hover:text-[#b83d0d] transition-colors">
                      {t.quickActions.volunteerTitle}
                    </span>
                    {hasApplied && (
                      <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-[#138808] bg-[#e8f5e9] px-1.5 py-0.5 rounded">
                        <CheckCircle2 className="w-3 h-3" />
                        {t.quickActions.appliedBadge}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">
                    {hasApplied
                      ? t.quickActions.volunteerDescApplied
                      : t.quickActions.volunteerDescOpen}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#f26522] group-hover:translate-x-0.5 transition-all shrink-0" />
              </button>

              {/* 3. Cultural Guide */}
              <button
                type="button"
                onClick={() => handleActionClick(onOpenCulturalGuide)}
                className="w-full text-left p-3 rounded-xl bg-white hover:bg-blue-50/70 border border-slate-200 hover:border-[#163c6b]/40 transition-all flex items-center gap-3 group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#edf3fa] text-[#163c6b] border border-[#163c6b]/15 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Compass className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-extrabold text-[#163c6b]">
                    {t.quickActions.culturalGuideTitle}
                  </div>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">
                    {t.quickActions.culturalGuideDesc}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#163c6b] group-hover:translate-x-0.5 transition-all shrink-0" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls="ebsb-quick-actions-panel"
        aria-label={isOpen ? 'Close Quick Actions menu' : 'Open Quick Actions menu'}
        className={`group flex items-center gap-2.5 pl-3.5 pr-4 py-3 rounded-full font-bold text-xs shadow-xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f26522] ${
          isOpen
            ? 'bg-[#163c6b] text-white border-white/80 hover:bg-[#102847]'
            : 'bg-[#f26522] text-white border-white hover:bg-[#dc4f12]'
        }`}
      >
        <span className="relative flex items-center justify-center">
          {isOpen ? (
            <X className="w-4 h-4" />
          ) : user?.photoURL ? (
            <img
              src={user.photoURL}
              alt=""
              referrerPolicy="no-referrer"
              className="w-5 h-5 rounded-full border border-white/80 object-cover"
            />
          ) : (
            <Zap className="w-4 h-4" />
          )}
          {!isOpen && user && (
            <span
              className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#4ad178] ring-1 ring-white"
              aria-hidden="true"
            />
          )}
        </span>
        <span className="tracking-wide">{isOpen ? t.quickActions.closeMenu : t.quickActions.title}</span>
      </button>
    </div>
  );
};
