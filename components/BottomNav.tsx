import React from 'react';
import { View } from '../types';

interface BottomNavProps {
    currentView: View;
    setView: (view: View) => void;
}

const NavItem: React.FC<{
    label: string;
    icon: React.ReactNode;
    isActive: boolean;
    onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`flex flex-col items-center justify-center w-full pt-2 pb-1 transition-colors duration-200 relative ${isActive ? 'text-indigo-400' : 'text-slate-400 hover:text-white'}`}
        aria-current={isActive ? 'page' : undefined}
    >
        <div className="relative p-1">
            <div className={`absolute inset-0 rounded-full transition-all duration-200 ${isActive ? 'bg-indigo-500/20 scale-100' : 'scale-0'}`}></div>
            <div className="relative">
                 {icon}
            </div>
        </div>
        <span className={`text-xs mt-0.5 ${isActive ? 'font-bold' : 'font-medium'}`}>{label}</span>
    </button>
);

const SearchIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const BookOpenIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
);

const HeartIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
);


const BottomNav: React.FC<BottomNavProps> = ({ currentView, setView }) => {
    const isSearchActive = currentView === View.SEARCH;
    const isResourcesActive = [View.RESOURCES, View.ARTICLE, View.MINDFUL_DRINKING, View.QUIZ].includes(currentView);

    return (
        <nav className="fixed bottom-0 left-0 right-0 h-16 bg-slate-800/80 backdrop-blur-lg border-t border-slate-700 flex justify-around items-stretch md:hidden z-20">
            <NavItem 
                label="Search" 
                icon={<SearchIcon className="w-6 h-6" />}
                isActive={isSearchActive} 
                onClick={() => setView(View.SEARCH)}
            />
             <NavItem 
                label="Resources" 
                icon={<BookOpenIcon className="w-6 h-6" />}
                isActive={isResourcesActive} 
                onClick={() => setView(View.RESOURCES)}
            />
            <NavItem 
                label="Support" 
                icon={<HeartIcon className="w-6 h-6" />}
                isActive={currentView === View.SUPPORT} 
                onClick={() => setView(View.SUPPORT)}
            />
        </nav>
    );
};

export default BottomNav;