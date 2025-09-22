
import React from 'react';
import { View } from '../types';
import { SearchIcon, BookOpenIcon, HeartIcon } from './Icons';

interface BottomNavProps {
    currentView: View;
    navigateTo: (view: View) => void;
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

const BottomNav: React.FC<BottomNavProps> = ({ currentView, navigateTo }) => {
    const isSearchActive = currentView === View.SEARCH;
    const isResourcesActive = [View.RESOURCES, View.ARTICLE, View.MINDFUL_DRINKING, View.QUIZ].includes(currentView);

    return (
        <nav className="fixed bottom-0 left-0 right-0 h-16 bg-slate-800/80 backdrop-blur-lg border-t border-slate-700 flex justify-around items-stretch md:hidden z-20">
            <NavItem 
                label="Search" 
                icon={<SearchIcon className="w-6 h-6" />}
                isActive={isSearchActive} 
                onClick={() => navigateTo(View.SEARCH)}
            />
             <NavItem 
                label="Resources" 
                icon={<BookOpenIcon className="w-6 h-6" />}
                isActive={isResourcesActive} 
                onClick={() => navigateTo(View.RESOURCES)}
            />
            <NavItem 
                label="Support" 
                icon={<HeartIcon className="w-6 h-6" />}
                isActive={currentView === View.SUPPORT} 
                onClick={() => navigateTo(View.SUPPORT)}
            />
        </nav>
    );
};

export default BottomNav;
