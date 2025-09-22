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
          Your privacy is important to us. This policy explains what information we collect and how we use it.
        </p>
        
        <h3 className="text-xl font-bold text-indigo-400">Information We Collect</h3>
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>
            <strong>Search Queries:</strong> The locations you manually type into the search bar are sent to our backend to find results. We do not link these searches to any personal information.
          </li>
          <li>
            <strong>Saved Locations:</strong> If you use the "Save" feature, the information for those shops is stored directly on your device using your browser's local storage. We do not have access to this information. It remains on your device until you clear it.
          </li>
        </ul>

        <h3 className="text-xl font-bold text-indigo-400">Data from Third-Party Services</h3>
        <p>
            To provide accurate results, our application uses data from Google services. This includes shop names, addresses, opening hours, ratings, and photos. Your search query is used to fetch this information.
        </p>
        
        <h3 className="text-xl font-bold text-indigo-400">How We Use Information</h3>
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>To provide and improve the service's core functionality (finding shops).</li>
          <li>To ensure the app functions correctly and to diagnose technical issues.</li>
        </ul>

        <h3 className="text-xl font-bold text-indigo-400">Information Sharing</h3>
        <p>
          We do not sell, trade, or otherwise transfer your personal information to outside parties. Your search queries and location data are processed anonymously.
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
