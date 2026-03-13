"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { getNavItems } from '@/lib/constants/navigation';

export function Bottombar() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('Navigation');

  const navItems = getNavItems(t, locale);

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-6 pb-6 pt-2">
      <nav className="flex items-center justify-around bg-background/80 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-full h-16 px-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.label}
              className={cn(
                "relative flex flex-col items-center justify-center gap-1 w-12 h-12 rounded-full transition-all duration-300",
                isActive 
                  ? "text-primary scale-110" 
                  : "text-muted-foreground"
              )}
            >
              <Icon className="w-6 h-6" />
              {isActive && (
                <span className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full animate-in fade-in zoom-in duration-300" />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
