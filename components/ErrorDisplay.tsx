import React from 'react';

const ErrorIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
);

interface ErrorDisplayProps {
    message: string;
    errorDetails?: any;
    onRetry?: () => void;
    retryText?: string;
    onReportProblem?: (error: { message: string; details?: any }) => void;
    secondaryActionText?: string;
    onSecondaryAction?: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ 
    message, 
    errorDetails, 
    onRetry, 
    retryText = "Try Again", 
    onReportProblem,
    secondaryActionText,
    onSecondaryAction
}) => {
    return (
        <div className="max-w-md mx-auto text-center p-8 bg-slate-800/50 border border-red-500/50 rounded-lg animate-fade-in animate-shake-on-load">
            <ErrorIcon className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">An Error Occurred</h3>
            <p className="text-slate-300 mb-6">{message}</p>
            
            {errorDetails && (
                <details className="mb-6 text-left">
                    <summary className="cursor-pointer text-sm text-slate-400 hover:text-white">
                        Show technical details
                    </summary>
                    <pre className="mt-2 p-2 bg-slate-900 rounded text-xs text-slate-400 overflow-x-auto max-h-40">
                        <code>
                            {errorDetails.stack || errorDetails.message || JSON.stringify(errorDetails, null, 2)}
                        </code>
                    </pre>
                </details>
            )}

            <div className="flex flex-col items-center justify-center gap-4">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                    {onRetry && (
                        <button
                            onClick={onRetry}
                            className="w-full sm:w-auto bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                            {retryText}
                        </button>
                    )}
                    {onSecondaryAction && secondaryActionText && (
                         <button
                            onClick={onSecondaryAction}
                            className="w-full sm:w-auto bg-slate-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-slate-600 transition-colors"
                        >
                            {secondaryActionText}
                        </button>
                    )}
                </div>
                {onReportProblem && (
                    <button
                        onClick={() => onReportProblem({ message, details: errorDetails })}
                        className="w-full sm:w-auto bg-slate-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-slate-600 transition-colors"
                    >
                        Report Problem
                    </button>
                )}
            </div>
        </div>
    );
};

export default ErrorDisplay;