import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { i18n, type Locale,localizations } from "@/i18n-config";
import { getDictionary, Dictionary } from '@/dictionaries'
import { ClerkProvider,ClerkLoaded, ClerkLoading} from '@clerk/nextjs'
import NavbarSticky from "@/components/navbar-sticky";
import Footer from "@/components/footer";

import { LoadingFull } from "@/components/loading-skeleton";

const inter = Inter({ subsets: ["latin"] });
export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}
export const metadata: Metadata = {
  title: "Free ai image description generator - 100% Free, No Login",
  description: "Exploring the Mysteries Behind the Image Using an AI Image Description Generator Tool.",
  twitter: {
    card: "summary_large_image", title: "Free ai image description generator - 100% Free, No Login",
    description: "Exploring the Mysteries Behind the Image Using an AI Image Description Generator Tool.",
    images: ["https://imagedescriptiongenerator.xyz/assets/og.png"]
  },
  openGraph: {
    type: "website",
    url: "https://imagedescriptiongenerator.xyz",
    title: "Free ai image description generator - 100% Free, No Login",
    description: "Exploring the Mysteries Behind the Image Using an AI Image Description Generator Tool.",
    siteName: "imagetodescription.ai",
    images: [{
      url: "https://imagedescriptiongenerator.xyz/favicon/assets/og.png",
    }]
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://imagedescriptiongenerator.xyz" },
  other: { "shortcut icon": "favicon.ico" }
};

export default async function Layout({
  children, params
}: Readonly<{
  children: React.ReactNode,
  params: { lang: Locale }
}>) {
  const dictionary = await getDictionary(params.lang);

  return (
    <ClerkProvider localization={localizations[params.lang]}>
      <html lang={params.lang}>
        <body className={inter.className}>
        <NavbarSticky lang={params.lang} dictionary={dictionary} isSigInOrUp={false}/>
            <ClerkLoading>
              <LoadingFull/>
            </ClerkLoading>
            <ClerkLoaded>
              {children}
            </ClerkLoaded>
          <Footer dictionary={dictionary.footer} />
          <GoogleAnalytics gaId="G-XXXX" />
        </body> 
      </html>
    </ClerkProvider>
  );

}
