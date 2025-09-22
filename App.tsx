
import React, { useState, useEffect, Suspense } from 'react';
import type { SupportResource, Article } from './types';
import { View } from './types';
import { getArticleBySlug, getSupportResources } from './services/contentService';
import Header from './components/Header';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';
import BottomNav from './components/BottomNav';
import ErrorDisplay from './components/ErrorDisplay';
import WelcomeModal from './components/WelcomeModal';
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

const WELCOME_MODAL_KEY = 'night-owl-nav-welcome-seen';

const App: React.FC = () => {
  const [history, setHistory] = useState<View[]>([View.SEARCH]);
  const view = history[history.length - 1];

  const [supportResources] = useState<SupportResource[]>(() => getSupportResources());
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [error, setError] = useState<{ message: string; details?: any } | null>(null);
  const [contentKey, setContentKey] = useState(0); // Used to re-trigger animation
  const [showWelcome, setShowWelcome] = useState(false);
  const [contactPrefill, setContactPrefill] = useState<{ category?: string; message?: string } | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchConfig, setSearchConfig] = useState<{ url: string; category: string } | null>(null);
  
  // Load welcome modal status on initial mount
  useEffect(() => {
    try {
        const welcomeSeen = localStorage.getItem(WELCOME_MODAL_KEY);
        if (!welcomeSeen) {
            setShowWelcome(true);
        }
    } catch (e) {
        console.error("Failed to read from localStorage", e);
    }
  }, []);


  const handleWelcomeDismiss = () => {
    setShowWelcome(false);
    try {
        localStorage.setItem(WELCOME_MODAL_KEY, 'true');
        // Smoothly scroll to the top of the page after the modal is dismissed
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    } catch (e) {
        console.error("Failed to save welcome modal status to localStorage", e);
    }
  };
  
  useEffect(() => {
    if (isSearching && searchConfig) {
        const timer = setTimeout(() => {
            window.open(searchConfig.url, '_blank', 'noopener,noreferrer');
            setIsSearching(false);
            setSearchConfig(null);
        }, 2500); // 2.5 second delay for a smoother UX

        return () => clearTimeout(timer);
    }
  }, [isSearching, searchConfig]);


  // Handle deep links from shared URLs on initial mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const viewParam = params.get('view');
    const slugParam = params.get('slug');

    if (viewParam) {
      let initialHistory: View[] = [View.SEARCH];
      switch(viewParam) {
          case 'article':
              if (slugParam) {
                  const article = getArticleBySlug(slugParam);
                  if (article) {
                      setSelectedArticle(article);
                      // Provide a logical back-navigation path for the user
                      initialHistory = [View.SEARCH, View.RESOURCES, View.ARTICLE];
                  }
              }
              break;
          case 'support':
              initialHistory = [View.SEARCH, View.SUPPORT];
              break;
          case 'resources':
              initialHistory = [View.SEARCH, View.RESOURCES];
              break;
          case 'mindful_drinking':
              initialHistory = [View.SEARCH, View.RESOURCES, View.MINDFUL_DRINKING];
              break;
      }
      if (initialHistory.length > 1) {
          setHistory(initialHistory);
      }
    }
  }, []);

  useEffect(() => {
    // Update document title and trigger animations on view change
    switch (view) {
      case View.SEARCH: document.title = 'Find Late-Night Shops, Food & More | Off Licence Near Me'; break;
      case View.SUPPORT: document.title = 'Addiction & Mental Health Support | Off Licence Near Me'; break;
      case View.CONTACT: document.title = 'Contact Us | Off Licence Near Me'; break;
      case View.ABOUT: document.title = 'About Us | Off Licence Near Me'; break;
      case View.PRIVACY: document.title = 'Privacy Policy | Off Licence Near Me'; break;
      case View.TERMS: document.title = 'Terms & Conditions | Off Licence Near Me'; break;
      case View.RESOURCES: document.title = 'Helpful Resources | Off Licence Near Me'; break;
      case View.MINDFUL_DRINKING: document.title = 'Mindful Drinking Hub | Off Licence Near Me'; break;
      case View.ARTICLE: document.title = `${selectedArticle?.title || 'Resource'} | Off Licence Near Me`; break;
      case View.QUIZ: document.title = 'Mindful Drinking Quiz | Off Licence Near Me'; break;
      default: document.title = 'Off Licence Near Me';
    }
    setContentKey(prev => prev + 1);
  }, [view, selectedArticle]);
  
  const handleNavigateAwayFromContact = () => {
    if (view === View.CONTACT) {
      setContactPrefill(null);
    }
  };

  const navigateTo = (newView: View) => {
    if (view === newView) return;
    handleNavigateAwayFromContact();
    setHistory(prev => [...prev, newView]);
    setError(null);
    window.scrollTo(0, 0);
  };
  
  const handleBack = () => {
    if (history.length <= 1) return;
    handleNavigateAwayFromContact();
    setHistory(prev => prev.slice(0, -1));
    setError(null);
    window.scrollTo(0, 0);
  };
  
  const goHome = () => {
    handleNavigateAwayFromContact();
    setHistory([View.SEARCH]);
    setError(null);
    window.scrollTo(0, 0);
  };

  const handleShowArticle = (slug: string) => {
    const article = getArticleBySlug(slug);
    if (article) {
      setSelectedArticle(article);
      navigateTo(View.ARTICLE);
    }
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
          <>
            {showWelcome && <WelcomeModal onDismiss={handleWelcomeDismiss} />}
            <SearchScreen 
              onError={setError} 
              onSearch={handleSearch} 
              onShowMindfulDrinking={() => navigateTo(View.MINDFUL_DRINKING)}
              onShowContact={handleShowBusinessContact}
            />
          </>
        );
      case View.SUPPORT:
        return <SupportScreen 
                  resources={supportResources} 
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
        return <SearchScreen 
                  onError={setError} 
                  onSearch={handleSearch} 
                  onShowMindfulDrinking={() => navigateTo(View.MINDFUL_DRINKING)}
                  onShowContact={handleShowBusinessContact}
                />;
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
          setView={navigateTo}
        />
        <ScrollToTopButton />
      </div>
    </ErrorBoundary>
  );
};

export default App;
