"use client";

import { WeatherData } from '@/lib/api/weather';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sunrise, Sunset, Moon, Sparkles, Orbit, Sun, Telescope } from 'lucide-react';

export function AstronomySection({ astro }: { astro: any }) {
  const t = useTranslations('Astronomy');

  const items = [
    {
      label: t('sunrise'),
      value: astro.sunrise,
      icon: <Sunrise className="w-5 h-5 text-amber-500" />,
      color: "bg-amber-500/10"
    },
    {
      label: t('sunset'),
      value: astro.sunset,
      icon: <Sunset className="w-5 h-5 text-orange-500" />,
      color: "bg-orange-500/10"
    },
    {
      label: t('moonrise'),
      value: astro.moonrise,
      icon: <Moon className="w-5 h-5 text-blue-300" />,
      color: "bg-blue-500/10"
    },
    {
      label: t('moonset'),
      value: astro.moonset,
      icon: <Moon className="w-5 h-5 text-indigo-400 rotate-180" />,
      color: "bg-indigo-500/10"
    },
    {
      label: t('moonPhase'),
      value: astro.moon_phase,
      icon: <Orbit className="w-5 h-5 text-purple-400" />,
      color: "bg-purple-500/10"
    },
    {
      label: t('illumination'),
      value: `${astro.moon_illumination}%`,
      icon: <Sparkles className="w-5 h-5 text-yellow-200" />,
      color: "bg-yellow-500/10"
    }
  ];

  return (
    <section className="space-y-4 select-none">
      <h2 className="text-lg flex items-center gap-2 font-semibold tracking-tight mb-2">
        <Telescope className="w-5 h-5 text-primary" />
        {t('title')}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {items.map((item, index) => (
          <Card key={index} className="bg-card/40 backdrop-blur-md border-border/50 hover:bg-card/60 transition-all duration-300 group">
            <CardContent className="p-4 flex flex-col items-center text-center space-y-3">
              <div className={`p-2 rounded-xl ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                {item.icon}
              </div>
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{item.label}</p>
                <p className="text-sm font-semibold">{item.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
