'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Calendar, 
  Users, 
  Coins, 
  MapPin, 
  LayoutGrid, 
  ChevronDown, 
  ArrowRight, 
  Check,
  Sparkles
} from 'lucide-react';
import DemoItineraryModal from './DemoItineraryModal';

export default function TripPlannerForm({ options, defaults }) {
  const [tripLength, setTripLength] = useState(defaults?.tripLength || '7 days');
  const [travelers, setTravelers] = useState(defaults?.travelers || '2 travelers');
  const [budget, setBudget] = useState(defaults?.budget || 'Mid-range');
  const [startCity, setStartCity] = useState(defaults?.startCity || 'Colombo');
  const [interests, setInterests] = useState(
    defaults?.interests || ['Nature', 'Culture', 'Safari']
  );

  // Dropdown open states
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const containerRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const handleInterestToggle = (item) => {
    if (interests.includes(item)) {
      if (interests.length > 1) {
        setInterests(interests.filter((i) => i !== item));
      }
    } else {
      setInterests([...interests, item]);
    }
  };

  const handleGenerateClick = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const tripLengths = options?.tripLengths || ['3 days', '5 days', '7 days', '10 days', '14 days'];
  const travelersOptions = options?.travelersOptions || ['1 traveler', '2 travelers', '3 travelers', '4 travelers', '5+ travelers'];
  const budgets = options?.budgets || ['Budget', 'Mid-range', 'Luxury'];
  const startCities = options?.startCities || ['Colombo', 'Negombo', 'Kandy', 'Galle', 'Ella'];
  const interestsOptions = options?.interestsOptions || ['Nature', 'Culture', 'Safari', 'Adventure', 'Beaches', 'Food', 'Wellness'];

  return (
    <div id="planner" className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-14 sm:-mt-16 lg:-mt-20">
      
      {/* Handwritten cursive pointer matching reference: "It all starts here ->" */}
      <div className="relative flex justify-end pr-8 sm:pr-12 mb-1.5 pointer-events-none select-none">
        <span className="font-handwriting text-white text-xl sm:text-2xl font-bold tracking-wide drop-shadow-md rotate-[-4deg]">
          It all starts here ➔
        </span>
      </div>

      <div 
        ref={containerRef}
        className="bg-white rounded-2xl sm:rounded-3xl shadow-xl shadow-slate-950/10 border border-slate-200/80 p-3 sm:p-4 lg:p-4 xl:p-5"
      >
        <form onSubmit={handleGenerateClick} className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-2 lg:gap-2 xl:gap-3">
          
          {/* Field 1: Trip Length */}
          <div className="relative flex-1 min-w-0">
            <button
              type="button"
              onClick={() => toggleDropdown('tripLength')}
              className="w-full text-left p-2 sm:p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all"
            >
              <div className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold mb-0.5">
                <Calendar className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Trip Length</span>
              </div>
              <div className="flex items-center justify-between text-sm font-bold text-slate-800">
                <span className="truncate">{tripLength}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${activeDropdown === 'tripLength' ? 'rotate-180' : ''}`} />
              </div>
            </button>

            {activeDropdown === 'tripLength' && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-50 animate-fade-in">
                {tripLengths.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      setTripLength(option);
                      setActiveDropdown(null);
                    }}
                    className={`w-full px-4 py-2 text-left text-sm font-medium flex items-center justify-between transition-colors ${
                      tripLength === option ? 'text-teal-700 bg-teal-50 font-bold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{option}</span>
                    {tripLength === option && <Check className="w-4 h-4 text-teal-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="hidden lg:block w-px h-8 bg-slate-200 shrink-0" />

          {/* Field 2: Travelers */}
          <div className="relative flex-1 min-w-0">
            <button
              type="button"
              onClick={() => toggleDropdown('travelers')}
              className="w-full text-left p-2 sm:p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all"
            >
              <div className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold mb-0.5">
                <Users className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Travelers</span>
              </div>
              <div className="flex items-center justify-between text-sm font-bold text-slate-800">
                <span className="truncate">{travelers}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${activeDropdown === 'travelers' ? 'rotate-180' : ''}`} />
              </div>
            </button>

            {activeDropdown === 'travelers' && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-50 animate-fade-in">
                {travelersOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      setTravelers(option);
                      setActiveDropdown(null);
                    }}
                    className={`w-full px-4 py-2 text-left text-sm font-medium flex items-center justify-between transition-colors ${
                      travelers === option ? 'text-teal-700 bg-teal-50 font-bold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{option}</span>
                    {travelers === option && <Check className="w-4 h-4 text-teal-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="hidden lg:block w-px h-8 bg-slate-200 shrink-0" />

          {/* Field 3: Budget */}
          <div className="relative flex-1 min-w-0">
            <button
              type="button"
              onClick={() => toggleDropdown('budget')}
              className="w-full text-left p-2 sm:p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all"
            >
              <div className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold mb-0.5">
                <Coins className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Budget <span className="text-[10px] text-slate-400">(per person)</span></span>
              </div>
              <div className="flex items-center justify-between text-sm font-bold text-slate-800">
                <span className="truncate">{budget}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${activeDropdown === 'budget' ? 'rotate-180' : ''}`} />
              </div>
            </button>

            {activeDropdown === 'budget' && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-50 animate-fade-in">
                {budgets.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      setBudget(option);
                      setActiveDropdown(null);
                    }}
                    className={`w-full px-4 py-2 text-left text-sm font-medium flex items-center justify-between transition-colors ${
                      budget === option ? 'text-teal-700 bg-teal-50 font-bold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{option}</span>
                    {budget === option && <Check className="w-4 h-4 text-teal-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="hidden lg:block w-px h-8 bg-slate-200 shrink-0" />

          {/* Field 4: Start City */}
          <div className="relative flex-1 min-w-0">
            <button
              type="button"
              onClick={() => toggleDropdown('startCity')}
              className="w-full text-left p-2 sm:p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all"
            >
              <div className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold mb-0.5">
                <MapPin className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Start City</span>
              </div>
              <div className="flex items-center justify-between text-sm font-bold text-slate-800">
                <span className="truncate">{startCity}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${activeDropdown === 'startCity' ? 'rotate-180' : ''}`} />
              </div>
            </button>

            {activeDropdown === 'startCity' && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-50 animate-fade-in">
                {startCities.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      setStartCity(option);
                      setActiveDropdown(null);
                    }}
                    className={`w-full px-4 py-2 text-left text-sm font-medium flex items-center justify-between transition-colors ${
                      startCity === option ? 'text-teal-700 bg-teal-50 font-bold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{option}</span>
                    {startCity === option && <Check className="w-4 h-4 text-teal-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="hidden lg:block w-px h-8 bg-slate-200 shrink-0" />

          {/* Field 5: Interests */}
          <div className="relative flex-[1.15] min-w-0">
            <button
              type="button"
              onClick={() => toggleDropdown('interests')}
              className="w-full text-left p-2 sm:p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all"
            >
              <div className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold mb-0.5">
                <LayoutGrid className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Interests</span>
              </div>
              <div className="flex items-center justify-between text-sm font-bold text-slate-800">
                <span className="truncate" title={interests.join(', ')}>
                  {interests.length > 0 ? interests.slice(0, 2).join(', ') + (interests.length > 2 ? ` +${interests.length - 2}` : '') : 'Select'}
                </span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${activeDropdown === 'interests' ? 'rotate-180' : ''}`} />
              </div>
            </button>

            {activeDropdown === 'interests' && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-100 p-3 z-50 animate-fade-in space-y-1">
                <div className="text-xs font-semibold text-slate-400 px-1 mb-2">Select All That Apply</div>
                {interestsOptions.map((option) => {
                  const isSelected = interests.includes(option);
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleInterestToggle(option)}
                      className={`w-full px-2.5 py-1.5 text-left text-sm rounded-lg flex items-center justify-between transition-colors ${
                        isSelected ? 'bg-teal-50 text-teal-800 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{option}</span>
                      <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                        isSelected ? 'bg-teal-600 border-teal-600 text-white' : 'border-slate-300'
                      }`}>
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* CTA Action Button: Generate My Trip */}
          <div className="shrink-0 flex items-center justify-center pt-2 lg:pt-0">
            <button
              type="submit"
              className="w-full lg:w-auto px-5 xl:px-6 py-3.5 bg-[#E86339] hover:bg-[#D5532A] text-white font-bold text-sm rounded-xl shadow-md shadow-orange-500/25 hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 shrink-0 group whitespace-nowrap"
            >
              <Sparkles className="w-4 h-4" />
              <span>Generate My Trip</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

        </form>
      </div>

      {/* Demo Modal */}
      <DemoItineraryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        plannerState={{
          tripLength,
          travelers,
          budget,
          startCity,
          interests,
        }}
      />
    </div>
  );
}
