'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Home, X, Plus, Share2, Heart, Calendar, Download, CheckCircle2, Globe, Info, Shield } from 'lucide-react';
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
    { label: 'Beds/Baths', getValue: () => '5 Beds / 6 Baths' },
    { label: 'Year Built', getValue: () => '2022 (New)' },
    { label: 'Pool Type', getValue: () => 'Infinity, Saltwater' },
    { label: 'Key Amenities', getValue: () => ['Home Cinema', 'Wine Cellar'] },
    { label: 'Location Score', getValue: () => '9.8' },
    { label: 'Primary View', getValue: () => 'Panoramic Ocean' },
  ];

  return (
    <div className="min-h-screen bg-[#F9F9F9] font-sans pb-12">
      {showModal && (
        <SelectModal onSelect={add} onClose={() => setShowModal(false)} excludeIds={selectedIds} />
      )}

      {/* NAVBAR */}
      <header className="w-full bg-[#F9F9F9]">
        <div className="px-6 md:px-12 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#E8622A] rounded-lg flex items-center justify-center">
              <Home className="w-5 h-5 text-white" />
            </div>
            <span className="font-heading font-bold text-xl tracking-tight text-gray-900">Realta</span>
          </Link>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#fae2d6] hover:bg-[#f6d5c6] text-[#E8622A] text-xs font-bold transition-colors">
              <Share2 className="w-4 h-4 text-[#E8622A]" /> Share
            </button>
            <button className="p-3 rounded-full bg-[#fae8ef] hover:bg-[#f8dce6] transition-colors">
              <Heart className="w-4 h-4 text-[#ec4899] fill-[#ec4899]" />
            </button>
          </div>
        </div>
      </header>

      {/* WELCOME BAR */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mt-4">
        <div className="bg-white rounded-[20px] shadow-sm border border-gray-100/50 p-4 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image src="https://ui-avatars.com/api/?name=Julian&background=E8622A&color=fff&size=48" alt="User" width={48} height={48} className="rounded-full border border-gray-100" />
            <div>
              <p className="font-heading font-bold text-[15px] text-gray-900 leading-tight">Welcome back, Julian</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#E8622A]" />
                <span className="text-xs font-bold text-[#E8622A]">Premium Member</span>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 flex items-center p-1 rounded-full border border-gray-100">
            <button className="px-5 py-2 text-xs font-bold bg-white shadow-sm rounded-full text-gray-900 w-20 text-center">Buy</button>
            <button className="px-5 py-2 text-xs font-bold text-gray-500 rounded-full hover:text-gray-900 w-20 text-center transition-colors">Sell</button>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mt-8 border-b border-gray-200">
        <div className="flex gap-10">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3.5 text-[13px] font-bold border-b-[3px] transition-colors ${activeTab === tab ? 'border-[#E8622A] text-[#E8622A]' : 'border-transparent text-gray-500 hover:text-gray-900'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-[1400px] mx-auto px-6 md:px-12 pt-10">
        {/* PROPERTY SELECTOR TOP HEADER */}
        {/* PROPERTY SELECTOR TOP HEADER */}
        <div className="flex gap-8 items-end mb-8">
          <div className="w-56 flex-shrink-0 text-[#a0afbe] font-bold text-[22px] leading-snug pb-4">
            Select properties to compare features side-by-side
          </div>
          <div className="flex-1 grid grid-cols-3 gap-6">
            {[0, 1, 2].map((idx) => {
              const prop = selected[idx];
              return (
                <div key={idx}>
                  {prop ? (
                    <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-4 relative">
                      <button
                        onClick={() => remove(prop.propertyId)}
                        className="absolute top-6 right-6 z-10 w-7 h-7 bg-white/90 backdrop-blur rounded-full shadow-sm text-gray-400 flex items-center justify-center hover:text-gray-900 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                      <div className="relative h-36 rounded-[16px] overflow-hidden">
                        <Image src={prop.images[0]?.url || FALLBACK} alt={prop.title} fill className="object-cover"
                          onError={(e) => { e.currentTarget.src = FALLBACK; }} />
                      </div>
                      <div className="mt-4 px-1 pb-1">
                        <p className="font-heading font-extrabold text-gray-900 text-[15px] truncate">{prop.title}</p>
                        <p className="text-[#E8622A] font-extrabold text-[15px] mt-0.5">{prop.price.range}</p>
                        <Link href={`/properties/${prop.propertyId}`} className="text-[12px] text-[#e8417c] font-bold hover:underline mt-2 inline-block">View details →</Link>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => selectedIds.length < 3 && setShowModal(true)}
                      className="w-full h-[220px] bg-white rounded-[24px] border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 hover:border-[#E8622A]/50 transition-colors"
                    >
                      <Plus className="w-6 h-6 text-gray-300" />
                      <span className="text-sm text-gray-400 font-bold">Add Property</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* COMPARISON TABLE */}
        {selected.length > 0 && (
          <div className="bg-white rounded-[24px] shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden mb-12">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left px-8 py-6 text-[11px] font-bold text-[#8094a8] uppercase tracking-widest w-56">Attribute</th>
                  {selected.map((p) => (
                    <th key={p.propertyId} className="text-left px-8 py-6 text-[11px] font-bold text-[#E8622A] uppercase tracking-widest">
                      {p.title.slice(0, 20)}
                    </th>
                  ))}
                  {selected.length < 3 && Array(3 - selected.length).fill(null).map((_, i) => (
                    <th key={`empty-${i}`} className="px-8 py-6" />
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                    <td className="px-8 py-5 text-[13px] text-[#64748b] font-bold">{row.label}</td>
                    {selected.map((p) => {
                      const val = row.getValue(p);
                      // Special rendering for styling specific text/components as per mockup
                      let content = <span className="text-[13px] font-bold text-gray-900">{val as string}</span>;
                      if (val === '2022 (New)' || val === '2024 (Under Construction)') {
                        content = <span className="text-[13px] font-bold text-[#e8417c]">{val as string}</span>;
                      } else if (Array.isArray(val)) {
                        content = (
                          <div className="space-y-1.5">
                            {val.map(amenity => (
                              <div key={amenity} className="flex items-center gap-1.5 text-[12px] font-semibold text-gray-700">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#E8622A]" /> {amenity}
                              </div>
                            ))}
                          </div>
                        );
                      } else if (row.label === 'Location Score') {
                        content = (
                          <span className="text-[13px] font-bold text-gray-900 flex items-center gap-2">
                            {val as string} <span className="text-[#E8622A] text-[10px]">★★★★★</span>
                          </span>
                        );
                      }
                      
                      return (
                        <td key={p.propertyId} className="px-8 py-5 align-top">
                          {content}
                        </td>
                      );
                    })}
                    {selected.length < 3 && Array(3 - selected.length).fill(null).map((_, i) => (
                      <td key={`empty-${i}`} className="px-8 py-5">—</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ACTION BUTTONS */}
        {selected.length > 0 && (
          <div className="flex justify-center gap-6 mb-16">
            <button className="flex items-center gap-2 bg-[#d45622] hover:bg-[#c04b1c] text-white font-bold px-8 py-3.5 rounded-[16px] transition-colors shadow-sm">
              <Calendar className="w-4 h-4" /> Book Group Viewing
            </button>
            <button className="flex items-center gap-2 bg-[#fdf0f4] hover:bg-[#fae2e8] text-[#e8417c] font-bold px-8 py-3.5 rounded-[16px] transition-colors">
              <Download className="w-4 h-4" /> Download PDF Report
            </button>
          </div>
        )}

        {/* NEIGHBORHOOD MAP */}
        <div className="relative rounded-[24px] overflow-hidden h-64 border border-gray-200 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] mx-auto max-w-[1300px]">
          <div className="absolute inset-0 opacity-40 grayscale-[50%] z-0 pointer-events-none">
            <NeighborhoodMap properties={selected.length > 0 ? selected : propertiesData.slice(0, 3)} />
          </div>
          <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px] z-10 pointer-events-none" />
          
          <div className="absolute bottom-6 left-8 z-20 pointer-events-none bg-white/90 p-5 pr-12 rounded-[20px] shadow-sm backdrop-blur-sm">
            <span className="bg-[#d45622] text-white text-[10px] font-black px-3 py-1.5 rounded-md uppercase tracking-wide">
              NEIGHBORHOOD CONTEXT
            </span>
            <h3 className="text-gray-900 font-heading font-extrabold text-[22px] mt-3">Explore the Platinum Triangle</h3>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="w-full mt-24 py-8 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between pointer-events-none">
          <div className="flex flex-1 items-center gap-2">
            <div className="w-6 h-6 bg-[#E8622A] rounded flex items-center justify-center">
              <Home className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-heading font-bold text-[15px] text-gray-900">Realta</span>
          </div>
          
          <div className="flex-1 text-center">
            <span className="text-[#a0afbe] font-bold text-[11px]">© 2024 Realta Platform. All rights reserved.</span>
          </div>

          <div className="flex flex-1 justify-end items-center gap-4 text-[#8094a8]">
            <Globe className="w-5 h-5 pointer-events-auto cursor-pointer" />
            <Info className="w-5 h-5 pointer-events-auto cursor-pointer" />
            <Shield className="w-5 h-5 pointer-events-auto cursor-pointer" />
          </div>
        </div>
      </footer>
    </div>
  );
}
