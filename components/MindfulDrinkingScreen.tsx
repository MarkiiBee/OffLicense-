import React, { useState, useEffect, useMemo } from 'react';
import type { DrinkLog } from '../types';
import ShareButton from './ShareButton';
import { LeafIcon, SparklesIcon, PlusIcon, MinusIcon, CogIcon, CloseIcon, BookOpenIcon } from './Icons';

interface MindfulDrinkingScreenProps {
  onBack: () => void;
  onShowArticle: (slug: string) => void;
  onShowQuiz: () => void;
}

const DRINK_LOG_STORAGE_KEY = 'mindful-drinking-log';
const MINDFUL_SETTINGS_KEY = 'mindful-drinking-settings';

const getTodayDateString = () => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // YYYY-MM-DD format
};

const MindfulDrinkingScreen: React.FC<MindfulDrinkingScreenProps> = ({ onBack, onShowArticle, onShowQuiz }) => {
    const [log, setLog] = useState<DrinkLog>({});
    const [settings, setSettings] = useState({ avgDrinkPrice: 5.00 });
    const [showCravingTool, setShowCravingTool] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    useEffect(() => {
        try {
            const storedLog = localStorage.getItem(DRINK_LOG_STORAGE_KEY);
            if (storedLog) setLog(JSON.parse(storedLog));

            const storedSettings = localStorage.getItem(MINDFUL_SETTINGS_KEY);
            if (storedSettings) setSettings(JSON.parse(storedSettings));
        } catch (error) {
            console.error("Failed to load mindful hub data from localStorage", error);
        }
    }, []);

    const saveLog = (newLog: DrinkLog) => {
        setLog(newLog);
        try {
            localStorage.setItem(DRINK_LOG_STORAGE_KEY, JSON.stringify(newLog));
        } catch (error) {
            console.error("Failed to save drink log", error);
        }
    };

    const saveSettings = (newSettings: { avgDrinkPrice: number }) => {
        setSettings(newSettings);
        setShowSettings(false);
        try {
            localStorage.setItem(MINDFUL_SETTINGS_KEY, JSON.stringify(newSettings));
        } catch (error) {
            console.error("Failed to save settings", error);
        }
    };
    
    const todayStr = getTodayDateString();
    const drinksToday = log[todayStr] || 0;

    const handleDrinkChange = (amount: number) => {
        const newCount = Math.max(0, drinksToday + amount);
        saveLog({ ...log, [todayStr]: newCount });
    };

    const weeklyData = useMemo(() => {
        const data = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            data.push({
                day: date.toLocaleDateString(undefined, { weekday: 'short' }).slice(0, 1),
                count: log[dateStr] || 0,
            });
        }
        return data;
    }, [log]);
    
    const totalDrinksThisWeek = weeklyData.reduce((sum, day) => sum + day.count, 0);
    const moneySavedThisWeek = weeklyData.filter(d => d.count === 0).length * settings.avgDrinkPrice;

    // --- Dashboard Card Components ---
    const TrackerCard = () => (
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 flex flex-col justify-between h-full">
            <div>
                <h3 className="font-bold text-white">Today's Drinks</h3>
                <p className="text-sm text-slate-400">Log your drinks here. It's completely private.</p>
            </div>
            <div className="flex items-center justify-center gap-4 my-4">
                <button onClick={() => handleDrinkChange(-1)} disabled={drinksToday === 0} className="p-2 bg-slate-700 rounded-full hover:bg-slate-600 disabled:opacity-50"><MinusIcon className="w-6 h-6 text-white" /></button>
                <span className="text-5xl font-extrabold text-indigo-400 w-20 text-center">{drinksToday}</span>
                <button onClick={() => handleDrinkChange(1)} className="p-2 bg-slate-700 rounded-full hover:bg-slate-600"><PlusIcon className="w-6 h-6 text-white" /></button>
            </div>
        </div>
    );

    const WeeklyChartCard = () => {
        const maxCount = Math.max(...weeklyData.map(d => d.count), 3); // min height for 3 bars
        return (
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 h-full">
                <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-white">This Week</h3>
                    <p className="text-sm text-slate-400 font-medium">{totalDrinksThisWeek} total</p>
                </div>
                <div className="flex justify-around items-end h-24 mt-3 gap-2">
                    {weeklyData.map((d, i) => (
                        <div key={i} className="flex flex-col items-center flex-grow">
                            <div className="w-full h-full flex items-end">
                                <div title={`${d.count} drinks`} className="w-full bg-indigo-500 rounded-t-sm hover:bg-indigo-400 transition-colors" style={{ height: `${(d.count / maxCount) * 100}%` }}></div>
                            </div>
                            <span className="text-xs font-bold text-slate-400 mt-1">{d.day}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const SavingsCard = () => (
         <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 flex flex-col justify-between h-full">
            <div>
                <div className="flex justify-between items-start">
                    <h3 className="font-bold text-white">Money Saved</h3>
                    <button onClick={() => setShowSettings(true)} className="text-slate-500 hover:text-white"><CogIcon className="w-5 h-5"/></button>
                </div>
                <p className="text-sm text-slate-400">Based on drink-free days this week.</p>
            </div>
            <p className="text-4xl font-extrabold text-teal-400 text-center my-4">
                ~£{moneySavedThisWeek.toFixed(2)}
            </p>
        </div>
    );

    const CravingSupportCard = () => (
        <div className="bg-gradient-to-br from-teal-500 to-indigo-600 rounded-lg p-4 border border-teal-500/50 text-white text-center flex flex-col justify-between items-center h-full">
            <h3 className="font-bold">Feeling an Urge?</h3>
            <p className="text-sm mt-1 mb-3">Use this tool to guide you through the moment.</p>
            <button onClick={() => setShowCravingTool(true)} className="bg-white/90 text-slate-900 font-bold py-2 px-5 rounded-lg hover:bg-white transition-all transform hover:scale-105">Take a Breather</button>
        </div>
    );

    const QuizCard = () => (
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 text-center flex flex-col items-center justify-between h-full">
             <SparklesIcon className="w-8 h-8 text-teal-300 mb-2"/>
            <h3 className="font-bold text-white">Mindful Check-in</h3>
            <p className="text-sm text-slate-400 mt-1 mb-3 flex-grow">A private quiz to reflect on your habits.</p>
            <button onClick={onShowQuiz} className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors text-sm">Start the Quiz &rarr;</button>
        </div>
    );

    const ResourcesCard = () => (
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 text-center flex flex-col items-center justify-between h-full">
            <BookOpenIcon className="w-8 h-8 text-indigo-400 mb-2"/>
            <h3 className="font-bold text-white">Helpful Reading</h3>
            <p className="text-sm text-slate-400 mt-1 mb-3 flex-grow">Understand cravings and build strategies.</p>
            <button onClick={() => onShowArticle('understanding-alcohol-cravings')} className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors text-sm">Learn About Cravings &rarr;</button>
        </div>
    );
    
    const CravingToolModal = () => {
      const [timer, setTimer] = useState(60);
      
      useEffect(() => {
        if (showCravingTool) {
          const interval = setInterval(() => {
            setTimer(prev => (prev > 0 ? prev - 1 : 0));
          }, 1000);
          return () => clearInterval(interval);
        }
      }, [showCravingTool]);

      if (!showCravingTool) return null;

      return (
        <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-md z-50 flex flex-col items-center justify-center p-4 text-white text-center animate-fade-in">
          <div className="relative w-48 h-48 flex items-center justify-center">
            <div className="absolute inset-0 bg-teal-500/30 rounded-full animate-breathe"></div>
            <p className="relative text-5xl font-bold">{Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}</p>
          </div>
          <p className="text-2xl font-bold mt-8">{timer > 30 ? "Breathe in deeply..." : "Breathe out slowly..."}</p>
          <p className="mt-2 text-slate-300">Focus on the sensation of your breath. This feeling will pass.</p>
          <button onClick={() => setShowCravingTool(false)} className="mt-8 bg-slate-700 font-bold py-3 px-8 rounded-lg hover:bg-slate-600 transition-colors">Close</button>
        </div>
      );
    };

    const SettingsModal = () => {
      const [price, setPrice] = useState(settings.avgDrinkPrice.toFixed(2));
      if (!showSettings) return null;
      
      const handleSave = () => {
        const newPrice = parseFloat(price);
        if (!isNaN(newPrice) && newPrice >= 0) {
          saveSettings({ avgDrinkPrice: newPrice });
        }
      };

      return (
        <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowSettings(false)}>
          <div className="bg-slate-800 border border-slate-600 rounded-lg p-6 w-full max-w-sm text-white" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Settings</h3>
              <button onClick={() => setShowSettings(false)} className="text-slate-400 hover:text-white"><CloseIcon className="w-6 h-6"/></button>
            </div>
            <label htmlFor="drink-price" className="block text-sm font-medium text-slate-300 mb-2">Average Price per Drink (£)</label>
            <input 
              id="drink-price" 
              type="number"
              value={price}
              onChange={e => setPrice(e.target.value)}
              step="0.10" 
              min="0"
              className="w-full bg-slate-900 border border-slate-600 text-white rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-500"
            />
            <p className="text-xs text-slate-500 mt-1">Used to estimate your savings. This is stored only on your device.</p>
            <button onClick={handleSave} className="w-full mt-4 bg-indigo-600 font-bold py-2.5 px-4 rounded-lg hover:bg-indigo-700">Save</button>
          </div>
        </div>
      );
    };

    return (
      <div className="max-w-4xl mx-auto">
          <CravingToolModal />
          <SettingsModal />
          <div className="text-center mb-8">
              <LeafIcon className="w-12 h-12 text-teal-300 mx-auto mb-2" />
              <div className="flex justify-center items-center gap-4">
                <h2 className="text-3xl font-bold text-white">Mindful Drinking Hub</h2>
                <ShareButton
                    shareData={{
                        title: 'Mindful Drinking Hub | Find Offlicence Near Me',
                        text: 'I found this useful hub with a private tracker and tools for mindful drinking.',
                        url: `${window.location.origin}?view=mindful_drinking`
                    }}
                    title="Share this page"
                />
              </div>
              <p className="mt-2 text-lg text-slate-300">Your private dashboard for building healthier habits.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="lg:col-span-2 animate-card-enter" style={{ animationDelay: '0ms' }}><TrackerCard /></div>
              <div className="lg:col-span-2 animate-card-enter" style={{ animationDelay: '50ms' }}><WeeklyChartCard /></div>
              <div className="lg:col-span-1 animate-card-enter" style={{ animationDelay: '100ms' }}><SavingsCard /></div>
              <div className="lg:col-span-1 animate-card-enter" style={{ animationDelay: '150ms' }}><QuizCard /></div>
              <div className="col-span-1 md:col-span-2 animate-card-enter" style={{ animationDelay: '200ms' }}><CravingSupportCard /></div>
              <div className="lg:col-span-2 animate-card-enter" style={{ animationDelay: '250ms' }}><ResourcesCard /></div>
          </div>

          <div className="text-center mt-12">
              <button onClick={onBack} className="bg-slate-700 text-white font-bold py-3 px-6 rounded-lg hover:bg-slate-600 transition-colors">
                  &larr; Back
              </button>
          </div>
      </div>
    );
};

export default MindfulDrinkingScreen;
