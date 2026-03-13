"use client";

import { useWeatherHistory } from "@/hooks/use-weather";
import { useLocationStore } from "@/hooks/use-location";
import { useTranslations, useLocale } from "next-intl";
import { WeatherSkeletonLoader } from "@/components/organisms/WeatherSkeletonLoader";
import { useState, useMemo } from "react";
import { HistoryDayDetail } from "@/components/organisms/HistoryDayDetail";
import { CalendarDays } from "lucide-react";

export default function HistoryPage() {
  const t = useTranslations("History");
  const locale = useLocale();
  const { location } = useLocationStore();

  // Build array of last 9 days (indexes 0..8 = yesterday..9 days ago)
  const today = new Date();
  const dates = useMemo(() => {
    const arr: Date[] = [];
    for (let i = 0; i <= 8; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      arr.push(d);
    }
    return arr;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [today.toDateString()]);

  const formatDateISO = (date: Date) => date.toISOString().split("T")[0];

  // Default selection: yesterday (second item)
  const [selectedDate, setSelectedDate] = useState<string>(
    formatDateISO(dates[1])
  );

  // Fetch only the selected date
  const { data, isLoading, error } = useWeatherHistory(
    location,
    selectedDate,
    locale
  );

  const selectedDayData = useMemo(() => {
    const days = data?.forecast?.forecastday || [];
    return days.length > 0 ? days[0] : null;
  }, [data]);

  // Helper: label for a date (today, yesterday, X days ago)
  const getDayLabel = (_date: Date, index: number) => {
    if (index === 0) return t("today");
    if (index === 1) return t("yesterday");
    return `${index} ${t("daysAgo")}`;
  };

  return (
    <div className="container mx-auto p-4 md:p-8 space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-primary/10">
            <CalendarDays className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              {t("title")}
            </h1>
            <p className="text-muted-foreground text-sm">{t("subtitle")}</p>
          </div>
        </div>
      </div>

      {/* Date Picker Strip */}
      <div className="relative">
        <div className="flex gap-2 overflow-x-auto hourly-scroll p-2 scrollbar-thin snap-x snap-mandatory">
          {dates.map((date, index) => {
            const dateISO = formatDateISO(date);
            const isActive = dateISO === selectedDate;
            const weekday = date.toLocaleDateString(locale, {
              weekday: "short",
            });
            const dayNum = date.getDate();
            const month = date.toLocaleDateString(locale, { month: "short" });

            return (
              <button
                key={dateISO}
                onClick={() => setSelectedDate(dateISO)}
                className={`
                  group relative flex flex-col items-center gap-1.5 snap-start
                  min-w-[90px] px-4 py-3 rounded-2xl border-2 transition-all duration-300
                  cursor-pointer select-none shrink-0
                  ${
                    isActive
                      ? "border-primary bg-primary/10 shadow-lg shadow-primary/10 scale-[1.02]"
                      : "border-border/50 bg-card/40 hover:border-primary/30 hover:bg-primary/5 hover:shadow-md"
                  }
                `}
              >
                {/* Weekday */}
                <span
                  className={`text-[11px] font-semibold uppercase tracking-wider ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {weekday}
                </span>

                {/* Day number */}
                <span
                  className={`text-2xl font-bold leading-none ${
                    isActive ? "text-primary" : "text-foreground"
                  }`}
                >
                  {dayNum}
                </span>

                {/* Month */}
                <span
                  className={`text-[11px] font-medium ${
                    isActive ? "text-primary/80" : "text-muted-foreground"
                  }`}
                >
                  {month}
                </span>

                {/* Relative label */}
                <span
                  className={`text-[9px] font-medium uppercase tracking-wider ${
                    isActive ? "text-primary/70" : "text-muted-foreground/60"
                  }`}
                >
                  {getDayLabel(date, index)}
                </span>

                {/* Active indicator dot */}
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary animate-in zoom-in duration-300" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Day Detail */}
      {isLoading ? (
        <WeatherSkeletonLoader />
      ) : error ? (
        <div className="p-8 text-center text-red-500">
          {t("noHistory")}
        </div>
      ) : selectedDayData ? (
        <HistoryDayDetail
          dayData={selectedDayData}
          location={location}
          country={data?.location?.country}
          locale={locale}
        />
      ) : (
        <div className="text-center p-12 bg-muted/30 rounded-2xl border border-border/50">
          <CalendarDays className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
          <p className="text-muted-foreground">{t("noHistory")}</p>
        </div>
      )}
    </div>
  );
}
