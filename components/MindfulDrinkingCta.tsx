import React from 'react';

interface MindfulDrinkingCtaProps {
    onShowMindfulDrinking: () => void;
}

const LeafIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2c.63 0 1.25.07 1.85.204M12 22v-4m0-16C17.523 2 22 6.477 22 12c0 2.24-.73 4.32-2.007 6.003" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a6 6 0 00-6 6c0 4.418 4.477 10 6 12 1.523-2 6-7.582 6-12a6 6 0 00-6-6z" />
    </svg>
);

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
