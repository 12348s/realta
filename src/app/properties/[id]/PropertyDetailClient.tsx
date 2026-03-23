'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Mail, Video, Zap, Camera, Car, Droplets, Coffee, Building, Grid, Share2, Heart, Home, ChevronDown } from 'lucide-react';
import { useSavedStore } from '@/store/savedStore';
import propertiesData from '@/app/data/mumbaiProperties.json';

const SinglePropertyMap = dynamic(() => import('@/components/SinglePropertyMap'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-[#F5F5F3] animate-pulse rounded-[24px]" />,
});

const FALLBACK = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800';

function getAmenities(desc: string) {
  const lower = desc.toLowerCase();
  const all = [
    { key: 'parking', label: 'Parking', icon: Car },
    { key: 'power backup', label: 'Power Backup', icon: Zap },
    { key: 'cctv', label: 'CCTV', icon: Camera },
    { key: 'lift', label: 'Lifts', icon: Building },
    { key: 'water', label: 'Water Storage', icon: Droplets },
    { key: 'cafeteria', label: 'Cafeteria', icon: Coffee },
  ];
  const matched = all.filter((a) => lower.includes(a.key));
  return matched.length >= 4 ? matched.slice(0, 4) : [...matched, ...all.filter(a => !matched.includes(a)).slice(0, 4 - matched.length)];
}

interface PayCalcProps {
  price: number;
}
function PaymentCalc({ price }: PayCalcProps) {
  const [downPct] = useState(20);
  const [rate, setRate] = useState(6.5);
  const [term, setTerm] = useState(30);

  const downPayment = Math.round(price * downPct / 100);
  const principal = price - downPayment;
  const monthlyRate = rate / 100 / 12;
  const payments = term * 12;
  const monthly = monthlyRate === 0 ? principal / payments :
    principal * (monthlyRate * Math.pow(1 + monthlyRate, payments)) / (Math.pow(1 + monthlyRate, payments) - 1);

  const fmt = (n: number) => '₹' + Math.round(n).toLocaleString('en-IN');

  return (
    <div className="bg-[#FAF7F2] rounded-[24px] border border-[#f5e2d3]/50 p-8 shadow-sm">
      <h3 className="font-heading font-extrabold text-[17px] text-gray-900 mb-6">Payment Calculator</h3>
      <div className="space-y-4">
        <div>
          <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest pl-1">Home Price</label>
          <div className="mt-1.5 px-4 py-3 rounded-xl border border-white bg-white text-sm font-bold text-gray-900 shadow-sm w-full">
            {fmt(price)}
          </div>
        </div>
        <div>
          <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest pl-1">Down Payment (20%)</label>
          <div className="mt-1.5 px-4 py-3 rounded-xl border border-white bg-white text-sm font-bold text-gray-900 shadow-sm w-full">
            {fmt(downPayment)}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest pl-1">Interest Rate</label>
            <div className="relative mt-1.5">
              <input
                type="number"
                step="0.1"
                value={rate}
                onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-3 rounded-xl border border-transparent bg-white text-sm font-bold text-gray-900 outline-none focus:border-[#E8622A]/50 shadow-sm"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-bold pointer-events-none">%</span>
            </div>
          </div>
          <div>
            <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest pl-1">Term (Years)</label>
            <div className="relative mt-1.5">
              <select
                value={term}
                onChange={(e) => setTerm(parseInt(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-transparent bg-white text-sm font-bold text-gray-900 outline-none focus:border-[#E8622A]/50 appearance-none shadow-sm cursor-pointer"
              >
                {[10, 15, 20, 25, 30].map((y) => (
                  <option key={y} value={y}>{y} Years</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
          </div>
        </div>
        
        <div className="pt-6 mt-6 border-t border-[#e8dccb]">
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest pl-1 mb-1">Estimated Monthly Payment</p>
          <p className="text-[32px] font-heading font-black text-[#E8622A] tracking-tight">{fmt(monthly)}</p>
          <button className="text-[11px] text-[#E8622A] font-bold mt-2 hover:underline tracking-wide">Detailed breakdown ›</button>
        </div>
      </div>
    </div>
  );
}

export default function PropertyDetailClient({ propertyId }: { propertyId: string }) {
  const { isSaved, toggle } = useSavedStore();
  const saved = isSaved(propertyId);

  const property = propertiesData.find((p) => p.propertyId === propertyId);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFBF9]">
        <div className="text-center">
          <h1 className="font-heading font-bold text-2xl text-gray-900 mb-2">Property Not Found</h1>
          <Link href="/properties" className="text-[#E8622A] hover:underline">← Back to listings</Link>
        </div>
      </div>
    );
  }

  const amenities = getAmenities(property.description);
  const lat = parseFloat(property.location.coordinates.latitude);
  const lng = parseFloat(property.location.coordinates.longitude);
  const imgs = property.images.map(i => i.url);

  const lifestyleCards = [
    { label: 'Business Hub', url: 'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=600' },
    { label: 'Elite Dining', url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600' },
    { label: 'City Culture', url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600' },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF9] font-sans pb-10">
      {/* NAVBAR */}
      <header className="w-full bg-[#FDFBF9]">
        <div className="px-6 md:px-12 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 w-1/3">
            <div className="w-8 h-8 bg-[#E8622A] rounded-lg flex items-center justify-center">
              <Home className="w-5 h-5 text-white" />
            </div>
            <span className="font-heading font-bold text-xl tracking-tight text-gray-900">Realta</span>
          </div>
          <nav className="hidden md:flex items-center justify-center gap-8 font-bold text-[11px] text-gray-900 w-1/3">
            <Link href="/properties?type=buy" className="hover:text-[#E8622A] transition-colors">Buy</Link>
            <Link href="/agent/dashboard" className="hover:text-[#E8622A] transition-colors">Sell</Link>
          </nav>
          <div className="flex items-center justify-end gap-3 w-1/3">
            <button className="w-10 h-10 rounded-full flex items-center justify-center bg-[#fae2d6] hover:bg-[#f6d5c6] transition-colors">
              <Share2 className="w-4 h-4 text-[#E8622A]" />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggle(propertyId);
              }}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-[#fae2d6] hover:bg-[#f6d5c6] transition-colors"
            >
              <Heart className={`w-4 h-4 transition-colors ${saved ? 'fill-[#E8622A] text-[#E8622A]' : 'text-[#E8622A] fill-[#E8622A]'}`} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-6 md:px-12 py-2">
        {/* GALLERY */}
        <div className="flex gap-4 h-[500px] mb-8">
          <div className="w-[50%] relative rounded-[24px] overflow-hidden flex-shrink-0">
            <Image
              src={imgs[0] || FALLBACK} alt={property.title} fill className="object-cover"
              onError={(e) => { e.currentTarget.src = FALLBACK; }}
            />
          </div>
          <div className="w-[50%] grid grid-cols-2 grid-rows-2 gap-4">
            {[1, 2, 3, 4].map((idx) => (
              <div key={idx} className="relative rounded-[24px] overflow-hidden bg-gray-100">
                <Image
                  src={imgs[idx] || imgs[0] || FALLBACK} alt={`Photo ${idx + 1}`} fill className="object-cover"
                  onError={(e) => { e.currentTarget.src = FALLBACK; }}
                />
                {idx === 4 && (
                  <button className="absolute bottom-4 right-4 flex items-center gap-2 bg-white/90 backdrop-blur text-gray-900 text-[11px] font-bold px-4 py-2.5 rounded-xl shadow-sm hover:scale-105 transition-transform z-10">
                    <Grid className="w-3.5 h-3.5" /> Show All Photos
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* TWO COLUMN */}
        <div className="flex gap-10 items-start">
          {/* LEFT */}
          <div className="flex-1 min-w-0 space-y-10">
            {/* Price & Address */}
            <div className="flex items-start justify-between mt-2">
              <div>
                <h1 className="font-heading text-5xl font-extrabold text-gray-900 tracking-tight">{property.price.range}</h1>
                <p className="text-[#E8622A] font-bold mt-2 text-sm">{property.location.locality}, {property.location.city}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="bg-[#ebf8ee] text-[#22c55e] text-[11px] font-bold px-4 py-1.5 rounded-full">For Sale</span>
                <span className="bg-[#fdf0e9] text-[#E8622A] text-[11px] font-bold px-4 py-1.5 rounded-full">New Listing</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {[
                { 
                  label: 'BEDS', 
                  value: property.configurations.match(/(\d+)\s*BHK/i)?.[1] || (['Office', 'Shop'].some(t => property.propertyType.includes(t)) ? '-' : '1')
                },
                { 
                  label: 'BATHS', 
                  value: property.description.match(/(\d+)\s*(?:private\s+)?washroom/i)?.[1] || (['Office', 'Shop'].some(t => property.propertyType.includes(t)) ? '-' : '1')
                },
                { 
                  label: 'AREA', 
                  value: property.configurations.match(/([\d,]+)\s*sq/i)?.[1] || 'N/A', 
                  suffix: ' sqft' 
                },
              ].map(({ label, value, suffix }) => (
                <div key={label} className="bg-[#f7f3ec] rounded-[16px] border border-[#f5e2d3]/50 p-5 px-6">
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{label}</p>
                  <p className="font-heading font-bold text-gray-900 mt-2 text-3xl">
                    {value}
                    {suffix && value !== '-' && value !== 'N/A' && <span className="text-sm font-semibold text-gray-600 ml-1">{suffix}</span>}
                  </p>
                </div>
              ))}
            </div>

            {/* About */}
            <div className="pt-4">
              <h2 className="font-heading font-extrabold text-[20px] text-gray-900 mb-4">About this home</h2>
              <p className="text-gray-600 leading-[1.8] font-medium text-[14px] whitespace-pre-wrap">{property.description}</p>
            </div>

            {/* Amenities */}
            <div className="pt-4">
              <h2 className="font-heading font-extrabold text-[20px] text-gray-900 mb-8">Premium Amenities</h2>
              <div className="flex gap-x-12 gap-y-8 flex-wrap">
                {amenities.map(({ label, icon: Icon }) => (
                  <div key={label} className="flex flex-col items-center gap-3 w-[100px]">
                    <Icon className="w-8 h-8 text-[#E8622A]" strokeWidth={1.5} />
                    <span className="text-[12px] font-extrabold text-gray-900 text-center">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="pt-4">
              <h2 className="font-heading font-extrabold text-[20px] text-gray-900 mb-6">Location</h2>
              <div className="h-56 rounded-[24px] overflow-hidden border border-gray-200 bg-[#F5F5F3] relative shadow-sm z-0">
                 <SinglePropertyMap lat={lat} lng={lng} locality={property.location.locality} />
              </div>
            </div>

            {/* Malibu Life */}
            <div className="pt-10 pb-16">
              <h2 className="font-heading font-extrabold text-[24px] text-gray-900 mb-6">Malibu Life</h2>
              <div className="grid grid-cols-3 gap-6">
                {lifestyleCards.map(({ label, url }) => (
                  <div key={label} className="relative h-44 rounded-[20px] overflow-hidden shadow-sm group">
                    <Image src={url} alt={label} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#131722]/90 via-[#131722]/20 to-transparent" />
                    <span className="absolute bottom-4 left-5 text-white font-bold text-[14px]">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT STICKY COLUMN */}
          <div className="w-[360px] flex-shrink-0 space-y-6 sticky top-28">
            {/* Agent Card */}
            <div className="bg-white rounded-[24px] shadow-sm border border-[#f5e2d3]/50 p-7">
              <div className="flex items-center gap-4 mb-6">
                 {/* AVATAR + Name */}
                 <div className="w-14 h-14 relative rounded-full overflow-hidden shrink-0 border border-gray-100">
                    <Image
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(property.sellers[0]?.name || 'Agent')}&background=131722&color=fff&size=64`}
                      alt="Agent" fill className="object-cover"
                    />
                 </div>
                 <div>
                    <h4 className="font-heading font-bold text-gray-900 text-[15px]">{property.sellers[0]?.name || 'Alexander Sterling'}</h4>
                    <p className="text-[12px] text-gray-500 font-medium">Luxury Property Specialist</p>
                 </div>
              </div>
              
              <div className="space-y-3.5">
                <a href={`mailto:contact@realta.com`} className="w-full bg-[#E8622A] hover:bg-[#d45622] text-white font-bold py-3.5 rounded-full flex items-center justify-center gap-2 transition-colors shadow-sm text-[13px]">
                  <Mail className="w-4 h-4 text-white fill-white" /> Contact Agent
                </a>
                <button className="w-full border-2 border-[#E8622A] text-[#E8622A] hover:bg-[#E8622A]/5 font-bold py-3.5 rounded-full flex items-center justify-center gap-2 transition-colors text-[13px]">
                  <Video className="w-4 h-4 fill-[#E8622A]" /> Book Virtual Tour
                </button>
              </div>
            </div>

            {/* Payment Calculator */}
            <PaymentCalc price={property.price.minValue} />

            {/* Compare Button */}
            <Link
              href={`/compare?id=${property.propertyId}`}
              className="mt-6 w-full border-2 border-[#E8622A] text-[#E8622A] hover:bg-[#E8622A]/5 font-bold py-3.5 rounded-[16px] flex items-center justify-center transition-colors text-sm bg-white"
            >
              Compare Property
            </Link>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#131722] text-white py-12 px-6 md:px-12 mt-10">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Home className="w-5 h-5 text-white" />
            <span className="font-heading font-bold text-lg">Realta</span>
          </div>
          <nav className="flex items-center gap-8 text-[11px] font-bold text-gray-400">
            <Link href="/properties?type=buy" className="hover:text-white transition-colors">Buy</Link>
            <Link href="/agent/dashboard" className="hover:text-white transition-colors">Sell</Link>
          </nav>
          <p className="text-gray-500 text-[11px] font-medium">© 2024 Realta Real Estate. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
