'use client';

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Home, Bell, ChevronDown, SlidersHorizontal, Map as MapIcon, List, Heart, Search, User, Bath, BedDouble, Square } from 'lucide-react';
import propertiesData from '@/app/data/mumbaiProperties.json';
import AdvancedFiltersModal from '@/components/AdvancedFiltersModal';
import { useSavedStore } from '@/store/savedStore';

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

  const router = useRouter();
  const { toggle, isSaved } = useSavedStore();

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
      <header className="flex-shrink-0 bg-[#fcfaf8] border-b border-gray-200 z-50">
        <div className="px-4 sm:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#E8622A] rounded-lg flex items-center justify-center">
                <Home className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading font-bold text-xl tracking-tight text-gray-900">Realta</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6 font-medium text-sm text-gray-700">
              <Link href="/properties?type=buy" className="hover:text-[#E8622A] transition-colors">Buy</Link>
              <Link href="/agent/dashboard" className="hover:text-[#E8622A] transition-colors">Sell</Link>
            </nav>
          </div>
          
          <div className="hidden sm:flex bg-[#f3efe8] rounded-full px-5 py-2.5 flex-1 max-w-lg mx-8 items-center gap-3">
            <Search className="w-4 h-4 text-[#E8622A] flex-shrink-0" />
            <input 
              type="text" 
              placeholder="Search city, zip, or address" 
              className="bg-transparent border-none outline-none text-sm w-full font-medium placeholder:text-gray-400 text-gray-800"
              defaultValue={initialLocation}
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors">
              <Bell className="w-5 h-5 text-gray-900" />
            </button>
            <button className="w-10 h-10 rounded-full bg-[#f3efe8] border border-gray-200 flex items-center justify-center hover:bg-[#eadecc] transition-colors">
              <User className="w-5 h-5 text-gray-900" />
            </button>
          </div>
        </div>
      </header>

      {/* FILTER BAR */}
      <div className="flex-shrink-0 bg-white border-b border-gray-200 z-40 shadow-sm">
        <div className="px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-4">
            
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
            className="flex-shrink-0 bg-[#E8622A] hover:bg-[#d45622] text-white rounded-full px-5 py-2.5 text-sm font-bold flex items-center gap-2 transition-colors shadow-sm ml-4">
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
                onClick={() => router.push(`/properties/${property.propertyId}`)}
                className={`bg-white rounded-[24px] overflow-hidden cursor-pointer transition-all duration-300 ${activeId === property.propertyId ? 'border-2 border-[#E8622A] shadow-lg scale-[1.01]' : 'border border-gray-100 hover:shadow-xl hover:-translate-y-1'}`}
              >
                <div className="relative h-64 sm:h-72 w-full bg-gray-100">
                  <Image 
                    src={property.images[0]?.url || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800"} 
                    alt={property.title} 
                    fill 
                    className="object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800";
                    }}
                  />
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      toggle(property.propertyId);
                    }}
                    className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md z-10 w-9 h-9 flex items-center justify-center hover:scale-105 transition-transform"
                  >
                    <Heart className={`w-5 h-5 ${isSaved(property.propertyId) ? 'fill-[#E8622A] text-[#E8622A]' : 'text-gray-900 fill-transparent'}`} />
                  </button>
                  {property.possession.status && (
                    <div className={`absolute bottom-4 left-4 text-[10px] font-bold px-3 py-1.5 rounded-md uppercase tracking-wide shadow-sm z-10 text-white ${property.possession.status === 'Ready to move' ? 'bg-[#E8622A]' : property.possession.status === 'Under Construction' ? 'bg-[#E8622A]' : 'bg-[#6B7280]'}`}>
                       {property.possession.status === 'Under Construction' ? 'NEW CONSTRUCTION' : property.possession.status.toUpperCase()}
                    </div>
                  )}
                </div>
                
                <div className="p-5 sm:p-6 pb-6">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-heading text-2xl sm:text-[28px] font-bold text-gray-900 tracking-tight">{property.price.range}</h3>
                    <div className="flex items-center gap-1 font-bold text-[#E8622A] text-sm">
                      ★ 4.9
                    </div>
                  </div>
                  <p className="text-gray-500 font-medium text-sm mb-6 truncate">{property.title}, {property.location.locality}</p>
                  
                  <div className="flex items-center gap-5 text-sm text-gray-700 font-semibold truncate pt-1">
                    <span className="flex items-center gap-2"><BedDouble className="w-[18px] h-[18px] text-[#E8622A]" /> <span className="text-gray-900 text-[13px]">{property.configurations.includes('2') ? '2' : property.configurations.includes('3') ? '3' : '4'} Beds</span></span>
                    <span className="flex items-center gap-2"><Bath className="w-[18px] h-[18px] text-[#E8622A]" /> <span className="text-gray-900 text-[13px]">{property.configurations.includes('2') ? '2' : property.configurations.includes('3') ? '3' : '4'} Baths</span></span>
                    <span className="flex items-center gap-2"><Square className="w-[18px] h-[18px] text-[#E8622A]" /> <span className="text-gray-900 text-[13px]">{(Math.random() * (4000 - 1200) + 1200).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} sqft</span></span>
                  </div>
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
        className="appearance-none bg-white border border-gray-300 hover:border-gray-400 text-gray-800 font-medium text-sm rounded-full pl-5 pr-10 py-2.5 cursor-pointer outline-none focus:ring-2 focus:ring-[#E8622A]/20 transition-all no-scrollbar"
      >
        {options.map(opt => (
           <option key={opt} value={opt}>
             {opt === 'All' ? label : opt}
           </option>
        ))}
      </select>
      <ChevronDown className="w-4 h-4 text-gray-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none group-hover:text-gray-800 transition-colors" />
    </div>
  );
}
