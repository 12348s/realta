'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Search, MapPin, Heart, BedDouble, Bath, Square, Home, Send, ChevronDown, Wallet, Bell, Settings } from "lucide-react";
import propertiesData from '@/app/data/mumbaiProperties.json';

export default function Page() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("Mumbai");

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* SECTION 1: Navbar */}
      <header className="w-full bg-[#fcfaf8]">
        <div className="container mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#E8622A] rounded-lg flex items-center justify-center">
              <Home className="w-5 h-5 text-white" />
            </div>
            <span className="font-heading font-bold text-xl tracking-tight text-foreground">Realta</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-foreground/80 hover:[&>a]:text-[#E8622A] transition-colors absolute left-1/2 -translate-x-1/2">
            <Link href="/properties?type=buy">Buy</Link>
            <Link href="/agent/dashboard">Sell</Link>
            <Link href="#">Agents</Link>
          </nav>
          <div className="flex items-center gap-3">
            <button className="w-[38px] h-[38px] rounded-full bg-[#fae2d6]/80 flex items-center justify-center text-[#E8622A] hover:bg-[#f6d5c6] transition-colors">
              <Bell className="w-[18px] h-[18px] fill-[#E8622A]" />
            </button>
            <button className="w-[38px] h-[38px] rounded-full bg-[#fae2d6]/80 flex items-center justify-center text-[#E8622A] hover:bg-[#f6d5c6] transition-colors">
              <Settings className="w-[18px] h-[18px] fill-[#E8622A]" />
            </button>
            <Link href="/saved" className="relative w-[38px] h-[38px] rounded-full overflow-hidden border border-gray-200">
              <Image src="https://ui-avatars.com/api/?name=Julian&background=F5F0EB&color=000&size=40" alt="User Profile" fill className="object-cover" />
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 bg-[#F5F0EB]">
        {/* SECTION 2: Hero */}
        <section className="px-4 lg:px-8 py-0">
          <div className="relative w-full h-[600px] md:h-[700px] rounded-[32px] overflow-hidden shadow-2xl max-w-[1400px] mx-auto mt-4">
            {/* Background image */}
            <Image 
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop" 
              alt="Luxury modern home" 
              fill 
              className="object-cover"
              priority
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-black/40"></div>
            
            {/* Hero Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pb-16">
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-bold text-white max-w-4xl tracking-tight leading-[1.1] mb-6">
                Find your next home with <span className="text-[#FF3D8B]">ease</span> and confidence.
              </h1>
              <p className="text-white/95 text-lg sm:text-xl max-w-2xl font-medium">
                Discover premium properties tailored to your unique lifestyle.
              </p>

              {/* Realta Original Search Bar */}
              <div className="mt-12 bg-white rounded-full shadow-2xl p-2.5 flex flex-col sm:flex-row items-center w-full max-w-4xl border border-white/20 relative z-10">
                
                {/* Location */}
                <div className="flex-1 w-full pl-6 pr-4 flex items-center gap-3 border-b sm:border-b-0 sm:border-r border-gray-200 py-2 sm:py-0">
                  <MapPin className="w-5 h-5 text-[#E8622A] flex-shrink-0" />
                  <input 
                    type="text" 
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Location or ZIP" 
                    className="bg-transparent border-none outline-none text-sm w-full font-bold placeholder:text-gray-400 placeholder:font-medium text-gray-800"
                  />
                </div>

                {/* Price Range */}
                <div className="flex-1 w-full px-6 flex items-center justify-between border-b sm:border-b-0 sm:border-r border-gray-200 py-3 sm:py-0 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Wallet className="w-5 h-5 text-[#E8622A] flex-shrink-0" />
                    <span className="text-sm font-medium text-gray-400">Price Rang</span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>

                {/* Property Type */}
                <div className="flex-1 w-full px-6 flex items-center justify-between py-3 sm:py-0 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Home className="w-5 h-5 text-[#E8622A] flex-shrink-0" />
                    <span className="text-sm font-medium text-gray-400">Property T</span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>

                {/* Search Button */}
                <button 
                  onClick={() => router.push(`/properties?location=${searchValue || 'Mumbai'}`)}
                  className="bg-[#E8622A] hover:bg-[#E8622A]/90 text-white rounded-full flex items-center justify-center gap-2 px-8 py-3.5 transition-transform hover:scale-105 shadow-md flex-shrink-0 w-full sm:w-auto mt-2 sm:mt-0"
                >
                  <Search className="w-4 h-4" />
                  <span className="font-bold text-sm">Search</span>
                </button>

              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Category Cards instead of Realta Advantage */}
        <section className="py-16 px-6 lg:px-12 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[900px] mx-auto">
            {/* Buy a home card */}
            <Link href="/properties" className="block group">
              <div className="bg-[#fb6c46] rounded-[24px] p-6 pb-0 text-white h-[320px] flex flex-col justify-between overflow-hidden relative shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                <div>
                  <h3 className="font-heading font-extrabold text-[24px] mb-2 tracking-tight">Buy a home</h3>
                  <p className="text-white/95 text-[14px] font-medium leading-relaxed max-w-[90%]">
                    In today&apos;s competitive market, buying a home requires careful planning.
                  </p>
                </div>
                <div className="bg-[#ffccb6] w-full h-[140px] rounded-t-[20px] mt-6 flex items-end justify-center relative overflow-hidden">
                  <div className="absolute -bottom-2 w-32 h-32 text-[#fa562b]/80">
                    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 3l10 9h-3v9h-14v-9h-3l10-9z"/></svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* Sell a home card */}
            <Link href="/agent/dashboard" className="block group">
              <div className="bg-[#9469ed] rounded-[24px] p-6 pb-0 text-white h-[320px] flex flex-col justify-between overflow-hidden relative shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                <div>
                  <h3 className="font-heading font-extrabold text-[24px] mb-2 tracking-tight">Sell a home</h3>
                  <p className="text-white/95 text-[14px] font-medium leading-relaxed max-w-[90%]">
                    List your property with our premium network to reach qualified buyers globally.
                  </p>
                </div>
                <div className="bg-[#cab6f7] w-full h-[140px] rounded-t-[20px] mt-6 flex items-end justify-center relative overflow-hidden">
                  <div className="absolute -bottom-4 w-32 h-40 text-[#7a4dd4]/80">
                    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M4 22V4c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2v18H4zm4-14h2v2H8V8zm0 4h2v2H8v-2zm0 4h2v2H8v-2zm4-8h2v2h-2V8zm0 4h2v2h-2v-2zm0 4h2v2h-2v-2z" /></svg>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* SECTION 4: Featured Listings */}
        <section className="pt-10 pb-20 px-6 lg:px-12 max-w-[1400px] mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-end mb-10 gap-4">
            <div>
              <h2 className="font-heading text-[32px] font-extrabold text-gray-900 mb-1 tracking-tight">Featured Listings</h2>
              <p className="text-[#8094a8] text-[15px] font-medium">Hand-picked properties for your consideration</p>
            </div>
            <Link href="/properties" className="text-[#E8622A] text-[14px] font-bold hover:underline transition-all flex items-center gap-1">
              View All <span>→</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {propertiesData.slice(0, 3).map((property: any, idx: number) => (
              <div key={property.propertyId} className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-gray-100 hover:-translate-y-1 hover:shadow-md transition-all duration-300 group cursor-pointer">
                <div className="relative h-[250px] overflow-hidden">
                  <Image src={property.images[0]?.url || "https://images.unsplash.com/photo-1512917774080-9991f1c4c750"} alt={property.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 bg-white rounded-full shadow-md z-10 w-[38px] h-[38px] flex items-center justify-center">
                    <Heart className="w-4 h-4 text-gray-900 fill-gray-900" />
                  </div>
                  {idx === 0 && (
                    <div className="absolute bottom-4 left-4 bg-[#E8622A] text-white text-[10px] font-extrabold px-3 py-1.5 rounded-[6px] uppercase tracking-wide shadow-sm z-10">
                      NEWLY LISTED
                    </div>
                  )}
                  {idx === 1 && (
                    <div className="absolute bottom-4 left-4 bg-[#e8417c] text-white text-[10px] font-extrabold px-3 py-1.5 rounded-[6px] uppercase tracking-wide shadow-sm z-10">
                      PREMIUM
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-[24px] font-extrabold text-gray-900 mb-1">{property.price.range.split(' - ')[0] || property.price.range}</h3>
                  <p className="text-[#8094a8] text-[13px] font-semibold mb-6 truncate">{property.location.locality}, MH 4000{idx}0</p>
                  <div className="flex items-center gap-5 text-[13px] text-[#8094a8] font-semibold">
                    <span className="flex items-center gap-1.5"><BedDouble className="w-4 h-4" /> {property.configurations.split(' ')[0]} Beds</span>
                    <span className="flex items-center gap-1.5"><Bath className="w-4 h-4" /> {idx % 2 === 0 ? '4' : '2'} Baths</span>
                    <span className="flex items-center gap-1.5"><Square className="w-4 h-4" /> {idx % 2 === 0 ? '4,200' : '2,100'} sqft</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: Agent CTA */}
        <section className="px-4 lg:px-8 py-10 pb-24">
          <div className="max-w-7xl mx-auto">
            <div className="bg-[#131722] rounded-[32px] overflow-hidden flex flex-col md:flex-row items-stretch shadow-xl">
              <div className="w-full md:w-[60%] p-10 md:p-16 flex flex-col justify-center">
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">Are you a real estate<br/>professional?</h2>
                <p className="text-gray-400 text-sm sm:text-base mb-10 max-w-md leading-relaxed">
                  Join the fastest growing luxury network and list your properties in front of qualified buyers worldwide.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-[#E8622A] hover:bg-[#E8622A]/90 text-white font-bold py-3.5 px-6 rounded-xl transition-colors text-sm text-center shadow-lg">
                    List your property
                  </button>
                  <button className="bg-transparent border border-gray-600 hover:bg-gray-800 text-white font-bold py-3.5 px-6 rounded-xl transition-colors text-sm text-center">
                    Agent Partner Program
                  </button>
                </div>
              </div>
              <div className="w-full md:w-[40%] min-h-[300px] flex items-center justify-center relative p-8">
                {/* Mint green backdrop */}
                <div className="absolute inset-y-12 inset-x-8 bg-[#A2D3C2] rounded-[32px]"></div>
                {/* Agent Illustration/Image */}
                <div className="relative w-full h-full min-h-[250px] flex items-end justify-center z-10">
                  <Image 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop" 
                    alt="Real Estate Professional" 
                    fill 
                    className="object-cover object-top rounded-b-[32px]" 
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* SECTION 5: Footer */}
      <footer className="bg-[#F5F0EB] text-gray-800 py-16 px-4 lg:px-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="space-y-4 pr-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#E8622A] rounded-lg flex items-center justify-center">
                  <Home className="w-5 h-5 text-white" />
                </div>
                <span className="font-heading font-bold text-2xl tracking-tight text-gray-900">Realta</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs mt-4">
                Redefining the real estate experience with premium listings and modern technology.
              </p>
            </div>
            
            <div>
              <h4 className="font-heading font-bold text-sm text-gray-900 mb-6">Discover</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-500 hover:text-[#E8622A] transition-colors text-sm">Miami Homes</a></li>
                <li><a href="#" className="text-gray-500 hover:text-[#E8622A] transition-colors text-sm">Los Angeles Villas</a></li>
                <li><a href="#" className="text-gray-500 hover:text-[#E8622A] transition-colors text-sm">New York Apartments</a></li>
                <li><a href="#" className="text-gray-500 hover:text-[#E8622A] transition-colors text-sm">Austin Modern</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading font-bold text-sm text-gray-900 mb-6">Company</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-500 hover:text-[#E8622A] transition-colors text-sm">About Us</a></li>
                <li><a href="#" className="text-gray-500 hover:text-[#E8622A] transition-colors text-sm">Our Agents</a></li>
                <li><a href="#" className="text-gray-500 hover:text-[#E8622A] transition-colors text-sm">Testimonials</a></li>
                <li><a href="#" className="text-gray-500 hover:text-[#E8622A] transition-colors text-sm">Careers</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading font-bold text-sm text-gray-900 mb-6">Newsletter</h4>
              <p className="text-gray-500 text-sm mb-4">Stay updated with the latest luxury market trends.</p>
              <div className="flex bg-white rounded-full overflow-hidden border border-gray-200 focus-within:border-[#E8622A]/50 transition-colors p-1 shadow-sm">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="bg-transparent text-gray-800 px-4 py-2 text-sm w-full outline-none placeholder:text-gray-400"
                />
                <button className="bg-[#FF3D8B] hover:bg-[#FF3D8B]/90 text-white w-9 h-9 rounded-full flex items-center justify-center transition-colors flex-shrink-0">
                  <Send className="w-4 h-4 ml-[-2px]" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-center pt-8 text-gray-400 text-xs gap-4 text-center">
            <p>© 2024 Realta Platforms Inc. All rights reserved.</p>
            <div className="flex items-center gap-6 mt-2 md:mt-0">
              <a href="#" className="hover:text-gray-600 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-gray-600 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
