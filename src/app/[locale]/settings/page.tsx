"use client";

import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { useRouter, usePathname } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Separator } from '../../../components/ui/separator';
import { useSettingsStore } from '../../../hooks/use-settings';

export default function SettingsPage() {
  const t = useTranslations('Settings');
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  
  const settings = useSettingsStore();

  const handleLanguageChange = (lang: string) => {
    // Assuming pathname format is /[locale]/settings
    const segments = pathname.split('/');
    segments[1] = lang;
    router.push(segments.join('/'));
  };

  return (
    <main className="min-h-screen bg-background text-foreground p-4 lg:p-8 animate-in fade-in duration-500">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold font-inter">{t('title')}</h1>
          <Button 
            variant="outline" 
            onClick={settings.resetToDefault} 
            disabled={!settings.hasChanged}
          >
            {t('resetDefaults')}
          </Button>
        </div>

        {/* Display Settings */}
        <Card className="rounded-xl border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>{t('theme')} & {t('language')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {/* Language Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-muted-foreground">{t('language')}</label>
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  variant={pathname.startsWith('/en') ? 'default' : 'outline'}
                  onClick={() => handleLanguageChange('en')}
                  className="w-full justify-start"
                >
                  {t('english')}
                </Button>
                <Button 
                  variant={pathname.startsWith('/ar') ? 'default' : 'outline'}
                  onClick={() => handleLanguageChange('ar')}
                  className="w-full justify-start"
                >
                  {t('arabic')}
                </Button>
              </div>
            </div>

            <Separator />

            {/* Theme Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-muted-foreground">{t('theme')}</label>
              <div className="grid grid-cols-3 gap-4">
                <Button 
                  variant={theme === 'light' ? 'default' : 'outline'}
                  onClick={() => setTheme('light')}
                >
                  {t('light')}
                </Button>
                <Button 
                  variant={theme === 'dark' ? 'default' : 'outline'}
                  onClick={() => setTheme('dark')}
                >
                  {t('dark')}
                </Button>
                <Button 
                  variant={theme === 'system' ? 'default' : 'outline'}
                  onClick={() => setTheme('system')}
                >
                  {t('system')}
                </Button>
              </div>
            </div>

          </CardContent>
        </Card>

        {/* Units Settings */}
        <Card className="rounded-xl border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>{t('units')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {/* Temperature Unit */}
            <div className="space-y-3">
               <label className="text-sm font-medium text-muted-foreground">{t('units')}</label>
               <div className="grid grid-cols-2 gap-4">
                  <Button 
                    variant={settings.temperature === 'C' ? 'default' : 'outline'}
                    onClick={() => settings.setSetting('temperature', 'C')}
                  >
                    {t('celsius')}
                  </Button>
                  <Button 
                    variant={settings.temperature === 'F' ? 'default' : 'outline'}
                    onClick={() => settings.setSetting('temperature', 'F')}
                  >
                    {t('fahrenheit')}
                  </Button>
               </div>
            </div>

            <Separator />

            {/* Wind Unit */}
            <div className="space-y-3">
               <label className="text-sm font-medium text-muted-foreground">{t('windUnit')}</label>
               <div className="grid grid-cols-2 gap-4">
                  <Button 
                    variant={settings.wind === 'kph' ? 'default' : 'outline'}
                    onClick={() => settings.setSetting('wind', 'kph')}
                  >
                    {t('kph')}
                  </Button>
                  <Button 
                    variant={settings.wind === 'mph' ? 'default' : 'outline'}
                    onClick={() => settings.setSetting('wind', 'mph')}
                  >
                    {t('mph')}
                  </Button>
               </div>
            </div>

            <Separator />

            {/* Pressure Unit */}
            <div className="space-y-3">
               <label className="text-sm font-medium text-muted-foreground">{t('pressureUnit')}</label>
               <div className="grid grid-cols-2 gap-4">
                  <Button 
                    variant={settings.pressure === 'mb' ? 'default' : 'outline'}
                    onClick={() => settings.setSetting('pressure', 'mb')}
                  >
                    {t('mb')}
                  </Button>
                  <Button 
                    variant={settings.pressure === 'in' ? 'default' : 'outline'}
                    onClick={() => settings.setSetting('pressure', 'in')}
                  >
                    {t('inHg')}
                  </Button>
               </div>
            </div>

            <Separator />

             {/* Visibility Unit */}
             <div className="space-y-3">
               <label className="text-sm font-medium text-muted-foreground">{t('visibilityUnit')}</label>
               <div className="grid grid-cols-2 gap-4">
                  <Button 
                    variant={settings.visibility === 'km' ? 'default' : 'outline'}
                    onClick={() => settings.setSetting('visibility', 'km')}
                  >
                    {t('km')}
                  </Button>
                  <Button 
                    variant={settings.visibility === 'miles' ? 'default' : 'outline'}
                    onClick={() => settings.setSetting('visibility', 'miles')}
                  >
                    {t('miles')}
                  </Button>
               </div>
            </div>

            <Separator />

            {/* Precipitation Unit */}
            <div className="space-y-3">
               <label className="text-sm font-medium text-muted-foreground">{t('precipitationUnit')}</label>
               <div className="grid grid-cols-2 gap-4">
                  <Button 
                    variant={settings.precipitation === 'mm' ? 'default' : 'outline'}
                    onClick={() => settings.setSetting('precipitation', 'mm')}
                  >
                    {t('mm')}
                  </Button>
                  <Button 
                    variant={settings.precipitation === 'in' ? 'default' : 'outline'}
                    onClick={() => settings.setSetting('precipitation', 'in')}
                  >
                    {t('in')}
                  </Button>
               </div>
            </div>

            <Separator />
            
            {/* Time Format */}
            <div className="space-y-3">
               <label className="text-sm font-medium text-muted-foreground">{t('timeFormat')}</label>
               <div className="grid grid-cols-2 gap-4">
                  <Button 
                    variant={settings.timeFormat === '12h' ? 'default' : 'outline'}
                    onClick={() => settings.setSetting('timeFormat', '12h')}
                  >
                    {t('12h')}
                  </Button>
                  <Button 
                    variant={settings.timeFormat === '24h' ? 'default' : 'outline'}
                    onClick={() => settings.setSetting('timeFormat', '24h')}
                  >
                    {t('24h')}
                  </Button>
               </div>
            </div>

          </CardContent>
        </Card>

      </div>
    </main>
  );
}
