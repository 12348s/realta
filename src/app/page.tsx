import Image from "next/image";
import Link from "next/link";
import { Search, MapPin, Heart, BedDouble, Bath, Square, Home, Send } from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* SECTION 1: Navbar */}
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur border-b border-border/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Home className="w-6 h-6 text-primary" />
            <span className="font-heading font-bold text-xl tracking-tight text-foreground">Realta</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-foreground/80 hover:[&>a]:text-primary transition-colors">
            <a href="#">Buy</a>
            <a href="#">Sell</a>
            <a href="#">Agents</a>
          </nav>
          <div className="flex items-center gap-4">
            <button className="text-sm font-medium text-foreground hover:text-primary transition-colors hidden sm:block">Login</button>
            <button className="bg-primary hover:bg-primary/90 text-white text-sm font-medium px-5 py-2 rounded-full transition-all shadow-sm hover:shadow-md">Sign Up</button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* SECTION 2: Hero */}
        <section className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="relative w-full min-h-[100vh] rounded-2xl overflow-hidden shadow-xl max-w-7xl mx-auto pb-24">
            {/* Background image */}
            <Image 
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop" 
              alt="Luxury modern home" 
              fill 
              className="object-cover"
              priority
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
            
            {/* Hero Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pb-32">
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white max-w-4xl tracking-tight leading-tight mb-6 mt-[-40px]">
                Find your next home with <span className="text-secondary">ease</span> and confidence.
              </h1>
              <p className="text-white/90 text-lg sm:text-xl max-w-2xl font-medium">
                Discover premium properties tailored to your unique lifestyle.
              </p>
            </div>
            
            {/* Heavenly Style Search Bar Overlapping Bottom */}
            <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl z-10">
              <div className="bg-white rounded-full shadow-2xl p-2 sm:p-3 flex flex-col sm:flex-row items-center justify-between gap-4 border border-border/50">
                <div className="flex-1 w-full pl-4 pr-6 flex gap-3 items-center border-b sm:border-b-0 sm:border-r border-border/40 pb-3 sm:pb-0">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                  <div className="flex flex-col flex-1 w-full text-left">
                    <label className="text-xs font-bold text-foreground">Where</label>
                    <input 
                      type="text" 
                      placeholder="Address, City or ZIP" 
                      className="bg-transparent border-none outline-none text-sm w-full font-medium placeholder:text-muted truncate text-foreground"
                    />
                  </div>
                </div>
                <div className="px-4 flex items-center justify-center gap-6 pb-2 sm:pb-0">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <div className="w-4 h-4 rounded-full border border-primary p-0.5">
                      <div className="w-full h-full bg-primary rounded-full"></div>
                    </div>
                    <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">Buy</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <div className="w-4 h-4 rounded-full border border-border group-hover:border-muted transition-colors"></div>
                    <span className="text-sm font-bold text-foreground/60 group-hover:text-foreground transition-colors">Lease</span>
                  </label>
                </div>
                <Link href="/properties?location=Mumbai" className="bg-primary hover:bg-primary/90 text-white p-3 rounded-full flex items-center justify-center transition-transform hover:scale-105 shadow-md flex-shrink-0 w-full sm:w-auto">
                  <Search className="w-5 h-5" />
                  <span className="sm:hidden ml-2 font-medium">Search</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Featured Listings */}
        <section className="bg-background pt-24 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-end mb-10 gap-4">
              <div>
                <h2 className="font-heading text-3xl font-bold text-foreground mb-2">Featured Listings</h2>
                <p className="text-muted text-base">Hand-picked properties for your consideration</p>
              </div>
              <a href="#" className="text-primary font-bold hover:text-primary/80 transition-colors flex items-center gap-1">
                View All <span className="text-xl leading-none">→</span>
              </a>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="bg-card rounded-2xl overflow-hidden shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group cursor-pointer border border-border">
                <div className="relative h-64 overflow-hidden">
                  <Image src="https://images.unsplash.com/photo-1613490908592-fd5e23c72b53?q=80&w=2074&auto=format&fit=crop" alt="Property 1" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/40 transition-colors z-10">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute bottom-4 left-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-md uppercase tracking-wide shadow-sm z-10">
                    NEWLY LISTED
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-1">$2,450,000</h3>
                  <p className="text-muted text-sm mb-4 truncate">4502 Oakwood Dr, Los Angeles, CA</p>
                  <div className="flex items-center gap-4 text-sm text-foreground/80 font-medium">
                    <span className="flex items-center gap-1.5"><BedDouble className="w-4 h-4 text-muted" /> 4 Beds</span>
                    <span className="flex items-center gap-1.5"><Bath className="w-4 h-4 text-muted" /> 3 Baths</span>
                    <span className="flex items-center gap-1.5"><Square className="w-4 h-4 text-muted" /> 3,200 sqft</span>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-card rounded-2xl overflow-hidden shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group cursor-pointer border border-border">
                <div className="relative h-64 overflow-hidden">
                  <Image src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop" alt="Property 2" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/40 transition-colors z-10">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute bottom-4 left-4 bg-secondary text-secondary-foreground text-xs font-bold px-3 py-1.5 rounded-md uppercase tracking-wide shadow-sm z-10">
                    PREMIUM
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-1">$3,890,000</h3>
                  <p className="text-muted text-sm mb-4 truncate">88 Skyline Ridge, Austin, TX</p>
                  <div className="flex items-center gap-4 text-sm text-foreground/80 font-medium">
                    <span className="flex items-center gap-1.5"><BedDouble className="w-4 h-4 text-muted" /> 5 Beds</span>
                    <span className="flex items-center gap-1.5"><Bath className="w-4 h-4 text-muted" /> 5 Baths</span>
                    <span className="flex items-center gap-1.5"><Square className="w-4 h-4 text-muted" /> 5,100 sqft</span>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-card rounded-2xl overflow-hidden shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group cursor-pointer border border-border">
                <div className="relative h-64 overflow-hidden">
                  <Image src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop" alt="Property 3" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/40 transition-colors z-10">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-1">$1,200,000</h3>
                  <p className="text-muted text-sm mb-4 truncate">1200 Highrise Ave, Miami, FL</p>
                  <div className="flex items-center gap-4 text-sm text-foreground/80 font-medium">
                    <span className="flex items-center gap-1.5"><BedDouble className="w-4 h-4 text-muted" /> 2 Beds</span>
                    <span className="flex items-center gap-1.5"><Bath className="w-4 h-4 text-muted" /> 2 Baths</span>
                    <span className="flex items-center gap-1.5"><Square className="w-4 h-4 text-muted" /> 1,800 sqft</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Agent CTA */}
        <section className="px-4 sm:px-6 lg:px-8 py-10 pb-20 bg-background">
          <div className="max-w-7xl mx-auto">
            <div className="bg-[#1C2B3A] rounded-2xl overflow-hidden flex flex-col md:flex-row items-center border border-[#2d3748] shadow-2xl">
              <div className="w-full md:w-[60%] p-10 md:p-14 flex flex-col justify-center">
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">Are you a real estate professional?</h2>
                <p className="text-white/70 text-lg mb-8 max-w-lg leading-relaxed">
                  Join the fastest growing luxury network and list your properties in front of qualified buyers worldwide.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-lg transition-colors text-center shadow-lg">
                    List your property
                  </button>
                  <button className="bg-transparent border border-white hover:bg-white/10 text-white font-bold py-3 px-6 rounded-lg transition-colors text-center">
                    Agent Partner Program
                  </button>
                </div>
              </div>
              <div className="w-full md:w-[40%] h-64 md:h-auto relative min-h-[300px] bg-[#16212c] md:self-stretch">
                <Image 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop" 
                  alt="Real Estate Professional" 
                  fill 
                  className="object-cover object-top opacity-90 mix-blend-luminosity" 
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#1C2B3A] to-transparent w-full md:w-1/2"></div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* SECTION 5: Footer */}
      <footer className="bg-foreground text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Home className="w-6 h-6 text-primary" />
                <span className="font-heading font-bold text-2xl tracking-tight">Realta</span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed max-w-xs">
                Redefining the real estate experience with premium listings and modern technology.
              </p>
            </div>
            
            <div>
              <h4 className="font-heading font-bold text-lg mb-6 text-white/90">Discover</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-white/60 hover:text-white transition-colors text-sm">Miami Homes</a></li>
                <li><a href="#" className="text-white/60 hover:text-white transition-colors text-sm">Los Angeles Villas</a></li>
                <li><a href="#" className="text-white/60 hover:text-white transition-colors text-sm">New York Apartments</a></li>
                <li><a href="#" className="text-white/60 hover:text-white transition-colors text-sm">Austin Modern</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading font-bold text-lg mb-6 text-white/90">Company</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-white/60 hover:text-white transition-colors text-sm">About Us</a></li>
                <li><a href="#" className="text-white/60 hover:text-white transition-colors text-sm">Our Agents</a></li>
                <li><a href="#" className="text-white/60 hover:text-white transition-colors text-sm">Testimonials</a></li>
                <li><a href="#" className="text-white/60 hover:text-white transition-colors text-sm">Careers</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading font-bold text-lg mb-6 text-white/90">Newsletter</h4>
              <p className="text-white/60 text-sm mb-4">Stay updated with the latest luxury market trends.</p>
              <div className="flex bg-white/10 rounded-lg overflow-hidden border border-white/10 focus-within:border-primary/50 transition-colors">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-transparent text-white px-4 py-3 text-sm w-full outline-none placeholder:text-white/40"
                />
                <button className="bg-primary hover:bg-primary/90 text-white px-4 flex items-center justify-center transition-colors">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 text-white/50 text-xs gap-4">
            <p>© 2024 Realta Platforms Inc. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
