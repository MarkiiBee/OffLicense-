import React from 'react';
import { MoonIcon } from './Icons';

interface HeaderProps {
    onGoHome: () => void;
    onShowResources: () => void;
    onShowSupport: () => void;
    onShowContact: () => void;
}

const Header: React.FC<HeaderProps> = ({ onGoHome, onShowResources, onShowSupport, onShowContact }) => {
  return (
    <header className="bg-slate-900/70 backdrop-blur-lg border-b border-slate-700/50 sticky top-0 z-30 animate-fade-in">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <button onClick={onGoHome} className="flex items-center space-x-3 group" aria-label="Go to homepage">
          <MoonIcon className="w-8 h-8 text-indigo-400 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-15deg]"/>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Find Offlicence <span className="text-indigo-400">Near Me</span>
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
