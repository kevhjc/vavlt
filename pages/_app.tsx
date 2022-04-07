import type { AppProps } from 'next/app';
import { createClient } from '@supabase/supabase-js';

import { ThemeProvider } from 'next-themes';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
