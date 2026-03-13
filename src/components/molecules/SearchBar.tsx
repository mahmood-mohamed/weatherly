"use client";

import { useState, useEffect, useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Search, Loader2, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useSearchLocations } from '../../hooks/use-weather';
import { useDebounce } from '../../hooks/use-debounce';

interface SearchBarProps {
  onLocationSelect: (location: string) => void;
}

export function SearchBar({ onLocationSelect }: SearchBarProps) {
  const t = useTranslations('Navbar');
  const locale = useLocale();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const debouncedQuery = useDebounce(query, 500);
  
  const { data: locations, isLoading } = useSearchLocations(debouncedQuery, locale);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (locString: string) => {
    onLocationSelect(locString);
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-md w-[300px]">
      <div className="relative flex items-center">
        <Input 
          type="text"
          placeholder={t('searchPlaceholder')}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="pl-10 rounded-full bg-background/50 border-border/50 backdrop-blur-md focus-visible:ring-1 focus-visible:ring-primary shadow-sm h-12"
        />
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          {isLoading ? (
            <Loader2 className="w-5 h-5 text-muted-foreground animate-spin" />
          ) : (
            <Search className="w-5 h-5 text-muted-foreground" />
          )}
        </div>
      </div>

      {isOpen && query.length >= 3 && locations && (
        <div className="absolute top-full mt-2 w-full bg-card border border-border/50 rounded-2xl shadow-xl overflow-hidden z-50">
          {locations.length === 0 && !isLoading ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              {t('noResults')}
            </div>
          ) : (
             <ul className="max-h-64 overflow-y-auto w-full py-2">
               {locations.map((loc) => (
                 <li 
                   key={loc.id} 
                   onClick={() => handleSelect(loc.name)}
                   className="flex items-center px-4 py-3 hover:bg-muted/50 cursor-pointer transition-colors"
                 >
                   <MapPin className="w-4 h-4 mr-3 text-muted-foreground flex-shrink-0" />
                   <div className="flex flex-col overflow-hidden">
                     <span className="text-sm font-medium truncate">{loc.name}</span>
                     <span className="text-xs text-muted-foreground truncate">{loc.region}, {loc.country}</span>
                   </div>
                 </li>
               ))}
             </ul>
          )}
        </div>
      )}
    </div>
  );
}
