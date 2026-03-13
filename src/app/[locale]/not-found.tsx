"use client";

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { CloudLightning, Home } from 'lucide-react'; // Placeholder for animated image

export default function NotFoundPage() {
  const t = useTranslations('NotFound');
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4 text-center">
      <div className="relative mb-8 animate-bounce">
        <CloudLightning className="w-48 h-48 text-primary opacity-80" />
        <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full -z-10" />
      </div>
      
      <h1 className="text-4xl font-bold mb-4 font-inter">{t('title')}</h1>
      <p className="text-xl text-muted-foreground mb-8 max-w-md">{t('description')}</p>
      
      <Button 
        onClick={() => router.push('/en')}
        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-6 px-8 rounded-full shadow-lg transform transition hover:scale-105"
      >
        <Home /> 
        {t('returnHome')}
      </Button>
    </main>
  );
}
