
import React, { useState, useEffect } from 'react';

interface ContactScreenProps {
  onBack: () => void;
  onShowSupport: () => void;
  onShowPrivacy: () => void;
  prefill?: { category?: string; message?: string } | null;
}

const categoryTemplates: { [key: string]: string } = {
  suggestion: 'Hi, I have a suggestion to improve the app:\n\n',
  bug_report: 'Hi, I encountered an error.\n\nSteps to reproduce:\n\nWhat happened:\n\nWhat I expected to happen:\n',
  business_inquiry: 'Hi, I\'m a business owner and I\'d like to learn more about claiming or updating my listing.\n\nBusiness Name:\nLocation:\n',
  general_feedback: 'Hi, I\'d like to share some general feedback:\n\n',
  question: 'Hi, I have a question about the app:\n\n',
  designer_contact: 'Hi Mark,\n\nI\'m getting in touch via the link in the app footer. I\'d like to talk about...\n\n'
};

const ContactScreen: React.FC<ContactScreenProps> = ({ onBack, onShowSupport, onShowPrivacy, prefill }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'submitted' | 'error'>('idle');

  useEffect(() => {
    if (prefill) {
      const prefillCategory = prefill.category || '';
      setCategory(prefillCategory);
      // If a specific message is passed (like from error reporting), use it.
      // Otherwise, populate from the template based on category.
      setMessage(prefill.message || categoryTemplates[prefillCategory] || '');
    }
  }, [prefill]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value;
    setCategory(newCategory);
    // When user manually changes category, update the message to the template
    setMessage(categoryTemplates[newCategory] || '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message || !category) {
        alert('Please fill out all fields, including the feedback category.');
        return;
    }
    setStatus('sending');
    
    // Simulate API call for skeleton app
    console.log("Form submitted (simulation):", { name, email, category, message });
    setTimeout(() => {
      setStatus('submitted');
    }, 1000);
  };

  if (status === 'submitted') {
    return (
        <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-teal-300">Thank You!</h2>
            <p className="mt-4 text-lg text-slate-300">
                Your message has been sent. We appreciate your feedback.
            </p>
            <button onClick={onBack} className="mt-8 bg-slate-700 text-white font-bold py-3 px-6 rounded-lg hover:bg-slate-600 transition-colors">
                &larr; Back
            </button>
        </div>
    );
  }
  
   if (status === 'error') {
    return (
        <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-red-400">Something Went Wrong</h2>
            <p className="mt-4 text-lg text-slate-300">
                We couldn't send your message. Please try again later.
            </p>
            <button onClick={() => setStatus('idle')} className="mt-8 bg-slate-700 text-white font-bold py-3 px-6 rounded-lg hover:bg-slate-600 transition-colors">
                Try Again
            </button>
        </div>
    );
  }


  return (
    <div className="max-w-2xl lg:max-w-3xl mx-auto">
      <div className="text-center">
        <h2 className="text-4xl font-extrabold text-white sm:text-5xl">
          Feedback & Contact
        </h2>
        <p className="mt-4 text-lg text-slate-300">
          We value your input! Whether you have a suggestion, found a bug, or just want to say hello, use the form below.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Name</label>
            <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                className="w-full bg-slate-800 border border-slate-600 text-white rounded-lg py-3 px-4 focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder-slate-400 disabled:opacity-50"
                required
                disabled={status === 'sending'}
            />
        </div>
        <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Email</label>
            <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-slate-800 border border-slate-600 text-white rounded-lg py-3 px-4 focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder-slate-400 disabled:opacity-50"
                required
                disabled={status === 'sending'}
            />
        </div>
        <div>
            <label htmlFor="category" className="block text-sm font-medium text-slate-300 mb-2">Category</label>
            <select
                id="category"
                value={category}
                onChange={handleCategoryChange}
                className="w-full bg-slate-800 border border-slate-600 text-white rounded-lg py-3 px-4 focus:ring-2 focus:ring-indigo-500 focus:outline-none disabled:opacity-50 appearance-none bg-no-repeat"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2394a3b8' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 0.75rem center',
                    backgroundSize: '1.5em 1.5em',
                }}
                required
                disabled={status === 'sending'}
            >
                <option value="" disabled>Select a category...</option>
                <option value="suggestion">Suggestion</option>
                <option value="bug_report">Bug Report</option>
                <option value="business_inquiry">Business Inquiry</option>
                <option value="general_feedback">General Feedback</option>
                <option value="question">Question</option>
                <option value="designer_contact">Contact Designer</option>
            </select>
        </div>
         <div>
            <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">Message</label>
            <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Please provide as much detail as possible..."
                rows={5}
                className="w-full bg-slate-800 border border-slate-600 text-white rounded-lg py-3 px-4 focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder-slate-400 disabled:opacity-50"
                required
                disabled={status === 'sending'}
            ></textarea>
        </div>
        <div className="flex items-center justify-between gap-4">
             <button
                type="button"
                onClick={onBack}
                className="bg-slate-700 text-white font-bold py-3 px-6 rounded-lg hover:bg-slate-600 transition-colors disabled:opacity-50"
                disabled={status === 'sending'}
                >
                &larr; Back
            </button>
            <button
                type="submit"
                className="flex-grow bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-all duration-200 transform hover:scale-105 disabled:bg-indigo-800 disabled:scale-100 disabled:cursor-not-allowed"
                disabled={status === 'sending'}
            >
                {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
        </div>
      </form>
      
      <p className="mt-6 text-xs text-slate-500 text-center">
          For urgent support, please visit our <button onClick={onShowSupport} className="underline text-slate-400 hover:text-indigo-400">Support page</button>. This form is for general feedback only and is not monitored 24/7. By submitting, you agree to our <button onClick={onShowPrivacy} className="underline text-slate-400 hover:text-indigo-400">Privacy Policy</button>.
      </p>
    </div>
  );
};

export default ContactScreen;
