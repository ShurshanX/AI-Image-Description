import { i18n, type Locale, localizations } from "@/i18n-config";
import { Inter } from "next/font/google";
import { getDictionary, Dictionary } from '@/dictionaries'
import { ThemeProvider } from "@/components/theme-context";
import type { Metadata } from "next";
import { cookies } from 'next/headers';
import { dark, experimental__simple } from "@clerk/themes";
import { ClerkProvider } from '@clerk/nextjs'
import { SpeedInsights } from "@vercel/speed-insights/next"
import FooterSocial from "@/components/footer-social";
import { GoogleAnalytics } from "@next/third-parties/google";
import { NavProvider } from "@/components/nav-context";
import NavbarSticky from "@/components/navbar-sticky";

import "./globals.css";

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
        images: ["https://imagedescriptiongenerator.xyz/assets/og-explore.png"]
    },
    openGraph: {
        type: "website",
        url: "https://imagedescriptiongenerator.xyz",
        title: "Free ai image description generator - 100% Free, No Login",
        description: "Exploring the Mysteries Behind the Image Using an AI Image Description Generator Tool.",
        siteName: "imagetodescription.ai",
        images: [{
            url: "https://imagedescriptiongenerator.xyz/favicon/assets/og-explore.png",
        }]
    },
    robots: { index: true, follow: true },
    alternates: { canonical: "https://imagedescriptiongenerator.xyz" },
    other: { "shortcut icon": "favicon.ico" }
};

export default async function RootLayout({
    children, params
}: Readonly<{
    children: React.ReactNode,
    params: { lang: Locale }
}>) {
    const dictionary = await getDictionary(params.lang);
    const themeCookie = cookies().get('color-theme');
    const theme = themeCookie ? themeCookie.value : 'dark';
    const credits = "0";

    return (

        <html lang={params.lang} className={theme}>
        <body className={`${inter.className} dark:bg-gray-900`}>
            <ClerkProvider localization={localizations[params.lang]} appearance={{ baseTheme: theme === 'dark' ? dark : experimental__simple }}>
                <SpeedInsights />
                <ThemeProvider storedTheme={theme}>
                    <NavProvider credits={credits}>
                        <NavbarSticky lang={params.lang} dictionary={dictionary}/>
                        {children}
                    </NavProvider>
                </ThemeProvider>
            </ClerkProvider>
            <FooterSocial dictionary={dictionary} lang={params.lang} />
            <GoogleAnalytics gaId="G-XXX" />
        </body>
    </html>

    )
}