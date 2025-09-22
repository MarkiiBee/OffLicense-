
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { fetchAddressSuggestions } from '../services/autocompleteService';
import ShareButton from './ShareButton';
import MindfulDrinkingCta from './MindfulDrinkingCta';

interface SearchScreenProps {
  onError: (error: { message:string; details?: any }) => void;
  onSearch: (url: string, category: string) => void;
  onShowMindfulDrinking: () => void;
  onShowContact: () => void;
}

// Icon Definitions
const AlcoholIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 5h4V3a1 1 0 00-1-1h-2a1 1 0 00-1 1v2zm4 0v14a1 1 0 01-1 1H9a1 1 0 01-1-1V5h6zm-5 4h4" />
    </svg>
);
const FoodIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.375 21l-1.06-6.366m-3.315.004l-.872-5.234M9.625 21l1.06-6.366m-3.315.004L6.375 9.37l.063-.376a2.25 2.25 0 014.288-1.574l1.22 7.324" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.75a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75V3.75zm3.75 0a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75V3.75zm3.75 0a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75V3.75z" />
    </svg>
);
const CashIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
    </svg>
);
const HotelIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h18M3 21h18" />
    </svg>
);
const FlightIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
    </svg>
);
const RideIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
    </svg>
);
const LocationIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const searchCategories = [
    { name: 'Off-Licences', query: 'off licence open now', icon: AlcoholIcon, description: 'Find off-licences and convenience stores open late near you.' },
    { name: 'Late Food', query: 'takeaway food open now', icon: FoodIcon, description: 'Get hot food, takeaways, and groceries delivered to your door.' },
    { name: 'Cashpoints', query: 'atm open now', icon: CashIcon, description: 'Locate ATMs and cash machines that are accessible now.' },
    { name: 'Hotels', query: 'hotels available tonight', icon: HotelIcon, description: 'Book a room for tonight with immediate availability.' },
    { name: 'Flights', query: 'flights from', icon: FlightIcon, searchType: 'googleFlights' as const, description: 'Search for last-minute flights from your nearest airport.' },
    { name: 'Rides', query: 'taxi service now', icon: RideIcon, description: 'Find taxis, private hire, and ride-sharing services available now.' },
];

const SearchScreen: React.FC<SearchScreenProps> = ({ onError, onSearch, onShowMindfulDrinking, onShowContact }) => {
  const [location, setLocation] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const suggestionBoxRef = useRef<HTMLDivElement>(null);
  const locationInputRef = useRef<HTMLInputElement>(null);

  // State for inline validation and pending search
  const [showLocationError, setShowLocationError] = useState(false);
  const [pendingSearch, setPendingSearch] = useState<{ category: string; query: string; searchType?: 'googleFlights' } | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const description = useMemo(() => {
    if (!selectedCategory) {
        return 'Find off-licences, food, transport and more, available right now.';
    }
    return searchCategories.find(c => c.name === selectedCategory)?.description || '';
  }, [selectedCategory]);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (suggestionBoxRef.current && !suggestionBoxRef.current.contains(event.target as Node)) {
            setSuggestions([]);
        }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLocationChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setLocation(query);
    if (showLocationError) {
      setShowLocationError(false);
    }
    if (query.length > 2) {
      try {
        const results = await fetchAddressSuggestions(query);
        setSuggestions(results);
      } catch (error: any) {
        // This is unlikely to be hit since the service is disabled, but good practice to keep.
        onError({ message: 'Could not fetch address suggestions.', details: error });
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleUseMyLocation = () => {
    setIsGettingLocation(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`${latitude}, ${longitude}`);
          setIsGettingLocation(false);
        },
        (error) => {
          onError({
            message: "Couldn't get your location. Please ensure location services are enabled for your browser and try again.",
            details: error.message
          });
          setIsGettingLocation(false);
        },
        { timeout: 10000, enableHighAccuracy: true }
      );
    } else {
      onError({ message: "Geolocation is not supported by your browser." });
      setIsGettingLocation(false);
    }
  };

  const executeSearch = (searchLocation: string, category: string, query: string, searchType?: 'googleFlights') => {
    const url = searchType === 'googleFlights'
      ? `https://www.google.com/flights?q=${encodeURIComponent(query + ' ' + searchLocation)}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query + ' near ' + searchLocation)}`;
      
    onSearch(url, category);
  };

  const handleSearch = (category: string, query: string, searchType?: 'googleFlights') => {
    setSelectedCategory(category);
    if (!location.trim()) {
      setShowLocationError(true);
      setPendingSearch({ category, query, searchType });
      locationInputRef.current?.focus();
      return;
    }
    executeSearch(location, category, query, searchType);
  };
  
  // Effect to trigger search automatically once location is provided for a pending search
  useEffect(() => {
    if (pendingSearch && location.trim()) {
      executeSearch(location, pendingSearch.category, pendingSearch.query, pendingSearch.searchType);
      setPendingSearch(null);
    }
  }, [location, pendingSearch]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center">
        <div className="w-full max-w-2xl mx-auto">
            <h2 className="text-4xl font-extrabold text-white sm:text-5xl">
                Find what you need, <span className="text-indigo-400">tonight.</span>
            </h2>
            <p className="mt-4 text-xl text-slate-300">Your 24/7 guide to what's open nearby.</p>
            <p className="mt-2 text-lg text-slate-400">Enter your location to find late-night services open near you.</p>

            <div className="mt-8 relative" ref={suggestionBoxRef}>
                <div className="flex flex-col sm:flex-row gap-2">
                    <input
                        ref={locationInputRef}
                        type="text"
                        value={location}
                        onChange={handleLocationChange}
                        placeholder="e.g., 'Manchester Piccadilly' or 'SW1A 0AA'"
                        className={`flex-grow w-full bg-slate-800 border-2 text-white rounded-lg py-3 px-4 text-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder-slate-400 transition-colors ${showLocationError ? 'border-red-500 animate-shake' : 'border-slate-600'}`}
                    />
                    <button
                        onClick={handleUseMyLocation}
                        disabled={isGettingLocation}
                        className="flex-shrink-0 flex items-center justify-center gap-2 bg-slate-700 text-white font-bold py-3 px-4 rounded-lg hover:bg-slate-600 transition-colors disabled:opacity-50 disabled:cursor-wait"
                    >
                        {isGettingLocation ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                            Finding...
                          </>
                        ) : (
                          <>
                            <LocationIcon className="w-5 h-5" />
                            Use My Location
                          </>
                        )}
                    </button>
                </div>
                 {showLocationError && (
                    <p className="text-red-400 text-sm mt-2 text-left animate-fade-in" role="alert">
                        Please enter a location first.
                    </p>
                )}
                {suggestions.length > 0 && (
                    <ul className="absolute z-10 w-full mt-1 bg-slate-800 border border-slate-600 rounded-lg shadow-lg">
                        {suggestions.map((s, i) => (
                            <li key={i}>
                                <button
                                    onClick={() => { setLocation(s); setSuggestions([]); }}
                                    className="w-full text-left px-4 py-2 text-white hover:bg-indigo-600"
                                >
                                    {s}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            
            <div className="mt-6">
                <p className="text-sm text-slate-400 font-medium mb-3">What are you looking for?</p>
                <div className="h-10 flex items-center justify-center mb-3">
                    <p key={description} className="text-slate-300 text-center animate-fade-in">
                        {description}
                    </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {searchCategories.map(({ name, query, icon: Icon, searchType }) => (
                        <button
                            key={name}
                            onClick={() => handleSearch(name, query, searchType)}
                            className={`flex flex-col items-center justify-center gap-2 bg-slate-800/50 p-4 rounded-lg border hover:bg-slate-800 transition-all transform hover:-translate-y-1 ${selectedCategory === name ? 'border-indigo-500' : 'border-slate-700 hover:border-indigo-500'}`}
                        >
                            <Icon className="w-8 h-8 text-indigo-400" />
                            <span className="font-semibold text-white">{name}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-8 border-t border-slate-700/50 pt-8 text-center">
              <p className="text-sm text-slate-400">
                Are you a business owner?{' '}
                <button onClick={onShowContact} className="font-semibold text-indigo-400 hover:text-indigo-300 underline transition-colors">
                  Promote your business with us.
                </button>
              </p>
            </div>

            <div className="mt-8 space-y-4">
                 <MindfulDrinkingCta onShowMindfulDrinking={onShowMindfulDrinking} />
                <ShareButton
                    shareData={{
                        title: 'Off Licence Near Me - Find Late-Night Shops & Support',
                        text: 'Found this useful app for finding things open late at night. It also has support resources.',
                        url: window.location.origin
                    }}
                    title="Share this App"
                    className="w-full bg-slate-700/50 text-slate-300 font-bold py-3 px-6 rounded-lg hover:bg-slate-700 transition-colors flex items-center justify-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.368a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" /></svg>
                    Share This App
                </ShareButton>
            </div>
        </div>
    </div>
  );
};

export default SearchScreen;
