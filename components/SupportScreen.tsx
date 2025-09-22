
import React, { useState, useMemo } from 'react';
import type { SupportResource } from '../types';
import ShareButton from './ShareButton';
import SupportChat from './SupportChat';
import { PhoneIcon, GlobeIcon, ChatBubbleIcon } from './Icons';
import { createChatService } from '../services/aiService';
import { getSupportResources } from '../services/contentService';

interface SupportScreenProps {
  onBack: () => void;
}

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

const SupportScreen: React.FC<SupportScreenProps> = ({ onBack }) => {
    const [isChatVisible, setIsChatVisible] = useState(false);
    const resources = getSupportResources();
    
    // Create the chat service instance only when needed, and memoize it.
    const chat = useMemo(() => {
        try {
            return createChatService();
        } catch (error) {
            console.error("Failed to create chat service:", error);
            return null;
        }
    }, []);

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

        {chat && (
            <div className="bg-slate-800/50 p-6 rounded-lg border border-teal-500/50 mb-10 text-center">
                <h3 className="text-2xl font-bold text-center text-teal-300 flex items-center justify-center gap-2">
                    <ChatBubbleIcon className="w-7 h-7" />
                    Beacon Assistant
                </h3>
                <p className="mt-2 text-slate-300">Your confidential AI guide for in-the-moment support. Available 24/7.</p>
                
                {isChatVisible ? (
                    <SupportChat chat={chat} />
                ) : (
                    <button 
                        onClick={() => setIsChatVisible(true)}
                        className="mt-4 bg-teal-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-teal-600 transition-all duration-200 transform hover:scale-105"
                    >
                        Start Chat
                    </button>
                )}
            </div>
        )}

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
