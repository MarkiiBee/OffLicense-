import React, { useState, useRef, useEffect } from 'react';
import type { Chat, ChatMessage } from '../types';

interface SupportChatProps {
    chat: Chat;
}

const SendIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.949a.75.75 0 00.95.54l3.172-1.269a.75.75 0 01.956.956l-1.269 3.172a.75.75 0 00.54.95l4.949 1.414a.75.75 0 00.95-.826l-1.414-4.949a.75.75 0 00-.54-.95l-3.172 1.269a.75.75 0 01-.956-.956l1.269-3.172a.75.75 0 00-.54-.95L3.105 2.289z" />
    </svg>
);

const SELF_HARM_KEYWORDS = ['suicide', 'kill myself', 'want to die', 'end my life', 'self harm', 'self-harm', 'hurting myself'];


// This function finds phone numbers in text and wraps them in clickable links.
// FIX: Changed JSX.Element to React.ReactElement to resolve "Cannot find namespace 'JSX'".
// This uses an explicitly imported type from React, making it more robust.
const formatMessageText = (text: string): (string | React.ReactElement)[] => {
    // Regex to find UK phone numbers, including special numbers like 111 and 116 123
    const phoneRegex = /(\b(?:0[1-9]\d{1,2}[ -]?\d{3}[ -]?\d{3,4}|111|116[ -]?123|999)\b)/g;
    const parts = text.split(phoneRegex);

    return parts.map((part, index) => {
        if (phoneRegex.test(part)) {
            const telLink = `tel:${part.replace(/\s|-/g, '')}`;
            return (
                <a href={telLink} key={index} className="text-indigo-400 underline hover:text-indigo-300">
                    {part}
                </a>
            );
        }
        return part;
    });
};


const SupportChat: React.FC<SupportChatProps> = ({ chat }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedInput = input.trim();
        if (!trimmedInput || isLoading) return;

        // Client-side safety check
        const containsKeyword = SELF_HARM_KEYWORDS.some(keyword => trimmedInput.toLowerCase().includes(keyword));
        const userMessage: ChatMessage = { role: 'user', text: trimmedInput };

        if (containsKeyword) {
            const safetyMessage: ChatMessage = {
                role: 'model',
                text: "It sounds like you are in immediate distress. Please call 999 or the Samaritans on 116 123 right now. They are available 24/7 to provide the urgent help you need."
            };
            setMessages(prev => [...prev, userMessage, safetyMessage]);
            setInput('');
            return; // Stop before calling the API
        }

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);
        setError(null);

        try {
            const stream = await chat.sendMessageStream({ message: trimmedInput });
            
            let modelResponse = '';
            setMessages(prev => [...prev, { role: 'model', text: '...' }]);

            for await (const chunk of stream) {
                modelResponse += chunk.text;
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1] = { role: 'model', text: modelResponse };
                    return newMessages;
                });
            }
        } catch (err) {
            console.error("Chat error:", err);
            setError("Sorry, I'm having trouble connecting right now. Please try again later.");
             setMessages(prev => prev.slice(0, -2)); // Remove user message and the "..." placeholder
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="mt-4 border-t border-teal-500/50 pt-4">
            <div className="bg-slate-900/70 rounded-lg p-4 max-h-80 overflow-y-auto space-y-4">
                {messages.length === 0 && (
                    <div className="text-center text-slate-400 p-4">
                        <p>You can ask things like:</p>
                        <p className="font-medium mt-1">"I feel an urge to drink, what can I do?"</p>
                    </div>
                )}
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs md:max-w-md rounded-xl px-4 py-2 ${msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-200'}`}>
                            <p className="whitespace-pre-wrap">
                                {msg.role === 'model' ? formatMessageText(msg.text) : msg.text}
                            </p>
                        </div>
                    </div>
                ))}
                {error && <div className="text-center text-red-400 p-2">{error}</div>}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSubmit} className="mt-4 flex items-center gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask for guidance..."
                    disabled={isLoading}
                    className="flex-grow bg-slate-800 border border-slate-600 text-white rounded-lg py-2 px-4 focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder-slate-400 disabled:opacity-50"
                />
                <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="bg-indigo-600 text-white p-2.5 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
                >
                   <SendIcon className="w-5 h-5" />
                </button>
            </form>
        </div>
    );
};

export default SupportChat;
