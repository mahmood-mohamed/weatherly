"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NextIntlClientProvider } from "next-intl";
import { useState } from "react";

export function Providers({
  children,
  locale,
  messages,
}: {
  children: React.ReactNode;
  locale: string;
  messages: Record<string, any>;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>
        <NextIntlClientProvider locale={locale} messages={messages} timeZone="UTC">
          {children}
        </NextIntlClientProvider>
      </QueryClientProvider>
    </NextThemesProvider>
  );
}
