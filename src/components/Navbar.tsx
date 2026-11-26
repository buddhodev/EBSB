import React, { useState } from 'react';
import { Sparkles, Menu, X, Sun, Moon, Type, Search, Globe, Shield, Heart } from 'lucide-react';
import { AccessibilitySettings } from '../types';
import { PageAudioNarrator } from './PageAudioNarrator';

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
        : 'bg-white/30 backdrop-blur-xl text-slate-900 border-white/40 shadow-sm'
    }`}>
      {/* Top Banner Accessibility & Govt Accreditation Strip */}
      <div className="bg-gradient-to-r from-orange-500/90 via-indigo-900/90 to-emerald-600/90 text-white text-xs py-1.5 px-4 sm:px-8 flex flex-wrap items-center justify-between gap-2 border-b border-white/20 backdrop-blur-md">
        <div className="flex items-center gap-3 font-medium">
          <span className="bg-white/20 text-white px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-bold border border-white/30">
            Govt. of India Initiative
          </span>
          <span className="hidden md:inline text-white/90 font-medium">
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
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Brand / Logo Section */}
        <div 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 cursor-pointer group"
          role="button"
          tabIndex={0}
          aria-label="Go to IIT Indore EBSB Home"
        >
          {/* Emblem Icon */}
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-900 to-indigo-700 p-0.5 shadow-lg shadow-indigo-900/20 group-hover:scale-105 transition-transform flex items-center justify-center text-white font-bold text-xl">
            I
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-indigo-950">
                IIT INDORE
              </span>
              <span className="text-[10px] bg-orange-100 text-orange-700 px-2.5 py-0.5 rounded-full font-bold border border-orange-200">
                EBSB CELL
              </span>
            </div>
            <p className="text-[10px] uppercase tracking-widest text-slate-600 font-semibold">
              Ek Bharat Shreshtha Bharat
            </p>
          </div>
        </div>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3.5 py-1.5 rounded-full text-sm font-semibold transition-all ${
                  isActive
                    ? accessibility.highContrast
                      ? 'bg-yellow-400 text-black font-bold'
                      : 'bg-indigo-600 text-white shadow-md shadow-indigo-200/50'
                    : 'text-slate-700 hover:text-indigo-900 hover:bg-white/50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Actions Section */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Quick Search */}
          <button
            onClick={onOpenSearch}
            className="p-2.5 rounded-full bg-white/50 backdrop-blur-md text-slate-700 hover:text-indigo-900 hover:bg-white/80 transition-colors border border-white/60 shadow-sm"
            title="Search Events, Culture, Languages"
            aria-label="Search events and cultural content"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* AI Guide Trigger */}
          <button
            onClick={() => onOpenAiModal('assistant')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-200" />
            <span>AI Cultural Guide</span>
          </button>

          {/* Volunteer CTA */}
          <button
            onClick={onOpenVolunteerModal}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-white/60 hover:bg-white/90 text-indigo-900 border border-white/80 shadow-sm transition-colors"
          >
            <Heart className="w-3.5 h-3.5 text-rose-500" />
            <span>Join EBSB</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={() => onOpenAiModal('assistant')}
            className="p-2 rounded-full bg-indigo-600 text-white shadow-md"
            aria-label="AI Cultural Assistant"
          >
            <Sparkles className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full bg-white/60 text-slate-800 hover:bg-white border border-white/80"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/80 backdrop-blur-2xl border-b border-white/50 px-4 pt-3 pb-6 space-y-2 animate-fadeIn text-slate-800">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`block w-full text-left px-4 py-2.5 rounded-2xl text-sm font-semibold transition-colors ${
                activeSection === item.id
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-700 hover:bg-white/60'
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
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold bg-indigo-600 text-white shadow"
            >
              <Sparkles className="w-4 h-4" />
              <span>Ask AI Cultural Guide</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAiModal('quiz');
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold bg-white/70 text-indigo-900 border border-white/80 shadow-sm"
            >
              <span>Take AI Integration Quiz</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenVolunteerModal();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold bg-rose-500 text-white shadow"
            >
              <Heart className="w-4 h-4 text-white" />
              <span>Register as Student Volunteer</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
