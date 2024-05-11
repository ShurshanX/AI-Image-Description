import { ImagesForm } from './images-form';
import { type Locale } from "@/i18n-config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/en/explore?page=2" },
  other: {next: "/en/explore?page=3",prev: "/en/explore?page=1" },
  
};


export default async function Page({ params, searchParams }: Readonly<{ params: { lang: Locale, }, searchParams: { page:number}}>) {

  const page = searchParams.page ? searchParams.page : 1;
  const images: any = [];


  return (

    <section className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-12">

      <ImagesForm images={images} pageParam={page}/>

    </section>
  )
}