'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Mail, Video, Zap, Camera, Car, Droplets, Coffee, Building, Grid, Share2, Heart, Home } from 'lucide-react';
import { useSavedStore } from '@/store/savedStore';
import propertiesData from '@/app/data/mumbaiProperties.json';

const SinglePropertyMap = dynamic(() => import('@/components/SinglePropertyMap'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gray-100 animate-pulse rounded-xl" />,
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
    <div className="bg-white rounded-2xl shadow-lg border border-border/40 p-6">
      <h3 className="font-heading font-bold text-lg text-foreground mb-4">Payment Calculator</h3>
      <div className="space-y-3">
        <div>
          <label className="text-xs text-muted font-semibold uppercase tracking-wide">Home Price</label>
          <div className="mt-1 px-3 py-2 rounded-lg border border-border text-sm font-medium text-foreground bg-background">
            {fmt(price)}
          </div>
        </div>
        <div>
          <label className="text-xs text-muted font-semibold uppercase tracking-wide">Down Payment (20%)</label>
          <div className="mt-1 px-3 py-2 rounded-lg border border-border text-sm font-medium text-foreground bg-background">
            {fmt(downPayment)}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-muted font-semibold uppercase tracking-wide">Interest Rate</label>
            <input
              type="number"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
              className="mt-1 w-full px-3 py-2 rounded-lg border border-border text-sm font-medium text-foreground outline-none focus:border-primary/50 bg-background"
            />
          </div>
          <div>
            <label className="text-xs text-muted font-semibold uppercase tracking-wide">Term (Years)</label>
            <select
              value={term}
              onChange={(e) => setTerm(parseInt(e.target.value))}
              className="mt-1 w-full px-3 py-2 rounded-lg border border-border text-sm font-medium text-foreground outline-none focus:border-primary/50 bg-background"
            >
              {[10, 15, 20, 25, 30].map((y) => (
                <option key={y} value={y}>{y} Years</option>
              ))}
            </select>
          </div>
        </div>
        <div className="pt-3 border-t border-border/50">
          <p className="text-xs text-muted font-semibold uppercase tracking-wide">Estimated Monthly Payment</p>
          <p className="text-3xl font-heading font-bold text-primary mt-1">{fmt(monthly)}</p>
          <button className="text-xs text-primary font-semibold mt-1 hover:underline">Detailed breakdown ›</button>
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
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="font-heading font-bold text-2xl text-foreground mb-2">Property Not Found</h1>
          <Link href="/properties" className="text-primary hover:underline">← Back to listings</Link>
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
            <button className="p-2.5 rounded-full border border-border hover:border-primary/40 transition-colors">
              <Share2 className="w-4 h-4 text-foreground/70" />
            </button>
            <button
              onClick={() => toggle(propertyId)}
              className="p-2.5 rounded-full border border-border hover:border-red-400 transition-colors"
            >
              <Heart className={`w-4 h-4 transition-colors ${saved ? 'fill-red-500 text-red-500' : 'text-foreground/70'}`} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* GALLERY */}
        <div className="flex gap-3 h-[400px] mb-8">
          <div className="w-[60%] relative rounded-xl overflow-hidden flex-shrink-0">
            <Image
              src={imgs[0] || FALLBACK} alt={property.title} fill className="object-cover"
              onError={(e) => { e.currentTarget.src = FALLBACK; }}
            />
          </div>
          <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-3">
            {[1, 2, 3, 4].map((idx) => (
              <div key={idx} className="relative rounded-xl overflow-hidden">
                <Image
                  src={imgs[idx] || imgs[0] || FALLBACK} alt={`Photo ${idx + 1}`} fill className="object-cover"
                  onError={(e) => { e.currentTarget.src = FALLBACK; }}
                />
                {idx === 3 && (
                  <div className="absolute inset-0 bg-black/40 flex items-end justify-center pb-4">
                    <button className="flex items-center gap-1.5 bg-white text-foreground text-xs font-bold px-3 py-1.5 rounded-md shadow hover:bg-gray-100 transition">
                      <Grid className="w-3.5 h-3.5" /> Show All Photos
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* TWO COLUMN */}
        <div className="flex gap-8 items-start">
          {/* LEFT */}
          <div className="flex-1 min-w-0 space-y-8">
            {/* Price & Address */}
            <div>
              <h1 className="font-heading text-4xl font-bold text-foreground">{property.price.range}</h1>
              <p className="text-primary font-semibold mt-1">{property.location.locality}, {property.location.city}</p>
              <div className="flex items-center gap-3 mt-3">
                <span className="border border-green-500 text-green-600 text-xs font-bold px-3 py-1 rounded-full">For Sale</span>
                <span className="border border-primary text-primary text-xs font-bold px-3 py-1 rounded-full">New Listing</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'AREA', value: property.configurations },
                { label: 'TYPE', value: property.propertyType },
                { label: 'STATUS', value: property.possession.status },
              ].map(({ label, value }) => (
                <div key={label} className="bg-muted/10 rounded-xl p-4 text-center">
                  <p className="text-xs text-muted font-bold uppercase tracking-wide">{label}</p>
                  <p className="font-heading font-bold text-foreground mt-1 text-sm">{value}</p>
                </div>
              ))}
            </div>

            {/* About */}
            <div>
              <h2 className="font-heading font-bold text-xl text-foreground mb-3">About this home</h2>
              <p className="text-foreground/80 leading-relaxed">{property.description}</p>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="font-heading font-bold text-xl text-foreground mb-4">Premium Amenities</h2>
              <div className="flex gap-8 flex-wrap">
                {amenities.map(({ label, icon: Icon }) => (
                  <div key={label} className="flex flex-col items-center gap-2">
                    <Icon className="w-7 h-7 text-primary" />
                    <span className="text-xs font-semibold text-foreground/80">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location */}
            <div>
              <h2 className="font-heading font-bold text-xl text-foreground mb-4">Location</h2>
              <div className="h-56 rounded-xl overflow-hidden border border-border">
                <SinglePropertyMap lat={lat} lng={lng} locality={property.location.locality} />
              </div>
              <p className="mt-2 text-primary font-semibold text-sm">{property.location.locality}</p>
            </div>

            {/* Mumbai Life */}
            <div>
              <h2 className="font-heading font-bold text-xl text-foreground mb-4">Mumbai Life</h2>
              <div className="grid grid-cols-3 gap-4">
                {lifestyleCards.map(({ label, url }) => (
                  <div key={label} className="relative h-44 rounded-xl overflow-hidden">
                    <Image src={url} alt={label} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <span className="absolute bottom-3 left-3 text-white font-bold text-sm">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT STICKY COLUMN */}
          <div className="w-80 flex-shrink-0 space-y-4 sticky top-20">
            {/* Agent Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-border/40 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(property.sellers[0]?.name || 'Agent')}&background=1C2B3A&color=fff&size=48`}
                  alt="Agent" width={48} height={48} className="rounded-full"
                />
                <div>
                  <p className="font-heading font-bold text-foreground">{property.sellers[0]?.name || 'Agent'}</p>
                  <p className="text-xs text-muted">Property Specialist</p>
                </div>
              </div>
              <div className="space-y-3">
                <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
                  <Mail className="w-4 h-4" /> Contact Agent
                </button>
                <button className="w-full border-2 border-primary text-primary hover:bg-primary/5 font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
                  <Video className="w-4 h-4" /> Book Virtual Tour
                </button>
              </div>
            </div>

            {/* Payment Calculator */}
            <PaymentCalc price={property.price.minValue} />

            {/* Compare Button */}
            <Link
              href={`/compare?id=${property.propertyId}`}
              className="block w-full border-2 border-primary text-primary hover:bg-primary/5 font-bold py-3 rounded-xl text-center transition-colors"
            >
              Compare Property
            </Link>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-foreground text-white mt-20 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Home className="w-5 h-5 text-primary" />
            <span className="font-heading font-bold text-lg">Realta</span>
          </div>
          <nav className="flex items-center gap-6 text-sm text-white/70">
            <Link href="#" className="hover:text-white transition-colors">Buy</Link>
            <Link href="#" className="hover:text-white transition-colors">Sell</Link>
          </nav>
          <p className="text-white/50 text-xs">© 2024 Realta Real Estate. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
