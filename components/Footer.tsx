
import React from 'react';

interface FooterProps {
    onShowAbout: () => void;
    onShowPrivacy: () => void;
    onShowTerms: () => void;
    onShowContact: () => void;
    onShowDesignerContact: () => void;
}

const Footer: React.FC<FooterProps> = ({ onShowAbout, onShowPrivacy, onShowTerms, onShowContact, onShowDesignerContact }) => {
  return (
    <footer className="bg-slate-900 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="border-t border-slate-700 pt-8 text-center">
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-base">
                <button onClick={onShowAbout} className="text-slate-300 hover:text-indigo-300 transition-colors font-medium">About Us</button>
                <button onClick={onShowContact} className="text-slate-300 hover:text-indigo-300 transition-colors font-medium">Contact Us</button>
            </nav>

            <div className="mt-4 flex justify-center gap-x-4">
                 <button onClick={onShowPrivacy} className="text-sm text-slate-400 hover:text-indigo-300 transition-colors font-medium">Privacy Policy</button>
                 <span className="text-sm text-slate-600">|</span>
                 <button onClick={onShowTerms} className="text-sm text-slate-400 hover:text-indigo-300 transition-colors font-medium">Terms & Conditions</button>
            </div>

            <div className="text-center text-xs text-slate-500 mt-6 space-y-1">
                <p>
                    &copy; {new Date().getFullYear()} Find Offlicence Near Me. All rights reserved.
                </p>
                <p>
                    Designed by <button onClick={onShowDesignerContact} className="underline text-slate-400 hover:text-indigo-300 transition-colors">Mark Bradshaw</button>
                </p>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
