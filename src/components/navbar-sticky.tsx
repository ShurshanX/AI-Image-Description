'use client'
import { useState, useContext } from 'react';
import Link from "next/link";
import { usePathname } from 'next/navigation'
import { Dictionary } from '@/dictionaries'
import { i18n, type Locale, languages, languagesKV } from "@/i18n-config";
import { SignInButton, UserButton, SignedIn, SignedOut, SignUpButton, useAuth } from "@clerk/nextjs";
import NavContext from "@/components/nav-context";
import ThemeContext, { Theme } from "@/components/theme-context";
import { ThemeDarkIcon, ThemeLightIcon } from '@/components/theme-icon';
import { dark, experimental__simple } from "@clerk/themes";

type Props = {
    lang: Locale;
    dictionary: Dictionary;
}

type UserAgent = 'mobile' | 'desktop';


export default function NavbarSticky({ lang, dictionary }: Props) {

    const [collapseMobile, setCollapseMobile] = useState("hidden");

    const { theme, setTheme } = useContext(ThemeContext);

    const {value, setValue} = useContext(NavContext);

    const { userId } = useAuth();

    const pathname = usePathname()


    const links = [
        { name: `${dictionary.navbar.home}`, href: `/${lang}` },
        { name: `${dictionary.navbar.explore}`, href: { pathname: `/${lang}/explore`,query: { page: 1} }},
        { name: `${dictionary.navbar.blog}`, href: `/${lang}/blog` },
        { name: `${dictionary.navbar.about}`, href: `/${lang}/about` },
        { name: `${dictionary.navbar.pricing}`, href: `/${lang}/paddle` },
        // { name: `${dictionary.navbar.pricing}`, href: `/${lang}/lemon` },
    ]

    function handleThemeChange(themeName: Theme) {

        setTheme(themeName);
        ThemeChange()
    }

    function handleClick(state: string) {
        setCollapseMobile(state);
    }

    function signUpOrInSwitcher() {
        if (!pathname || pathname.search("/sign-in") !== -1) {

            return true;
        }
        return false;
    }

    return (
        <nav className="flex flex-row bg-white dark:bg-gray-900 sticky w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
            <div className="max-w-screen-2xl w-full flex flex-wrap items-center justify-between  py-4 px-4 md:px-0 md:ml-10">
                <a href={`/${lang}`} className="flex items-center space-x-3 rtl:space-x-reverse">
                    {/* <img src="/assets/logo.svg" className="h-8 dark:text-white" alt={dictionary.navbar.logo_alt} title={dictionary.navbar.logo_title} /> */}
                    <svg aria-label={dictionary.navbar.logo_alt} className="h-8 dark:text-white" viewBox="0 0 70 69.73783005643229"><g transform="translate(0, -0.0000010417790299763285) scale(8.739075905091669)" fill="currentColor"><path xmlns="http://www.w3.org/2000/svg" d="M4 0c-.69 0-1.34.19-1.91.5l3.22 2.34.75-2.25c-.6-.36-1.31-.59-2.06-.59zm-2.75 1.13c-.76.73-1.25 1.74-1.25 2.88 0 .25.02.48.06.72l3.09-2.22-1.91-1.38zm5.63.13l-1.22 3.75h2.19c.08-.32.16-.65.16-1 0-1.07-.44-2.03-1.13-2.75zm-4.72 3.22l-1.75 1.25c.55 1.13 1.6 1.99 2.88 2.22l-1.13-3.47zm1.56 1.53l.63 1.97c1.33-.12 2.46-.88 3.09-1.97h-3.72z"></path></g></svg>
                    <div className='space-x-1'>
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white hidden md:inline-block" title={dictionary.navbar.logo_title}>Image Describer </span>
                        {/* <p className='self-center font-semibold whitespace-nowrap hidden md:inline-block text-sm text-red-500/90'>Beta</p> */}
                    </div>
                </a>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse md:gap-2">

                    {/* {userId && <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-1xl font-semibold text-slate-500 hover:text-blue-800 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                     credits:{value}
                    </button>} */}
                    {userId &&
                        <div className='cursor-pointer select-text inline-flex font-medium items-center justify-betwee'>
                            <span className='bg-blue-100 text-slate-500 hover:text-blue-800 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 text-1xl font-semibold me-2 px-4 py-2 rounded dark:bg-blue-200 dark:text-blue-800 ms-2'>credits:{value}</span>
                        </div>
                    }
                    <div className="hidden md:inline-flex font-medium items-center justify-between ">
                        <a href={`/${lang}/contact`} className="inline-flex text-sm  sm:px-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">{dictionary.navbar.contact}</a>
                    </div>

                    <LanguageSwitcher lang={lang} userAgent='desktop' dictionary={dictionary['navbar']} />

                    <div className={`inline-flex ${userId?'min-w-7':'min-w-11'} `}>
                        <SignedOut>
                            {/* <SignInButton /> */}
                            {signUpOrInSwitcher() ?
                                <Link className='flex flex-row items-center justify-center content-center w-[70px] transition-colors duration-200 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 md:font-medium rounded-lg text-sm p-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' href={`/${lang}/sign-up`}>Sign Up</Link>
                                : <Link className='flex flex-row items-center justify-center content-center w-[70px] transition-colors duration-200 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 md:font-medium rounded-lg text-sm p-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' href={`/${lang}/sign-in`}>Sign In</Link>
                            }
                        </SignedOut>
                        <SignedIn>
                            <UserButton appearance={{ baseTheme: theme === 'dark' ? dark : experimental__simple }} />
                        </SignedIn>

                        {/* <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 md:font-medium rounded-lg text-sm px-2 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign Up</button> */}
                    </div>
                    <div className="inline-flex">
                        <span className="sr-only">Open main menu</span>
                        <button type="button" onClick={() => setCollapseMobile(collapseMobile === 'hidden' ? 'show' : 'hidden')} className="inline-flex items-center w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* main menu link */}
                {/* <SignedIn> */}

                <div className={`${collapseMobile} items-center justify-between w-full md:flex md:w-auto mb-6 md:mb-0 md:order-1 `}>
                    <div className="flex mt-5 md:hidden mb-6">
                        <Link href={`/${lang}/contact`} onClick={() => setCollapseMobile('hidden')} className=" w-full text-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">{dictionary.navbar.contact}</Link>
                    </div>

                    <ThemeSwitcher dictionary={dictionary['navbar']} />
                    <LanguageSwitcher lang={lang} userAgent='mobile' dictionary={dictionary['navbar']} />

                    <ul className="flex flex-col p-0 divide-y dark:divide-gray-600 last:border-b md:last:border-b-0 md:divide-y-0  md:p-0 mt-4 font-medium  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white md:dark:bg-gray-900 dark:border-gray-600">
                        {links.map((link, index) => {
                            return (
                                <li key={index} className='py-2'>
                                    <Link
                                        onClick={() => setCollapseMobile('hidden')}
                                        key={link.name}
                                        href={link.href}
                                        className={'block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'}>
                                        {link.name}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {/* </SignedIn> */}
                {/* main menu link */}

            </div>
            <div className='hidden md:inline-flex items-center justify-center mr-2 '>
                <div onClick={() => handleThemeChange(theme === 'dark' ? 'light' : 'dark')} className='text-gray-900 dark:text-white rounded-lg p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white'>
                    {theme === 'dark' ? <ThemeLightIcon /> : <ThemeDarkIcon />}
                </div>
            </div>
        </nav>


    );
}


async function* streamingFetch(input: RequestInfo | URL, init?: RequestInit) {

    const response = await fetch(input, init)
    yield await response.json();
}

function LanguageSwitcher({ lang, userAgent, dictionary }: { lang: Locale, userAgent: UserAgent, dictionary: Dictionary["navbar"] }) {

    const pathname = usePathname()
    //是否显示语言选择下拉框
    const [showLanguageSwitcher, setShowLanguageSwitcher] = useState("hidden");
    const redirectedPathName = (locale: Locale) => {
        if (!pathname) return "/";
        const segments = pathname.split("/");
        segments[1] = locale;
        return segments.join("/");
    };

    if (userAgent === 'desktop') {

        return (
            <div className="hidden md:block relative items-center justify-between ">
                <button type="button" onClick={() => setShowLanguageSwitcher(showLanguageSwitcher === 'hidden' ? 'show' : 'hidden')} className="flex w-full items-center font-medium justify-center px-2 py-3 text-sm text-gray-900 dark:text-white rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                    <img src={`/assets/language/${lang}.svg`} className='h-3.5 w-3.5 rounded-full me-2' alt={languagesKV[lang]}/>
                    {languagesKV[lang]}
                </button>
                <div className={`${showLanguageSwitcher} absolute min-w-[120px] z-50 my-4 text-base list-none bg-white dark:bg-gray-700 divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700"`}>
                    <ul className="py-2 font-medium">
                        {languages.map((lg, index) => {
                            return (
                                <li key={index}>
                                    <a href={redirectedPathName(lg.locale)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                                        <div className="inline-flex items-center">
                                            <img className='h-3.5 w-3.5 rounded-full me-2' src={`/assets/language/${lg.locale}.svg`} alt={lg.name}/>
                                            {lg.name}
                                        </div>
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        )
    } else {

        return (

            <div className='flex flex-col-2 py-2 px-3 border-b items-center justify-between md:hidden mb-6 dark:border-gray-600'>

                <div className='inline-flex'>
                    <span className='dark:text-white'>{dictionary.locale_label}</span>
                </div>

                <div className="relative">
                    <button type="button" onClick={() => setShowLanguageSwitcher(showLanguageSwitcher === 'hidden' ? 'show' : 'hidden')} className="flex w-full border px-3 py-2 items-center font-medium justify-center text-sm text-gray-900 dark:text-white rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white dark:border-gray-700">
                        <img src={`/assets/language/${lang}.svg`} className='h-3.5 w-3.5 rounded-full me-2' alt={languagesKV[lang]}/>
                        {languagesKV[lang]}
                        <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                        </svg>
                    </button>

                    <div className={`${showLanguageSwitcher} absolute min-w-[120px] z-50 my-4 text-base list-none bg-white dark:bg-gray-700 divide-y divide-gray-100 dark:divide-gray-600 rounded-lg shadow"`}>
                        <ul className="py-2 font-medium">
                            {languages.map((lg, index) => {
                                return (
                                    <li key={index}>
                                        <a href={redirectedPathName(lg.locale)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                                            <div className="inline-flex items-center">
                                                <img className='h-3.5 w-3.5 rounded-full me-2' src={`/assets/language/${lg.locale}.svg`} alt={lg.name}/>
                                                {lg.name}
                                            </div>
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

function ThemeSwitcher({ dictionary }: { dictionary: Dictionary["navbar"] }) {
    const [showThemeSwitcher, setShowThemeSwitcher] = useState("hidden");

    const { theme, setTheme } = useContext(ThemeContext);

    const themes = [
        { name: `light` },
        { name: `dark` },
    ]
    function handleThemeChange(themeName: Theme) {

        setTheme(themeName);
        setShowThemeSwitcher("hidden");
        ThemeChange()
    }
    return (
        <div className="flex flex-col-2 py-2 px-3 border-b items-center justify-between md:hidden dark:border-gray-600">
            <div className='inline-flex'>
                <span className='dark:text-white'>{dictionary.theme_label}</span>
            </div>
            <div className="relative">
                <button type="button" onClick={() => setShowThemeSwitcher(showThemeSwitcher === 'hidden' ? 'show' : 'hidden')} className="flex w-full border px-3 py-2 items-center font-medium justify-center text-sm text-gray-900 dark:text-white rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white dark:border-gray-700">
                    <div className='me-2'>{theme === 'light' ? <ThemeLightIcon /> : <ThemeDarkIcon />}</div>
                    {theme}
                    <svg className="w-2.5 h-2.5 ms-2.5 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"></path>
                    </svg>
                </button>
                <div className={`${showThemeSwitcher} absolute min-w-[120px] z-50 my-4 text-base list-none bg-white dark:bg-gray-700 divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700"`}>
                    <ul className="py-2 font-medium">
                        {themes.map((theme, index) => {
                            return (
                                <li key={index}>
                                    <button onClick={() => handleThemeChange(theme.name as Theme)} className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                                        <div className="inline-flex">
                                            <div className='me-2'>{theme.name === 'light' ? <ThemeLightIcon /> : <ThemeDarkIcon />}</div>
                                            {theme.name}
                                        </div>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>

    )
}

function ThemeChange() {

    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
        localStorage.setItem('color-theme', 'light');
        document.cookie = `color-theme=light; path=/`;
    } else {
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');
        localStorage.setItem('color-theme', 'dark');
        document.cookie = `color-theme=dark; path=/`;
    }
}