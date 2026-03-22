'use client';

import { useState } from 'react';
import { X, SlidersHorizontal, Home, Building, Layers, Mountain, Droplets, Zap, Camera, Building2, MapPin, ChevronDown } from 'lucide-react';
import { useFilterStore } from '@/store/filterStore';

interface Props {
  onClose: () => void;
  resultCount: number;
}

const PROPERTY_TYPES = [
  { label: 'Shop', icon: Home },
  { label: 'Office Space', icon: Building },
  { label: 'Bare Shell', icon: Layers },
  { label: 'Ready to use', icon: Mountain },
];

const AMENITIES = [
  'Power Backup', 'CCTV', 'Parking', 'Water Storage', 'Lifts', 'Central AC',
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
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 overflow-hidden p-4" onClick={onClose}>
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 border-b border-border bg-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center">
              <SlidersHorizontal className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-heading font-bold text-foreground text-lg leading-tight">Advanced Filters</p>
              <p className="text-xs font-bold text-primary tracking-wide uppercase">Refine Your Search</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4 text-sm font-medium text-foreground/70 mx-auto">
            <button className="hover:text-primary">Buy</button>
            <button className="hover:text-primary">Sell</button>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => { resetFilters(); setMinPrice(0); setMaxPrice(MAX); }}
              className="px-4 py-1.5 text-sm font-semibold border border-border rounded-full hover:border-primary/40 transition-colors"
            >
              Reset
            </button>
            <button
              onClick={handleApply}
              className="px-4 py-1.5 text-sm font-bold bg-primary hover:bg-primary/90 text-white rounded-full transition-colors"
            >
              Show {resultCount} Results
            </button>
            <button onClick={onClose} className="p-1.5 rounded-full hover:bg-muted/10 ml-1">
              <X className="w-5 h-5 text-foreground/60" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* LEFT COLUMN */}
          <div className="space-y-6">
            {/* PRICE RANGE */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-heading font-bold text-foreground">Price Range</h3>
              </div>
              <div className="relative pt-6 pb-2">
                <div className="flex justify-between mb-1">
                  <div className="bg-foreground text-white text-xs font-bold px-2 py-1 rounded-md">
                    Min: {fmtPrice(minPrice)}
                  </div>
                  <div className="bg-foreground text-white text-xs font-bold px-2 py-1 rounded-md">
                    Max: {fmtPrice(maxPrice)}
                  </div>
                </div>
                <div className="relative h-2 bg-muted/20 rounded-full">
                  <div
                    className="absolute h-2 bg-primary rounded-full"
                    style={{ left: `${(minPrice / MAX) * 100}%`, right: `${100 - (maxPrice / MAX) * 100}%` }}
                  />
                  <input
                    type="range" min={0} max={MAX} step={500000}
                    value={minPrice}
                    onChange={(e) => setMinPrice(Math.min(parseInt(e.target.value), maxPrice - 500000))}
                    className="absolute w-full h-2 opacity-0 cursor-pointer z-10"
                    style={{ top: 0 }}
                  />
                  <input
                    type="range" min={0} max={MAX} step={500000}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Math.max(parseInt(e.target.value), minPrice + 500000))}
                    className="absolute w-full h-2 opacity-0 cursor-pointer z-10"
                    style={{ top: 0 }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-xs text-muted">
                  <span>₹0</span><span>₹10Cr+</span>
                </div>
              </div>
            </div>

            {/* SQUARE FOOTAGE */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-heading font-bold text-foreground">Square Footage</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text" placeholder="Min sqft"
                  value={filters.minSqft}
                  onChange={(e) => setFilter('minSqft', e.target.value)}
                  className="border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:border-primary/50 bg-background"
                />
                <input
                  type="text" placeholder="Max sqft"
                  value={filters.maxSqft}
                  onChange={(e) => setFilter('maxSqft', e.target.value)}
                  className="border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:border-primary/50 bg-background"
                />
              </div>
            </div>

            {/* YEAR BUILT */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Camera className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-heading font-bold text-foreground">Year Built</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {['No Min', 'No Max'].map((label) => (
                  <div key={label} className="relative">
                    <select className="w-full border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:border-primary/50 appearance-none bg-background text-muted">
                      <option>{label}</option>
                      {[2000, 2005, 2010, 2015, 2018, 2020, 2022, 2024].map((y) => (
                        <option key={y}>{y}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">
            {/* PROPERTY TYPE */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Building className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-heading font-bold text-foreground">Property Type</h3>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {PROPERTY_TYPES.map(({ label, icon: Icon }) => {
                  const active = filters.propertyTypes.includes(label);
                  return (
                    <button
                      key={label}
                      onClick={() => toggleType(label)}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-semibold transition-colors text-left ${
                        active ? 'border-primary bg-primary/5 text-primary' : 'border-border text-foreground/70 hover:border-primary/40'
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
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Droplets className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-heading font-bold text-foreground">Specific Amenities</h3>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {AMENITIES.map((a) => {
                  const checked = filters.amenities.includes(a);
                  return (
                    <button
                      key={a}
                      onClick={() => toggleAmenity(a)}
                      className={`flex items-center gap-1.5 px-2 py-1.5 rounded-full border text-xs font-semibold transition-colors ${
                        checked ? 'border-primary text-primary bg-primary/5' : 'border-border text-muted hover:border-primary/40'
                      }`}
                    >
                      <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center flex-shrink-0 ${checked ? 'border-primary bg-primary' : 'border-muted'}`}>
                        {checked && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                      </div>
                      {a}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* PROXIMITY */}
        <div className="mx-6 mb-6 bg-background rounded-xl border border-border p-4">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-primary" />
            <h3 className="font-heading font-bold text-foreground">Proximity to Interest Points</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'SCHOOLS', key: 'schools' as const, options: ['Within 0.5 miles', 'Within 1 mile', 'Within 2 miles', 'Within 5 miles'] },
              { label: 'PUBLIC TRANSIT', key: 'transit' as const, options: ['Walking distance (<0.5mi)', 'Within 1 mile', 'Within 2 miles'] },
              { label: 'PARKS & RECREATION', key: 'parks' as const, options: ['Within 0.5 mile', 'Within 1 mile', 'Within 2 miles'] },
            ].map(({ label, key, options }) => (
              <div key={key}>
                <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-2">{label}</p>
                <div className="relative">
                  <select
                    value={filters[key]}
                    onChange={(e) => setFilter(key, e.target.value)}
                    className="w-full border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:border-primary/50 appearance-none bg-white"
                  >
                    {options.map((o) => <option key={o}>{o}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>

        {/* FOOTER */}
        <div className="flex-shrink-0 px-6 py-4 border-t border-border flex items-center justify-between bg-white">
          <p className="text-xs text-muted max-w-sm">
            Filters are automatically synchronized with the live map view in the background.
          </p>
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="text-sm font-semibold text-foreground/70 hover:text-foreground px-4 py-2">Cancel</button>
            <button onClick={handleApply} className="bg-primary hover:bg-primary/90 text-white font-bold px-6 py-2.5 rounded-xl transition-colors text-sm">
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
