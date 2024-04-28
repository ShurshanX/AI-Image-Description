"use client";
import React from 'react';
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { i18n, type Locale, languages } from "@/i18n-config";
import { ChangeEvent, useState } from 'react';
import { Dictionary } from '@/dictionaries'
export default function LocaleSwitcherSelect({ lang }: { lang: Locale }) {

  const router = useRouter();
  const pathName = usePathname();
  const redirectedPathName = (locale: Locale) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  function onChangeHandler(event: React.ChangeEvent<HTMLSelectElement>) {
    const locale = event.target.value as Locale;
    router.push(redirectedPathName(locale));
  }

  return (
    <div className='relative min-w-24'>
      <div className="inset-y-0 left-0 flex items-center">
        <select onChange={onChangeHandler} className="appearance-none border-0 bg-none text-gray-900 text-sm rounded-full block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500">
          {languages.map((lg) => {
            return (
              <option key={lg.locale} selected={lang === lg.locale ? true : false} value={lg.locale}>{lg.name}</option>
            );
          })}
        </select>
        <svg className="pointer-events-none absolute right-1 top-0 h-full w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
        </svg>
      </div>
    </div>
  );
}


export function LocaleSwitcherMenus({ lang ,dictionary }: {lang:Locale,dictionary: Dictionary["navbar"] }) {
  const [showOrHidden, setMenusState] = useState(false)
  const pathName = usePathname()
  const redirectedPathName = (locale: Locale) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };
  return (

    <div className="relative rounded-full  transition hover:bg-[#2d6ae0] px-6 py-4 sm:py-2 text-[#5b6782] hover:text-white">
      <button type="button" className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6" onClick={() => setMenusState(!showOrHidden)}>
        <span>{dictionary.language}</span>
        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
        </svg>
      </button>
      {showOrHidden &&
      <div className="absolute z-10 mt-5 flex">
        <div className="rounded bg-white text-sm leading-3 shadow-lg ring-1 ring-gray-900/5">
          {languages.map((lg) => {
            return (
              <div key={lg.locale} className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-100">
                <div>
                  <a href={redirectedPathName(lg.locale)} className="font-semibold text-gray-900">
                    {lg.name}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      }
    </div>

  );
}