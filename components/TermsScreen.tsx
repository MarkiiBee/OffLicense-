import React from 'react';

interface TermsScreenProps {
  onBack: () => void;
}

const TermsScreen: React.FC<TermsScreenProps> = ({ onBack }) => {
  return (
    <div className="max-w-3xl mx-auto text-slate-300">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-extrabold text-white sm:text-5xl">
          Terms & Conditions
        </h2>
        <p className="mt-4 text-lg">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <div className="bg-slate-800/50 rounded-lg p-6 md:p-8 space-y-6 border border-slate-700">
        <p>
          Welcome to Find Offlicence Near Me. By using this application ("app"), you agree to be bound by these Terms and Conditions. Please read them carefully.
        </p>
        
        <h3 className="text-xl font-bold text-indigo-400">1. Service Description</h3>
        <p>
          This app provides a search tool to find local services and offers access to informational resources and support contacts related to mindful drinking and mental health.
        </p>

        <h3 className="text-xl font-bold text-indigo-400">2. Third-Party Links & Content</h3>
        <p>
          Our app provides links to third-party websites and services, such as Google Maps for search results and various support organizations. We do not control and are not responsible for the content, accuracy, privacy policies, or practices of any third-party services. Information such as business opening hours, locations, and availability is provided by these third parties and we cannot guarantee its accuracy.
        </p>

        <h3 className="text-xl font-bold text-red-400">3. Health & Medical Disclaimer</h3>
        <p className="font-medium">
          All content provided in this app, including articles, quiz results, and information in the Mindful Drinking Hub, is for informational purposes only. It is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read in this app.
        </p>
        
        <h3 className="text-xl font-bold text-indigo-400">4. Intellectual Property Rights</h3>
        <p>
          The app and its original content (excluding data from third-parties), features, and functionality are and will remain the exclusive property of Find Offlicence Near Me and its licensors. The app is protected by copyright, trademark, and other laws of both the United Kingdom and foreign countries.
        </p>
        
        <h3 className="text-xl font-bold text-indigo-400">5. Limitation of Liability</h3>
        <p>
          In no event shall Find Offlicence Near Me, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the app.
        </p>

        <h3 className="text-xl font-bold text-indigo-400">6. Changes to Terms</h3>
        <p>
          We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms and Conditions on this page.
        </p>

         <h3 className="text-xl font-bold text-indigo-400">7. Contacting Us</h3>
        <p>
          If you have any questions about these Terms, please contact us using the information on our Contact page.
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

export default TermsScreen;