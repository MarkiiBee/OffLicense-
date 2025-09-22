import React, { useState } from 'react';
import type { Article } from '../types';
import { getArticles, getArticleCategories } from '../services/contentService';
import ShareButton from './ShareButton';

interface ResourcesScreenProps {
  onBack: () => void;
  onShowArticle: (slug: string) => void;
  onShowQuiz: () => void;
  onShowMindfulDrinking: () => void;
}

const BookOpenIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
);
const SparklesIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}><path fillRule="evenodd" d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM5.22 5.22a.75.75 0 011.06 0l1.06 1.06a.75.75 0 01-1.06 1.06l-1.06-1.06a.75.75 0 010-1.06zM2 10a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5A.75.75 0 012 10zm3.22 4.78a.75.75 0 010 1.06l-1.06 1.06a.75.75 0 01-1.06-1.06l1.06-1.06a.75.75 0 011.06 0zm9.56-9.56a.75.75 0 011.06 0l1.06 1.06a.75.75 0 01-1.06 1.06l-1.06-1.06a.75.75 0 010-1.06zM18 10a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5A.75.75 0 0118 10zm-3.22 4.78a.75.75 0 010 1.06l-1.06 1.06a.75.75 0 01-1.06-1.06l1.06-1.06a.75.75 0 011.06 0zM10 18a.75.75 0 01.75-.75v-1.5a.75.75 0 01-1.5 0v1.5A.75.75 0 0110 18z" clipRule="evenodd" /></svg>
);
const LeafIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2c.63 0 1.25.07 1.85.204M12 22v-4m0-16C17.523 2 22 6.477 22 12c0 2.24-.73 4.32-2.007 6.003" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 2a6 6 0 00-6 6c0 4.418 4.477 10 6 12 1.523-2 6-7.582 6-12a6 6 0 00-6-6z" /></svg>);


const ArticleCard: React.FC<{ article: Article, onShowArticle: (slug: string) => void }> = ({ article, onShowArticle }) => (
    <div className="bg-slate-800 rounded-lg p-5 border border-slate-700 flex flex-col h-full transition-transform transform hover:-translate-y-1">
        <p className="text-xs font-bold text-indigo-400 uppercase tracking-wider">{article.category}</p>
        <h3 className="text-xl font-bold text-teal-300 mt-1">{article.title}</h3>
        <p className="mt-2 text-slate-300 flex-grow text-sm">{article.summary}</p>
        <div className="mt-4">
             <button onClick={() => onShowArticle(article.slug)} className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors text-sm">
                Read More &rarr;
            </button>
        </div>
    </div>
);

const ResourcesScreen: React.FC<ResourcesScreenProps> = ({ onBack, onShowArticle, onShowQuiz, onShowMindfulDrinking }) => {
  const articles = getArticles();
  const categories = getArticleCategories();
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredArticles = activeCategory === 'All'
    ? articles
    : articles.filter(article => article.category === activeCategory);

  return (
    <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
            <BookOpenIcon className="w-12 h-12 text-indigo-400 mx-auto mb-2" />
            <div className="flex justify-center items-center gap-4">
              <h2 className="text-3xl font-bold text-white">Helpful Resources</h2>
              <ShareButton
                  shareData={{
                      title: 'Helpful Resources on Off Licence Near Me',
                      text: 'I found some useful articles about mindful drinking and support.',
                      url: `${window.location.origin}?view=resources`
                  }}
                  title="Share this page"
              />
            </div>
            <p className="mt-2 text-lg text-slate-300">Information to help you understand and navigate your relationship with alcohol.</p>
        </div>

        <div className="my-8 space-y-4">
            <div className="bg-slate-800/50 border border-teal-500/50 rounded-lg p-6 text-center animate-card-enter" style={{ animationDelay: '100ms' }}>
                <h3 className="text-xl font-bold text-teal-300 flex items-center justify-center gap-2">
                    <LeafIcon className="w-6 h-6" />
                    Mindful Drinking Hub
                </h3>
                <p className="mt-2 text-slate-300 max-w-2xl mx-auto">Access your private dashboard with a drink tracker, savings calculator, and other tools to support your mindfulness journey.</p>
                <button 
                    onClick={onShowMindfulDrinking}
                    className="mt-4 bg-teal-500 text-slate-900 font-bold py-3 px-6 rounded-lg hover:bg-teal-400 transition-all duration-200 transform hover:scale-105"
                >
                    Open Hub
                </button>
            </div>
             <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 text-center animate-card-enter" style={{ animationDelay: '200ms' }}>
                <h3 className="text-xl font-bold text-white flex items-center justify-center gap-2">
                    <SparklesIcon className="w-6 h-6 text-indigo-400" />
                    Mindful Drinking Check-in
                </h3>
                <p className="mt-2 text-slate-300 max-w-2xl mx-auto">Take a short, private quiz to reflect on your habits. No data is saved, and the results are for your eyes only.</p>
                <button 
                    onClick={onShowQuiz}
                    className="mt-4 bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-all duration-200 transform hover:scale-105"
                >
                    Start the Quiz
                </button>
            </div>
        </div>
        
        <h3 className="text-2xl font-bold text-white text-center mb-4">Articles & Guides</h3>
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {categories.map(category => (
                <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                        activeCategory === category
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                >
                    {category}
                </button>
            ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredArticles.length > 0 ? (
                filteredArticles.map((article, index) => (
                    <div key={article.slug} className="animate-card-enter" style={{ animationDelay: `${index * 50}ms` }}>
                         <ArticleCard article={article} onShowArticle={onShowArticle} />
                    </div>
                ))
            ) : (
                <div className="md:col-span-2 text-center py-10 bg-slate-800 rounded-lg">
                    <p className="text-slate-300 text-lg">No articles found in this category.</p>
                </div>
            )}
        </div>

        <div className="text-center mt-12">
            <button onClick={onBack} className="bg-slate-700 text-white font-bold py-3 px-6 rounded-lg hover:bg-slate-600 transition-colors">
                &larr; Back
            </button>
        </div>
    </div>
  );
};

export default ResourcesScreen;