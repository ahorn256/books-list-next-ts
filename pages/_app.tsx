import type { AppProps } from "next/app";
import { NextIntlClientProvider } from 'next-intl';
import { useRouter } from "next/router";
import "@/styles/globals.scss";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <NextIntlClientProvider
      locale={router.locale}
      timeZone="Europe/Vienna"
      messages={pageProps.messages}>
      <Component {...pageProps} />;
    </NextIntlClientProvider>
  ); 
}
