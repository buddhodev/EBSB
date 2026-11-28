import React from 'react';
import { ArrowLeft, Home, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface PageHeaderBreadcrumbProps {
  pageTitle: string;
  categoryLabel?: string;
  onGoHome: () => void;
}

export const PageHeaderBreadcrumb: React.FC<PageHeaderBreadcrumbProps> = ({
  pageTitle,
  categoryLabel,
  onGoHome,
}) => {
  const { t } = useLanguage();
  const resolvedCategory = categoryLabel || t.breadcrumb.portalPage;

  return (
    <div className="bg-[#f8f9fb] border-b border-slate-200 py-3.5 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2 font-medium">
          <button
            onClick={onGoHome}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white hover:border-[#f26522] text-[#163c6b] font-bold border border-slate-200 shadow-xs transition-colors"
          >
            <Home className="w-3.5 h-3.5 text-[#f26522]" />
            <span>{t.breadcrumb.home}</span>
          </button>
          
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          
          <span className="text-slate-500 font-semibold">{resolvedCategory}</span>
          
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />

          <span className="font-extrabold text-[#163c6b] truncate max-w-[200px] sm:max-w-none">
            {pageTitle}
          </span>
        </div>

        <button
          onClick={onGoHome}
          className="hidden sm:flex items-center gap-1.5 text-[#f26522] hover:text-[#dc4f12] font-bold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.breadcrumb.returnHome}</span>
        </button>
      </div>
    </div>
  );
};
