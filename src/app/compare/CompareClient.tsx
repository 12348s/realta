'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Home, X, Plus, Share2, Heart, Calendar, Download, MapPin } from 'lucide-react';
import propertiesData from '@/app/data/mumbaiProperties.json';

const NeighborhoodMap = dynamic(() => import('@/components/NeighborhoodMap'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gray-100 animate-pulse" />,
});

const FALLBACK = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800';
const TABS = ['Overview', 'Architecture', 'Financials', 'Neighborhood'];

interface ModalProps {
  onSelect: (id: string) => void;
  onClose: () => void;
  excludeIds: string[];
}

function SelectModal({ onSelect, onClose, excludeIds }: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-bold text-lg">Select Property</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-muted/10"><X className="w-4 h-4" /></button>
        </div>
        <div className="space-y-3">
          {propertiesData.filter((p) => !excludeIds.includes(p.propertyId)).map((p) => (
            <button
              key={p.propertyId}
              onClick={() => { onSelect(p.propertyId); onClose(); }}
              className="w-full text-left flex items-center gap-3 p-3 rounded-xl hover:bg-muted/10 border border-border transition-colors"
            >
              <div className="w-12 h-12 rounded-lg overflow-hidden relative flex-shrink-0">
                <Image src={p.images[0]?.url || FALLBACK} alt={p.title} fill className="object-cover"
                  onError={(e) => { e.currentTarget.src = FALLBACK; }} />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-sm text-foreground truncate">{p.title}</p>
                <p className="text-primary text-sm font-bold">{p.price.range}</p>
                <p className="text-muted text-xs">{p.location.locality}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CompareClientPage({ initialId }: { initialId?: string }) {
  const [selectedIds, setSelectedIds] = useState<string[]>(initialId ? [initialId] : []);
  const [activeTab, setActiveTab] = useState('Overview');
  const [showModal, setShowModal] = useState(false);

  const selected = useMemo(
    () => selectedIds.map((id) => propertiesData.find((p) => p.propertyId === id)).filter(Boolean) as typeof propertiesData,
    [selectedIds]
  );

  const remove = (id: string) => setSelectedIds((prev) => prev.filter((s) => s !== id));
  const add = (id: string) => setSelectedIds((prev) => [...prev, id]);

  const rows = [
    { label: 'Total Price', getValue: (p: typeof propertiesData[0]) => p.price.range },
    { label: 'Square Footage', getValue: (p: typeof propertiesData[0]) => p.configurations },
    { label: 'Property Type', getValue: (p: typeof propertiesData[0]) => p.propertyType },
    { label: 'Possession Status', getValue: (p: typeof propertiesData[0]) => p.possession.status },
    { label: 'Locality', getValue: (p: typeof propertiesData[0]) => p.location.locality },
    { label: 'Description', getValue: (p: typeof propertiesData[0]) => p.description.slice(0, 60) + '…' },
    { label: 'Location Score', getValue: () => '9.2 ★★★★★' },
  ];

  return (
    <div className="min-h-screen bg-background font-sans">
      {showModal && (
        <SelectModal onSelect={add} onClose={() => setShowModal(false)} excludeIds={selectedIds} />
      )}

      {/* NAVBAR */}
      <header className="sticky top-0 z-40 w-full bg-white border-b border-border/40">
        <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Home className="w-6 h-6 text-primary" />
            <span className="font-heading font-bold text-xl tracking-tight text-foreground">Realta</span>
          </Link>
          <div className="flex items-center gap-3">
            <button className="p-2.5 rounded-full border border-border hover:border-primary/40">
              <Share2 className="w-4 h-4 text-foreground/70" />
            </button>
            <button className="p-2.5 rounded-full border border-border hover:border-red-400">
              <Heart className="w-4 h-4 text-foreground/70" />
            </button>
          </div>
        </div>
      </header>

      {/* WELCOME BAR */}
      <div className="bg-white border-b border-border px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src="https://ui-avatars.com/api/?name=User&background=E8622A&color=fff&size=36" alt="User" width={36} height={36} className="rounded-full" />
          <div>
            <p className="font-bold text-sm text-foreground">Welcome back, User</p>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-primary rounded-full" />
              <span className="text-xs font-bold text-primary">Premium Member</span>
            </div>
          </div>
        </div>
        <nav className="flex items-center gap-4 text-sm font-medium text-foreground/80">
          <Link href="#" className="hover:text-primary">Buy</Link>
          <Link href="#" className="hover:text-primary">Sell</Link>
        </nav>
      </div>

      {/* TABS */}
      <div className="border-b border-border bg-white px-4 sm:px-6 lg:px-8">
        <div className="flex gap-6">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 text-sm font-semibold border-b-2 transition-colors ${activeTab === tab ? 'border-primary text-primary' : 'border-transparent text-muted hover:text-foreground'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* PROPERTY SELECTOR */}
        <div className="flex gap-6 items-start mb-8">
          <div className="w-40 flex-shrink-0 self-center text-primary italic font-semibold text-sm leading-snug">
            Select properties to compare features side-by-side
          </div>
          <div className="flex-1 grid grid-cols-3 gap-4">
            {[0, 1, 2].map((idx) => {
              const prop = selected[idx];
              return (
                <div key={idx}>
                  {prop ? (
                    <div className="bg-white rounded-2xl border border-border p-3 relative">
                      <button
                        onClick={() => remove(prop.propertyId)}
                        className="absolute top-2 right-2 z-10 w-6 h-6 bg-white rounded-full shadow border border-border flex items-center justify-center hover:border-red-400 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                      <div className="relative h-32 rounded-xl overflow-hidden mb-3">
                        <Image src={prop.images[0]?.url || FALLBACK} alt={prop.title} fill className="object-cover"
                          onError={(e) => { e.currentTarget.src = FALLBACK; }} />
                      </div>
                      <p className="font-heading font-bold text-foreground text-sm truncate">{prop.title}</p>
                      <p className="text-primary font-bold text-sm">{prop.price.range}</p>
                      <Link href={`/properties/${prop.propertyId}`} className="text-xs text-primary font-semibold hover:underline">View details →</Link>
                    </div>
                  ) : (
                    <button
                      onClick={() => selectedIds.length < 3 && setShowModal(true)}
                      className="w-full h-52 border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center gap-2 hover:border-primary/50 hover:bg-primary/5 transition-colors"
                    >
                      <Plus className="w-6 h-6 text-muted" />
                      <span className="text-sm text-muted font-medium">Add Property</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* COMPARISON TABLE */}
        {selected.length > 0 && (
          <div className="bg-white rounded-2xl border border-border overflow-hidden mb-8">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/5">
                  <th className="text-left px-5 py-3 text-xs font-bold text-muted uppercase tracking-wide w-36">Attribute</th>
                  {selected.map((p) => (
                    <th key={p.propertyId} className="text-left px-5 py-3 text-xs font-bold text-primary uppercase tracking-wide">
                      {p.title.slice(0, 20)}
                    </th>
                  ))}
                  {selected.length < 3 && Array(3 - selected.length).fill(null).map((_, i) => (
                    <th key={`empty-${i}`} className="px-5 py-3" />
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, ri) => (
                  <tr key={row.label} className={`border-t border-border/50 ${ri % 2 === 1 ? 'bg-background/50' : ''}`}>
                    <td className="px-5 py-3 text-sm text-muted font-medium">{row.label}</td>
                    {selected.map((p, pi) => {
                      const val = row.getValue(p);
                      const vals = selected.map(sp => row.getValue(sp));
                      const isBest = vals[pi] === vals[0]; // Highlight first as best for simplicity
                      return (
                        <td key={p.propertyId} className={`px-5 py-3 text-sm font-medium ${isBest && selected.length > 1 ? 'text-primary font-bold' : 'text-foreground'}`}>
                          {val}
                        </td>
                      );
                    })}
                    {selected.length < 3 && Array(3 - selected.length).fill(null).map((_, i) => (
                      <td key={`empty-${i}`} className="px-5 py-3">—</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ACTION BUTTONS */}
        <div className="flex justify-center gap-4 mb-10">
          <button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold px-6 py-3 rounded-full transition-colors shadow-md">
            <Calendar className="w-4 h-4" /> Book Group Viewing
          </button>
          <button className="flex items-center gap-2 border-2 border-primary text-primary hover:bg-primary/5 font-bold px-6 py-3 rounded-full transition-colors">
            <Download className="w-4 h-4" /> Download PDF Report
          </button>
        </div>

        {/* NEIGHBORHOOD MAP */}
        <div className="relative rounded-2xl overflow-hidden h-72 border border-border">
          <NeighborhoodMap properties={selected.length > 0 ? selected : propertiesData.slice(0, 3)} />
          <div className="absolute top-4 left-4 z-[1000]">
            <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
              <MapPin className="w-3 h-3" /> NEIGHBORHOOD CONTEXT
            </span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4 z-[999] pointer-events-none">
            <h3 className="text-white font-heading font-bold text-lg">Explore Mumbai&apos;s Commercial Hubs</h3>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-border py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-4">
          <Home className="w-5 h-5 text-primary" />
          <span className="font-heading font-bold text-foreground">Realta</span>
          <span className="text-muted text-sm">© 2024 Realta Platform. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
