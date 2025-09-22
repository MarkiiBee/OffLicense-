import React, { useState, useEffect, useMemo, useRef } from 'react';
import type { Article } from '../types';
import ShareButton from './ShareButton';
import { getArticles } from '../services/contentService';


interface ArticleScreenProps {
  article: Article;
  onBack: () => void;
  onShowArticle: (slug: string) => void;
}

// --- Reusable Icon Components ---
const PlayIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}><path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" /></svg>
);
const PauseIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}><path d="M5.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75A.75.75 0 007.25 3h-1.5zM12.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75a.75.75 0 00-.75-.75h-1.5z" /></svg>
);
const StopIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}><path d="M5 3.5A1.5 1.5 0 016.5 2h7A1.5 1.5 0 0115 3.5v13A1.5 1.5 0 0113.5 18h-7A1.5 1.5 0 015 16.5v-13z" /></svg>
);

const ArticleStructuredData: React.FC<{ article: Article }> = ({ article }) => {
    const schema = { "@context": "https://schema.org", "@type": "Article", "headline": article.title, "description": article.summary, "author": { "@type": "Organization", "name": "Off Licence Near Me" }, "publisher": { "@type": "Organization", "name": "Off Licence Near Me", "logo": { "@type": "ImageObject", "url": "/apple-touch-icon.png" } }, "datePublished": new Date().toISOString(), "mainEntityOfPage": { "@type": "WebPage", "@id": `https://example.com/resources/${article.slug}` } };
    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
};

const ArticleScreen: React.FC<ArticleScreenProps> = ({ article, onBack, onShowArticle }) => {
  const shareUrl = `${window.location.origin}${window.location.pathname}?view=article&slug=${article.slug}`;
  const [speechState, setSpeechState] = useState<'stopped' | 'playing' | 'paused'>('stopped');
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [isSpeechSupported, setIsSpeechSupported] = useState(false);

  const relatedArticles = useMemo(() => {
    if (!article) return [];
    const allArticles = getArticles();
    
    const sameCategoryArticles = allArticles.filter(
      a => a.category === article.category && a.slug !== article.slug
    );

    let finalRelatedArticles = [...sameCategoryArticles];

    if (finalRelatedArticles.length < 4) {
      const needed = 4 - finalRelatedArticles.length;
      
      const existingSlugs = new Set(finalRelatedArticles.map(a => a.slug));
      existingSlugs.add(article.slug);

      const otherCategoryArticles = allArticles.filter(
        a => !existingSlugs.has(a.slug)
      );
      
      finalRelatedArticles.push(...otherCategoryArticles.slice(0, needed));
    }
    
    return finalRelatedArticles.slice(0, 4);
  }, [article]);

  useEffect(() => {
    if ('speechSynthesis' in window && 'SpeechSynthesisUtterance' in window) {
        setIsSpeechSupported(true);
    }
    
    const cancelSpeech = () => {
        if (window.speechSynthesis && window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
        }
    };
    
    window.addEventListener('beforeunload', cancelSpeech);

    return () => {
        cancelSpeech();
        window.removeEventListener('beforeunload', cancelSpeech);
    };
  }, []);

  const handleToggleSpeech = () => {
    if (!isSpeechSupported) return;

    if (speechState === 'stopped') {
        if (speechSynthesis.speaking) speechSynthesis.cancel();
        const textToSpeak = `${article.title}. ${article.content.join(' ')}`;
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.onend = () => setSpeechState('stopped');
        utteranceRef.current = utterance;
        speechSynthesis.speak(utterance);
        setSpeechState('playing');
    } else if (speechState === 'playing') {
        speechSynthesis.pause();
        setSpeechState('paused');
    } else if (speechState === 'paused') {
        speechSynthesis.resume();
        setSpeechState('playing');
    }
  };

  const handleStopSpeech = () => {
      if (!isSpeechSupported) return;
      speechSynthesis.cancel();
      setSpeechState('stopped');
  };
  
  return (
    <>
      <ArticleStructuredData article={article} />
      <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-start gap-4 mb-4">
              <h1 className="text-4xl font-extrabold text-white">{article.title}</h1>
              <div className="flex-shrink-0"><ShareButton shareData={{ title: article.title, text: `I thought this article was interesting: "${article.title}"`, url: shareUrl }} title="Share this article" /></div>
          </div>
          
          {isSpeechSupported && (
            <div className="my-4 p-4 bg-slate-800/50 border border-slate-700 rounded-lg flex items-center justify-between animate-fade-in">
              <p className="font-medium text-slate-200">Listen to this article</p>
              <div className="flex items-center gap-2">
                  <button onClick={handleToggleSpeech} className="p-2 bg-slate-700 rounded-full hover:bg-slate-600 transition-colors text-white" aria-label={speechState === 'playing' ? 'Pause article' : 'Play article'}>
                      {speechState === 'playing' ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />}
                  </button>
                  {speechState !== 'stopped' && (
                      <button onClick={handleStopSpeech} className="p-2 bg-slate-700 rounded-full hover:bg-slate-600 transition-colors text-white" aria-label="Stop reading article"><StopIcon className="w-5 h-5" /></button>
                  )}
              </div>
            </div>
          )}

          <article className="prose prose-invert prose-lg max-w-none text-slate-300 prose-p:leading-relaxed prose-p:text-slate-300 prose-p:mb-6 prose-headings:mt-10 prose-headings:mb-4 prose-headings:text-white prose-h2:text-indigo-400 prose-h2:font-bold prose-a:text-indigo-400 hover:prose-a:text-indigo-300">
              {article.content.map((paragraph, index) => (<p key={index}>{paragraph}</p>))}
          </article>

          {relatedArticles.length > 0 && (
            <div className="mt-12 pt-8 border-t border-slate-700">
                <h2 className="text-2xl font-bold text-center text-white mb-6">Related Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {relatedArticles.map((related, index) => (
                        <button
                            key={related.slug}
                            onClick={() => onShowArticle(related.slug)}
                            className="bg-slate-800 rounded-lg p-5 border border-slate-700 text-left h-full transition-transform transform hover:-translate-y-1 hover:border-indigo-600 flex flex-col animate-card-enter"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <p className="text-xs font-bold text-indigo-400 uppercase tracking-wider">{related.category}</p>
                            <h3 className="text-lg font-bold text-teal-300 mt-1">{related.title}</h3>
                            <p className="mt-2 text-slate-300 flex-grow text-sm">{related.summary}</p>
                            <span className="mt-4 font-medium text-indigo-400 transition-colors text-sm self-start">
                                Read More &rarr;
                            </span>
                        </button>
                    ))}
                </div>
            </div>
          )}

          <div className="text-center mt-12">
              <button onClick={onBack} className="bg-slate-700 text-white font-bold py-3 px-6 rounded-lg hover:bg-slate-600 transition-colors">&larr; Back to Resources</button>
          </div>
      </div>
    </>
  );
};

export default ArticleScreen;