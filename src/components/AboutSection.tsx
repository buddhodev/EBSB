import React from 'react';
import { Target, HeartHandshake, Languages, Compass, Quote, CheckCircle2, ChevronRight } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const pillars = [
    {
      icon: HeartHandshake,
      title: 'Youth & Cultural Exchange',
      description: 'Hosting inter-state youth delegations from paired states, enabling students to experience local homes, traditions, historical landmarks, and academic innovations.',
      badge: 'Pillar 1',
    },
    {
      icon: Languages,
      title: 'Bhasha Sangam Initiative',
      description: 'Promoting language learning of paired states (Meiteilon, Ao Naga, Nagamese, Malvi, Hindi) through weekly circles, phrasebooks, and multilingual poetry.',
      badge: 'Pillar 2',
    },
    {
      icon: Compass,
      title: 'Heritage Walks & Tourism',
      description: 'Organizing excursions to UNESCO World Heritage Sites across Madhya Pradesh including Sanchi Stupas, Bhimbetka caves, Mandu, and Ujjain Mahakal corridor.',
      badge: 'Pillar 3',
    },
    {
      icon: Target,
      title: 'Gastronomy & Culinary Fusion',
      description: 'Celebrating Indian culinary diversity by pairing Indori street food delicacies (Poha Jalebi, Bhutte Ka Kees) with North-East cuisine (Axone, Eromba, Chak-Hao).',
      badge: 'Pillar 4',
    },
  ];

  return (
    <section id="about" className="py-16 sm:py-24 text-slate-900 relative border-b border-white/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-100 text-orange-800 border border-orange-200 text-xs font-bold uppercase tracking-wider shadow-sm">
            Ministry of Education Mandate
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-indigo-950 tracking-tight">
            About Ek Bharat Shreshtha Bharat Cell at IIT Indore
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-medium">
            Launched by Hon'ble Prime Minister Shri Narendra Modi on Rashtriya Ekta Diwas, Ek Bharat Shreshtha Bharat aims to enhance interaction and promote mutual understanding between people of different states through cultural pairing.
          </p>
        </div>

        {/* Leadership Statements Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Director Message */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white/40 backdrop-blur-md border border-white/50 hover:border-indigo-300 transition-all space-y-4 relative overflow-hidden shadow-xl">
            <Quote className="w-10 h-10 text-indigo-200 absolute top-4 right-4" />
            <div className="flex items-center gap-4">
              <img
                src="/assets/aistudio/image_e9ad3517.png"
                alt="Prof. Suhas S. Joshi"
                className="w-16 h-16 rounded-full object-cover object-center border-2 border-indigo-400 shadow-sm"
              />
              <div>
                <h3 className="text-lg font-bold text-indigo-950">Prof. Suhas S. Joshi</h3>
                <p className="text-xs text-indigo-600 font-bold">Director, IIT Indore & Patron EBSB Cell</p>
                <p className="text-[11px] text-slate-500 font-medium">Indian Institute of Technology Indore</p>
              </div>
            </div>
            <p className="text-sm text-slate-600 italic leading-relaxed pt-2">
              "At IIT Indore, we believe that technological innovation reaches its full potential when rooted in deep cultural harmony and national unity. The EBSB Cell bridges our campus with Manipur, Nagaland, and all corners of India."
            </p>
          </div>

          {/* Nodal Officer Message */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white/40 backdrop-blur-md border border-white/50 hover:border-indigo-300 transition-all space-y-4 relative overflow-hidden shadow-xl">
            <Quote className="w-10 h-10 text-indigo-200 absolute top-4 right-4" />
            <div className="flex items-center gap-4">
              <img
                src="/assets/aistudio/image_013c95b8.png"
                alt="Dr. Sharad Gupta"
                className="w-16 h-16 rounded-full object-cover object-top border-2 border-indigo-400 shadow-sm"
              />
              <div>
                <h3 className="text-lg font-bold text-indigo-950">Dr. Sharad Gupta</h3>
                <p className="text-xs text-indigo-600 font-bold">Nodal Officer, EBSB Cell</p>
                <p className="text-[11px] text-slate-500 font-medium">Faculty Lead & Coordinator, IIT Indore</p>
              </div>
            </div>
            <p className="text-sm text-slate-600 italic leading-relaxed pt-2">
              "Our student-led initiatives span Bhasha Sangam language workshops, youth delegations, heritage walks, and national integration quizzes. Students build lifelong friendships across state borders."
            </p>
          </div>

        </div>

        {/* 4 Pillars Grid */}
        <div className="mt-16">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-black text-indigo-950">Core Objectives of IITI EBSB Cell</h3>
            <p className="text-sm text-slate-600 font-medium">4 strategic pillars guiding our annual action plan</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-white/40 backdrop-blur-md border border-white/50 hover:bg-white/70 hover:border-indigo-300 transition-all group space-y-3 shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-2xl bg-indigo-600 text-white group-hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] bg-indigo-100 text-indigo-800 font-bold px-2.5 py-0.5 rounded-full border border-indigo-200">
                      {pillar.badge}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-indigo-950 group-hover:text-indigo-600 transition-colors">
                    {pillar.title}
                  </h4>

                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* National Integration Mission Checklist */}
        <div className="mt-16 p-8 rounded-3xl bg-indigo-950 text-white shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
            <div className="md:col-span-8 space-y-3">
              <span className="text-[10px] bg-orange-500 text-white px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                Campus Engagement
              </span>
              <h3 className="text-2xl font-bold text-white">How EBSB Enhances Student Life at IIT Indore</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                Every academic year, over 1,500 students, faculty, and campus residents participate in EBSB cultural nights, language exchanges, and sports meets.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs text-slate-200 font-semibold">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Inter-state student buddy program</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Annual Youth Exchange certificate badges</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Bhasha Sangam daily language bulletin</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Cultural food stalls in mess & SAC</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-4 text-center md:text-right">
              <a
                href="https://ebsb.gov.in"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-orange-500 text-white font-bold text-xs hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/30"
              >
                <span>EBSB Govt. Portal</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
