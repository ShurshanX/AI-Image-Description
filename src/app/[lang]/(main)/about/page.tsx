
import Image from "next/image"
import { getDictionary, Dictionary } from '@/dictionaries'
import { Locale } from "@/i18n-config";
export default async function Page({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary: Dictionary = await getDictionary(lang);
  return (
    <>
      <section>
        <div className="mx-auto w-full max-w-7xl px-5  md:px-10 md:py-10 lg:px-5 lg:py-16 py-16">
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
            <div className="flex flex-col gap-2 lg:w-3/5">
              <h1 className="mb-8 text-3xl font-bold md:text-5xl text-gray-900 dark:text-white">{dictionary.about.about_title}</h1>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                {dictionary.about.about_description}
              </p>
              <div className="my-8 h-px w-full bg-black dark:bg-white"></div>
              <h2 className="mb-8 text-3xl font-bold md:text-5xl text-gray-900 dark:text-white">{dictionary.about.contact_title}</h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                {dictionary.about.contact_description}
              </p>
              <div className="flex">
                <svg className="mr-3 inline-block dark:text-white" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" fill="currentColor">
                  <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path>
                </svg>

                <p className="text-gray-600 dark:text-gray-400 sm:text-sm"> <a href="https://twitter.com/imgdesgen">https://twitter.com/imgdesgen</a> </p>
              </div>
              <div className="mb-4 flex max-w-[272px] items-start justify-start">
                <svg className="mr-3 inline-block  dark:text-white" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 5.25H21V18C21 18.1989 20.921 18.3897 20.7803 18.5303C20.6397 18.671 20.4489 18.75 20.25 18.75H3.75C3.55109 18.75 3.36032 18.671 3.21967 18.5303C3.07902 18.3897 3 18.1989 3 18V5.25Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M21 5.25L12 13.5L3 5.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <p className="sm:text-sm text-gray-600 dark:text-gray-400"> <a href="mailto:imgdesgen@gmail.com">imgdesgen@gmail.com</a> </p>
              </div>
            </div>
            <div className="w-full rounded-md bg-white dark:bg-gray-900 max-[991px]:h-[475px] lg:w-2/5">
              <img alt="aitools" src="/assets/aitools.jpg" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
