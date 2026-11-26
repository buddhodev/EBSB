import React from 'react';
import { ArrowRight, Sparkles, Calendar, Compass, MapPin, Award, Users, BookOpen } from 'lucide-react';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
  onOpenAiModal: (tab?: 'assistant' | 'quiz') => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onOpenAiModal }) => {
  return (
    <section id="home" className="relative text-slate-900 overflow-hidden border-b border-white/40 pt-4">
      {/* Decorative Gradient Orbs for Frosted Lighting */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-orange-300/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 right-10 w-96 h-96 bg-indigo-300/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-96 h-96 bg-emerald-300/30 rounded-full blur-3xl pointer-events-none" />

      {/* Live Scrolling Ticker Strip - Glass Style */}
      <div className="relative z-10 bg-white/40 border-y border-white/50 text-indigo-950 py-2.5 overflow-hidden backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-3">
          <div className="flex items-center gap-1.5 shrink-0 bg-orange-500 text-white font-extrabold text-xs uppercase px-3 py-1 rounded-full shadow-sm tracking-wider">
            <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            Live Updates
          </div>
          
          <div className="overflow-hidden whitespace-nowrap text-xs font-semibold tracking-wide text-slate-800">
            <div className="inline-block animate-marquee space-x-8">
              <span>🎉 <strong>Flagship Youth Exchange 2026:</strong> Registrations now open for Manipur & Nagaland Student Delegation!</span>
              <span>•</span>
              <span>📚 <strong>Bhasha Sangam:</strong> Weekly Meiteilon & Ao Naga language learning circles every Wednesday at LHC-102</span>
              <span>•</span>
              <span>🏆 <strong>National Integration Quiz:</strong> Test your cultural knowledge & win certificates with our AI Quiz Generator!</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Hero Banner Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 sm:pt-16 sm:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column Text & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Unity Badge Pill */}
            <div className="inline-flex items-center gap-2 bg-orange-100/90 px-3.5 py-1.5 rounded-full border border-orange-200 text-orange-800 text-xs font-bold w-fit mx-auto lg:mx-0 shadow-sm">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
              <span>UNITY IN DIVERSITY • IIT INDORE EBSB</span>
            </div>

            {/* Title Headline */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-indigo-950 leading-[1.1] tracking-tight">
              Celebrating the <br />
              <span className="text-indigo-600">Spirit of Bharat</span> at IIT Indore.
            </h2>

            {/* Subtitle */}
            <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Fostering cultural exchange and national integration through shared traditions, languages, and shared learning between <strong>Madhya Pradesh</strong> and paired states <strong>Manipur & Nagaland</strong>.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <button
                onClick={() => onNavigate('paired-states')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold shadow-xl shadow-indigo-200/80 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2"
              >
                <span>Explore Partner States</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onOpenAiModal('assistant')}
                className="bg-white/60 hover:bg-white/90 backdrop-blur-md border border-white/80 text-indigo-950 px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold shadow-md transition-all flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-orange-500 animate-spin" />
                <span>Ask AI Cultural Guide</span>
              </button>

              <button
                onClick={() => onNavigate('events')}
                className="bg-white/40 hover:bg-white/70 backdrop-blur-sm border border-white/50 text-slate-700 px-5 py-3.5 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-indigo-600" />
                <span>Youth Exchange 2026</span>
              </button>
            </div>

            {/* Ministry Tag */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-slate-600">
              <span className="flex items-center gap-1.5 bg-white/40 px-3 py-1 rounded-full border border-white/60">
                <MapPin className="w-3.5 h-3.5 text-orange-600" />
                Simrol Campus, Indore (MP)
              </span>
              <span>•</span>
              <span>Ministry of Education Initiative</span>
            </div>
          </div>

          {/* Right Column Frosted Glass Feature Cards */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-3xl p-6 shadow-xl relative overflow-hidden">
              <h3 className="text-xs font-bold text-indigo-900 uppercase tracking-widest mb-4">
                Partner State Spotlight
              </h3>
              
              <div className="flex items-center justify-between mb-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl mx-auto mb-2 flex items-center justify-center shadow-lg text-white font-bold text-lg">
                    MP
                  </div>
                  <span className="text-[11px] font-bold text-slate-800">Madhya Pradesh</span>
                </div>

                <div className="h-[1px] flex-1 bg-indigo-200 mx-4 relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 border border-indigo-100 rounded-full px-2.5 py-0.5 text-[9px] font-bold text-indigo-600 uppercase shadow-sm">
                    Paired
                  </div>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mx-auto mb-2 flex items-center justify-center shadow-lg text-white font-bold text-lg">
                    MN/NL
                  </div>
                  <span className="text-[11px] font-bold text-slate-800">Manipur & Nagaland</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-white/60 p-3.5 rounded-2xl border border-white/80 flex items-center justify-between shadow-sm">
                  <div className="text-xs font-bold text-indigo-950">Upcoming: Youth Cultural Fest</div>
                  <span className="text-[10px] bg-emerald-500 text-white px-2.5 py-0.5 rounded-full font-bold">12 Oct</span>
                </div>

                <div className="bg-white/60 p-3.5 rounded-2xl border border-white/80 flex items-center justify-between shadow-sm">
                  <div className="text-xs font-bold text-indigo-950">Bhasha Sangam Language Circle</div>
                  <span className="text-[10px] bg-indigo-600 text-white px-2.5 py-0.5 rounded-full font-bold">Weekly</span>
                </div>
              </div>

              {/* Quiz Callout inside Card */}
              <button
                onClick={() => onOpenAiModal('quiz')}
                className="mt-4 w-full flex items-center justify-between p-3 rounded-2xl bg-indigo-900 text-white hover:bg-indigo-800 transition-colors shadow-lg shadow-indigo-200/50"
              >
                <div className="flex items-center gap-2.5">
                  <Award className="w-5 h-5 text-amber-300" />
                  <div className="text-left">
                    <div className="text-xs font-bold">Take National Integration Quiz</div>
                    <div className="text-[10px] opacity-80">Earn your Digital EBSB Badge</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-3xl p-5 flex flex-col justify-between shadow-lg">
                <span className="text-3xl font-black text-indigo-950">350+</span>
                <span className="text-[10px] font-bold uppercase text-slate-600 leading-tight">Student Delegates Exchanged</span>
              </div>
              <div className="bg-indigo-900 rounded-3xl p-5 flex flex-col justify-between text-white shadow-xl shadow-indigo-200">
                <span className="text-3xl font-black">45+</span>
                <span className="text-[10px] font-bold uppercase opacity-80 leading-tight">Bhasha Sangam Circles</span>
              </div>
            </div>
          </div>

        </div>

        {/* Stats Grid Footer Row */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-3xl p-4 sm:p-5 shadow-lg space-y-1">
            <div className="flex items-center gap-2 text-indigo-900">
              <Users className="w-5 h-5 text-indigo-600" />
              <span className="text-2xl font-black text-indigo-950">12+</span>
            </div>
            <div className="text-xs font-bold text-slate-800">State Delegations</div>
            <p className="text-[11px] text-slate-600">Cross-state student cohorts hosted</p>
          </div>

          <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-3xl p-4 sm:p-5 shadow-lg space-y-1">
            <div className="flex items-center gap-2 text-orange-600">
              <BookOpen className="w-5 h-5 text-orange-500" />
              <span className="text-2xl font-black text-indigo-950">500+</span>
            </div>
            <div className="text-xs font-bold text-slate-800">Language Learners</div>
            <p className="text-[11px] text-slate-600">Active students in Bhasha Sangam</p>
          </div>

          <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-3xl p-4 sm:p-5 shadow-lg space-y-1">
            <div className="flex items-center gap-2 text-rose-600">
              <Compass className="w-5 h-5 text-rose-500" />
              <span className="text-2xl font-black text-indigo-950">100%</span>
            </div>
            <div className="text-xs font-bold text-slate-800">Inclusivity Index</div>
            <p className="text-[11px] text-slate-600">Diverse state participation</p>
          </div>

          <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-3xl p-4 sm:p-5 shadow-lg space-y-1">
            <div className="flex items-center gap-2 text-emerald-600">
              <Award className="w-5 h-5 text-emerald-500" />
              <span className="text-2xl font-black text-indigo-950">4.9/5</span>
            </div>
            <div className="text-xs font-bold text-slate-800">Delegate Satisfaction</div>
            <p className="text-[11px] text-slate-600">Post-event feedback score</p>
          </div>
        </div>

      </div>
    </section>
  );
};
