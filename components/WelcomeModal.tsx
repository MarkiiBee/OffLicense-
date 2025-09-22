import React from 'react';

interface WelcomeModalProps {
    onDismiss: () => void;
}

const MoonIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
);

const WelcomeModal: React.FC<WelcomeModalProps> = ({ onDismiss }) => {
    return (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" role="dialog" aria-modal="true" aria-labelledby="welcome-title">
            <div className="bg-slate-800 border border-slate-700 rounded-xl max-w-lg w-full text-center shadow-2xl shadow-indigo-900/20 overflow-hidden">
                <div className="p-8">
                    <MoonIcon className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
                    <h2 id="welcome-title" className="text-3xl font-bold text-white">Welcome!</h2>
                    <p className="mt-4 text-slate-300">
                        This app helps you in two ways. You can find late-night shops and services, or get immediate, confidential access to help and support resources if you need them.
                    </p>
                    <p className="mt-2 text-slate-300">
                        Your choice, no judgment.
                    </p>
                </div>
                 <div className="p-4 bg-slate-900/20 border-t border-slate-700/50">
                    <button
                        onClick={onDismiss}
                        className="w-full bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-all duration-200 transform hover:scale-105"
                    >
                        Got It
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WelcomeModal;