import React from 'react';

interface HeaderProps {
    onGoHome: () => void;
    onShowResources: () => void;
    onShowSupport: () => void;
    onShowContact: () => void;
}

const MoonIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
);

const Header: React.FC<HeaderProps> = ({ onGoHome, onShowResources, onShowSupport, onShowContact }) => {
  return (
    <header className="bg-slate-900/70 backdrop-blur-lg border-b border-slate-700/50 sticky top-0 z-30 animate-fade-in">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <button onClick={onGoHome} className="flex items-center space-x-3 group" aria-label="Go to homepage">
          <MoonIcon className="w-8 h-8 text-indigo-400 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-15deg]"/>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Off Licence <span className="text-indigo-400">Near Me</span>
          </h1>
        </button>
        <nav className="hidden md:flex items-center space-x-6">
            <button onClick={onShowResources} className="text-sm font-medium text-slate-300 hover:text-indigo-400 transition-colors">Resources</button>
            <button onClick={onShowSupport} className="text-sm font-medium text-slate-300 hover:text-indigo-400 transition-colors">Support</button>
            <button onClick={onShowContact} className="text-sm font-medium text-slate-300 hover:text-indigo-400 transition-colors">Contact Us</button>
        </nav>
      </div>
    </header>
  );
};

export default Header;