import React from 'react';
import { ArrowUp, Shield, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1a2536] text-slate-300 text-xs">
      {/* Signature National Tricolor Accent Band */}
      <div className="h-1.5 w-full ebsb-tricolor-bar" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 shrink-0">
                <div className="w-12 h-12 rounded-xl bg-white p-1 shadow-md flex items-center justify-center overflow-hidden">
                  <img
                    src="/assets/aistudio/image_c01be850.png"
                    alt="IIT Indore Official Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center overflow-hidden">
                  <img
                    src="/assets/aistudio/image_c486a2c1.png"
                    alt="Ek Bharat Shreshtha Bharat Official Logo"
                    className="w-full h-full object-cover scale-[1.03]"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-base font-black text-white">IIT Indore • EBSB Portal</h3>
                <p className="text-[11px] text-[#ff9933] font-extrabold">Ek Bharat Shreshtha Bharat Cell</p>
              </div>
            </div>

            <p className="text-slate-300 font-medium text-xs leading-relaxed max-w-sm">
              Promoting national integration, paired state cultural exchanges, Bhasha Sangam language workshops, and youth delegations under the Ministry of Education, Government of India.
            </p>

            <div className="flex items-center gap-2 text-[11px] text-slate-300 font-semibold pt-2">
              <Shield className="w-3.5 h-3.5 text-[#3bb96c]" />
              <span>Compliant with Govt. Accessibility & WCAG 2.1 AA Guidelines</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-2.5">
            <h4 className="text-xs font-black text-[#ff9933] uppercase tracking-wider border-b border-slate-700 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2 text-slate-300 font-medium">
              <li><a href="#about" className="hover:text-[#ff9933] transition-colors">About EBSB Mandate</a></li>
              <li><a href="#paired-states" className="hover:text-[#ff9933] transition-colors">MP ↔ Manipur & Nagaland</a></li>
              <li><a href="#events" className="hover:text-[#ff9933] transition-colors">Youth Exchange Calendar</a></li>
              <li><a href="#bhasha-sangam" className="hover:text-[#ff9933] transition-colors">Bhasha Sangam Language Hub</a></li>
              <li><a href="#gallery" className="hover:text-[#ff9933] transition-colors">Media & Delegation Stories</a></li>
            </ul>
          </div>

          {/* External Govt Portals */}
          <div className="md:col-span-4 space-y-2.5">
            <h4 className="text-xs font-black text-[#ff9933] uppercase tracking-wider border-b border-slate-700 pb-2">
              Official Portals
            </h4>
            <ul className="space-y-2 text-slate-300 font-medium">
              <li>
                <a href="https://ekbharat.gov.in" target="_blank" rel="noreferrer" className="hover:text-[#ff9933] transition-colors flex items-center gap-1">
                  <span>National EBSB Portal (ekbharat.gov.in)</span>
                </a>
              </li>
              <li>
                <a href="https://www.education.gov.in" target="_blank" rel="noreferrer" className="hover:text-[#ff9933] transition-colors">
                  Ministry of Education, Govt. of India
                </a>
              </li>
              <li>
                <a href="https://www.iiti.ac.in" target="_blank" rel="noreferrer" className="hover:text-[#ff9933] transition-colors">
                  IIT Indore Main Portal (www.iiti.ac.in)
                </a>
              </li>
              <li>
                <a href="https://swayam.gov.in" target="_blank" rel="noreferrer" className="hover:text-[#ff9933] transition-colors">
                  Swayam / Bhasha Sangam Mobile App
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Deep Official GoI Bottom Copyright Bar */}
      <div className="bg-[#111926] border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400 font-medium">
          <div>
            © {new Date().getFullYear()} Ek Bharat Shreshtha Bharat Cell, Indian Institute of Technology Indore. All Rights Reserved.
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-300 font-semibold">
              Crafted with <Heart className="w-3.5 h-3.5 text-[#f26522] fill-[#f26522]" /> for National Unity
            </span>

            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-md bg-[#f26522] hover:bg-[#dc4f12] text-white shadow-sm transition-colors"
              title="Back to Top"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
