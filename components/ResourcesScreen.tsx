import React, { useState } from 'react';
import type { Article } from '../types';
import { getArticles, getArticleCategories } from '../services/contentService';
import ShareButton from './ShareButton';
import { BookOpenIcon, SparklesIcon, LeafIcon } from './Icons';

interface ResourcesScreenProps {
  onBack: () => void;
  onShowArticle: (slug: string) => void;
  onShowQuiz: () => void;
  onShowMindfulDrinking: () => void;
}

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
                      title: 'Helpful Resources on Find Offlicence Near Me',
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
