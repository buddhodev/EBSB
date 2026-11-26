import React from 'react';
import { Globe, ArrowUp, Shield, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white/30 backdrop-blur-xl text-slate-600 text-xs border-t border-white/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-indigo-600 text-white shadow-md shadow-indigo-200">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-indigo-950">IIT Indore • EBSB Portal</h3>
                <p className="text-[11px] text-orange-700 font-extrabold">Ek Bharat Shreshtha Bharat Cell</p>
              </div>
            </div>

            <p className="text-slate-600 font-medium text-xs leading-relaxed max-w-sm">
              Promoting national integration, paired state cultural exchanges, Bhasha Sangam language workshops, and youth delegations under the Ministry of Education, Government of India.
            </p>

            <div className="flex items-center gap-2 text-[11px] text-slate-500 font-semibold pt-2">
              <Shield className="w-3.5 h-3.5 text-indigo-600" />
              <span>Compliant with Govt. Accessibility & WCAG 2.1 AA Guidelines</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="text-xs font-black text-indigo-950 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-1.5 text-slate-600 font-medium">
              <li><a href="#about" className="hover:text-indigo-600 transition-colors">About EBSB Mandate</a></li>
              <li><a href="#paired-states" className="hover:text-indigo-600 transition-colors">MP ↔ Manipur & Nagaland</a></li>
              <li><a href="#events" className="hover:text-indigo-600 transition-colors">Youth Exchange Calendar</a></li>
              <li><a href="#bhasha-sangam" className="hover:text-indigo-600 transition-colors">Bhasha Sangam Language Hub</a></li>
              <li><a href="#gallery" className="hover:text-indigo-600 transition-colors">Media & Delegation Stories</a></li>
            </ul>
          </div>

          {/* External Govt Portals */}
          <div className="md:col-span-4 space-y-2">
            <h4 className="text-xs font-black text-indigo-950 uppercase tracking-wider">Official Portals</h4>
            <ul className="space-y-1.5 text-slate-600 font-medium">
              <li>
                <a href="https://ebsb.gov.in" target="_blank" rel="noreferrer" className="hover:text-indigo-600 transition-colors flex items-center gap-1">
                  <span>National EBSB Portal (ebsb.gov.in)</span>
                </a>
              </li>
              <li>
                <a href="https://www.education.gov.in" target="_blank" rel="noreferrer" className="hover:text-indigo-600 transition-colors">
                  Ministry of Education, Govt. of India
                </a>
              </li>
              <li>
                <a href="https://www.iiti.ac.in" target="_blank" rel="noreferrer" className="hover:text-indigo-600 transition-colors">
                  IIT Indore Main Portal (www.iiti.ac.in)
                </a>
              </li>
              <li>
                <a href="https://swayam.gov.in" target="_blank" rel="noreferrer" className="hover:text-indigo-600 transition-colors">
                  Swayam / Bhasha Sangam Mobile App
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-medium">
          <div>
            © {new Date().getFullYear()} Ek Bharat Shreshtha Bharat Cell, Indian Institute of Technology Indore. All Rights Reserved.
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-600 font-semibold">
              Crafted with <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600" /> for National Unity
            </span>

            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-full bg-white/80 hover:bg-white text-indigo-950 border border-slate-200 shadow-sm transition-colors"
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
