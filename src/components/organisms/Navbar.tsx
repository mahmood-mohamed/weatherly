"use client";

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { CloudSun } from 'lucide-react';
import { SearchBar } from '../molecules/SearchBar';
import { useLocationStore } from '@/hooks/use-location';
import { appName } from '@/lib/constants/navigation';

export function Navbar() {
  const locale = useLocale();
  const setLocation = useLocationStore((state) => state.setLocation);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-background/60 backdrop-blur-xl border-b border-border/40 flex items-center justify-between px-4 md:px-8 select-none">
      {/* Logo */}
      <Link
        aria-label={appName}
        href={`/${locale}`}
        className="flex items-center gap-2 group transition-all duration-300"
      >
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
          <CloudSun aria-label={appName} className="w-6 h-6 text-primary-foreground" />
        </div>
        <span className="text-xl font-bold tracking-tight text-foreground hidden sm:block">
          {appName}
        </span>
      </Link>

      {/* Search Bar */}
      <div className="flex-1 max-w-md mx-4 md:mx-8">
        <SearchBar onLocationSelect={setLocation} />
      </div>

      {/* Empty div for symmetry on desktop if needed, or we could add more items here */}
      <div className="w-10 md:w-32 hidden md:block" />
    </nav>
  );
}
