"use client";

import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { CloudSun } from 'lucide-react';
import { useWeatherData } from '../../hooks/use-weather';
import { useLocationStore } from '../../hooks/use-location';
import { HeroSection } from '../../components/organisms/HeroSection';
import { CurrentDetailsGrid } from '../../components/organisms/CurrentDetailsGrid';
import { HourlyForecast } from '../../components/organisms/HourlyForecast';
import { DailyForecast } from '../../components/organisms/DailyForecast';
import { AstronomySection } from '../../components/organisms/AstronomySection';
import { WeatherSkeletonLoader } from '../../components/organisms/WeatherSkeletonLoader';
import { getDynamicBackgroundClass, getWeatherCategory } from '../../lib/utils/weather-background';

export default function HomePage() {
  const t = useTranslations('Weather');
  const locale = useLocale();
  const router = useRouter();
  const { location } = useLocationStore();

  const { data: weather, isLoading, isError } = useWeatherData(location, locale);

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-4rem)]">
        <WeatherSkeletonLoader />
      </div>
    );
  }

  if (isError || !weather) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-gray-900 to-black text-white flex flex-col items-center justify-center p-4">
        <CloudSun className="w-24 h-24 text-muted-foreground mb-4 opacity-50" />
        <h2 className="text-2xl font-bold mb-6">{t('errorText')}</h2>
      </div>
    );
  }

  const isDay = weather.current.condition.icon.includes('day');
  const category = getWeatherCategory(weather.current.condition.code, weather.current.temp_c);
  const bgHintClass = getDynamicBackgroundClass(category, isDay);

  return (
    <div className="animate-in fade-in duration-700">
      <div className="container mx-auto max-w-7xl p-4 lg:p-8 space-y-8">

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

          {/* Left Column (Hero + Current Details + Hourly) */}
          <div className="xl:col-span-2 space-y-8">
            <HeroSection weather={weather} />
            <HourlyForecast
              hours={[...weather.forecast.forecastday[0].hour, ...weather.forecast.forecastday[1].hour]}
              currentTime={weather.location.localtime}
              locale={locale}
            />
            <CurrentDetailsGrid weather={weather} />
            <AstronomySection astro={weather.forecast.forecastday[0].astro} />
          </div>

          {/* Right Column (3-Day Forecast) */}
          <div className="xl:col-span-1">
            <DailyForecast weather={weather} locale={locale} />
          </div>

        </div>

      </div>
    </div>
  );
}
