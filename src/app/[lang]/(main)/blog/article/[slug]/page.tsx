import { Locale } from "@/i18n-config";
import ProseHead from "@/components/prose-head";
import { getPost } from "@/actions/posts";
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getDictionary,Dictionary } from '@/dictionaries'
import {RemoteMdxPage} from  "@/components/mdx-page-remote";
export default async function Page({ params: { lang,slug } }: { params: { lang: Locale,slug:string  } }) {

    const dictionary:Dictionary = await getDictionary(lang);
    const post = await getPost(slug,lang);
   
    return (
        <>
            <div className="relative  mx-auto max-w-screen-xl gap-x-6 px-4 py-10 md:flex md:flex-col md:py-10">
                <div id="geist-skip-nav" tabIndex={-1} />
                <article className="mx-auto max-w-1xl pd-20">
                    <ProseHead lang={lang} frontMatter={post.frontMatter} dictionary={dictionary.blog}/>
                    <RemoteMdxPage mdxSource={post.content}/>
                </article>
            </div>
        </>)
}
