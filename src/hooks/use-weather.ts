import { useQuery } from '@tanstack/react-query';
import { getWeather, searchLocations, getHistory } from '../lib/api/weather';

export function useWeatherData(locationQuery: string, locale: string) {
  return useQuery({
    queryKey: ['weather', locationQuery, locale],
    queryFn: () => getWeather(locationQuery, locale),
    enabled: !!locationQuery,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useSearchLocations(searchQuery: string, locale: string) {
  return useQuery({
    queryKey: ['locations', searchQuery, locale],
    queryFn: () => searchLocations(searchQuery, locale),
    enabled: searchQuery.length >= 3,
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: true,
    retryDelay: 1000,
  });
}

export function useWeatherHistory(locationQuery: string, dt: string, locale: string) {
  return useQuery({
    queryKey: ['weather-history', locationQuery, dt, locale],
    queryFn: () => getHistory(locationQuery, dt, locale),
    enabled: !!locationQuery && !!dt,
    staleTime: 60 * 60 * 1000, // 1 hour
  });
}
