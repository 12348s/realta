'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Home, Bell, Share2, Heart } from 'lucide-react';
import { useSavedStore } from '@/store/savedStore';

interface NavbarProps {
  variant?: 'default' | 'detail' | 'minimal';
  propertyId?: string;
}

export default function Navbar({ variant = 'default', propertyId }: NavbarProps) {
  const { isSaved, toggle } = useSavedStore();
  const saved = propertyId ? isSaved(propertyId) : false;

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-border/40">
      <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Home className="w-6 h-6 text-primary" />
            <span className="font-heading font-bold text-xl tracking-tight text-foreground">Realta</span>
          </Link>
          {variant !== 'minimal' && (
            <nav className="hidden md:flex items-center gap-6 font-medium text-sm text-foreground/80">
              <Link href="#" className="hover:text-primary transition-colors">Buy</Link>
              <Link href="#" className="hover:text-primary transition-colors">Sell</Link>
            </nav>
          )}
        </div>

        <div className="flex items-center gap-3">
          {variant === 'detail' || variant === 'minimal' ? (
            <>
              <button className="p-2.5 rounded-full border border-border hover:border-primary/40 transition-colors">
                <Share2 className="w-4 h-4 text-foreground/70" />
              </button>
              {propertyId && (
                <button
                  onClick={() => toggle(propertyId)}
                  className="p-2.5 rounded-full border border-border hover:border-red-400 transition-colors"
                >
                  <Heart className={`w-4 h-4 transition-colors ${saved ? 'fill-red-500 text-red-500' : 'text-foreground/70'}`} />
                </button>
              )}
            </>
          ) : (
            <>
              <nav className="hidden md:flex items-center gap-6 font-medium text-sm text-foreground/80">
                <Link href="#" className="hover:text-primary transition-colors">Buy</Link>
                <Link href="#" className="hover:text-primary transition-colors">Sell</Link>
              </nav>
              <button className="p-2 rounded-full hover:bg-muted/10 transition-colors">
                <Bell className="w-5 h-5 text-foreground/70" />
              </button>
              <div className="w-8 h-8 rounded-full bg-muted/20 border border-border overflow-hidden">
                <Image src="https://ui-avatars.com/api/?name=User&background=E8622A&color=fff" alt="User" width={32} height={32} />
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
