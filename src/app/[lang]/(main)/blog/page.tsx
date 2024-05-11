import MdxCards from "@/components/mdx-cards"
import { Locale } from "@/i18n-config";
import { getAllPostList } from "@/actions/posts";
import { getDictionary,Dictionary } from '@/dictionaries'

export default async function Page({ params: { lang } }: { params: { lang: Locale } }) {

    const dictionary:Dictionary = await getDictionary(lang);

    const posts = await getAllPostList(lang);

    return (
        <>
            <div className="relative mx-auto max-w-screen-xl gap-x-6 px-5 py-6 md:flex md:flex-row">

                <div id="geist-skip-nav" />
                <div className="relative w-full mt-10">
                    <h1 className="text-3xl font-bold  text-gray-900 dark:text-gray-200">
                        {dictionary.blog.title}
                    </h1>

                    <MdxCards lang={lang} posts={posts} dictionary={dictionary.blog}/>
                </div>
            </div>
        </>
    )
}

