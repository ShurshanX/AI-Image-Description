import { Locale } from "@/i18n-config";
import { FrontMatter } from "@/actions/posts";
import { Dictionary } from '@/dictionaries'

type Props = {
    lang: Locale,
    frontMatter: FrontMatter,
    dictionary: Dictionary["blog"],
}
export default function ProseHead({ lang,frontMatter,dictionary }: Props) {
    return (
        <>
            
                <a href={`/${lang}/blog`} className="flex flex-row items-center gap-2 text-sm  mb-16 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <svg className="text-current w-3.5 h-3.5" data-testid="geist-icon" fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M19 12H5"></path><path d="M12 19l-7-7 7-7"></path></svg>
                    {dictionary.back_button_lable}
                </a>
                <p className="text-sm text-gray-500 mt-12 dark:text-gray-400">{frontMatter.date}</p>
                <h1 className="mt-6 mb-12 text-[28px] sm:text-[5vw] lg:text-[38px] font-bold dark:text-gray-100">{frontMatter.title}</h1>
                <span className="text-sm  mb-16 text-gray-500 dark:text-gray-400">{dictionary.author_lable}</span>
                {/* mb-8 border-b-[1px] border-gray-200*/}
                <div className="flex mt-3 pb-4 gap-x-4 mb-8 border-b-[1px] border-gray-200">
                    <a href="#" className="snap-start flex items-center shrink-0 gap-2 rounded-md p-1 m-[-1px] transition-colors duration-200 ease-in-out">
                        <img src={frontMatter.avatar} alt="" className="w-10 h-10 rounded-full" />
                        <div className="flex flex-col items-stretch justify-start gap-0">
                            <span className="text-sm text-gray-900 dark:text-gray-200">{frontMatter.author}</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">{frontMatter.twitter}</span>
                        </div>
                    </a>
                    {/* 
                    <a href="#" className="snap-start flex items-center shrink-0 gap-2 rounded-md p-1 m-[-1px] transition-colors duration-200 ease-in-out">
                        <img src="/assets/tim.jpg" alt="" className="w-10 h-10 rounded-full" />
                        <div className="flex flex-col items-stretch justify-start gap-0">
                            <span className="text-sm text-gray-900">蒂姆·诺伊特肯斯</span>
                            <span className="text-sm text-gray-500">@timneutkens</span>
                        </div>
                    </a>
                    */}
                </div>
            
        </>)
}