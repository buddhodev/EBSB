import React, { useState } from 'react';
import { Sparkles, Menu, X, Sun, Moon, Type, Search, Shield, Heart, LogIn, LogOut, Loader2 } from 'lucide-react';
import { AccessibilitySettings } from '../types';
import { PageAudioNarrator } from './PageAudioNarrator';
import { useAuth } from '../contexts/AuthContext';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  accessibility: AccessibilitySettings;
  setAccessibility: React.Dispatch<React.SetStateAction<AccessibilitySettings>>;
  onOpenAiModal: (tab?: 'assistant' | 'quiz') => void;
  onOpenSearch: () => void;
  onOpenVolunteerModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  setActiveSection,
  accessibility,
  setAccessibility,
  onOpenAiModal,
  onOpenSearch,
  onOpenVolunteerModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, authReady, signingIn, signInWithGoogle, signOutUser } = useAuth();

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About EBSB' },
    { id: 'paired-states', label: 'Paired States' },
    { id: 'cultural-map', label: 'Cultural Map' },
    { id: 'events', label: 'Events & Exchange' },
    { id: 'bhasha-sangam', label: 'Bhasha Sangam' },
    { id: 'sanskrit-hub', label: 'Sanskrit Hub' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'team-contact', label: 'Team & Contact' },
  ];

  const currentItem = navItems.find((item) => item.id === activeSection) || navItems[0];

  const toggleHighContrast = () => {
    setAccessibility((prev) => ({
      ...prev,
      highContrast: !prev.highContrast,
    }));
  };

  const cycleFontSize = () => {
    setAccessibility((prev) => {
      const sizes = [1.0, 1.15, 1.3, 0.9];
      const currentIndex = sizes.indexOf(prev.fontSizeMultiplier);
      const nextIndex = (currentIndex + 1) % sizes.length;
      return {
        ...prev,
        fontSizeMultiplier: sizes[nextIndex],
      };
    });
  };

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`sticky top-0 z-40 w-full transition-colors duration-300 border-b ${
      accessibility.highContrast
        ? 'bg-black text-yellow-300 border-yellow-400'
        : 'bg-white text-slate-900 border-slate-200 shadow-sm'
    }`}>
      {/* Top Banner Accessibility & Govt Accreditation Strip (Official GoI Charcoal Strip) */}
      <div className="bg-[#1f242b] text-slate-100 text-xs py-1.5 px-4 sm:px-8 flex flex-wrap items-center justify-between gap-2 border-b border-slate-700">
        <div className="flex items-center gap-3 font-medium">
          <span className="bg-[#f26522] text-white px-2.5 py-0.5 rounded text-[10px] uppercase tracking-wider font-bold">
            भारत सरकार | Govt. of India
          </span>
          <span className="hidden md:inline text-slate-200 font-medium">
            Ministry of Education • Ek Bharat Shreshtha Bharat Cell at IIT Indore
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 text-xs">
          {/* Page Audio Narrator Web Speech API */}
          <PageAudioNarrator
            activeSection={activeSection}
            activeSectionLabel={currentItem.label}
          />

          {/* Font Size Adjuster Button */}
          <button
            onClick={cycleFontSize}
            className="flex items-center gap-1 hover:text-white transition-colors bg-white/20 px-2.5 py-0.5 rounded-full border border-white/30"
            title="Adjust Font Size"
            aria-label="Adjust font size"
          >
            <Type className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Size ({Math.round(accessibility.fontSizeMultiplier * 100)}%)</span>
          </button>

          {/* High Contrast Toggle */}
          <button
            onClick={toggleHighContrast}
            className="flex items-center gap-1 hover:text-white transition-colors bg-white/20 px-2.5 py-0.5 rounded-full border border-white/30"
            title="Toggle High Contrast Mode"
            aria-label="Toggle High Contrast Mode"
          >
            {accessibility.highContrast ? <Sun className="w-3.5 h-3.5 text-yellow-300" /> : <Moon className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{accessibility.highContrast ? 'Normal Contrast' : 'High Contrast'}</span>
          </button>

          {/* Screen Reader Label */}
          <div className="hidden lg:flex items-center gap-1 text-[11px] text-white/90 font-medium">
            <Shield className="w-3 h-3 text-emerald-300" />
            <span>WCAG 2.1 AA Accessible</span>
          </div>

          {/* Account Sign-In / Profile Chip */}
          {authReady && (
            user ? (
              <div className="flex items-center gap-1.5 bg-white/15 pl-1.5 pr-2 py-0.5 rounded-full border border-white/25">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'Account'}
                    referrerPolicy="no-referrer"
                    className="w-4 h-4 rounded-full object-cover"
                  />
                ) : (
                  <span className="w-4 h-4 rounded-full bg-[#f26522] text-white text-[9px] font-bold flex items-center justify-center">
                    {(user.displayName || user.email || 'U')[0].toUpperCase()}
                  </span>
                )}
                <span className="hidden sm:inline max-w-[110px] truncate text-[11px] font-semibold text-white">
                  {user.displayName?.split(' ')[0] || user.email?.split('@')[0]}
                </span>
                <button
                  type="button"
                  onClick={() => void signOutUser()}
                  className="ml-0.5 text-slate-200 hover:text-[#ff9933] transition-colors"
                  title="Sign Out"
                  aria-label="Sign out of EBSB Portal"
                >
                  <LogOut className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                disabled={signingIn}
                onClick={() => void signInWithGoogle()}
                className="flex items-center gap-1 bg-[#f26522] hover:bg-[#dc4f12] disabled:opacity-60 text-white px-2.5 py-0.5 rounded-full font-bold text-[11px] transition-colors"
                aria-label="Sign in with Google"
              >
                {signingIn ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : (
                  <LogIn className="w-3 h-3" />
                )}
                <span>{signingIn ? 'Signing in...' : 'Sign In'}</span>
              </button>
            )
          )}
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Brand / Logo Section */}
        <div 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 cursor-pointer group shrink-0"
          role="button"
          tabIndex={0}
          aria-label="Go to IIT Indore EBSB Home"
        >
          {/* Official IIT Indore & EBSB Logos */}
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="w-11 h-11 rounded-xl bg-white/95 p-0.5 shadow-md border border-indigo-100 group-hover:scale-105 transition-transform flex items-center justify-center overflow-hidden">
              <img
                src="/assets/aistudio/image_c01be850.png"
                alt="IIT Indore Official Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="w-11 h-11 rounded-full bg-white shadow-md border border-orange-200 group-hover:scale-105 transition-transform flex items-center justify-center overflow-hidden">
              <img
                src="/assets/aistudio/image_c486a2c1.png"
                alt="Ek Bharat Shreshtha Bharat Official Logo"
                className="w-full h-full object-cover scale-[1.03]"
              />
            </div>
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-[#163c6b] whitespace-nowrap">
                IIT INDORE
              </span>
              <span className="text-[10px] bg-orange-100 text-[#b83d0d] px-2 py-0.5 rounded font-bold border border-orange-200 whitespace-nowrap">
                EBSB CELL
              </span>
            </div>
            <p className="text-[10px] uppercase tracking-wider text-[#138808] font-bold whitespace-nowrap">
              Ek Bharat Shreshtha Bharat
            </p>
          </div>
        </div>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-1.5 rounded-md text-sm font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? accessibility.highContrast
                      ? 'bg-yellow-400 text-black font-bold'
                      : 'bg-[#f26522] text-white shadow-sm'
                    : 'text-slate-700 hover:text-[#f26522] hover:bg-orange-50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Actions Section */}
        <div className="hidden sm:flex items-center gap-2">
          {/* Quick Search */}
          <button
            onClick={onOpenSearch}
            className="p-2.5 rounded-md bg-slate-100 text-slate-700 hover:text-[#f26522] hover:bg-orange-50 transition-colors border border-slate-200"
            title="Search Events, Culture, Languages"
            aria-label="Search events and cultural content"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* AI Guide Trigger */}
          <button
            onClick={() => onOpenAiModal('assistant')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-md text-xs font-bold bg-[#163c6b] hover:bg-[#102847] text-white shadow-sm transition-all whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#ff9933]" />
            <span>AI Cultural Guide</span>
          </button>

          {/* Volunteer CTA */}
          <button
            onClick={onOpenVolunteerModal}
            className="flex items-center gap-1.5 px-4 py-2 rounded-md text-xs font-bold bg-[#138808] hover:bg-[#0f7506] text-white shadow-sm transition-colors whitespace-nowrap"
          >
            <Heart className="w-3.5 h-3.5 text-orange-200" />
            <span>Join EBSB</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={() => onOpenAiModal('assistant')}
            className="p-2 rounded-md bg-[#f26522] text-white shadow-sm"
            aria-label="AI Cultural Assistant"
          >
            <Sparkles className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Signature Tricolor Accent Hairline */}
      <div className="h-[3px] w-full ebsb-tricolor-bar" />

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 animate-fadeIn text-slate-800 shadow-lg">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                activeSection === item.id
                  ? 'bg-[#f26522] text-white shadow-sm'
                  : 'text-slate-700 hover:bg-orange-50 hover:text-[#f26522]'
              }`}
            >
              {item.label}
            </button>
          ))}

          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAiModal('assistant');
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold bg-[#163c6b] text-white shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-[#ff9933]" />
              <span>Ask AI Cultural Guide</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAiModal('quiz');
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold bg-orange-50 text-[#b83d0d] border border-orange-200"
            >
              <span>Take AI Integration Quiz</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenVolunteerModal();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold bg-[#138808] hover:bg-[#0f7506] text-white shadow-sm"
            >
              <Heart className="w-4 h-4 text-orange-200" />
              <span>Register as Student Volunteer</span>
            </button>

            {authReady && (
              user ? (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    void signOutUser();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold bg-slate-100 hover:bg-rose-50 text-slate-800 hover:text-rose-700 border border-slate-200"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out ({user.displayName?.split(' ')[0] || 'Account'})</span>
                </button>
              ) : (
                <button
                  type="button"
                  disabled={signingIn}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    void signInWithGoogle();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold bg-[#f26522] hover:bg-[#dc4f12] text-white shadow-sm"
                >
                  <LogIn className="w-4 h-4" />
                  <span>{signingIn ? 'Signing in...' : 'Sign in with Google'}</span>
                </button>
              )
            )}
          </div>
        </div>
      )}
    </header>
  );
};
