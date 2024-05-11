import { Dictionary } from '@/dictionaries'
import { i18n, type Locale } from "@/i18n-config";
import { MDXRemote } from 'next-mdx-remote/rsc'
import { Post } from "@/actions/posts";
import Image
 from 'next/image';
import Link from 'next/link';
type Props = {
    lang:Locale,
    dictionary: Dictionary["blog"],
    posts:Post[]
}

export default function MdxCards({lang,dictionary,posts}: Props) {


    return (<>
        <article className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mt-12">

            {/* Card */}
            {posts.map((item, index) => (
                <div key={index} className="flex flex-col w-full p-1.5 relative overflow-hidden rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700 shadow-md max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
                    <div className="flex flex-col items-stretch justify-start p-3 h-full gap-1">
                        <div className="flex">
                            <p className="w-full text-sm font-normal leading-6 text-gray-500 dark:text-gray-400">{item.frontMatter.date}</p>
                            <div className="flex">
                                <div className="relative rounded-full w-6 h-6">
                                    <img loading="eager" className="mr-auto rounded-full" src={item.frontMatter.avatar} alt="images descriptions generated"/>
                                </div>
                            </div>
                        </div>
                        <div className="flex">
                            {/* Title */}
                            <Link href={`/${lang}/blog/article/${item.slug}`} className="text-xl font-bold text-gray-800 dark:text-slate-100">
                                {item.frontMatter.title}
                            </Link>
                        </div>
                        <div className="prose prose-green flex mb-4 h-full prose-p:text-gray-500 dark:prose-p:text-gray-400">
                            {/* Text 
                            <p className="font-medium text-sm leading-loose text-gray-700">
                               {item.postContent}
                            </p>
                            */}
                            <MDXRemote source={item.frontMatter.description} />
                        </div>
                    </div>
                    <div>
                        {/* Button */}
                        <a href={`/${lang}/blog/article/${item.slug}/`} className="h-9 font-medium text-sm flex items-center justify-center rounded-md duration-200 cursor-pointer text-gray-500 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:hover:text-gray-100 hover:bg-gray-300 hover:text-gray-900">{dictionary.more_button_lable}</a>
                    </div>
                </div>
            ))}

        </article>
    </>)
}