import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import { getMessages } from 'next-intl/server';
import { Providers } from '@/components/providers';
import { Navbar } from '@/components/organisms/Navbar';
import { Sidebar } from '@/components/organisms/Sidebar';
import { Bottombar } from '@/components/organisms/Bottombar';
import { Footer } from '@/components/organisms/Footer';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Weatherly',
  description: 'Experience a professional-grade weather dashboard with real-time updates, detailed 3-day forecasts, and astronomical data. Responsive, bilingual, and designed for precision.',
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body className={cn(inter.className, "bg-background min-h-screen")}>
        <Providers locale={locale} messages={messages}>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex flex-1 pt-16">
              <Sidebar />
              <main className="flex-1 w-full md:ps-20 lg:ps-64 pb-24 md:pb-0 transition-all duration-300 flex flex-col">
                <div className="flex-1">
                  {children}
                </div>
                <Footer />
              </main>
            </div>
            <Bottombar />
          </div>
        </Providers>
      </body>
    </html>
  );
}
