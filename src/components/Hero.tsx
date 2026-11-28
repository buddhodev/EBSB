import React from 'react';
import { ArrowRight, Sparkles, Calendar, Compass, MapPin, Award, Users, BookOpen } from 'lucide-react';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
  onOpenAiModal: (tab?: 'assistant' | 'quiz') => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onOpenAiModal }) => {
  return (
    <section id="home" className="relative bg-gradient-to-b from-[#fff7f0] via-white to-[#f8f9fb] text-slate-900 overflow-hidden border-b border-slate-200">
      {/* Live Scrolling Ticker Strip - Official ekbharat.gov.in Warm Announcement Bar */}
      <div className="relative z-10 bg-[#fff2e6] border-b border-[#ffd5b8] text-[#163c6b] py-2.5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-3">
          <div className="flex items-center gap-1.5 shrink-0 bg-[#f26522] text-white font-extrabold text-xs uppercase px-3 py-1 rounded shadow-xs tracking-wider">
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
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#163c6b] leading-[1.1] tracking-tight">
              Celebrating the <br />
              <span className="text-[#f26522]">Spirit of Bharat</span> at IIT Indore.
            </h2>
            <div className="h-1.5 w-32 rounded-full ebsb-tricolor-bar border border-slate-200 mx-auto lg:mx-0" />

            {/* Subtitle */}
            <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Fostering cultural exchange and national integration through shared traditions, languages, and shared learning between <strong>Madhya Pradesh</strong> and paired states <strong>Manipur & Nagaland</strong>.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <button
                onClick={() => onNavigate('paired-states')}
                className="bg-[#f26522] hover:bg-[#dc4f12] text-white px-7 py-3.5 rounded-lg text-xs sm:text-sm font-bold shadow-md hover:scale-[1.01] active:scale-95 transition-all flex items-center gap-2"
              >
                <span>Explore Partner States</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onOpenAiModal('assistant')}
                className="bg-[#163c6b] hover:bg-[#102847] text-white px-6 py-3.5 rounded-lg text-xs sm:text-sm font-bold shadow-sm transition-all flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#ff9933]" />
                <span>Ask AI Cultural Guide</span>
              </button>

              <button
                onClick={() => onNavigate('events')}
                className="bg-white hover:bg-orange-50 border border-slate-300 text-[#163c6b] px-5 py-3.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#f26522]" />
                <span>Youth Exchange 2026</span>
              </button>
            </div>

            {/* Ministry Tag */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-slate-600">
              <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-md border border-slate-200 shadow-xs">
                <MapPin className="w-3.5 h-3.5 text-[#f26522]" />
                Simrol Campus, Indore (MP)
              </span>
              <span>•</span>
              <span className="text-[#138808] font-bold">Ministry of Education Initiative</span>
            </div>
          </div>

          {/* Right Column Official Portal Feature Cards */}
          <div className="lg:col-span-5 flex flex-col space-y-5">
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-lg relative">
              <div className="h-1.5 w-full ebsb-tricolor-bar" />
              <div className="p-6">
              <h3 className="text-xs font-bold text-[#163c6b] uppercase tracking-widest mb-4">
                Partner State Spotlight
              </h3>
              
              <div className="flex items-center justify-between mb-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#f26522] to-[#dc4f12] rounded-xl mx-auto mb-2 flex items-center justify-center shadow-md text-white font-bold text-lg">
                    MP
                  </div>
                  <span className="text-[11px] font-bold text-slate-800">Madhya Pradesh</span>
                </div>

                <div className="h-[2px] flex-1 bg-gradient-to-r from-[#f26522] via-[#163c6b] to-[#138808] mx-4 relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border border-slate-200 rounded-full px-2.5 py-0.5 text-[9px] font-bold text-[#163c6b] uppercase shadow-xs">
                    Paired
                  </div>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#138808] to-[#0f7506] rounded-xl mx-auto mb-2 flex items-center justify-center shadow-md text-white font-bold text-lg">
                    MN/NL
                  </div>
                  <span className="text-[11px] font-bold text-slate-800">Manipur & Nagaland</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-[#fafbfc] p-3.5 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div className="text-xs font-bold text-[#163c6b]">Upcoming: Youth Cultural Fest</div>
                  <span className="text-[10px] bg-[#138808] text-white px-2.5 py-0.5 rounded font-bold">12 Oct</span>
                </div>

                <div className="bg-[#fafbfc] p-3.5 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div className="text-xs font-bold text-[#163c6b]">Bhasha Sangam Language Circle</div>
                  <span className="text-[10px] bg-[#f26522] text-white px-2.5 py-0.5 rounded font-bold">Weekly</span>
                </div>
              </div>

              {/* Quiz Callout inside Card */}
              <button
                onClick={() => onOpenAiModal('quiz')}
                className="mt-4 w-full flex items-center justify-between p-3.5 rounded-xl bg-[#163c6b] text-white hover:bg-[#102847] transition-colors shadow-sm"
              >
                <div className="flex items-center gap-2.5">
                  <Award className="w-5 h-5 text-[#ff9933]" />
                  <div className="text-left">
                    <div className="text-xs font-bold">Take National Integration Quiz</div>
                    <div className="text-[10px] opacity-85">Earn your Digital EBSB Badge</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#ff9933]" />
              </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between shadow-sm">
                <span className="text-3xl font-black text-[#163c6b]">350+</span>
                <span className="text-[10px] font-bold uppercase text-slate-600 leading-tight">Student Delegates Exchanged</span>
              </div>
              <div className="bg-[#f26522] rounded-2xl p-5 flex flex-col justify-between text-white shadow-sm">
                <span className="text-3xl font-black">45+</span>
                <span className="text-[10px] font-bold uppercase opacity-95 leading-tight">Bhasha Sangam Circles</span>
              </div>
            </div>
          </div>

        </div>

        {/* Stats Grid Footer Row */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm space-y-1">
            <div className="flex items-center gap-2 text-[#163c6b]">
              <Users className="w-5 h-5 text-[#163c6b]" />
              <span className="text-2xl font-black text-[#163c6b]">12+</span>
            </div>
            <div className="text-xs font-bold text-slate-800">State Delegations</div>
            <p className="text-[11px] text-slate-600">Cross-state student cohorts hosted</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm space-y-1">
            <div className="flex items-center gap-2 text-[#f26522]">
              <BookOpen className="w-5 h-5 text-[#f26522]" />
              <span className="text-2xl font-black text-[#163c6b]">500+</span>
            </div>
            <div className="text-xs font-bold text-slate-800">Language Learners</div>
            <p className="text-[11px] text-slate-600">Active students in Bhasha Sangam</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm space-y-1">
            <div className="flex items-center gap-2 text-[#163c6b]">
              <Compass className="w-5 h-5 text-[#163c6b]" />
              <span className="text-2xl font-black text-[#163c6b]">100%</span>
            </div>
            <div className="text-xs font-bold text-slate-800">Inclusivity Index</div>
            <p className="text-[11px] text-slate-600">Diverse state participation</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm space-y-1">
            <div className="flex items-center gap-2 text-[#138808]">
              <Award className="w-5 h-5 text-[#138808]" />
              <span className="text-2xl font-black text-[#163c6b]">4.9/5</span>
            </div>
            <div className="text-xs font-bold text-slate-800">Delegate Satisfaction</div>
            <p className="text-[11px] text-slate-600">Post-event feedback score</p>
          </div>
        </div>

      </div>
    </section>
  );
};
