import React from 'react';
import { Hero } from './Hero';
import { useLanguage } from '../contexts/LanguageContext';
import {
  BookOpen,
  Calendar,
  Compass,
  Globe,
  Heart,
  Languages,
  MapPin,
  Sparkles,
  Users,
  ArrowRight,
  Shield,
  CheckCircle2,
} from 'lucide-react';

interface HomePageDashboardProps {
  onNavigate: (sectionId: string) => void;
  onOpenAiModal: (tab?: 'assistant' | 'quiz') => void;
  onOpenVolunteerModal: () => void;
}

export const HomePageDashboard: React.FC<HomePageDashboardProps> = ({
  onNavigate,
  onOpenAiModal,
  onOpenVolunteerModal,
}) => {
  const { t } = useLanguage();

  const portalHubConfigs = [
    { id: 'about', icon: Shield, color: 'from-[#163c6b] to-[#0c1f38]' },
    { id: 'paired-states', icon: Compass, color: 'from-[#f26522] to-[#dc4f12]' },
    { id: 'cultural-map', icon: MapPin, color: 'from-[#138808] to-[#0f7506]' },
    { id: 'events', icon: Calendar, color: 'from-[#138808] to-[#163c6b]' },
    { id: 'bhasha-sangam', icon: Languages, color: 'from-[#1e4d87] to-[#102847]' },
    { id: 'sanskrit-hub', icon: BookOpen, color: 'from-[#f26522] to-[#b83d0d]' },
    { id: 'gallery', icon: Globe, color: 'from-[#163c6b] to-[#138808]' },
    { id: 'team-contact', icon: Users, color: 'from-[#f26522] to-[#163c6b]' },
  ];

  return (
    <div className="space-y-16">
      {/* Primary Opening Slideshow */}
      <Hero onNavigate={onNavigate} onOpenAiModal={onOpenAiModal} />

      {/* Main Home Hub Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-100 text-orange-800 border border-orange-200 text-xs font-extrabold uppercase tracking-wider shadow-sm">
            {t.home.directoryBadge}
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-indigo-950 tracking-tight">
            {t.home.directoryTitle}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed">
            {t.home.directorySubtitle}
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {portalHubConfigs.map((cfg) => {
            const Icon = cfg.icon;
            const hubCopy = t.home.hubs[cfg.id];
            if (!hubCopy) return null;

            return (
              <div
                key={cfg.id}
                onClick={() => {
                  onNavigate(cfg.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 hover:border-[#f26522] hover:shadow-lg transition-all duration-300 shadow-sm flex flex-col justify-between cursor-pointer relative overflow-hidden"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className={`p-3.5 rounded-xl bg-gradient-to-br ${cfg.color} text-white shadow-sm`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] uppercase font-extrabold text-[#b83d0d] bg-[#fff2e6] px-3 py-1 rounded-full border border-[#fed7ba]">
                      {hubCopy.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-[#163c6b] group-hover:text-[#f26522] transition-colors">
                      {hubCopy.title}
                    </h3>
                    <p className="text-xs font-bold text-[#b83d0d] mt-0.5">
                      {hubCopy.subtitle}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    {hubCopy.description}
                  </p>

                  <div className="pt-2 border-t border-slate-100 space-y-1.5">
                    {hubCopy.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-700 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#138808] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#f26522] group-hover:text-[#dc4f12]">
                  <span>{t.home.openFullPage}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* AI Assistant Quick Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-[#102847] via-[#163c6b] to-[#1e4d87] text-white shadow-xl relative overflow-hidden border border-[#163c6b]">
          <div className="h-1.5 w-full ebsb-tricolor-bar" />
          <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f26522]/20 text-orange-200 text-xs font-bold border border-[#f26522]/40">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.home.aiBannerBadge}</span>
              </div>
              <h3 className="text-2xl font-black text-white">{t.home.aiBannerTitle}</h3>
              <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
                {t.home.aiBannerDesc}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <button
                onClick={() => onOpenAiModal('assistant')}
                className="px-6 py-3.5 rounded-full bg-[#f26522] hover:bg-[#dc4f12] text-white font-black text-xs transition-colors shadow-lg flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>{t.home.aiBannerAskBtn}</span>
              </button>
              <button
                onClick={() => onOpenAiModal('quiz')}
                className="px-6 py-3.5 rounded-full bg-[#138808] hover:bg-[#0f7506] text-white font-bold text-xs border border-emerald-400/40 transition-colors"
              >
                {t.home.aiBannerQuizBtn}
              </button>
            </div>
          </div>
        </div>

        {/* Student Volunteer Callout */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-[#dc4f12] via-[#f26522] to-[#138808] text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-2.5 py-0.5 rounded-full border border-white/30">
              {t.home.volunteerBadge}
            </span>
            <h3 className="text-xl font-black">{t.home.volunteerTitle}</h3>
            <p className="text-xs text-white/95 font-medium leading-relaxed">
              {t.home.volunteerDesc}
            </p>
          </div>

          <button
            onClick={onOpenVolunteerModal}
            className="px-7 py-3.5 rounded-full bg-white text-[#163c6b] font-black text-xs hover:bg-[#fff6f0] transition-colors shadow-md shrink-0 flex items-center gap-2"
          >
            <Heart className="w-4 h-4 text-[#f26522] fill-[#f26522]" />
            <span>{t.home.volunteerBtn}</span>
          </button>
        </div>
      </section>
    </div>
  );
};
