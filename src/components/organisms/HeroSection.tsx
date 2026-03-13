"use client";

import { WeatherData } from '@/lib/api/weather';
import { useSettingsStore } from '@/hooks/use-settings';
import { formatDateTime, formatTemperature, getWeatherIconUrl } from '@/lib/utils/formatters';
import { getWeatherCategory, getDynamicBackgroundClass } from '@/lib/utils/weather-background';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { ArrowDown, ArrowUp, MapPin } from 'lucide-react';

interface HeroSectionProps {
  weather: WeatherData;
}

export function HeroSection({ weather }: HeroSectionProps) {
  const t = useTranslations('Weather');
  const settings = useSettingsStore();
  const locale = useLocale();

  const isDay = weather.current.condition.icon.includes('day');
  const category = getWeatherCategory(weather.current.condition.code, weather.current.temp_c);
  const bgClass = getDynamicBackgroundClass(category, isDay);

  const displayTemp = formatTemperature(weather.current.temp_c, weather.current.temp_f, settings.temperature);
  const displayFeelsLike = formatTemperature(weather.current.feelslike_c, weather.current.feelslike_f, settings.temperature);

  const displayDate = formatDateTime(weather.location.localtime, locale);

  return (
    <div aria-label="Hero Section" className={`relative w-full rounded-[2.5rem] p-8 md:p-10 overflow-hidden select-none shadow-2xl transition-all duration-1000 ${bgClass} animate-in fade-in zoom-in-95 duration-700`}>
      {/* Decorative Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-[80px] -me-20 -mt-20 pointer-events-none animate-pulse duration-[4000ms]" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-[60px] -ms-16 -mb-16 pointer-events-none animate-pulse duration-[5000ms]" />

      <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Left Content - Location & Date */}
        <div className="flex flex-col items-center md:items-start space-y-4 md:space-y-6 animate-in slide-in-from-left duration-700 delay-150 fill-mode-both">
          <div className="space-y-1">
            <div className="flex items-center gap-2 group cursor-default">
              <MapPin size={24} className="text-white/90 group-hover:animate-bounce" />
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight drop-shadow-sm">
                {weather.location.name}
              </h2>
            </div>
            <p className="text-lg md:text-xl font-medium opacity-70 ml-1">
              {weather.location.region}, {weather.location.country}
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md px-3 md:px-4 py-1.5 rounded-xl border border-white/10 text-sm font-semibold tracking-lowercase">
            {displayDate}
          </div>

          {/* Min/Max Temperature Chips */}
          <div className="flex items-center gap-4 pt-2">
            <div className="group bg-white/10 backdrop-blur-xl px-4 py-2.5 rounded-2xl flex items-center gap-2.5 border border-white/20 shadow-xl transition-all hover:bg-white/20 hover:scale-105">
              <div className="bg-white/20 p-1.5 rounded-lg shadow-inner">
                <ArrowUp size={18} className="text-white" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[10px] uppercase font-bold opacity-60">{t('high')}</span>
                <span className="text-lg font-bold">
                  {formatTemperature(weather.forecast.forecastday[0].day.maxtemp_c, weather.forecast.forecastday[0].day.maxtemp_f, settings.temperature)}
                </span>
              </div>
            </div>
            
            <div className="group bg-white/10 backdrop-blur-xl px-4 py-2.5 rounded-2xl flex items-center gap-2.5 border border-white/20 shadow-xl transition-all hover:bg-white/20 hover:scale-105">
              <div className="bg-white/20 p-1.5 rounded-lg shadow-inner">
                <ArrowDown size={18} className="text-white" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[10px] uppercase font-bold opacity-60">{t('low')}</span>
                <span className="text-lg font-bold">
                  {formatTemperature(weather.forecast.forecastday[0].day.mintemp_c, weather.forecast.forecastday[0].day.mintemp_f, settings.temperature)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content - Weather Condition & Temp */}
        <div className="flex flex-col items-center md:items-end animate-in slide-in-from-end duration-700 delay-300 fill-mode-both">
          <div className="relative group">
            {/* Dynamic soft glow behind the icon */}
            <div className="absolute inset-0 bg-white/30 rounded-full blur-[50px] scale-110 opacity-40 group-hover:opacity-70 transition-opacity duration-1000 animate-pulse" />
            <Image 
              src={getWeatherIconUrl(weather.current.condition.icon)} 
              alt={weather.current.condition.text} 
              width={160}
              height={160}
              className="w-32 h-32 md:w-44 md:h-44 relative z-10 drop-shadow-[0_20px_50px_rgba(255,255,255,0.4)] transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3"
              priority
            />
          </div>

          <div className="text-center md:text-right mt-2">
            <p className="text-2xl md:text-3xl font-bold capitalize tracking-tight drop-shadow-sm">
              {weather.current.condition.text}
            </p>
            <h1 className="text-7xl md:text-[8rem] font-black tabular-nums tracking-tighter leading-[0.9] my-2 drop-shadow-md">
              {displayTemp}
            </h1>
            <p className="text-base md:text-lg font-medium opacity-80 backdrop-blur-sm bg-white/5 px-4 py-1 rounded-full inline-block border border-white/10">
              {t('feelsLike')}: <span className="font-bold">{displayFeelsLike}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
