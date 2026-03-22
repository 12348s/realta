'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Home, Bell, Settings, Heart, Mail, Trash2, Search, BedDouble } from 'lucide-react';
import { useSavedStore } from '@/store/savedStore';
import propertiesData from '@/app/data/mumbaiProperties.json';

const FALLBACK = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800';

const savedSearches = [
  {
    id: 1,
    title: 'Mumbai Commercial Properties',
    filters: 'Filters: Office Space, Ready to move, Under ₹1Cr',
    alertsOn: true,
    iconBg: '#E8622A',
  },
  {
    id: 2,
    title: 'Mumbai Shops',
    filters: 'Filters: Shop, Dahisar, Under ₹5Cr',
    alertsOn: false,
    iconBg: '#6B7280',
  },
];

export default function SavedPage() {
  const [activeTab, setActiveTab] = useState<'properties' | 'searches'>('properties');
  const { savedIds, toggle } = useSavedStore();

  // Show first 3 properties, or saved properties if any exist
  const displayProperties = savedIds.length > 0
    ? propertiesData.filter((p) => savedIds.includes(p.propertyId)).slice(0, 6)
    : propertiesData.slice(0, 3);

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 w-full bg-white border-b border-border/40">
        <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <Home className="w-6 h-6 text-primary" />
              <span className="font-heading font-bold text-xl tracking-tight text-foreground">Realta</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6 font-medium text-sm text-foreground/80">
              <Link href="#" className="hover:text-primary transition-colors">Buy</Link>
              <Link href="#" className="hover:text-primary transition-colors">Sell</Link>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-full hover:bg-muted/10"><Bell className="w-5 h-5 text-foreground/70" /></button>
            <button className="p-2 rounded-full hover:bg-muted/10"><Settings className="w-5 h-5 text-foreground/70" /></button>
            <div className="w-8 h-8 rounded-full overflow-hidden border border-border">
              <Image src="https://ui-avatars.com/api/?name=User&background=E8622A&color=fff" alt="User" width={32} height={32} />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* PAGE HEADER */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="font-heading font-bold text-3xl text-foreground">My Wishlist</h1>
            <p className="text-muted mt-1">Manage your saved properties and search alerts</p>
          </div>
          <div className="flex items-center gap-2 bg-white border border-border rounded-full p-1">
            <button
              onClick={() => setActiveTab('properties')}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${activeTab === 'properties' ? 'border border-primary text-primary' : 'text-muted hover:text-foreground'}`}
            >
              Properties ({displayProperties.length})
            </button>
            <button
              onClick={() => setActiveTab('searches')}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${activeTab === 'searches' ? 'border border-primary text-primary' : 'text-muted hover:text-foreground'}`}
            >
              Saved Searches
            </button>
          </div>
        </div>

        {/* PROPERTIES TAB */}
        {activeTab === 'properties' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayProperties.map((property) => (
              <div key={property.propertyId} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={property.images[0]?.url || FALLBACK} alt={property.title} fill className="object-cover"
                    onError={(e) => { e.currentTarget.src = FALLBACK; }}
                  />
                  <div className="absolute bottom-3 left-3 bg-primary text-white text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wide">
                    NEW LISTING
                  </div>
                  <button
                    onClick={() => toggle(property.propertyId)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md hover:scale-110 transition-transform"
                  >
                    <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                  </button>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-heading font-bold text-foreground truncate">{property.title}</h3>
                    <span className="text-primary font-bold text-sm flex-shrink-0 ml-2">{property.price.range}</span>
                  </div>
                  <p className="text-muted text-sm mb-4 truncate">{property.location.locality}, {property.location.city}</p>
                  <div className="border-t border-border/50 pt-3 mb-4 flex items-center gap-4 text-sm text-foreground/70">
                    <span className="flex items-center gap-1.5"><BedDouble className="w-4 h-4 text-muted" />{property.configurations}</span>
                    <span className="flex items-center gap-1.5"><Home className="w-4 h-4 text-muted" />{property.propertyType}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="flex items-center justify-center gap-2 border border-border text-foreground text-sm font-semibold py-2 rounded-xl hover:border-primary/40 transition-colors">
                      <Mail className="w-4 h-4" /> Contact
                    </button>
                    <Link
                      href={`/properties/${property.propertyId}`}
                      className="flex items-center justify-center bg-primary hover:bg-primary/90 text-white text-sm font-semibold py-2 rounded-xl transition-colors"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* SAVED SEARCHES TAB */}
        {activeTab === 'searches' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedSearches.map((search) => (
                <div key={search.id} className="bg-white rounded-2xl border border-border p-5 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center" style={{ background: search.iconBg }}>
                    <Search className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground">{search.title}</p>
                    <p className="text-xs text-muted mt-0.5 truncate">{search.filters}</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-muted uppercase tracking-wide">ALERTS</p>
                      <div
                        className={`mt-1 w-10 h-6 rounded-full transition-colors relative cursor-pointer ${search.alertsOn ? 'bg-primary' : 'bg-muted/30'}`}
                      >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${search.alertsOn ? 'left-5' : 'left-1'}`} />
                      </div>
                    </div>
                    <button className="p-1.5 rounded-lg hover:bg-muted/10 text-muted hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="border-t border-border mt-16 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Home className="w-5 h-5 text-primary" />
            <span className="font-heading font-bold text-foreground">Realta</span>
            <span className="text-muted text-sm ml-2">© 2024 Realta Properties. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted">
            <Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Support</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
