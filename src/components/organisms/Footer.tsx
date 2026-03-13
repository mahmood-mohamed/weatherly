"use client";

import { useTranslations } from 'next-intl';
import { appName, socialLinks } from '@/lib/constants/navigation';

export function Footer() {
  const t = useTranslations('Footer');
  const currentYear = new Date().getFullYear();

  

  return (
    <footer className="w-full mt-auto py-8 px-4 md:px-8 select-none" aria-label="Footer">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 p-6 rounded-[2rem] bg-white/5 backdrop-blur-md border border-white/10 shadow-xl transition-all duration-300 hover:bg-white/10">
        
        {/* Copyright Section */}
        <div className="flex flex-col items-center md:items-start space-y-1">
          <p className="text-sm font-medium text-muted-foreground">
            © {currentYear} <span className="text-foreground font-bold">{appName}</span>. {t('rights')}
          </p>
          <p className="text-xs text-muted-foreground/80">
            {t('craftedBy')} <span className="text-primary/80 font-semibold">{t('authorName')}</span>
          </p>
        </div>

        {/* Social Links Section */}
        <div className="flex items-center gap-2">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className={`p-3 rounded-2xl bg-white/5 border border-white/5 text-muted-foreground transition-all duration-300 hover:scale-110 hover:shadow-lg ${link.color} hover:bg-white/10 hover:border-white/20`}
              >
                <Icon size={20} />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
