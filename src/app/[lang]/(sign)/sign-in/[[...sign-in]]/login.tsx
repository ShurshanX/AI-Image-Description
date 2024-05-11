'use client'
import { useContext } from 'react';
import ThemeContext from "@/components/theme-context";
import { SignIn } from "@clerk/nextjs"
import { Locale } from "@/i18n-config";
import { dark, experimental__simple } from "@clerk/themes";


export default function Login({lang}:{lang:Locale}) {
    const {theme} = useContext(ThemeContext);

    return (
        <SignIn signUpUrl={`/${lang}/sign-up`} appearance={{ baseTheme: theme === 'dark' ? dark : experimental__simple }}/>
    )
}