'use client'
import { useState } from 'react';
import Link from "next/link";
import { usePathname } from 'next/navigation'
import { Dictionary } from '@/dictionaries'
import { i18n, type Locale, languages, languagesKV } from "@/i18n-config";
import { SignInButton, UserButton, SignedIn, SignedOut,SignUpButton } from "@clerk/nextjs";

type Props = {
    lang: Locale;
    dictionary: Dictionary;
    isSigInOrUp: boolean;
}

export default function NavbarSticky({ lang, dictionary, isSigInOrUp }: Props) {
    const [collapseMobile, setCollapseMobile] = useState("hidden");
    //是否显示语言选择下拉框
    const [showLanguageSwitcher, setShowLanguageSwitcher] = useState("hidden");

    const pathname = usePathname()
    console.log(pathname)
    const links = [
        { name: `${dictionary.navbar.home}`, href: `/${lang}` }
    ]

    const redirectedPathName = (locale: Locale) => {
        if (!pathname) return "/";
        const segments = pathname.split("/");
        segments[1] = locale;
        return segments.join("/");
    };

    function handleClick(state: string) {
        setCollapseMobile(state);
    }

    function signUpOrInSwitcher() {
        if(!pathname || pathname.search("/sign-in") !== -1) {

            return true;
        }
        return false;
    }

    return (
        <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
            <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="/assets/logo.svg" className="h-8" alt={dictionary.navbar.logo_alt} title={dictionary.navbar.logo_title} />
                    {/* <svg className="h-8"  viewBox="0 0 70 69.73783005643229"><g transform="translate(0, -0.0000010417790299763285) scale(8.739075905091669)" fill="#000000"><path xmlns="http://www.w3.org/2000/svg" d="M4 0c-.69 0-1.34.19-1.91.5l3.22 2.34.75-2.25c-.6-.36-1.31-.59-2.06-.59zm-2.75 1.13c-.76.73-1.25 1.74-1.25 2.88 0 .25.02.48.06.72l3.09-2.22-1.91-1.38zm5.63.13l-1.22 3.75h2.19c.08-.32.16-.65.16-1 0-1.07-.44-2.03-1.13-2.75zm-4.72 3.22l-1.75 1.25c.55 1.13 1.6 1.99 2.88 2.22l-1.13-3.47zm1.56 1.53l.63 1.97c1.33-.12 2.46-.88 3.09-1.97h-3.72z"></path></g></svg> */}
                    <div className='space-x-1'>
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white hidden md:inline-block" title={dictionary.navbar.logo_title}>ImageAI.QA </span>
                        <p className='self-center font-semibold whitespace-nowrap hidden md:inline-block text-sm text-red-500/90'>Beta</p>
                    </div>
                </a>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse md:gap-2">

                    <div className="inline-flex font-medium items-center justify-between">
                        <a href={`/${lang}/contact`} className="inline-flex text-sm  sm:px-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
                    </div>

                    <div className="md:relative items-center justify-between ">
                        <button type="button" onClick={() => setShowLanguageSwitcher(showLanguageSwitcher === 'hidden' ? 'show' : 'hidden')} className="flex w-full items-center font-medium justify-center px-2 py-3 text-sm text-gray-900 dark:text-white rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                            <img src={`/assets/language/${lang}.svg`} className='h-3.5 w-3.5 rounded-full me-2' />
                            {languagesKV[lang]}
                        </button>
                        <div className={`${showLanguageSwitcher} absolute min-w-[120px] z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700"`}>
                            <ul className="py-2 font-medium">
                                {languages.map((lg, index) => {
                                    return (
                                        <li key={index}>
                                            <a href={redirectedPathName(lg.locale)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                                                <div className="inline-flex items-center">
                                                    <img className='h-3.5 w-3.5 rounded-full me-2' src={`/assets/language/${lg.locale}.svg`} />
                                                    {lg.name}
                                                </div>
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>

                    <div className="inline-flex">
                        <SignedOut>
                            {/* <SignInButton /> */}
                            {signUpOrInSwitcher()?
                            <Link className='flex flex-row items-center justify-center content-center transition-colors duration-200 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 md:font-medium rounded-lg text-sm p-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' href={`/${lang}/sign-up`}>Sign Up</Link>
                             :<Link className='flex flex-row items-center justify-center content-center transition-colors duration-200 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 md:font-medium rounded-lg text-sm p-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' href={`/${lang}/sign-in`}>Sign In</Link>
                            }
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                        
                        {/* <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 md:font-medium rounded-lg text-sm px-2 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign Up</button> */}
                    </div>

                    <div className="inline-flex">
                        <span className="sr-only">Open main menu</span>
                        <button type="button" onClick={() => setCollapseMobile(collapseMobile === 'hidden' ? 'show' : 'hidden')} className="inline-flex items-center w-5 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* main menu link */}
                {/* <SignedIn> */}
                { isSigInOrUp && 
                    <div className={`${collapseMobile} items-center justify-between w-full md:flex md:w-auto md:order-1 `}>
                        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            {links.map((link, index) => {
                                return (
                                    <li key={index}>
                                        <Link
                                            onClick={() => setCollapseMobile('hidden')}
                                            key={link.name}
                                            href={link.href}
                                            className={pathname === link.href ? 'block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500' : 'block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'}>
                                            {link.name}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    }
                    {/* </SignedIn> */}
                {/* main menu link */}
            </div>
        </nav>


    );
}
