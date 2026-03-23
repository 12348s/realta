'use client';

import { useState } from 'react';
import { X, SlidersHorizontal, Home, Building, Mountain, Droplets, Camera, Building2, MapPin, ChevronDown, Wallet, Ruler, CheckCircle2, Circle } from 'lucide-react';
import { useFilterStore } from '@/store/filterStore';

interface Props {
  onClose: () => void;
  resultCount: number;
}

const PROPERTY_TYPES = [
  { label: 'House', icon: Home },
  { label: 'Condo', icon: Building2 },
  { label: 'Townhouse', icon: Building },
  { label: 'Land', icon: Mountain },
];

const AMENITIES = [
  'Pool', 'Parking', 'Mountain View', 'Waterfront', 'Gym', 'Smart Home',
];

export default function AdvancedFiltersModal({ onClose, resultCount }: Props) {
  const { filters, setFilter, resetFilters } = useFilterStore();

  const [minPrice, setMinPrice] = useState(filters.minPrice);
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice > 50000000 ? 50000000 : filters.maxPrice);

  const fmtPrice = (v: number) => {
    if (v >= 10000000) return `₹${(v / 10000000).toFixed(1)}Cr`;
    if (v >= 100000) return `₹${(v / 100000).toFixed(0)}L`;
    return `₹${v.toLocaleString()}`;
  };

  const toggleType = (t: string) => {
    const cur = filters.propertyTypes;
    setFilter('propertyTypes', cur.includes(t) ? cur.filter(x => x !== t) : [...cur, t]);
  };

  const toggleAmenity = (a: string) => {
    const cur = filters.amenities;
    setFilter('amenities', cur.includes(a) ? cur.filter(x => x !== a) : [...cur, a]);
  };

  const handleApply = () => {
    setFilter('minPrice', minPrice);
    setFilter('maxPrice', maxPrice);
    onClose();
  };

  const MAX = 100000000;

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#e4efe0]/90 z-[9999] overflow-y-auto p-4 sm:p-6" onClick={onClose}>
      
      <div
        className="relative bg-white rounded-[32px] shadow-2xl w-full max-w-5xl flex flex-col overflow-hidden my-auto border border-white/50"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="flex-shrink-0 flex items-center justify-between px-8 py-6 border-b border-gray-100">
          
          <div className="flex items-center gap-10">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#E8622A] rounded-lg flex items-center justify-center">
                <Home className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading font-bold text-xl tracking-tight text-gray-900">Realta</span>
            </div>
            
            <div className="w-px h-8 bg-gray-200"></div>

            {/* Title */}
            <div className="flex items-center gap-3">
              <SlidersHorizontal className="w-6 h-6 text-[#E8622A]" />
              <div>
                <p className="font-heading font-bold text-gray-900 text-lg leading-tight">Advanced Filters</p>
                <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">Refine Your Search</p>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 font-semibold text-sm text-gray-600 mr-auto ml-10">
            <button className="text-gray-900">Buy</button>
            <button className="hover:text-gray-900">Sell</button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => { resetFilters(); setMinPrice(0); setMaxPrice(MAX); }}
              className="px-5 py-2 text-sm font-bold text-[#cf6238] bg-[#fdf3ef] rounded-full hover:bg-[#fae6de] transition-colors"
            >
              Reset
            </button>
            <button
              onClick={handleApply}
              className="px-5 py-2 text-sm font-bold bg-[#E8622A] hover:bg-[#d45622] text-white rounded-full transition-colors shadow-md"
            >
              Show {resultCount} Results
            </button>
            <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 ml-2 transition-colors">
              <X className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* MODAL BODY */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 sm:p-10 px-8 sm:px-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            
            {/* LEFT COLUMN */}
            <div className="space-y-12">
              
              {/* PRICE RANGE */}
              <div>
                <div className="flex items-center gap-2.5 mb-8">
                  <Wallet className="w-5 h-5 text-[#E8622A]" />
                  <h3 className="font-heading font-bold text-lg text-gray-900">Price Range</h3>
                </div>
                
                <div className="relative pt-6 pb-2 px-2">
                  <div className="relative h-1.5 bg-[#f4e6de] rounded-full mt-4">
                    <div
                      className="absolute h-full bg-[#E8622A] rounded-full pointer-events-none"
                      style={{ left: `${(minPrice / MAX) * 100}%`, right: `${100 - (maxPrice / MAX) * 100}%` }}
                    />
                    
                    {/* Min Handle & Tooltip */}
                    <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-[3px] border-[#E8622A] rounded-full shadow pointer-events-none z-20" style={{ left: `calc(${(minPrice / MAX) * 100}% - 8px)` }}>
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#2d3748] text-white text-[10px] uppercase font-bold px-2 py-1 rounded-md shadow-md text-center">
                        <span className="text-gray-400 block text-[8px] leading-tight">Min:</span>
                        {fmtPrice(minPrice)}
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-solid border-t-[#2d3748] border-t-[5px] border-x-transparent border-x-[5px] border-b-0"></div>
                      </div>
                    </div>

                    {/* Max Handle & Tooltip */}
                    <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-[3px] border-[#E8622A] rounded-full shadow pointer-events-none z-20" style={{ left: `calc(${(maxPrice / MAX) * 100}% - 8px)` }}>
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#2d3748] text-white text-[10px] uppercase font-bold px-2 py-1 rounded-md shadow-md text-center">
                        <span className="text-gray-400 block text-[8px] leading-tight">Max:</span>
                        {fmtPrice(maxPrice)}
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-solid border-t-[#2d3748] border-t-[5px] border-x-transparent border-x-[5px] border-b-0"></div>
                      </div>
                    </div>

                    <input
                      type="range" min={0} max={MAX} step={500000}
                      value={minPrice}
                      onChange={(e) => setMinPrice(Math.min(parseInt(e.target.value), maxPrice - 500000))}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-30"
                      style={{ zIndex: minPrice > MAX - 1000000 ? 40 : 30 }}
                    />
                    <input
                      type="range" min={0} max={MAX} step={500000}
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Math.max(parseInt(e.target.value), minPrice + 500000))}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-40"
                    />
                  </div>
                  <div className="flex justify-between mt-5 text-xs font-bold text-gray-400">
                    <span>₹0</span><span>₹10Cr+</span>
                  </div>
                </div>
              </div>

              {/* SQUARE FOOTAGE */}
              <div>
                <div className="flex items-center gap-2.5 mb-5">
                  <Ruler className="w-5 h-5 text-[#E8622A]" />
                  <h3 className="font-heading font-bold text-lg text-gray-900">Square Footage</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text" placeholder="Min sqft"
                    value={filters.minSqft}
                    onChange={(e) => setFilter('minSqft', e.target.value)}
                    className="border border-gray-200 rounded-full px-5 py-3 text-sm outline-none focus:border-[#E8622A]/50 bg-[#F9FAFB] text-gray-900 placeholder:text-gray-400 font-medium"
                  />
                  <input
                    type="text" placeholder="Max sqft"
                    value={filters.maxSqft}
                    onChange={(e) => setFilter('maxSqft', e.target.value)}
                    className="border border-gray-200 rounded-full px-5 py-3 text-sm outline-none focus:border-[#E8622A]/50 bg-[#F9FAFB] text-gray-900 placeholder:text-gray-400 font-medium"
                  />
                </div>
              </div>

              {/* YEAR BUILT */}
              <div>
                <div className="flex items-center gap-2.5 mb-5">
                  <Camera className="w-5 h-5 text-[#E8622A]" />
                  <h3 className="font-heading font-bold text-lg text-gray-900">Year Built</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {['No Min', 'No Max'].map((label) => (
                    <div key={label} className="relative">
                      <select className="w-full border border-gray-200 rounded-full px-5 py-3 text-sm outline-none focus:border-[#E8622A]/50 appearance-none bg-[#F9FAFB] text-gray-900 font-medium">
                        <option>{label}</option>
                        {[2000, 2005, 2010, 2015, 2018, 2020, 2022, 2024].map((y) => (
                          <option key={y}>{y}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-12">
              
              {/* PROPERTY TYPE */}
              <div>
                <div className="flex items-center gap-2.5 mb-5">
                  <Building className="w-5 h-5 text-[#E8622A]" />
                  <h3 className="font-heading font-bold text-lg text-gray-900">Property Type</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {PROPERTY_TYPES.map(({ label, icon: Icon }) => {
                    const active = filters.propertyTypes.includes(label);
                    return (
                      <button
                        key={label}
                        onClick={() => toggleType(label)}
                        className={`flex items-center gap-3 px-4 py-3 border rounded-full text-[13px] font-bold transition-colors text-left ${
                          active ? 'border-[#E8622A] bg-[#fef5f2] text-[#E8622A]' : 'border-gray-200 text-gray-700 hover:border-[#E8622A]/40'
                        }`}
                      >
                        <Icon className="w-4 h-4 flex-shrink-0" /> {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* AMENITIES */}
              <div>
                <div className="flex items-center gap-2.5 mb-5">
                  <Droplets className="w-5 h-5 text-[#E8622A]" />
                  <h3 className="font-heading font-bold text-lg text-gray-900">Specific Amenities</h3>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {AMENITIES.map((a) => {
                    const checked = filters.amenities.includes(a);
                    return (
                      <button
                        key={a}
                        onClick={() => toggleAmenity(a)}
                        className={`flex items-center gap-2 px-3 py-2 border rounded-full text-[12px] font-bold transition-colors ${
                          checked ? 'border-gray-200 text-gray-900 bg-white shadow-sm' : 'border-gray-200 text-gray-600 hover:border-gray-300 bg-[#F9FAFB]'
                        }`}
                      >
                        {checked ? (
                          <CheckCircle2 className="w-[18px] h-[18px] text-[#E8622A] fill-[#E8622A] bg-white rounded-full flex-shrink-0" />
                        ) : (
                          <Circle className="w-[18px] h-[18px] text-gray-300 flex-shrink-0" />
                        )}
                        <span className="truncate">{a}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* PROXIMITY */}
          <div className="mt-12 bg-[#FCFAF8] rounded-[24px] border border-[#fae2d6] p-8 px-10">
            <div className="flex items-center gap-2.5 mb-6">
              <MapPin className="w-5 h-5 text-[#E8622A]" />
              <h3 className="font-heading font-bold text-lg text-gray-900">Proximity to Interest Points</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'SCHOOLS', key: 'schools' as const, options: ['Within 2 miles', 'Within 5 miles', 'Within 10 miles'] },
                { label: 'PUBLIC TRANSIT', key: 'transit' as const, options: ['Walking distance (< 0.5mi)', 'Within 1 mile', 'Within 2 miles'] },
                { label: 'PARKS & RECREATION', key: 'parks' as const, options: ['Within 1 mile', 'Within 2 miles', 'Within 5 miles'] },
              ].map(({ label, key, options }) => (
                <div key={key}>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.15em] mb-2 pl-1">{label}</p>
                  <div className="relative">
                    <select
                      value={filters[key]}
                      onChange={(e) => setFilter(key, e.target.value)}
                      className="w-full border border-gray-200 rounded-full px-5 py-3 text-[13px] font-semibold outline-none focus:border-[#E8622A]/50 appearance-none bg-white text-gray-800 shadow-sm"
                    >
                      {options.map((o) => <option key={o}>{o}</option>)}
                    </select>
                    <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* FOOTER */}
        <div className="flex-shrink-0 px-8 py-5 border-t border-gray-100 flex items-center justify-end bg-white/90 backdrop-blur-sm gap-4">
          <button onClick={onClose} className="text-[13px] font-bold text-gray-600 hover:text-gray-900 px-4 py-2">Cancel</button>
          <button onClick={handleApply} className="bg-[#E8622A] hover:bg-[#d45622] text-white font-bold px-8 py-3 rounded-full shadow-md transition-all hover:-translate-y-0.5 text-sm">
            Apply Filters
          </button>
        </div>
      </div>
      
      {/* Outside Helper Text */}
      <div className="mt-4 text-center">
        <p className="text-gray-600 text-xs font-medium max-w-sm mx-auto drop-shadow-sm">
          Filters are automatically synchronized with the live map view in the background. 
          Close this panel to explore individual property details.
        </p>
      </div>
      
    </div>
  );
}
