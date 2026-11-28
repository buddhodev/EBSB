import React, { Component } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  declare props: Readonly<ErrorBoundaryProps>;
  declare setState: (state: Partial<ErrorBoundaryState>) => void;
  state: ErrorBoundaryState = {
    hasError: false,
    errorMessage: '',
  };

  constructor(props: ErrorBoundaryProps) {
    super(props);
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    let friendlyMessage = 'Something went wrong while loading this section of the EBSB portal.';
    try {
      const parsed = JSON.parse(error.message);
      if (parsed && typeof parsed.error === 'string') {
        if (
          parsed.error.toLowerCase().includes('permission') ||
          parsed.error.toLowerCase().includes('insufficient')
        ) {
          friendlyMessage =
            'Your session does not have permission to access this data. Please sign in with a verified Google account and try again.';
        } else {
          friendlyMessage = parsed.error;
        }
      }
    } catch {
      if (error.message) {
        friendlyMessage = error.message;
      }
    }

    return {
      hasError: true,
      errorMessage: friendlyMessage,
    };
  }

  componentDidCatch(error: Error, errorInfo: unknown) {
    console.error('Application ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, errorMessage: '' });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#f4f6f9] flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full overflow-hidden shadow-xl">
            <div className="h-1.5 w-full ebsb-tricolor-bar" />
            <div className="p-6 sm:p-8 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-orange-100 text-[#f26522] flex items-center justify-center mx-auto">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <h2 className="text-lg font-black text-[#163c6b]">Portal Recovery Notice</h2>
                <p className="text-xs text-slate-600 leading-relaxed">{this.state.errorMessage}</p>
              </div>
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={this.handleReset}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-md bg-[#f26522] hover:bg-[#dc4f12] text-white font-bold text-xs transition-colors shadow-sm"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Try Again</span>
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="px-5 py-2.5 rounded-md bg-slate-100 hover:bg-slate-200 text-[#163c6b] font-bold text-xs transition-colors border border-slate-200"
                >
                  Reload Portal
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
