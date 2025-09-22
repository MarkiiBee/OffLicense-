import React, { useState } from 'react';

const EnvelopeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
);


const NewsletterSignup: React.FC = () => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email.trim()) {
            // In a real app, you would send this to your email service
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