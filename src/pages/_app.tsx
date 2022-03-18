import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import MainLayout from '@layout/MainLayout';
import '@styles/tailwind.css';
import AuthProvider from '@components/AuthProvider';
import AuthGuard from '@components/AuthGuard';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" enableColorScheme={false}>
      <AuthProvider>
        <MainLayout>
          {(Component as any).protected ? (
            <AuthGuard>
              <Component {...pageProps} />
            </AuthGuard>
          ) : (
            <Component {...pageProps} />
          )}
        </MainLayout>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default MyApp;
