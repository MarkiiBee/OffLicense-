import React from 'react';

interface PrivacyScreenProps {
  onBack: () => void;
}

const PrivacyScreen: React.FC<PrivacyScreenProps> = ({ onBack }) => {
  return (
    <div className="max-w-3xl mx-auto text-slate-300">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-extrabold text-white sm:text-5xl">
          Privacy Policy
        </h2>
        <p className="mt-4 text-lg">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <div className="bg-slate-800/50 rounded-lg p-6 md:p-8 space-y-6 border border-slate-700">
        <p>
          Your privacy is important to us. This policy explains what information we collect and how we use it. We've designed the app to be as private as possible.
        </p>
        
        <h3 className="text-xl font-bold text-indigo-400">Information We Collect</h3>
        <ul className="list-disc list-inside space-y-2 pl-4">
            <li>
                <strong>Location Information:</strong> The locations you manually type into the search bar, or your device's coordinates if you grant permission, are used *only* to construct a search query. This information is sent directly to third-party services (like Google Maps) when you perform a search. We do not store, log, or have access to this information on our servers.
            </li>
            <li>
                <strong>Mindful Drinking Hub Data:</strong> All data you enter into the Mindful Drinking Hub (such as your drink log and settings) is stored *only* on your device using your browser's local storage. We cannot see or access this data. It remains on your device until you clear your browser data.
            </li>
        </ul>

        <h3 className="text-xl font-bold text-indigo-400">Data from Third-Party Services</h3>
        <p>
            When you perform a search, our app helps you access data from Google services by opening Google Maps in a new tab. This includes business names, addresses, opening hours, and other details. Your interaction with Google Maps is governed by Google's own privacy policy.
        </p>
        
        <h3 className="text-xl font-bold text-indigo-400">How We Use Information</h3>
        <p>
            The limited information processed by the app is used solely to provide and improve the service's core functionality (finding local services and offering private mindfulness tools).
        </p>

        <h3 className="text-xl font-bold text-indigo-400">Information Sharing</h3>
        <p>
          We do not sell, trade, or otherwise transfer your personal information to outside parties. Your search queries and location data are handled as described above to maintain your privacy.
        </p>

        <h3 className="text-xl font-bold text-indigo-400">Your Consent</h3>
        <p>
          By using our app, you consent to our privacy policy.
        </p>

         <h3 className="text-xl font-bold text-indigo-400">Contacting Us</h3>
        <p>
          If you have any questions regarding this privacy policy, you may contact us using the information on our Contact page.
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

export default PrivacyScreen;