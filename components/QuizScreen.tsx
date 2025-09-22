import React, { useState } from 'react';
import { getQuiz } from '../services/contentService';
import type { QuizResult } from '../types';
import { CheckCircleIcon, LightBulbIcon } from './Icons';

interface QuizScreenProps {
  onBack: () => void;
}

const QuizScreen: React.FC<QuizScreenProps> = ({ onBack }) => {
    const quiz = getQuiz();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<number[]>([]);
    const [showResults, setShowResults] = useState(false);

    const handleAnswer = (score: number) => {
        const newAnswers = [...answers, score];
        setAnswers(newAnswers);

        if (currentQuestionIndex < quiz.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setShowResults(true);
        }
    };

    const handleRetake = () => {
        setCurrentQuestionIndex(0);
        setAnswers([]);
        setShowResults(false);
    };

    const totalScore = answers.reduce((sum, score) => sum + score, 0);
    
    const result: QuizResult | undefined = quiz.results.find(
        r => totalScore >= r.scoreMin && totalScore <= r.scoreMax
    );

    const progressPercentage = (currentQuestionIndex / quiz.questions.length) * 100;

    if (showResults && result) {
        return (
            <div className="max-w-2xl mx-auto text-center">
                <div className="bg-slate-800/50 p-8 rounded-lg border border-teal-500/50">
                    <CheckCircleIcon className="w-16 h-16 text-teal-400 mx-auto mb-4" />
                    <h2 className="text-3xl font-bold text-teal-300">{result.title}</h2>
                    <p className="mt-4 text-lg text-slate-300">{result.feedback}</p>
                </div>
                <div className="mt-8 flex gap-4 justify-center">
                    <button onClick={onBack} className="bg-slate-700 text-white font-bold py-3 px-6 rounded-lg hover:bg-slate-600 transition-colors">&larr; Back to Resources</button>
                    <button onClick={handleRetake} className="bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors">Retake Quiz</button>
                </div>
            </div>
        );
    }

    const currentQuestion = quiz.questions[currentQuestionIndex];

    return (
        <div className="max-w-2xl mx-auto">
            <div className="text-center">
                <LightBulbIcon className="w-12 h-12 text-indigo-400 mx-auto mb-2" />
                <h1 className="text-4xl font-extrabold text-white sm:text-5xl">{quiz.title}</h1>
                <p className="mt-4 text-lg text-slate-300">{quiz.description}</p>
            </div>
            
            <div className="mt-8 bg-slate-800/50 rounded-lg border border-slate-700 p-6 md:p-8">
                <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-slate-400">Question {currentQuestionIndex + 1} of {quiz.questions.length}</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2.5">
                        <div className="bg-indigo-500 h-2.5 rounded-full" style={{ width: `${progressPercentage}%`, transition: 'width 0.5s ease-in-out' }}></div>
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-white mb-6">{currentQuestion.text}</h2>
                <div className="space-y-4">
                    {currentQuestion.options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleAnswer(option.score)}
                            className="w-full text-left bg-slate-800 border border-slate-600 rounded-lg p-4 text-slate-200 hover:bg-indigo-600 hover:border-indigo-500 transition-all duration-200 transform hover:scale-105"
                        >
                            {option.text}
                        </button>
                    ))}
                </div>
            </div>
             <div className="text-center mt-12">
                <button onClick={onBack} className="text-sm text-slate-400 hover:text-white transition-colors">Cancel Quiz</button>
            </div>
        </div>
    );
};

export default QuizScreen;
