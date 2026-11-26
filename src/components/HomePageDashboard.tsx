import React from 'react';
import { Hero } from './Hero';
import {
  BookOpen,
  Calendar,
  Compass,
  Globe,
  Heart,
  Languages,
  MapPin,
  MessageSquare,
  Sparkles,
  Users,
  ArrowRight,
  Shield,
  Award,
  ChevronRight,
  Flame,
  CheckCircle2
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
  const portalHubs = [
    {
      id: 'about',
      title: 'About EBSB Cell',
      subtitle: 'Ministry of Education Mandate & Strategic Vision',
      description: 'Discover the founding mission of Ek Bharat Shreshtha Bharat at IIT Indore under Director Prof. Suhas S. Joshi and Nodal Officer Dr. Sharad Gupta.',
      badge: 'Mandate & Vision',
      icon: Shield,
      color: 'from-blue-600 to-indigo-700',
      highlights: ['4 Core Pillars', 'Director Message', 'Campus Engagement'],
    },
    {
      id: 'paired-states',
      title: 'Paired States Hub',
      subtitle: 'Madhya Pradesh ↔ Manipur & Nagaland Pairing',
      description: 'Explore rich comparative insights across geography, traditional art forms, grand festivals (Yaoshang, Hornbill), and culinary heritage.',
      badge: 'State Pairing',
      icon: Compass,
      color: 'from-orange-500 to-amber-600',
      highlights: ['State Profiles', 'Pithora & Thang-Ta Art', 'Indori Poha & Chak-Hao'],
    },
    {
      id: 'cultural-map',
      title: 'Interactive Cultural Map',
      subtitle: 'Geographical Landmarks & Heritage Sites',
      description: 'Explore UNESCO World Heritage sites, classical dance arenas, Hornbill Festival grounds, and IIT Indore hubs with interactive pins.',
      badge: 'Visual Map',
      icon: MapPin,
      color: 'from-rose-600 to-amber-600',
      highlights: ['Interactive Canvas', 'MP, Manipur & Nagaland', 'Landmark Dossiers'],
    },
    {
      id: 'events',
      title: 'Youth Exchange & Events',
      subtitle: 'Inter-State Delegations & Annual Calendar',
      description: 'View schedules for upcoming youth exchanges, Bhasha Sangam poetry circles, Indori food walks, and Rashtriya Ekta Diwas events.',
      badge: 'Events & Trips',
      icon: Calendar,
      color: 'from-emerald-600 to-teal-700',
      highlights: ['Delegation Trips', 'Food Walks', 'Ekta Diwas Marathon'],
    },
    {
      id: 'bhasha-sangam',
      title: 'Bhasha Sangam Hub',
      subtitle: 'Language Learning & AI Translation',
      description: 'Practice 100+ everyday phrases in Meiteilon, Nagamese, Ao Naga, Malvi, and Hindi with audio pronunciations and our instant AI translator.',
      badge: 'Languages & Scripts',
      icon: Languages,
      color: 'from-indigo-600 to-purple-700',
      highlights: ['AI Instant Translator', '5 Languages', 'Phonetic Audio Cards'],
    },
    {
      id: 'sanskrit-hub',
      title: 'Sanskrit Language & Heritage',
      subtitle: 'Classical Mother Tongue & Indian Knowledge Systems',
      description: 'Recite Vedic shlokas, practice Sanskrit conversation phrases, and learn about IIT Indore Center for Indian Knowledge Systems (IKS).',
      badge: 'Classical Heritage',
      icon: BookOpen,
      color: 'from-amber-600 to-orange-700',
      highlights: ['Shlokas & Audio', 'Everyday Phrases', 'IKS Research at IITI'],
    },
    {
      id: 'gallery',
      title: 'Media Gallery & Stories',
      subtitle: 'Youth Experiences & Visual Memories',
      description: 'Browse photos, video highlights, and inspiring testimonials from student delegates participating in inter-state youth exchange programs.',
      badge: 'Visual Gallery',
      icon: Globe,
      color: 'from-rose-500 to-pink-600',
      highlights: ['Delegation Photos', 'Student Quotes', 'Cultural Performances'],
    },
    {
      id: 'team-contact',
      title: 'Team & Volunteer Desk',
      subtitle: 'Cell Leadership & Student Crew Recruitment',
      description: 'Meet faculty nodal officers, student coordinators, and apply to join the official EBSB student volunteer crew at SAC, IIT Indore.',
      badge: 'Committee & Contact',
      icon: Users,
      color: 'from-amber-600 to-orange-700',
      highlights: ['Faculty Nodal Desk', 'Student Coordinators', 'Apply for Volunteer Crew'],
    },
  ];

  return (
    <div className="space-y-16">
      {/* Primary Hero Section */}
      <Hero onNavigate={onNavigate} onOpenAiModal={onOpenAiModal} />

      {/* Main Home Hub Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-100 text-orange-800 border border-orange-200 text-xs font-extrabold uppercase tracking-wider shadow-sm">
            Portal Directory Overview
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-indigo-950 tracking-tight">
            Explore EBSB Portal Departments & Features
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed">
            Select any tab below or navigate using the main top menu to visit dedicated pages for state pairing, events, languages, and team contacts.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portalHubs.map((hub) => {
            const Icon = hub.icon;
            return (
              <div
                key={hub.id}
                onClick={() => {
                  onNavigate(hub.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group p-6 sm:p-7 rounded-3xl bg-white/50 backdrop-blur-md border border-white/80 hover:bg-white hover:border-indigo-400 transition-all duration-300 shadow-xl flex flex-col justify-between cursor-pointer relative overflow-hidden"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`p-3.5 rounded-2xl bg-gradient-to-br ${hub.color} text-white shadow-md`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] uppercase font-extrabold text-orange-800 bg-orange-100 px-3 py-1 rounded-full border border-orange-200">
                      {hub.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-indigo-950 group-hover:text-indigo-600 transition-colors">
                      {hub.title}
                    </h3>
                    <p className="text-xs font-bold text-orange-700 mt-0.5">
                      {hub.subtitle}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    {hub.description}
                  </p>

                  <div className="pt-2 border-t border-slate-100 space-y-1.5">
                    {hub.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-700 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-200/80 flex items-center justify-between text-xs font-bold text-indigo-600 group-hover:text-indigo-800">
                  <span>Open Full Page</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* AI Assistant Quick Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-indigo-950 via-indigo-900 to-purple-950 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-200 text-xs font-bold border border-amber-400/30">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>Interactive Gemini AI Cultural Engine</span>
            </div>
            <h3 className="text-2xl font-black text-white">Have Questions About Manipur, Nagaland, or Indori Culture?</h3>
            <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
              Ask our Gemini-powered AI Assistant about heritage sites, cuisine pairings, Bhasha Sangam translations, or test your knowledge with the National Integration Quiz!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenAiModal('assistant')}
              className="px-6 py-3.5 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition-colors shadow-lg shadow-amber-400/20 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Ask AI Guide</span>
            </button>
            <button
              onClick={() => onOpenAiModal('quiz')}
              className="px-6 py-3.5 rounded-full bg-white/20 hover:bg-white/30 text-white font-bold text-xs border border-white/30 transition-colors"
            >
              Take Quiz
            </button>
          </div>
        </div>

        {/* Student Volunteer Callout */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-2.5 py-0.5 rounded-full border border-white/30">
              IIT Indore Campus Community
            </span>
            <h3 className="text-xl font-black">Become an Official EBSB Student Volunteer</h3>
            <p className="text-xs text-white/90 font-medium leading-relaxed">
              Host visiting delegates from Manipur & Nagaland, manage cultural workshops, and earn official EBSB coordinator certificates.
            </p>
          </div>

          <button
            onClick={onOpenVolunteerModal}
            className="px-7 py-3.5 rounded-full bg-white text-orange-950 font-black text-xs hover:bg-orange-50 transition-colors shadow-lg shrink-0 flex items-center gap-2"
          >
            <Heart className="w-4 h-4 text-rose-600 fill-rose-600" />
            <span>Apply as Volunteer</span>
          </button>
        </div>
      </section>
    </div>
  );
};
