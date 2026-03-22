'use client';

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { Home, Bell, ChevronDown, SlidersHorizontal, Map as MapIcon, List, Ruler, Building2, Heart } from 'lucide-react';
import propertiesData from '@/app/data/mumbaiProperties.json';
import AdvancedFiltersModal from '@/components/AdvancedFiltersModal';

const PropertyMap = dynamic(
  () => import('@/components/PropertyMap'),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-gray-100 animate-pulse rounded-lg" />
    )
  }
);

const PRICE_RANGES = ['All', 'Under ₹75L', '₹75L–₹2Cr', '₹2Cr–₹5Cr', 'Above ₹5Cr'];
const SIZE_RANGES = ['All', 'Under 300 sqft', '300–700 sqft', 'Above 700 sqft'];
const LOCALITIES = ['All', 'Dahisar East', 'Dahisar West', 'Andheri West', 'Lower Parel', 'Ghatkopar West', 'Borivali East', 'Borivali West', 'Malad East'];

export default function PropertiesClient({ initialLocation }: { initialLocation?: string }) {
  const [typeFilter, setTypeFilter] = useState('All');
  const [priceFilter, setPriceFilter] = useState('All');
  const [sizeFilter, setSizeFilter] = useState('All');
  const [possessionFilter, setPossessionFilter] = useState('All');
  const [localityFilter, setLocalityFilter] = useState(
    initialLocation && LOCALITIES.includes(initialLocation) ? initialLocation : 'All'
  );

  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [showMapMobile, setShowMapMobile] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const filteredProperties = useMemo(() => {
    return propertiesData.filter(p => {
      // Type
      if (typeFilter !== 'All' && p.propertyType !== typeFilter) return false;
      
      // Locality
      if (localityFilter !== 'All' && p.location.locality !== localityFilter) return false;

      // Possession
      if (possessionFilter !== 'All' && p.possession.status !== possessionFilter) return false;

      // Size
      if (sizeFilter !== 'All') {
        const sqftMatch = p.configurations.match(/(\d+)/);
        const sqft = sqftMatch ? parseInt(sqftMatch[0]) : 0;
        if (sizeFilter === 'Under 300 sqft' && sqft >= 300) return false;
        if (sizeFilter === '300–700 sqft' && (sqft < 300 || sqft > 700)) return false;
        if (sizeFilter === 'Above 700 sqft' && sqft <= 700) return false;
      }

      // Price (Using minValue which is in INR. 75L = 7,500,000)
      if (priceFilter !== 'All') {
        const val = p.price.minValue;
        if (priceFilter === 'Under ₹75L' && val >= 7500000) return false;
        if (priceFilter === '₹75L–₹2Cr' && (val < 7500000 || val > 20000000)) return false;
        if (priceFilter === '₹2Cr–₹5Cr' && (val < 20000000 || val > 50000000)) return false;
        if (priceFilter === 'Above ₹5Cr' && val <= 50000000) return false;
      }

      return true;
    });
  }, [typeFilter, priceFilter, sizeFilter, possessionFilter, localityFilter]);

  const displayLocation = localityFilter !== 'All' ? localityFilter : (initialLocation || 'Mumbai');

  return (
    <div className="h-screen flex flex-col font-sans bg-background overflow-hidden relative">
      {showFilters && (
        <AdvancedFiltersModal onClose={() => setShowFilters(false)} resultCount={filteredProperties.length} />
      )}
      {/* NAVBAR */}
      <header className="flex-shrink-0 bg-white border-b border-border z-50">
        <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href="/" className="flex items-center gap-2">
              <Home className="w-6 h-6 text-primary" />
              <span className="font-heading font-bold text-xl tracking-tight text-foreground">Realta</span>
            </a>
            <nav className="hidden md:flex items-center gap-6 font-medium text-sm text-foreground/80">
              <a href="#" className="hover:text-primary transition-colors">Buy</a>
              <a href="#" className="hover:text-primary transition-colors">Sell</a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex bg-muted/10 rounded-full px-4 py-2 border border-border/50 focus-within:border-primary/50 focus-within:bg-white transition-colors">
              <input 
                type="text" 
                placeholder="Search city, zip, or address" 
                className="bg-transparent border-none outline-none text-sm w-64 placeholder:text-muted truncate text-foreground"
                defaultValue={initialLocation}
              />
            </div>
            <button className="p-2 rounded-full hover:bg-muted/10 group transition-colors">
              <Bell className="w-5 h-5 text-foreground/80 group-hover:text-primary" />
            </button>
            <div className="w-8 h-8 rounded-full bg-muted/20 border border-border overflow-hidden">
              <Image src="https://ui-avatars.com/api/?name=User&background=E8622A&color=fff" alt="User" width={32} height={32} />
            </div>
          </div>
        </div>
      </header>

      {/* FILTER BAR */}
      <div className="flex-shrink-0 bg-white border-b border-border z-40 shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-3">
            
            <FilterSelect 
              label="Property Type" 
              options={['All', 'Shop', 'Office Space']} 
              value={typeFilter} 
              onChange={setTypeFilter} 
            />
            
            <FilterSelect 
              label="Price Range" 
              options={PRICE_RANGES} 
              value={priceFilter} 
              onChange={setPriceFilter} 
            />
            
            <FilterSelect 
              label="Size" 
              options={SIZE_RANGES} 
              value={sizeFilter} 
              onChange={setSizeFilter} 
            />
            
            <FilterSelect 
              label="Possession" 
              options={['All', 'Ready to move', 'Under Construction']} 
              value={possessionFilter} 
              onChange={setPossessionFilter} 
            />

            <FilterSelect 
              label="Locality" 
              options={LOCALITIES} 
              value={localityFilter} 
              onChange={setLocalityFilter} 
            />

          </div>
          
          <button
            onClick={() => setShowFilters(true)}
            className="flex-shrink-0 bg-[#E8622A] hover:bg-[#d45622] text-white rounded-full px-5 py-2 text-sm font-bold flex items-center gap-2 transition-colors shadow-sm">
            <SlidersHorizontal className="w-4 h-4" />
            <span className="hidden sm:inline">More Filters</span>
          </button>
        </div>
      </div>

      {/* MAIN CONTENT SPLIT */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* LEFT PANEL - LISTINGS */}
        <div className={`w-full lg:w-[40%] flex flex-col bg-background ${showMapMobile ? 'hidden' : 'flex'}`}>
          <div className="p-6 pb-2 border-b border-border/50 sticky top-0 bg-background/95 backdrop-blur-sm z-10 flex justify-between items-end">
            <h1 className="font-heading font-bold text-2xl text-foreground">
              Properties in {displayLocation}
            </h1>
            <span className="text-sm font-medium text-muted">{filteredProperties.length} results</span>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 pb-24">
            {filteredProperties.map(property => (
              <div 
                key={property.propertyId}
                id={`card-${property.propertyId}`}
                onMouseEnter={() => setHoveredId(property.propertyId)}
                onMouseLeave={() => setHoveredId(null)}
                className={`bg-card rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 border-2 ${activeId === property.propertyId ? 'border-primary shadow-lg scale-[1.01]' : 'border-border hover:shadow-xl hover:-translate-y-1'}`}
              >
                <div className="relative h-56 w-full bg-muted/20">
                  <Image 
                    src={property.images[0]?.url || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800"} 
                    alt={property.title} 
                    fill 
                    className="object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800";
                    }}
                  />
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/40 transition-colors z-10">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  {property.possession.status && (
                    <div className={`absolute bottom-4 left-4 text-xs font-bold px-3 py-1.5 rounded-md uppercase tracking-wide shadow-sm z-10 text-white ${property.possession.status === 'Ready to move' ? 'bg-[#E8622A]' : 'bg-[#6B7280]'}`}>
                      {property.possession.status.toUpperCase()}
                    </div>
                  )}
                </div>
                
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-heading text-2xl font-bold text-foreground text-primary">{property.price.range}</h3>
                    <div className="flex items-center gap-1 font-bold text-primary text-sm bg-primary/10 px-2 py-1 rounded-md">
                      ★ 4.5
                    </div>
                  </div>
                  <p className="text-muted font-medium text-sm mb-4 truncate">{property.title} · {property.location.locality}, {property.location.city}</p>
                  
                  <div className="flex items-center gap-6 text-sm text-foreground/80 font-medium pt-4 border-t border-border/50 mt-4 mb-4">
                    <span className="flex items-center gap-2"><Ruler className="w-4 h-4 text-muted" /> {property.configurations}</span>
                    <span className="flex items-center gap-2"><Building2 className="w-4 h-4 text-muted" /> {property.propertyType}</span>
                  </div>
                  <Link 
                    href={`/properties/${property.propertyId}`}
                    className="block w-full bg-primary/10 hover:bg-primary/20 text-primary text-center font-bold text-sm py-2.5 rounded-xl transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
            {filteredProperties.length === 0 && (
              <div className="text-center py-20">
                <p className="text-muted text-lg">No properties found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PANEL - MAP */}
        <div className={`w-full lg:w-[60%] bg-muted/10 h-full relative ${!showMapMobile ? 'hidden lg:block' : 'block'}`}>
          <PropertyMap 
            properties={filteredProperties} 
            hoveredId={hoveredId} 
            onMarkerClick={(id) => {
              setActiveId(id);
              const el = document.getElementById(`card-${id}`);
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }} 
          />
        </div>

        {/* MOBILE MAP TOGGLE */}
        <div className="lg:hidden absolute bottom-6 left-1/2 -translate-x-1/2 z-50">
          <button 
            onClick={() => setShowMapMobile(!showMapMobile)}
            className="bg-[#1A1A1A] text-white px-6 py-3 rounded-full font-bold shadow-xl flex items-center gap-2 transition-transform active:scale-95"
          >
            {showMapMobile ? (
              <><List className="w-5 h-5"/> Show List</>
            ) : (
              <><MapIcon className="w-5 h-5"/> Show Map</>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}

// Helper component for Select Pills
function FilterSelect({ label, options, value, onChange }: { label: string, options: string[], value: string, onChange: (v: string) => void }) {
  return (
    <div className="relative group flex-shrink-0">
      <select 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-transparent border border-border/80 hover:border-primary/50 text-foreground font-medium text-sm rounded-full pl-4 pr-10 py-2 cursor-pointer outline-none focus:ring-2 focus:ring-primary/20 transition-all no-scrollbar"
      >
        {options.map(opt => (
           <option key={opt} value={opt}>
             {opt === 'All' ? label : opt}
           </option>
        ))}
      </select>
      <ChevronDown className="w-4 h-4 text-muted absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none group-hover:text-primary transition-colors" />
    </div>
  );
}
