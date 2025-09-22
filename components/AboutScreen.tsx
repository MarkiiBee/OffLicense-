import React from 'react';

interface AboutScreenProps {
  onBack: () => void;
}

const AboutScreen: React.FC<AboutScreenProps> = ({ onBack }) => {
  return (
    <div className="max-w-3xl mx-auto text-slate-300">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-extrabold text-white sm:text-5xl">
          Our Mission
        </h2>
        <p className="mt-4 text-lg">
          Providing a choice when you need it most.
        </p>
      </div>

      <div className="bg-slate-800/50 rounded-lg p-6 md:p-8 space-y-6 border border-slate-700">
        <h3 className="text-2xl font-bold text-indigo-400">Why We Exist</h3>
        <p>
          Life can be complicated. Whether you're looking for an open shop, a meal after a long day, or a last-minute travel booking, finding what you need can be a challenge. We created this app to be your reliable assistant for those moments, offering a clear and simple way to find solutions, 24/7.
        </p>
        <p>
          We also understand that these searches can sometimes happen during moments of vulnerability. Our goal is to meet you where you are, without judgment. That's why we've integrated immediate, confidential access to support resources directly into the app, acknowledging that sometimes, the best choice is a different path.
        </p>
        
        <h3 className="text-2xl font-bold text-indigo-400">Two Paths, One App</h3>
        <p>
          <strong>1. Find What You Need:</strong> A straightforward, powerful search hub to help you find services open now, including:
          <ul className="list-disc list-inside mt-2 pl-4 space-y-1">
            <li>Off-licences and convenience stores</li>
            <li>Food delivery to your door</li>
            <li>Nearby ATMs and cashpoints</li>
            <li>Last-minute hotel and flight bookings</li>
            <li>On-demand rides</li>
          </ul>
        </p>
        <p>
          <strong>2. Find Support:</strong> A discreet, one-click option to connect with professional, confidential help for addiction and mental health. This is for anyone who might be looking for an alternative.
        </p>

        <p className="font-medium text-white">
          No matter your reason for being here, we're committed to providing a safe, reliable, and helpful experience.
        </p>
      </div>

      <div className="text-center mt-12">
        <button onClick={onBack} className="bg-slate-700 text-white font-bold py-3 px-6 rounded-lg hover:bg-slate-600 transition-colors">
            &larr; Back
        </button>
      </div>
    </div>
  );
};

export default AboutScreen;