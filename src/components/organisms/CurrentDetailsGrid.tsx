"use client";

import { WeatherData } from '@/lib/api/weather';
import { useSettingsStore } from '@/hooks/use-settings';
import { formatWindSpeed, formatPressure } from '@/lib/utils/formatters';
import { useTranslations } from 'next-intl';
import { Card, CardContent } from '@/components/ui/card';
import { Wind, Droplets, Gauge, Sun } from 'lucide-react';

export function CurrentDetailsGrid({ weather }: { weather: WeatherData }) {
  const t = useTranslations('CurrentDetailsGrid');
  const settings = useSettingsStore();

  const details = [
    {
      title: t('wind'),
      value: formatWindSpeed(weather.current.wind_kph, weather.current.wind_mph, settings.wind),
      icon: <Wind className="w-5 h-5 text-blue-500" />,
    },
    {
      title: t('humidity'),
      value: `${weather.current.humidity}%`,
      icon: <Droplets className="w-5 h-5 text-blue-400" />,
    },
    {
      title: t('pressure'),
      value: formatPressure(weather.current.pressure_mb, settings.pressure),
      icon: <Gauge className="w-5 h-5 text-purple-500" />,
    },
    {
      title: t('uvInfo'),
      value: weather.current.uv.toString(),
      icon: <Sun className="w-5 h-5 text-yellow-500" />,
    },
  ];

  return (
    <div aria-label={t('title')} className="space-y-4">
      <h2 className="text-lg flex items-center gap-2 tracking-tight font-semibold">
        <Droplets className="w-5 h-5 text-primary" />
        {t('title')}
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {details.map((detail, index) => (
          <Card key={index} className="bg-card/50 backdrop-blur border-border/50 hover:bg-card/80 transition-colors">
            <CardContent className="p-4 flex flex-col items-center text-center space-y-2">
              <div className="p-2 rounded-full bg-primary/10">
                {detail.icon}
              </div>
              <p className="text-sm font-medium text-muted-foreground">{detail.title}</p>
              <p className="text-lg font-semibold">{detail.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
