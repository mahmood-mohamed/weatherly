import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const BASE_URL = 'https://api.weatherapi.com/v1';

const weatherApi = axios.create({
  baseURL: BASE_URL,
});

export interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
    localtime: string;
  };
  current: {
    temp_c: number;
    temp_f: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    wind_kph: number;
    wind_mph: number;
    pressure_mb: number;
    precip_mm: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
    uv: number;
  };
  forecast: {
    forecastday: Array<{
      date: string;
      day: {
        maxtemp_c: number;
        maxtemp_f: number;
        mintemp_c: number;
        mintemp_f: number;
        avgtemp_c: number;
        avgtemp_f: number;
        condition: {
          text: string;
          icon: string;
          code: number;
        };
        uv: number;
      };
      astro: {
        sunrise: string;
        sunset: string;
        moonrise: string;
        moonset: string;
        moon_phase: string;
        moon_illumination: number;
        is_moon_up: number;
        is_sun_up: number;
      };
      hour: Array<{
        time: string;
        temp_c: number;
        temp_f: number;
        condition: {
          text: string;
          icon: string;
        };
        chance_of_rain: number;
        is_day: number;
      }>;
    }>;
  };
}

export interface HistoryData {
  location: {
    name: string;
    region: string;
    country: string;
  };
  forecast: {
    forecastday: Array<{
      date: string;
      day: {
        maxtemp_c: number;
        maxtemp_f: number;
        mintemp_c: number;
        mintemp_f: number;
        avgtemp_c: number;
        avgtemp_f: number;
        condition: {
          text: string;
          icon: string;
          code: number;
        };
      };
      astro: {
        sunrise: string;
        sunset: string;
        moonrise: string;
        moonset: string;
        moon_phase: string;
        moon_illumination: number;
        is_moon_up: number;
        is_sun_up: number;
      };
      hour: Array<{
        time: string;
        temp_c: number;
        temp_f: number;
        condition: {
          text: string;
          icon: string;
        };
        chance_of_rain: number;
        is_day: number;
      }>;
    }>;
  };
}

export const getWeather = async (query: string, locale: string = 'en'): Promise<WeatherData> => {
  if (!API_KEY) {
    throw new Error('Weather API key not configured');
  }
  const response = await weatherApi.get('/forecast.json', {
    params: {
      key: API_KEY,
      q: query,
      days: 3, // Fetch 3 days forecast
      aqi: 'no',
      alerts: 'no',
      lang: locale, // Pass the active language to the API
    },
  });
  return response.data;
};

export interface SearchLocation {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  url: string;
}

export const searchLocations = async (query: string, locale: string = 'en'): Promise<SearchLocation[]> => {
  if (!API_KEY || !query) return [];
  const response = await weatherApi.get('/search.json', {
    params: {
      key: API_KEY,
      q: query,
      lang: locale, // Pass the active language
    },
  });
  return response.data;
};

export const getHistory = async (query: string, dt: string, end_dt: string, locale: string = 'en'): Promise<HistoryData> => {
  if (!API_KEY) {
    throw new Error('Weather API key not configured');
  }
  const response = await weatherApi.get('/history.json', {
    params: {
      key: API_KEY,
      q: query,
      dt,
      end_dt,
      lang: locale,
    },
  });
  return response.data;
};
