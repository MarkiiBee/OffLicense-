import React from 'react';
import { ShareIcon } from './Icons';

interface ShareButtonProps {
    shareData: {
        title: string;
        text: string;
        url: string;
    };
    className?: string;
    title?: string;
    children?: React.ReactNode;
}

const ShareButton: React.FC<ShareButtonProps> = ({ shareData, className, title = 'Share', children }) => {
    
    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (error) {
                console.log('User cancelled share or error occurred:', error);
            }
        } else {
            // Fallback for desktop or unsupported browsers
            try {
                await navigator.clipboard.writeText(shareData.url);
                alert('Link copied to clipboard!');
            } catch (err) {
                console.error('Failed to copy URL: ', err);
                alert('Could not copy link to clipboard.');
            }
        }
    };

    const buttonClass = className || "p-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors";

    return (
        <button
            onClick={handleShare}
            aria-label={title}
            className={buttonClass}
        >
            {children || <ShareIcon className="w-5 h-5" />}
        </button>
    );
};

export default ShareButton;
