"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { getNavItems } from '@/lib/constants/navigation';
import { cn } from '@/lib/utils';
import { Thermometer, CloudRain, Globe } from 'lucide-react';

export function Sidebar() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('Navigation');
  const tSidebar = useTranslations('Sidebar');

  const navItems = getNavItems(t, locale);

  return (
    <aside className="hidden md:flex flex-col w-20 lg:w-64 
    fixed start-0 top-16 bottom-0 
    bg-background/40 backdrop-blur-md border-end 
    shadow-lg border-border/40 py-8 px-4 z-40">
      <nav className="flex flex-col gap-4 select-none">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.label}
              className={cn(
                "flex items-center gap-3 p-3 rounded-2xl transition-all duration-300 group",
                isActive
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className={cn("w-6 h-6", isActive ? "scale-110" : "group-hover:scale-110 transition-transform")} />
              <span className="hidden lg:block font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Static Weather Info */}
      <div className="mt-auto hidden lg:flex flex-col gap-6 p-4 rounded-3xl bg-primary/5 border border-primary/10">

        <div className="flex items-center gap-3 text-xs text-muted-foreground uppercase tracking-widest font-semibold">
          {tSidebar('title')}
        </div>

        <div className="space-y-2 text-xs">

          <div className="flex items-center gap-3 text-foreground/80">
            <Thermometer className="w-4 h-4 text-orange-400" />
            {tSidebar('accuracy')}
          </div>

          <div className="flex items-center gap-3 text-foreground/80">
            <CloudRain className="w-4 h-4 text-blue-400" />
            {tSidebar('forecast')}
          </div>

          <div className="flex items-center gap-3 text-foreground/80">
            <Globe className="w-4 h-4 text-blue-400" />
            {tSidebar('global')}
          </div>

          <div className="text-xs text-muted-foreground pt-2 border-t space-y-1">
            <p>
              {tSidebar('poweredBy')} <span className="font-medium text-foreground">WeatherAPI.com</span>
            </p>

            <p className=''>
              © {new Date().getFullYear()}
              <span className="font-medium text-foreground"> Mahmoud Mohamed</span>
            </p>
          </div>

        </div>

      </div>
    </aside>
  );
}
