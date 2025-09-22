import React, { useState } from 'react';
import { EnvelopeIcon } from './Icons';

const NewsletterSignup: React.FC = () => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email.trim()) {
            console.log('Newsletter signup:', email);
            setIsSubmitted(true);
        }
    };

    if (isSubmitted) {
        return (
            <div className="text-center bg-slate-800/50 p-6 rounded-lg border border-teal-500/50">
                <h3 className="text-xl font-bold text-teal-300">Thank you for subscribing!</h3>
                <p className="mt-2 text-slate-300">We'll keep you updated with the latest news and features.</p>
            </div>
        );
    }

    return (
        <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex-shrink-0 text-center md:text-left">
                    <h3 className="text-xl font-bold text-white">Stay Updated</h3>
                    <p className="text-slate-400 text-sm mt-1">Join our newsletter for updates and exclusive content.</p>
                </div>
                <form onSubmit={handleSubmit} className="w-full md:max-w-md flex-grow">
                    <div className="flex items-center gap-2">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                            className="w-full bg-slate-800 border border-slate-600 text-white rounded-md py-2.5 px-4 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder-slate-400"
                        />
                        <button
                            type="submit"
                            title="Subscribe"
                            className="flex-shrink-0 bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-colors"
                        >
                            <EnvelopeIcon className="w-5 h-5" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewsletterSignup;
