import React from 'react';
import type { SupportResource } from '../types';
import ShareButton from './ShareButton';

interface SupportScreenProps {
  resources: SupportResource[];
  onBack: () => void;
}

const PhoneIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
);

const GlobeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h10a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.707 4.5l.523-1.046a1 1 0 011.742 0l.523 1.046m-2.788 0h2.788M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const SupportResourceCard: React.FC<{ resource: SupportResource }> = ({ resource }) => (
    <div className="bg-slate-800 rounded-lg p-5 border border-slate-700 flex flex-col h-full">
        <h3 className="text-xl font-bold text-teal-300">{resource.name}</h3>
        <p className="mt-2 text-slate-300 flex-grow">{resource.description}</p>
        <div className="mt-4 pt-4 border-t border-slate-700 flex items-center justify-start gap-3">
             <a href={`tel:${resource.phone.replace(/\s/g, '')}`} aria-label={`Call ${resource.name}`} className="p-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors">
                <PhoneIcon className="w-5 h-5" />
            </a>
             <a href={resource.website} target="_blank" rel="noopener noreferrer" aria-label={`Visit website for ${resource.name}`} className="p-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors">
                <GlobeIcon className="w-5 h-5" />
            </a>
            <ShareButton
                shareData={{
                    title: resource.name,
                    text: `I found this helpful UK support resource: ${resource.name}.`,
                    url: resource.website
                }}
                title={`Share ${resource.name}`}
            />
        </div>
    </div>
);

const SupportScreen: React.FC<SupportScreenProps> = ({ resources, onBack }) => {
    const immediateHelpNames = ['Samaritans', 'NHS Urgent Mental Health Helpline', 'National Suicide Prevention Helpline UK'];
    const immediateHelpResources = resources.filter(r => immediateHelpNames.includes(r.name));
    const otherResources = resources.filter(r => !immediateHelpNames.includes(r.name));

  return (
    <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
            <div className="flex justify-center items-center gap-4">
                <h2 className="text-3xl lg:text-4xl font-bold text-white">UK Support Services</h2>
                 <ShareButton
                    shareData={{
                        title: 'UK Support Services',
                        text: 'I found this helpful list of UK support services for addiction and mental health.',
                        url: `${window.location.origin}?view=support`
                    }}
                    title="Share this page"
                />
            </div>
            <p className="mt-2 text-lg text-slate-300">Confidential services that can provide support and guidance.</p>
        </div>

        <div className="bg-slate-800/50 p-6 rounded-lg border border-red-500/50 mb-10">
            <h3 className="text-2xl font-bold text-center text-red-400">Immediate, Confidential Help</h3>
            <p className="text-center mt-1 text-slate-300">If you are in distress, please contact one of these services now.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                {immediateHelpResources.map((res, index) => (
                    <div key={index} className="animate-card-enter" style={{ animationDelay: `${index * 50}ms` }}>
                        <SupportResourceCard resource={res} />
                    </div>
                ))}
            </div>
        </div>
        
         <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white">Addiction & Wellbeing Support</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherResources.map((res, index) => (
                 <div key={index} className="animate-card-enter" style={{ animationDelay: `${(immediateHelpResources.length + index) * 50}ms` }}>
                    <SupportResourceCard resource={res} />
                </div>
            ))}
        </div>

        <div className="text-center mt-12">
            <button onClick={onBack} className="bg-slate-700 text-white font-bold py-3 px-6 rounded-lg hover:bg-slate-600 transition-colors">
                &larr; Back
            </button>
        </div>
    </div>
  );
};

export default SupportScreen;