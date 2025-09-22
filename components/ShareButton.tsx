import React from 'react';

const ShareIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.368a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
    </svg>
);

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