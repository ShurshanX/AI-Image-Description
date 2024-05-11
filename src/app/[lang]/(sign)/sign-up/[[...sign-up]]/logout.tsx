"use client"
import { SignUp } from "@clerk/nextjs"
import ThemeContext from "@/components/theme-context";
import { dark, experimental__simple } from "@clerk/themes";
import { useContext } from 'react';

export default function Logout({ lang }: {lang: string}) {
    const { theme } = useContext(ThemeContext);
  return (
    <SignUp signInUrl={`/${lang}/sign-in`} appearance={{ baseTheme: theme === 'dark' ? dark : experimental__simple }}/>
  )
}