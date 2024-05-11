import {type Locale } from "@/i18n-config";
import { getDictionary } from '@/dictionaries'


export default async function Layout({
  children, params
}: Readonly<{
  children: React.ReactNode,
  params: { lang: Locale }
}>) {
  const dictionary = (await getDictionary(params.lang)).policy;
  return (

    <>
      <div className="flex flex-row mx-5 mt-8">
        <a href="/" className="btn btn-ghost flex flex-row items-center justify-center text-center gap-2 font-bold text-base text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">
          <svg className="text-current w-4 h-4" fill="currentColor" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" viewBox="0 0 24 24" width="24">
            <path d="M19 12H5"></path>
            <path d="M12 19l-7-7 7-7"></path>
          </svg>
          {dictionary.back_button_lable}
        </a>
      </div>
      <div className={`prose max-w-none m-5 dark:prose-h1:text-gray-200 dark:prose-h2:text-gray-200
       dark:prose-h3:text-gray-200 dark:prose-strong:text-gray-200 dark:prose-p:text-gray-400 dark:prose-li:text-gray-400`}>
        {children}
      </div>
    </>
  );
}