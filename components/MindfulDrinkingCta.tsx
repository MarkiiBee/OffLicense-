import React from 'react';
import { LeafIcon } from './Icons';

interface MindfulDrinkingCtaProps {
    onShowMindfulDrinking: () => void;
}

const MindfulDrinkingCta: React.FC<MindfulDrinkingCtaProps> = ({ onShowMindfulDrinking }) => {
    return (
        <div className="bg-slate-800/50 p-6 rounded-lg border border-teal-500/50">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                <LeafIcon className="w-12 h-12 text-teal-300 flex-shrink-0" />
                <div>
                    <h3 className="text-xl font-bold text-teal-300">Explore the Mindful Drinking Hub</h3>
                    <p className="text-slate-300 mt-2">Discover resources, take a private quiz, and learn strategies to build a healthier relationship with alcohol.</p>
                </div>
                <button
                    onClick={onShowMindfulDrinking}
                    className="flex-shrink-0 w-full md:w-auto bg-teal-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-teal-600 transition-all duration-200 transform hover:scale-105"
                >
                    Learn More
                </button>
            </div>
        </div>
    );
};

export default MindfulDrinkingCta;
