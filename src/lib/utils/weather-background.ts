export type WeatherCategory = 'CLEAR' | 'CLOUDY' | 'RAIN' | 'SNOW' | 'THUNDERSTORM';

export function getWeatherCategory(conditionCode: number, tempC: number): WeatherCategory {
  // WeatherAPI condition codes
  // 1000: Clear
  if (conditionCode === 1000) return 'CLEAR';
  
  // 1003-1009: Cloudy/Overcast
  if (conditionCode >= 1003 && conditionCode <= 1009) return 'CLOUDY';
  
  // 1030-1147: Mist/Fog
  if (conditionCode >= 1030 && conditionCode <= 1147) return 'CLOUDY';
  
  // 1150-1201: Rain/Drizzle
  // 1240-1246: Rain showers
  if ((conditionCode >= 1150 && conditionCode <= 1201) || (conditionCode >= 1240 && conditionCode <= 1246)) return 'RAIN';
  
  // 1210-1237: Snow/Sleet/Ice
  // 1255-1264: Snow showers
  if ((conditionCode >= 1210 && conditionCode <= 1237) || (conditionCode >= 1255 && conditionCode <= 1264) || tempC <= 0) return 'SNOW';
  
  // 1273-1282: Thunderstorms
  if (conditionCode >= 1273 && conditionCode <= 1282) return 'THUNDERSTORM';
  
  return 'CLEAR'; // Fallback
}

export function getDynamicBackgroundClass(category: WeatherCategory, isDay: boolean): string {
  if (isDay) {
    switch (category) {
      case 'CLEAR': return 'bg-gradient-to-br from-blue-400 to-blue-200 text-blue-900';
      case 'CLOUDY': return 'bg-gradient-to-br from-gray-400 to-gray-200 text-gray-900';
      case 'RAIN': return 'bg-gradient-to-br from-blue-700 to-gray-400 text-white';
      case 'SNOW': return 'bg-gradient-to-br from-blue-100 to-white text-blue-900';
      case 'THUNDERSTORM': return 'bg-gradient-to-br from-gray-700 to-gray-900 text-white';
      default: return 'bg-gradient-to-br from-blue-400 to-blue-200';
    }
  } else {
    // Night variants
    switch (category) {
      case 'CLEAR': return 'bg-gradient-to-br from-indigo-900 to-blue-900 text-white';
      case 'CLOUDY': return 'bg-gradient-to-br from-gray-800 to-gray-600 text-white';
      case 'RAIN': return 'bg-gradient-to-br from-blue-900 to-gray-800 text-white';
      case 'SNOW': return 'bg-gradient-to-br from-slate-800 to-blue-900 text-white';
      case 'THUNDERSTORM': return 'bg-gradient-to-br from-gray-900 to-black text-white';
      default: return 'bg-gradient-to-br from-indigo-900 to-blue-900';
    }
  }
}
