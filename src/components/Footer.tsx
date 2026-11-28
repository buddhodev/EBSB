import React from 'react';
import { ArrowUp, Shield, ExternalLink } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
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
                <h3 className="text-base font-black text-white">{t.footer.portalTitle}</h3>
                <p className="text-[11px] text-[#ff9933] font-extrabold">{t.footer.cellSubtitle}</p>
              </div>
            </div>

            <p className="text-slate-300 font-medium text-xs leading-relaxed max-w-sm">
              {t.footer.description}
            </p>

            <div className="flex items-center gap-2 text-[11px] text-slate-300 font-semibold pt-2">
              <Shield className="w-3.5 h-3.5 text-[#3bb96c]" />
              <span>{t.footer.wcagNote}</span>
            </div>

            {/* Official Digital India Initiative Badge */}
            <div className="pt-2">
              <a
                href="https://www.digitalindia.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Digital India Initiative - Visit official Digital India portal (opens in a new tab)"
                className="inline-flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-white hover:bg-[#fff9f4] border border-slate-200 hover:border-[#f26522] shadow-md transition-all group"
              >
                {/* Digital India Tricolor Geometric Emblem */}
                <span className="w-9 h-9 rounded-lg bg-[#f4f6f9] border border-slate-200 flex items-center justify-center shrink-0">
                  <svg
                    viewBox="0 0 36 36"
                    className="w-7 h-7"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <rect x="4" y="6" width="28" height="4" rx="2" fill="#f26522" />
                    <rect x="4" y="26" width="28" height="4" rx="2" fill="#138808" />
                    <circle cx="18" cy="18" r="6" stroke="#163c6b" strokeWidth="2.2" />
                    <circle cx="18" cy="18" r="2" fill="#163c6b" />
                    <path
                      d="M18 12V14M18 22V24M12 18H14M22 18H24M13.8 13.8L15.2 15.2M20.8 20.8L22.2 22.2M22.2 13.8L20.8 15.2M15.2 20.8L13.8 22.2"
                      stroke="#163c6b"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>

                <span className="text-left leading-tight">
                  <span className="block text-xs font-black text-[#163c6b] group-hover:text-[#f26522] transition-colors">
                    {t.footer.digitalIndiaTitle}
                  </span>
                  <span className="block text-[10px] font-semibold text-slate-600 mt-0.5">
                    {t.footer.digitalIndiaSubtitle}
                  </span>
                </span>

                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#f26522] transition-colors shrink-0 ml-1" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-2.5">
            <h4 className="text-xs font-black text-[#ff9933] uppercase tracking-wider border-b border-slate-700 pb-2">
              {t.footer.quickLinksHeading}
            </h4>
            <ul className="space-y-2 text-slate-300 font-medium">
              <li><a href="#about" className="hover:text-[#ff9933] transition-colors">{t.footer.quickLinks.about}</a></li>
              <li><a href="#paired-states" className="hover:text-[#ff9933] transition-colors">{t.footer.quickLinks.pairedStates}</a></li>
              <li><a href="#events" className="hover:text-[#ff9933] transition-colors">{t.footer.quickLinks.events}</a></li>
              <li><a href="#bhasha-sangam" className="hover:text-[#ff9933] transition-colors">{t.footer.quickLinks.bhashaSangam}</a></li>
              <li><a href="#gallery" className="hover:text-[#ff9933] transition-colors">{t.footer.quickLinks.gallery}</a></li>
            </ul>
          </div>

          {/* Important Links */}
          <div className="md:col-span-4 space-y-2.5">
            <h4 className="text-xs font-black text-[#ff9933] uppercase tracking-wider border-b border-slate-700 pb-2">
              {t.footer.importantLinksHeading}
            </h4>
            <ul className="space-y-2 text-slate-300 font-medium">
              <li>
                <a
                  href="https://www.iiti.ac.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#ff9933] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>IIT Indore</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://ekbharat.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#ff9933] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>EkBharat.gov.in</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://swachhbharatmission.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#ff9933] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>SwachhBharatMission.gov.in</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://unnatbharatabhiyan.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#ff9933] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>UnnatBharatAbhiyan.gov.in</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
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
            {t.footer.copyrightPrefix} {new Date().getFullYear()} {t.footer.copyrightSuffix}
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-4">
            <span className="text-slate-200 font-semibold text-center sm:text-right">
              {t.footer.designedBy} <span className="text-[#ff9933]">Sri Buddhodev Ghosh (PhD, CRDT)</span>
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
