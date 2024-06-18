import { Dictionary } from '@/dictionaries'
import { type Locale } from "@/i18n-config";
export default function FooterSocial({ lang, dictionary }: { lang: Locale, dictionary: Dictionary }) {
    return (

        <footer className="py-12 bg-gray-50 xl:pt-8 dark:bg-gray-800">
            <div className="mx-auto w-full max-w-screen-2xl px-4">
                <div className="grid gap-12 xl:grid-cols-5 xl:gap-24">
                    <div className="mb-6 md:mb-0 col-span-2">
                        <a href={`/${lang}`} className="flex items-center space-x-3">
                            <svg aria-label={dictionary.navbar.logo_alt} className="h-8 dark:text-white" viewBox="0 0 70 69.73783005643229"><g transform="translate(0, -0.0000010417790299763285) scale(8.739075905091669)" fill="currentColor"><path xmlns="http://www.w3.org/2000/svg" d="M4 0c-.69 0-1.34.19-1.91.5l3.22 2.34.75-2.25c-.6-.36-1.31-.59-2.06-.59zm-2.75 1.13c-.76.73-1.25 1.74-1.25 2.88 0 .25.02.48.06.72l3.09-2.22-1.91-1.38zm5.63.13l-1.22 3.75h2.19c.08-.32.16-.65.16-1 0-1.07-.44-2.03-1.13-2.75zm-4.72 3.22l-1.75 1.25c.55 1.13 1.6 1.99 2.88 2.22l-1.13-3.47zm1.56 1.53l.63 1.97c1.33-.12 2.46-.88 3.09-1.97h-3.72z"></path></g></svg>
                            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Image Describer</span>
                        </a>
                        <div className="flex mt-6 mb-6">
                            <a href="mailto:imgdesgen@gmail.com" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                                <svg className="w-4 h-4" aria-hidden="true" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="currentColor" d="m20 8l-8 5l-8-5V6l8 5l8-5m0-2H4c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2"></path>
                                </svg>
                                <span className="sr-only">Email account</span>
                            </a>
                            {/* <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
                                    <path fill-rule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clip-rule="evenodd" />
                                </svg>
                                <span className="sr-only">Facebook page</span>
                            </a> */}
                            <a href="https://discord.gg/e4Q4NkQf" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 21 16">
                                    <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
                                </svg>
                                <span className="sr-only">Discord community</span>
                            </a>
                            <a href="https://twitter.com/imgdesgen" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5" title='Follow us on Twitter'>
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill="currentColor" d="M12.186 8.672 18.743.947h-2.927l-5.005 5.9-4.44-5.9H0l7.434 9.876-6.986 8.23h2.927l5.434-6.4 4.82 6.4H20L12.186 8.672Zm-2.267 2.671L8.544 9.515 3.2 2.42h2.2l4.312 5.719 1.375 1.828 5.731 7.613h-2.2l-4.699-6.237Z"></path>
                                </svg>
                                <span className="sr-only">Twitter page</span>
                            </a>
                            <a href="https://github.com/ShurshanX/AI-Image-Description" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5" title='Star us on GitHub'>
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clip-rule="evenodd" ></path>
                                </svg>
                                <span className="sr-only">GitHub account</span>
                            </a>
                        </div>
                        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href={`/${lang}`} className="hover:underline">Image Describer™</a>. All Rights Reserved.
                        </span>
                        <div className="flex mt-4 ">
                        <span className='text-sm text-gray-500 sm:text-center dark:text-gray-400'>
                            <strong>{dictionary.footer.coffee_buy_title}</strong>
                            <a className="text-sm underline" href="https://ko-fi.com/imgdesgen">{dictionary.footer.coffee_buy}</a> ☕️
                        </span>
                    </div>
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
                            <a href='https://discord.gg/Fa5FXVEh' className="hover:underline">Discord</a>
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
                            <li className="mb-4">
                                <a href="/en/terms-of-services" className="hover:underline">Terms of Use</a>
                            </li>
                            <li>
                                <a href="/en/payments-refund" className="hover:underline">Payments & Refund Policy</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>

    )
}