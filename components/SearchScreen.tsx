import React, { useState, useRef, useEffect, useMemo } from 'react';
import ShareButton from './ShareButton';
import MindfulDrinkingCta from './MindfulDrinkingCta';
import { OffLicenceIcon, TakeawayIcon, AtmIcon, HotelIcon, FlightIcon, RideIcon, LocationIcon, ShareIcon } from './Icons';
import NewsletterSignup from './NewsletterSignup';

interface SearchScreenProps {
  onError: (error: { message:string; details?: any }) => void;
  onSearch: (url: string, category: string) => void;
  onShowMindfulDrinking: () => void;
  onShowContact: () => void;
}

const SearchScreen: React.FC<SearchScreenProps> = ({ onError, onSearch, onShowMindfulDrinking, onShowContact }) => {
  const [location, setLocation] = useState('');
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState('');
  const [isShake, setIsShake] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const searchCategories = useMemo(() => [
    { name: 'Off-licences', icon: OffLicenceIcon, query: 'off licence open now' },
    { name: 'Takeaways', icon: TakeawayIcon, query: 'takeaways open now' },
    { name: 'ATMs', icon: AtmIcon, query: 'atm open now' },
    { name: 'Hotels', icon: HotelIcon, query: 'hotels available now' },
    { name: 'Flights', icon: FlightIcon, query: 'flights today' },
    { name: 'Rides', icon: RideIcon, query: 'taxi near me' },
  ], []);

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };
  
  const handleUseCurrentLocation = () => {
    setLocationError('');
    setIsLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation(`${latitude}, ${longitude}`);
        setIsLoadingLocation(false);
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      },
      (error) => {
        setIsLoadingLocation(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError("Location access denied. Please enable it in your browser settings.");
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            setLocationError("The request to get user location timed out.");
            break;
          default:
            setLocationError("An unknown error occurred.");
            break;
        }
      }
    );
  };

  const handleCategorySearch = (query: string, category: string) => {
    if (!location.trim()) {
      setIsShake(true);
      setLocationError('Please enter a location first.');
      setTimeout(() => setIsShake(false), 500);
      return;
    }
    setLocationError('');

    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)} near ${encodeURIComponent(location)}`;
    onSearch(mapsUrl, category);
  };
  
  useEffect(() => {
    if (location.trim()) {
      setLocationError('');
    }
  }, [location]);

  return (
    <div className="flex flex-col h-full">
      <div className="text-center">
        <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight">
          Find out what's <span className="text-indigo-400">Near Me.</span>
        </h1>
        <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
          Your 24/7 guide to local services open now across the UK. Instantly find off-licences, takeaways, ATMs, and more.
        </p>
      </div>

      <div className={`relative max-w-3xl mx-auto w-full mt-8 ${isShake ? 'animate-shake' : ''}`}>
        <div className="relative">
            <input
              ref={searchInputRef}
              type="text"
              value={location}
              onChange={handleLocationChange}
              placeholder="Enter postcode, town, or city..."
              className="w-full text-lg pl-4 pr-16 py-4 bg-slate-800 border-2 border-slate-700 text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder-slate-400"
            />
            <button
                onClick={handleUseCurrentLocation}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                aria-label="Use current location"
                disabled={isLoadingLocation}
              >
               {isLoadingLocation ? (
                 <svg className="animate-spin h-6 w-6 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 * 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                 </svg>
               ) : (
                 <LocationIcon className="w-6 h-6" />
               )}
            </button>
        </div>
        {locationError && <p className="text-red-400 text-sm mt-2 text-center">{locationError}</p>}
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold text-white text-center mb-4">What are you looking for?</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4 max-w-3xl mx-auto">
          {searchCategories.map((cat, index) => (
            <button
              key={cat.name}
              onClick={() => handleCategorySearch(cat.query, cat.name)}
              className="flex flex-col items-center justify-center p-4 bg-slate-800/80 rounded-lg border border-slate-700 hover:bg-indigo-600 hover:border-indigo-500 transition-all duration-200 transform hover:-translate-y-1 text-center"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <cat.icon className="w-8 h-8 text-indigo-400 mb-2" />
              <span className="text-white font-semibold text-sm">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>
      
       <div className="mt-auto pt-12 space-y-6 max-w-3xl mx-auto w-full">
         <div className="text-center text-sm text-slate-400">
            <p>
                Business owner? <button onClick={onShowContact} className="underline text-indigo-400 hover:text-indigo-300">Claim or update your listing.</button>
            </p>
         </div>

        <MindfulDrinkingCta onShowMindfulDrinking={onShowMindfulDrinking} />

        <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                <ShareIcon className="w-12 h-12 text-indigo-400 flex-shrink-0" />
                <div>
                    <h3 className="text-xl font-bold text-white">Help Others, Share the App</h3>
                    <p className="text-slate-300 mt-2">
                        Know someone who could use this? Share a link to this free, private tool.
                    </p>
                </div>
                <ShareButton
                    shareData={{
                        title: "Find Offlicence Near Me - 24/7 UK Off-Licence Finder",
                        text: "A simple app to find local off-licences, food, and more, open now across the UK.",
                        url: window.location.origin
                    }}
                    className="flex-shrink-0 w-full md:w-auto bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-all duration-200 transform hover:scale-105"
                >
                    Share Now
                </ShareButton>
            </div>
        </div>
        
        <NewsletterSignup />

      </div>
    </div>
  );
};

export default SearchScreen;