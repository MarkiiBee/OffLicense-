import React, { ErrorInfo, ReactNode } from 'react';
import { ErrorIcon } from './Icons';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  // Fix: Initialize state as a class property to correctly type the component state.
  // This resolves errors where `this.state` and `this.props` were not recognized.
  state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col min-h-screen bg-slate-900 text-gray-200 font-sans justify-center items-center p-4">
            <div className="max-w-md text-center">
                <ErrorIcon className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h1 className="text-4xl font-bold text-white mb-2">Oops! Something went wrong.</h1>
                <p className="text-slate-300 mb-6">
                    We've encountered an unexpected error. Please try refreshing the page. If the problem persists, please contact support.
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-all duration-200 transform hover:scale-105"
                >
                    Refresh Page
                </button>
            </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
