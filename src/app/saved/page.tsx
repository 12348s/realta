'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Bell, Settings, Heart, Mail, Trash2, Search, BedDouble, Bath, Square } from 'lucide-react';
import { useSavedStore } from '@/store/savedStore';
import propertiesData from '@/app/data/mumbaiProperties.json';

const FALLBACK = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800';

const savedSearches = [
  {
    id: 1,
    title: 'Malibu Beachfront Houses',
    filters: 'Filters: 4+ Beds, Pool, $2M-$5M',
    alertsOn: true,
  },
  {
    id: 2,
    title: 'Modern Condos Manhattan',
    filters: 'Filters: 2+ Beds, Doorman, Gym',
    alertsOn: false,
  },
];

export default function SavedPage() {
  const [activeTab, setActiveTab] = useState<'properties' | 'searches'>('properties');
  const { savedIds, toggle } = useSavedStore();

  const savedProperties = propertiesData.filter(p => savedIds.includes(p.propertyId));

  return (
    <div className="min-h-screen bg-[#F9F9F9] font-sans pb-12">
      {/* NAVBAR */}
      <header className="w-full bg-[#F9F9F9]">
        <div className="px-6 md:px-12 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#E8622A] rounded-lg border-2 border-[#E8622A] flex items-center justify-center">
              <div className="w-0 h-0 border-l-[6px] border-l-transparent border-b-[8px] border-b-white border-r-[6px] border-r-transparent mb-1" />
              <div className="w-5 h-2 bg-white absolute bottom-[26px] mb-[-4px]" />
            </div>
            <span className="font-heading font-extrabold text-[22px] tracking-tight text-gray-900">Realta</span>
          </Link>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-5 mr-4 text-[13px] font-bold text-gray-900">
              <Link href="/properties?type=buy" className="hover:text-[#E8622A] transition-colors">Buy</Link>
              <Link href="/agent/dashboard" className="hover:text-[#E8622A] transition-colors">Sell</Link>
            </div>
            <div className="flex items-center gap-3">
              <button className="w-10 h-10 rounded-full bg-[#fae2d6]/80 flex items-center justify-center text-[#E8622A] hover:bg-[#f6d5c6] transition-colors relative">
                <Bell className="w-[18px] h-[18px] fill-[#E8622A]" />
                <span className="absolute top-[8px] right-[10px] w-2 h-2 bg-[#e8417c] rounded-full border border-white" />
              </button>
              <button className="w-10 h-10 rounded-full bg-[#fae2d6]/80 flex items-center justify-center text-[#E8622A] hover:bg-[#f6d5c6] transition-colors">
                <Settings className="w-[18px] h-[18px] fill-[#E8622A]" />
              </button>
              <Link href="/saved" className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-200">
                <Image src="https://ui-avatars.com/api/?name=Julian&background=F5F0EB&color=000&size=40" alt="User Profile" fill className="object-cover" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-6 md:px-12 py-10">
        {/* PAGE HEADER */}
        <div className="flex items-start justify-between mb-10">
          <div>
            <h1 className="font-heading font-extrabold text-[32px] text-gray-900 leading-tight">My Wishlist</h1>
            <p className="text-[#64748b] text-[15px] font-medium mt-1">Manage your saved properties and search alerts</p>
          </div>
          <div className="flex items-center bg-[#f1f5f9] rounded-full p-1 inline-flex">
            <button
              onClick={() => setActiveTab('properties')}
              className={`px-6 py-2.5 rounded-full text-[13px] font-bold transition-all ${activeTab === 'properties' ? 'bg-white text-[#E8622A] border border-gray-100 shadow-sm' : 'text-[#475569] hover:bg-[#e2e8f0]'}`}
            >
              Properties ({savedIds.length || 12})
            </button>
            <button
              onClick={() => setActiveTab('searches')}
              className={`px-6 py-2.5 rounded-full text-[13px] font-bold transition-all ${activeTab === 'searches' ? 'bg-white text-[#E8622A] border border-gray-100 shadow-sm' : 'text-[#475569] hover:bg-[#e2e8f0]'}`}
            >
              Saved Searches
            </button>
          </div>
        </div>

        {/* PROPERTIES TAB */}
        {activeTab === 'properties' && (
          <>
            {savedProperties.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-[24px] border border-gray-100">
                <Heart className="mx-auto mb-4 text-gray-300" size={48} />
                <h3 className="text-lg font-bold text-gray-500">No saved properties yet</h3>
                <p className="text-gray-400 mt-2 font-medium">Click the heart icon on any property to save it here</p>
                <Link href="/properties" className="mt-6 inline-block bg-[#E8622A] text-white font-bold px-8 py-3 rounded-[16px] shadow-sm hover:bg-[#d45622] transition-colors">
                  Browse Properties
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 border-b border-gray-200/60 pb-16">
                {savedProperties.map((property, index) => {
                  const beds = property.configurations.split(' ')[0] || '3';
                  const baths = index % 2 === 0 ? '4' : '2';
                  const sqft = index % 2 === 0 ? '4,200' : '2,100';
                  
                  return (
                    <div key={property.propertyId} className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                      <div className="relative h-[220px]">
                        <Image src={property.images[0]?.url || FALLBACK} alt={property.title} fill className="object-cover" onError={(e) => { e.currentTarget.src = FALLBACK; }} />
                        {index === 0 && (
                          <div className="absolute bottom-4 left-4 bg-[#d45622] text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wide shadow-sm">
                            NEW LISTING
                          </div>
                        )}
                        <button
                          onClick={(e) => {
                            e.preventDefault(); e.stopPropagation(); toggle(property.propertyId);
                          }}
                          className="absolute top-4 right-4 w-[38px] h-[38px] rounded-full bg-white flex items-center justify-center shadow-md hover:scale-105 transition-transform"
                        >
                          <Heart className="w-4 h-4 fill-[#d45622] text-[#d45622]" />
                        </button>
                      </div>
                      
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-1 text-gray-900">
                          <h3 className="font-heading font-extrabold text-[19px] truncate tracking-tight">{property.title.split(',')[0]}</h3>
                          <span className="text-[#d45622] font-extrabold text-[18px] flex-shrink-0 ml-2">{property.price.range.split(' - ')[0] || property.price.range}</span>
                        </div>
                        <p className="text-[#8094a8] text-[13px] font-semibold mb-6 truncate">{property.location.locality}, MH 4000{index}0</p>
                        
                        <div className="flex items-center gap-5 text-[12px] text-[#8094a8] font-bold mb-7">
                          <span className="flex items-center gap-1.5"><BedDouble className="w-[15px] h-[15px]" /> {beds} Beds</span>
                          <span className="flex items-center gap-1.5"><Bath className="w-[15px] h-[15px]" /> {baths} Baths</span>
                          <span className="flex items-center gap-1.5"><Square className="w-[15px] h-[15px]" /> {sqft} sqft</span>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <a href="mailto:agent@realta.com" className="flex items-center justify-center gap-2 border-[1.5px] border-[#d45622] text-[#d45622] bg-white text-[13px] font-bold py-2.5 rounded-[14px] hover:bg-[#E8622A]/5 transition-colors">
                            <Mail className="w-4 h-4" /> Contact
                          </a>
                          <Link href={`/properties/${property.propertyId}`} className="flex items-center justify-center bg-[#d45622] hover:bg-[#c04b1c] text-white text-[13px] font-bold py-2.5 rounded-[14px] transition-colors shadow-sm">
                            Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* SAVED SEARCHES TAB */}
        {activeTab === 'searches' && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-heading font-extrabold text-[24px] text-gray-900 tracking-tight">Saved Searches</h2>
              <button className="text-[#d45622] font-bold text-[13px] hover:underline">View All Searches</button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {savedSearches.map((search) => (
                <div key={search.id} className="bg-white rounded-[24px] border border-gray-100 shadow-sm p-6 flex flex-col sm:flex-row sm:items-center justify-between hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-5">
                    <div className="w-[52px] h-[52px] rounded-full bg-[#fdf0e9] flex items-center justify-center text-[#E8622A] flex-shrink-0">
                      <Search className="w-[22px] h-[22px] text-[#E8622A]" />
                    </div>
                    <div className="flex-1 min-w-0 pr-4">
                      <p className="font-heading font-extrabold text-[16px] text-gray-900 leading-tight">{search.title}</p>
                      <p className="text-[12px] font-semibold text-[#8094a8] mt-1 truncate">{search.filters}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8 mt-5 sm:mt-0 pl-0 sm:pl-4 self-end sm:self-auto">
                    <div className="flex flex-col items-center gap-2">
                      <p className="text-[10px] font-extrabold tracking-widest text-[#a0afbe] uppercase leading-none">ALERTS</p>
                      <div
                        className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer flex items-center shadow-inner ${search.alertsOn ? 'bg-[#d45622]' : 'bg-[#e2e8f0]'}`}
                      >
                        <div className={`absolute w-[18px] h-[18px] bg-white rounded-full shadow-sm transition-transform duration-200 ${search.alertsOn ? 'translate-x-[22px]' : 'translate-x-[3px]'}`} />
                      </div>
                    </div>
                    <button className="text-[#cbd5e1] hover:text-[#e8417c] transition-colors p-2 -mr-2">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="w-full border-t border-gray-200/60 mt-20 bg-white py-8 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-[18px] h-5 flex flex-col justify-between items-center text-[#E8622A]">
              <div className="w-full h-0 border-l-[4px] border-l-transparent border-t-[8px] border-t-current border-r-[4px] border-r-transparent"></div>
              <div className="w-2/3 h-1 bg-current rounded-sm"></div>
              <div className="w-full h-0 border-l-[4px] border-l-transparent border-b-[8px] border-b-current border-r-[4px] border-r-transparent"></div>
            </div>
            <span className="text-[#64748b] text-[13px] font-medium">© 2024 Realta Properties. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-8 text-[#64748b] text-[13px] font-medium">
            <Link href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-gray-900 transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-gray-900 transition-colors">Support</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
