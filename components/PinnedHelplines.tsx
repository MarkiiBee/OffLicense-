
import React from 'react';

interface PinnedHelplinesProps {
    onShowSupport: () => void;
    onShowSupportChat: () => void;
}

const PhoneIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
);

const ChatBubbleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm6.39-2.61a.75.75 0 00-1.08.022l-1.06 1.06a.75.75 0 00.022 1.08l2.12 2.12a.75.75 0 001.08-.022l1.06-1.06a.75.75 0 00-.022-1.08L8.39 7.39zm5.22 0a.75.75 0 00-1.08.022l-1.06 1.06a.75.75 0 00.022 1.08l2.12 2.12a.75.75 0 001.08-.022l1.06-1.06a.75.75 0 00-.022-1.08l-2.12-2.12z" clipRule="evenodd" />
  </svg>
);


const PinnedHelplines: React.FC<PinnedHelplinesProps> = ({ onShowSupport, onShowSupportChat }) => {
    const helplines = [
        { 
            name: 'Samaritans', 
            phone: '116 123', 
            description: 'For anyone struggling to cope, who needs someone to listen without judgement or pressure.',
            bgColor: 'bg-teal-600/80',
            hoverColor: 'hover:bg-teal-600'
        },
        { 
            name: 'NHS Urgent Mental Health', 
            phone: '111', 
            description: 'For urgent medical help or advice that is not a life-threatening situation.',
            bgColor: 'bg-sky-600/80',
            hoverColor: 'hover:bg-sky-600'
        },
        { 
            name: 'Drinkline', 
            phone: '0300 123 1110', 
            description: 'A free, confidential helpline for people who are concerned about their drinking.',
            bgColor: 'bg-fuchsia-600/80',
            hoverColor: 'hover:bg-fuchsia-600'
        },
    ];

    return (
        <div className="text-center">
            <h2 className="text-4xl font-extrabold text-white sm:text-5xl">Looking for help tonight?</h2>
            <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">These services are free, confidential, and available to talk right now.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto mt-8">
                {helplines.map(line => (
                    <div key={line.name} className={`p-4 rounded-lg border border-slate-700 bg-slate-800 text-center flex flex-col justify-between`}>
                        <div>
                            <h4 className="font-bold text-white text-lg">{line.name}</h4>
                            <p className="text-slate-400 text-xs mt-1">{line.description}</p>
                        </div>
                        <a 
                            href={`tel:${line.phone.replace(/\s/g, '')}`} 
                            className={`mt-4 w-full flex items-center justify-center gap-2 ${line.bgColor} text-white font-bold py-3 px-4 rounded-md ${line.hoverColor} transition-all duration-200 transform hover:scale-105`}
                        >
                            <PhoneIcon className="w-5 h-5" />
                            Call {line.phone}
                        </a>
                    </div>
                ))}
            </div>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button 
                    onClick={onShowSupportChat} 
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-teal-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-teal-600 transition-all duration-200 transform hover:scale-105"
                >
                    <ChatBubbleIcon className="w-5 h-5" />
                    Speak to Beacon Assistant
                </button>
                <button 
                    onClick={onShowSupport} 
                    className="text-sm text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
                >
                    See All Support Resources &rarr;
                </button>
            </div>
        </div>
    );
};

export default PinnedHelplines;
