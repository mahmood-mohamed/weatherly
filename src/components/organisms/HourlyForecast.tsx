"use client";

import { useSettingsStore } from '../../hooks/use-settings';
import { formatTemperature, formatTime, getWeatherIconUrl } from '../../lib/utils/formatters';
import { useTranslations } from 'next-intl';
import { ScrollArea } from '../../components/ui/scroll-area';
import Image from 'next/image';
import { Tooltip } from '../../components/ui/tooltip';
import { cn } from '../../lib/utils';
import { getWeatherCategory, getDynamicBackgroundClass } from '../../lib/utils/weather-background';
import { Clock4 } from 'lucide-react';

export function HourlyForecast({
  hours,
  currentTime,
  locale
}: {
  hours: any[],
  currentTime?: string,
  locale: string
}) {
  const settings = useSettingsStore();
  const t = useTranslations('HourlyForecast');

  // We show 24 hours (1 full day)
  const displayHours = hours.slice(0, 24);

  return (
    <div className="w-full mt-6 select-none" aria-label={t('title')}>
      <h2 className="text-lg flex items-center gap-2 mb-2 tracking-tight font-semibold">
        <Clock4 className="w-5 h-5 text-primary" />
        {t('title')}
      </h2>
      <ScrollArea className="w-full whitespace-nowrap rounded-xl border border-border/80 bg-card/40 backdrop-blur-sm hourly-scroll">
        <div className="flex w-max space-x-4 p-4">
          {displayHours.map((hour: any, index: number) => {
            const time = formatTime(hour.time, settings.timeFormat, locale);
            // Match date and hour to highlight "Now"
            const isCurrentHour = currentTime && hour.time.split(':')[0] === currentTime.split(':')[0];

            const category = getWeatherCategory(hour.condition.code, hour.temp_c);
            const isDay = hour.is_day === 1;
            const bgClass = getDynamicBackgroundClass(category, isDay);

            return (
              <div
                key={index}
                className={cn(
                  "flex flex-col items-center justify-start border border-border/80 space-y-2 min-w-[110px] p-4 rounded-2xl transition-all duration-500",
                  isCurrentHour
                    ? `${bgClass} shadow-xl scale-105 z-10 border-transparent`
                    : "bg-card/80 hover:bg-muted/50 text-foreground"
                )}
              >
                <span className={cn(
                  "text-xs font-bold uppercase tracking-widest",
                  isCurrentHour ? "opacity-90" : "text-muted-foreground"
                )}>
                  {isCurrentHour ? t('now') : time}
                </span>

                <Tooltip content={hour.condition.text}>
                  <div className={cn(
                    "relative p-1 rounded-full transition-transform duration-300 group-hover:rotate-12",
                    isCurrentHour ? "bg-white/20" : "bg-muted/30"
                  )}>
                    <Image
                      src={getWeatherIconUrl(hour.condition.icon)}
                      alt={hour.condition.text}
                      width={48}
                      height={48}
                      className="w-12 h-12 drop-shadow-md"
                    />
                  </div>
                </Tooltip>

                <span className="text-xl font-bold tabular-nums">
                  {formatTemperature(hour.temp_c, hour.temp_f, settings.temperature)}
                </span>

                <Tooltip content={t('chanceOfRain')}>
                  <div className={cn(
                    "flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black",
                    isCurrentHour ? "bg-black/20 text-white" : "bg-blue-500/20 text-blue-700"
                  )}>
                    {hour.chance_of_rain}%
                  </div>
                </Tooltip>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
