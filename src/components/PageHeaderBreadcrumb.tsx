import React from 'react';
import { ArrowLeft, Home, ChevronRight } from 'lucide-react';

interface PageHeaderBreadcrumbProps {
  pageTitle: string;
  categoryLabel?: string;
  onGoHome: () => void;
}

export const PageHeaderBreadcrumb: React.FC<PageHeaderBreadcrumbProps> = ({
  pageTitle,
  categoryLabel = 'EBSB Portal Page',
  onGoHome,
}) => {
  return (
    <div className="bg-white/40 backdrop-blur-md border-b border-white/50 py-3.5 px-4 sm:px-8 shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2 font-medium">
          <button
            onClick={onGoHome}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 hover:bg-white text-indigo-950 font-bold border border-slate-200 shadow-xs transition-colors"
          >
            <Home className="w-3.5 h-3.5 text-indigo-600" />
            <span>Home</span>
          </button>
          
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          
          <span className="text-slate-500 font-semibold">{categoryLabel}</span>
          
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />

          <span className="font-extrabold text-indigo-950 truncate max-w-[200px] sm:max-w-none">
            {pageTitle}
          </span>
        </div>

        <button
          onClick={onGoHome}
          className="hidden sm:flex items-center gap-1.5 text-indigo-600 hover:text-indigo-800 font-bold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Homepage</span>
        </button>
      </div>
    </div>
  );
};
