"use client";

import { useTranslations } from "next-intl";
import { Calendar, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HourlyForecast } from "./HourlyForecast";
import { AstronomySection } from "./AstronomySection";
import { formatTemperature, getWeatherIconUrl } from "@/lib/utils/formatters";
import Image from "next/image";
import { useSettingsStore } from "@/hooks/use-settings";

interface HistoryDayDetailProps {
    dayData: any;
    location: string;
    country?: string;
    locale: string;
}

export function HistoryDayDetail({
    dayData,
    location,
    country,
    locale,
}: HistoryDayDetailProps) {
    const t = useTranslations("History");
    const settings = useSettingsStore();

    const formattedDate = new Date(dayData.date).toLocaleDateString(locale, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div aria-label="History Day Detail" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col space-y-4">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div className="space-y-1">
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                            {formattedDate}
                        </h2>
                        <div className="flex items-center text-muted-foreground">
                            <MapPin className="mr-1 h-4 w-4" />
                            <span>
                                {location} {country ? `(${country})` : ""}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Day Summary Card */}
                <Card className="lg:col-span-1 overflow-hidden border-border/50 bg-card/40 backdrop-blur-sm">
                    <CardHeader className="p-6 pb-2 border-b bg-muted/20">
                        <CardTitle className="text-lg font-semibold flex items-center">
                            <Calendar className="me-2 h-5 w-5 text-primary" />
                            {t("details")}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <p className="text-4xl font-bold">
                                    {formatTemperature(
                                        dayData.day.avgtemp_c,
                                        dayData.day.avgtemp_f,
                                        settings.temperature
                                    )}
                                </p>
                                <p className="text-muted-foreground capitalize font-medium">
                                    {dayData.day.condition.text}
                                </p>
                            </div>
                            <Image
                                src={getWeatherIconUrl(dayData.day.condition.icon)}
                                alt={dayData.day.condition.text}
                                width={80}
                                height={80}
                                className="w-20 h-20 drop-shadow-md"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
                            <div className="space-y-1">
                                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                                    {t("maxTemp")}
                                </p>
                                <p className="text-xl font-bold text-orange-500">
                                    {formatTemperature(
                                        dayData.day.maxtemp_c,
                                        dayData.day.maxtemp_f,
                                        settings.temperature
                                    )}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                                    {t("minTemp")}
                                </p>
                                <p className="text-xl font-bold text-blue-500">
                                    {formatTemperature(
                                        dayData.day.mintemp_c,
                                        dayData.day.mintemp_f,
                                        settings.temperature
                                    )}
                                </p>
                            </div>
                        </div>

                        {dayData.day.uv !== undefined && (
                            <div className="pt-4 border-t border-border/50">
                                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                                    UV Index
                                </p>
                                <p className="text-lg font-semibold">{dayData.day.uv}</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Hourly Forecast */}
                <div className="lg:col-span-2 space-y-4">
                    <h2 className="text-xl font-bold tracking-tight px-1">
                        {t("hourlyData")}
                    </h2>
                    <HourlyForecast hours={dayData.hour} locale={locale} />

                    <div className="pt-4">
                        <AstronomySection astro={dayData.astro} />
                    </div>
                </div>
            </div>
        </div>
    );
}
