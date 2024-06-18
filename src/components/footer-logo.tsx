import { Dictionary } from '@/dictionaries'
import { type Locale } from "@/i18n-config";
export default function FooterLogo({ lang, dictionary }: { lang: Locale, dictionary: Dictionary }) {
    return (

        <footer className="py-12 bg-gray-50 xl:pt-8 dark:bg-gray-800">
            <div className="mx-auto w-full max-w-screen-2xl px-4">
                <div className="grid gap-12 xl:grid-cols-5 xl:gap-24">
                    <div className="mb-6 md:mb-0 col-span-2">
                        <a href={`/${lang}`} className="flex items-center space-x-3">
                            <svg aria-label={dictionary.navbar.logo_alt} className="h-8 dark:text-white" viewBox="0 0 70 69.73783005643229"><g transform="translate(0, -0.0000010417790299763285) scale(8.739075905091669)" fill="currentColor"><path xmlns="http://www.w3.org/2000/svg" d="M4 0c-.69 0-1.34.19-1.91.5l3.22 2.34.75-2.25c-.6-.36-1.31-.59-2.06-.59zm-2.75 1.13c-.76.73-1.25 1.74-1.25 2.88 0 .25.02.48.06.72l3.09-2.22-1.91-1.38zm5.63.13l-1.22 3.75h2.19c.08-.32.16-.65.16-1 0-1.07-.44-2.03-1.13-2.75zm-4.72 3.22l-1.75 1.25c.55 1.13 1.6 1.99 2.88 2.22l-1.13-3.47zm1.56 1.53l.63 1.97c1.33-.12 2.46-.88 3.09-1.97h-3.72z"></path></g></svg>
                            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">ImageAI.QA</span>
                        </a>
                
                    </div>

                    <div>
                        <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">HELP AND SUPPORT</h2>
                        <ul className="text-gray-500 dark:text-gray-400 font-medium">
                            <li className="mb-4">
                                <a href={`/${lang}/contact`} className="hover:underline">Contact Us</a>
                            </li>
                            <li className='mb-4'>
                                <a href="mailto:imgdesgen@gmail.com" className="hover:underline" title='Send an email to AI Image Description Generator: Free online describe image, Text Extraction & Code Conversion'>Email</a>
                            </li>
                            <li>
                            <a href='https://discord.gg/e4Q4NkQf' className="hover:underline">Discord</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Follow us</h2>
                        <ul className="text-gray-500 dark:text-gray-400 font-medium">
                            <li className="mb-4">
                                <a href="https://github.com/ShurshanX/AI-Image-Description" className="hover:underline ">Github</a>
                            </li>
                            <li className="mb-4">
                                <a href="https://twitter.com/imgdesgen" className="hover:underline">Twitter/X</a>
                            </li>
                            <li>
                                <a href="https://www.producthunt.com/products/imageai-fq#imageai-qa" className="hover:underline">Product Hunt</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
                        <ul className="text-gray-500 dark:text-gray-400 font-medium">
                            <li className="mb-4">
                                <a href="/en/privacy-policy" className="hover:underline">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="/en/terms-of-services" className="hover:underline">Terms of Use</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href={`/${lang}`} className="hover:underline">ImageAI.QA™</a>. All Rights Reserved.
                    </span>
                    <div className="flex mt-4 sm:justify-center sm:mt-0">
                        <span className='text-sm text-gray-500 sm:text-center dark:text-gray-400'>
                            <strong>{dictionary.footer.coffee_buy_title}</strong>
                            <a className="text-sm underline" href="https://ko-fi.com/imgdesgen">{dictionary.footer.coffee_buy}</a> ☕️
                        </span>
                    </div>
                </div>
            </div>
        </footer>

    )
}