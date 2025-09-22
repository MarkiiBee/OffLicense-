
import React, { useState, useEffect, Suspense, useMemo } from 'react';
import type { SupportResource, Article } from './types';
import { View, viewFromString, viewToString } from './types';
import { getArticleBySlug, getSupportResources } from './services/contentService';
import Header from './components/Header';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';
import BottomNav from './components/BottomNav';
import ErrorDisplay from './components/ErrorDisplay';
import ScrollToTopButton from './components/ScrollToTopButton';

// Lazy load screen components for better performance
const SearchScreen = React.lazy(() => import('./components/SearchScreen'));
const SupportScreen = React.lazy(() => import('./components/SupportScreen'));
const ContactScreen = React.lazy(() => import('./components/ContactScreen'));
const AboutScreen = React.lazy(() => import('./components/AboutScreen'));
const PrivacyScreen = React.lazy(() => import('./components/PrivacyScreen'));
const TermsScreen = React.lazy(() => import('./components/TermsScreen'));
const ResourcesScreen = React.lazy(() => import('./components/ResourcesScreen'));
const ArticleScreen = React.lazy(() => import('./components/ArticleScreen'));
const QuizScreen = React.lazy(() => import('./components/QuizScreen'));
const MindfulDrinkingScreen = React.lazy(() => import('./components/MindfulDrinkingScreen'));
const SearchingScreen = React.lazy(() => import('./components/SearchingScreen'));

const App: React.FC = () => {
  const [currentUrl, setCurrentUrl] = useState(window.location.href);
  const [supportResources] = useState<SupportResource[]>(() => getSupportResources());
  const [error, setError] = useState<{ message: string; details?: any } | null>(null);
  const [contentKey, setContentKey] = useState(0);
  const [contactPrefill, setContactPrefill] = useState<{ category?: string; message?: string } | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchConfig, setSearchConfig] = useState<{ url: string; category: string } | null>(null);

  const { view, slug } = useMemo(() => {
    const params = new URL(currentUrl).searchParams;
    const viewParam = viewFromString(params.get('view')) || View.SEARCH;
    const slugParam = params.get('slug') || null;
    return { view: viewParam, slug: slugParam };
  }, [currentUrl]);

  const selectedArticle = useMemo(() => {
    if (view === View.ARTICLE && slug) {
      return getArticleBySlug(slug);
    }
    return null;
  }, [view, slug]);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentUrl(window.location.href);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  useEffect(() => {
    if (isSearching && searchConfig) {
      const timer = setTimeout(() => {
        window.open(searchConfig.url, '_blank', 'noopener,noreferrer');
        setIsSearching(false);
        setSearchConfig(null);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [isSearching, searchConfig]);

  useEffect(() => {
    switch (view) {
      case View.SEARCH: document.title = 'Find Offlicence Near Me | 24/7 UK Off-Licence Finder'; break;
      case View.SUPPORT: document.title = 'Addiction & Mental Health Support | Find Offlicence Near Me'; break;
      case View.CONTACT: document.title = 'Contact Us | Find Offlicence Near Me'; break;
      case View.ABOUT: document.title = 'About Us | Find Offlicence Near Me'; break;
      case View.PRIVACY: document.title = 'Privacy Policy | Find Offlicence Near Me'; break;
      case View.TERMS: document.title = 'Terms & Conditions | Find Offlicence Near Me'; break;
      case View.RESOURCES: document.title = 'Helpful Resources | Find Offlicence Near Me'; break;
      case View.MINDFUL_DRINKING: document.title = 'Mindful Drinking Hub | Find Offlicence Near Me'; break;
      case View.ARTICLE: document.title = `${selectedArticle?.title || 'Resource'} | Find Offlicence Near Me`; break;
      case View.QUIZ: document.title = 'Mindful Drinking Quiz | Find Offlicence Near Me'; break;
    }
    setContentKey(prev => prev + 1);
  }, [view, selectedArticle]);

  const handleNavigateAwayFromContact = () => {
    if (view === View.CONTACT) {
      setContactPrefill(null);
    }
  };

  const navigateTo = (newView: View, newSlug: string | null = null) => {
    const currentSlug = new URL(currentUrl).searchParams.get('slug');
    if (view === newView && newSlug === currentSlug) return;
    
    handleNavigateAwayFromContact();

    let urlPath = `?view=${viewToString(newView)}`;
    if (newSlug) {
      urlPath += `&slug=${newSlug}`;
    }

    window.history.pushState({ view: newView, slug: newSlug }, '', urlPath);
    setCurrentUrl(window.location.href);
    setError(null);
    window.scrollTo(0, 0);
  };
  
  const handleBack = () => {
    window.history.back();
  };
  
  const goHome = () => {
    handleNavigateAwayFromContact();
    window.history.pushState({ view: View.SEARCH }, '', '/');
    setCurrentUrl(window.location.href);
    setError(null);
    window.scrollTo(0, 0);
  };

  const handleShowArticle = (slug: string) => {
    navigateTo(View.ARTICLE, slug);
  }
  
  const handleShowQuiz = () => {
    navigateTo(View.QUIZ);
  };

  const handleSearch = (url: string, category: string) => {
    setSearchConfig({ url, category });
    setIsSearching(true);
  };

  const handleReportProblem = (errorData: { message: string; details?: any }) => {
    const { message, details } = errorData;
    let detailsString = details?.stack || details?.message || String(details) || '';
    const prefillMessage = `Hi, I encountered an error.\n\nError Message:\n${message}\n\nTechnical Details:\n${detailsString}\n\nSteps to reproduce (optional):\n`;

    setContactPrefill({
      category: 'bug_report',
      message: prefillMessage
    });
    navigateTo(View.CONTACT);
  };

  const handleShowBusinessContact = () => {
    setContactPrefill({
      category: 'business_inquiry',
      message: 'Hi, I\'m a business owner and I\'d like to learn more about claiming or updating my listing on your app.\n\nBusiness Name:\nLocation:\n'
    });
    navigateTo(View.CONTACT);
  };

  const renderContent = () => {
    if (isSearching && searchConfig) {
      return <SearchingScreen category={searchConfig.category} />;
    }
      
    if (error) {
       return (
        <ErrorDisplay 
            message={error.message}
            errorDetails={error.details}
            onRetry={() => setError(null)}
            retryText="Dismiss"
            onReportProblem={handleReportProblem}
        />
       );
    }

    switch (view) {
      case View.SEARCH:
        return (
            <SearchScreen 
              onError={setError} 
              onSearch={handleSearch} 
              onShowMindfulDrinking={() => navigateTo(View.MINDFUL_DRINKING)}
              onShowContact={handleShowBusinessContact}
            />
        );
      case View.SUPPORT:
        return <SupportScreen 
                  onBack={handleBack} 
                />;
      case View.CONTACT:
        return <ContactScreen 
                  onBack={handleBack} 
                  onShowSupport={() => navigateTo(View.SUPPORT)}
                  onShowPrivacy={() => navigateTo(View.PRIVACY)}
                  prefill={contactPrefill}
               />;
      case View.ABOUT:
        return <AboutScreen onBack={handleBack} />;
      case View.PRIVACY:
        return <PrivacyScreen onBack={handleBack} />;
      case View.TERMS:
        return <TermsScreen onBack={handleBack} />;
      case View.RESOURCES:
        return <ResourcesScreen onBack={handleBack} onShowArticle={handleShowArticle} onShowQuiz={handleShowQuiz} onShowMindfulDrinking={() => navigateTo(View.MINDFUL_DRINKING)} />;
      case View.MINDFUL_DRINKING:
        return <MindfulDrinkingScreen onBack={handleBack} onShowArticle={handleShowArticle} onShowQuiz={handleShowQuiz} />;
      case View.ARTICLE:
        return selectedArticle ? <ArticleScreen article={selectedArticle} onBack={handleBack} onShowArticle={handleShowArticle} /> : <div className="text-center text-slate-400">Article not found.</div>;
      case View.QUIZ:
        return <QuizScreen onBack={handleBack} />;
      default:
        return <SearchScreen onError={setError} onSearch={handleSearch} onShowMindfulDrinking={() => navigateTo(View.MINDFUL_DRINKING)} onShowContact={handleShowBusinessContact}/>;
    }
  };

  const isSearchScreen = view === View.SEARCH || isSearching;

  return (
    <ErrorBoundary>
      <div className="flex flex-col min-h-screen bg-slate-900 text-gray-200 font-sans overflow-x-hidden">
        <Header 
          onGoHome={goHome}
          onShowResources={() => navigateTo(View.RESOURCES)}
          onShowSupport={() => navigateTo(View.SUPPORT)}
          onShowContact={() => navigateTo(View.CONTACT)}
        />
        <main className="container mx-auto px-4 flex-grow w-full flex flex-col pb-24 md:pb-8">
           <div key={contentKey} className={`animate-fade-in ${isSearchScreen ? 'flex-1 flex flex-col pt-8' : 'py-6'}`}>
             <Suspense fallback={<LoadingSpinner message="Loading page..." />}>
              {renderContent()}
             </Suspense>
           </div>
           <Footer 
              onShowAbout={() => navigateTo(View.ABOUT)}
              onShowPrivacy={() => navigateTo(View.PRIVACY)}
              onShowTerms={() => navigateTo(View.TERMS)}
              onShowContact={() => navigateTo(View.CONTACT)}
            />
        </main>
        
        <BottomNav 
          currentView={view} 
          navigateTo={navigateTo}
        />
        <ScrollToTopButton />
      </div>
    </ErrorBoundary>
  );
};

export default App;
