// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
'use client'
import Link from "next/link";
import { usePathname } from 'next/navigation'
import styles from './navbar.module.css'
import { Dictionary } from '@/dictionaries'
import { i18n, type Locale } from "@/i18n-config";
import {LocaleSwitcherMenus} from "./locale-switcher";

export default function Navbar({ lang ,dictionary }: {lang:Locale,dictionary: Dictionary }) {
 
  return (
    <>
      <section>
        <div className="h-auto bg-[#020d24] py-2 text-white [border-bottom:1px_solid_rgb(91,_103,_130)]">
          {/* NAVBAR */}
          <nav className="font-inter mx-auto h-auto w-full max-w-[1600px] lg:relative lg:top-0">
            {/* CONTAINER */}
            <div className="flex flex-col px-6 py-6 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-4 xl:px-20">
              {/* LOGO - YOU CAN REPLACE THIS */}
              <a href="/">
                <img src="/assets/NavbarBrand.png" alt={dictionary.navbar.logo_alt} title={dictionary.navbar.logo_title} className="inline-block max-h-12 max-w-full" />
              </a>
              {/* MENU CONTENT */}
              <div
                className="mt-10 flex flex-col items-start space-y-8 lg:mt-0 lg:flex lg:flex-row lg:items-center lg:space-x-3 lg:space-y-0">
                <NavLinks lang={lang} dictionary={dictionary.navbar}/>
                
                <LocaleSwitcherMenus lang={lang} dictionary={dictionary.navbar}/>
                
              </div>
            </div>
          </nav>
        </div>
      </section>
    </>
  );
};

export function NavLinks({ lang ,dictionary }: {lang:Locale,dictionary: Dictionary["navbar"] }) {
  const pathname = usePathname()
  const links = [
    { name: `${dictionary.home}`, href: `/${lang}`},
    { name: `${dictionary.explore}`, href: `/${lang}/explore` },
    { name: `${dictionary.blog}`, href: `/${lang}/blog` },
    { name: `${dictionary.about}`, href: `/${lang}/about` },
    { name: `${dictionary.contact}`, href: `/${lang}/contact` }
  ]
  return (
    <>
      {links.map((link,index) => {
        return (
          <Link
            key={index}
            href={link.href}
            className={pathname === link.href ? 'px-6 py-4 sm:py-2 text-center font-semibold text-white transition lg:ml-4' : 'rounded-full  px-6 py-4 sm:py-2 text-center font-semibold text-[#5b6782] hover:text-white transition hover:bg-[#2d6ae0] lg:ml-4'}>
            <p className="md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  )
}