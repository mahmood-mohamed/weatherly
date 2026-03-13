"use client";

import { WeatherData } from '@/lib/api/weather';
import { useSettingsStore } from '@/hooks/use-settings';
import { formatTemperature, getWeatherIconUrl } from '@/lib/utils/formatters';
import { useTranslations } from 'next-intl';
import { CalendarDays } from 'lucide-react';
import Image from 'next/image';

export function DailyForecast({ weather, locale }: { weather: WeatherData, locale: string }) {
  const t = useTranslations('DailyForecast');
  const settings = useSettingsStore();

  return (
    <div aria-label={t('title')} 
    className="w-full mt-8 lg:mt-0 p-6 rounded-2xl border border-border/50 select-none
    shadow-lg shadow-border/50 bg-card/50 backdrop-blur-sm">
      <h2 className="text-lg flex items-center gap-2 mb-4 tracking-tight font-semibold">
        <CalendarDays className="w-5 h-5 text-primary" />
        {t('title')}
      </h2>
      
      <div className="flex flex-col space-y-4">
        {weather.forecast.forecastday.map((day, index) => {
          const date = new Date(day.date);
          const dayName = index === 0 ? t('today') : date.toLocaleDateString(`${locale}-US`, { weekday: 'short' });

          return (
            <div key={index} className="flex items-center justify-between shadow-sm shadow-border/50 group hover:bg-muted/30 p-2 rounded-lg transition-colors">
              <span className="w-12 font-medium">{dayName}</span>
              
              <div className="flex items-center space-x-2 flex-1 justify-center">
                <Image 
                  src={getWeatherIconUrl(day.day.condition.icon)} 
                  alt={day.day.condition.text} 
                  width={40}
                  height={40}
                  className="w-10 h-10" 
                />
              </div>
              
              <div className="flex items-center justify-end space-x-4 w-24">
                <span className="font-semibold">{formatTemperature(day.day.maxtemp_c, day.day.maxtemp_f, settings.temperature)}</span>
                <span className="text-muted-foreground">{formatTemperature(day.day.mintemp_c, day.day.mintemp_f, settings.temperature)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
