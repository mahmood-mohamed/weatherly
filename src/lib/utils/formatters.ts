
export function formatTemperature(celsius: number, fahrenheit: number, unit: 'C' | 'F') {
  return unit === 'C' ? `${Math.round(celsius)}°` : `${Math.round(fahrenheit)}°`;
}

export function formatWindSpeed(kph: number, mph: number, unit: 'kph' | 'mph') {
  return unit === 'kph' ? `${Math.round(kph)} km/h` : `${Math.round(mph)} mph`;
}

export function formatPressure(mb: number, unit: 'mb' | 'in') {
  // 1 mb = 0.02953 inHg
  return unit === 'mb' ? `${mb} mb` : `${(mb * 0.02953).toFixed(2)} inHg`;
}

export function formatVisibility(km: number, unit: 'km' | 'miles') {
  return unit === 'km' ? `${km} km` : `${(km * 0.621371).toFixed(1)} mi`;
}

export function formatPrecipitation(mm: number, unit: 'mm' | 'in') {
  return unit === 'mm' ? `${mm} mm` : `${(mm / 25.4).toFixed(2)} in`;
}

export function formatTime(timeString: string, format: '12h' | '24h', locale: string) {
  const date = new Date(timeString);
  const options: Intl.DateTimeFormatOptions = {
    hour: format === '12h' ? 'numeric' : '2-digit',
    minute: '2-digit',
    hour12: format === '12h',
  };
  return date.toLocaleTimeString(locale, options);
}

export function formatLocalTime(timeString: string, format: '12h' | '24h', locale: string) {
  const date = new Date(timeString);
  const options: Intl.DateTimeFormatOptions = {
    hour: format === '12h' ? 'numeric' : '2-digit',
    minute: '2-digit',
    hour12: format === '12h',
  };
  return date.toLocaleTimeString(locale, options);
}

export function formatDateTime(dateString: string, locale: string) {
  const date = new Date(dateString.replace(/-/g, '/')); // Replace - with / for better cross-browser support
  return new Intl.DateTimeFormat(locale, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);  
}

export function getWeatherIconUrl(iconPath: string) {
  if (!iconPath) return '';
  if (iconPath.startsWith('//')) {
    return `https:${iconPath}`;
  }
  return iconPath;
}
