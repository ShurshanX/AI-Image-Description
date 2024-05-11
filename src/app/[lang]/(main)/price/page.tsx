import { Locale } from "@/i18n-config";
import { getDictionary,Dictionary } from '@/dictionaries'
import Button from "./button";
export default async function page({ params: { lang } }: { params: { lang: Locale } }) {
    const dictionary:Dictionary = await getDictionary(lang);

    return (
        <div className="flex flex-col relative mx-auto max-w-screen-xl px-4 py-16 justify-center items-center dark:bg-gray-900">
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
                {dictionary.pricing.title}
            </h1>
            <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
                {dictionary.pricing.subtitle}
            </p>
            <h3 className="text-md font-bold dark:text-white mb-6 sm:px-16 xl:px-48">
                <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                    {dictionary.pricing.pricing_description}
                </span>
            </h3>
            <h3  className="inline-flex justify-between items-center py-1 px-1 pe-4 mb-7 text-sm text-blue-700 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800">
                <span className="text-sm font-medium"> {dictionary.pricing.ko_fi_tips1}<a href={`/${lang}/contact`} className="font-semibold text-blue-700 underline dark:text-white dark:decoration-white decoration-blue-500">{dictionary.pricing.ko_fi_tips2}</a> )</span> 
            </h3>
            <h3 className="text-sm font-bold dark:text-white sm:px-16 xl:px-48">
               
            </h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 mt-12">
                {dictionary.pricing.prices.map((price, index) => {
                    return (
                        <div key={index} className="flex flex-col w-full  p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                            <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">{price.name}</h5>
                            <div className="flex items-baseline text-gray-900 dark:text-white">
                                <span className="text-3xl font-semibold">$</span>
                                <span className="text-5xl font-extrabold tracking-tight">{price.price}</span>
                                <span className="ms-1 text-xl font-normal text-gray-500 dark:text-gray-400">{price.duration}</span>
                            </div>
                            <div className="flex flex-initial h-full">
                            <ul role="list" className="space-y-5 my-7">
                                {price.description.map((desc, index) => {
                                    return (
                                        <li key={index} className="flex items-center">
                                            <svg className="flex-shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                            </svg>
                                            <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">{desc}</span>
                                        </li>
                                    )
                                })}

                            </ul>
                            </div>
                            <div>
                                <Button btnlabel={price.buy_lable} type={price.type} lang={lang} />
                            </div>
                           
                        </div>
                    )
                })}

            </div>
        </div>
    )
}