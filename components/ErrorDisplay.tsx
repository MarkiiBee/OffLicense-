import React from 'react';
import { ErrorIcon } from './Icons';

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
