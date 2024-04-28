import Image from "next/image";
import Link from "next/link";
import React, { useState } from 'react';
import UploadForm from "@/app/\/[lang]/(main)/upload-form";
import { getDictionary, Dictionary } from '@/dictionaries'
import { Locale } from "@/i18n-config";
import { useUser } from "@clerk/nextjs";
export default async function Home({ params: { lang } }: { params: { lang: Locale } }) {

  const dictionary: Dictionary = await getDictionary(lang);
 
  const user = await useUser;
  console.log(user);
  return (
    <>
      <section>
        <UploadForm dictionary={dictionary.index} lang={lang} />
      </section>

      {/*  #show case */}
      <section className="bg-[#020d24] bg-cover bg-center text-white">
        {/* Container */}
        <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-32">
          <h2 className="mx-auto mb-8 mt-6 max-w-3xl text-center text-3xl font-extrabold md:mb-16 md:text-5xl">{dictionary.index.example_title}</h2>
          {/* Testimonails */}
          <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-2 p-8 lg:mb-8">
            {/* Item */}
            <div className="grid min-h-[280px] grid-cols-[1fr_1.75fr] gap-6 rounded-2xl bg-[#0a1836] md:p-10">
              {/* image */}
              <div className="flex flex-col justify-between">
                <div className="flex flex-col items-start">
                  <img src="/assets/angel.jpg" alt="angel" className="inline-block" />
                </div>
              </div>
              <p className="text-[#7c8aaa] md:p-0 text-sm">
                This statue of an angel might symbolize guardianship, hope, and peace. It perhaps represents a kind of faith
                and a spiritual anchor, empowering people in difficult times and guiding them in moments of confusion. Its
                existence is like a beacon, illuminating the path forward and bestowing boundless courage and hope upon
                those who encounter it.
              </p>
            </div>
            {/* Item */}
            <div className="grid min-h-[280px] grid-cols-[1fr_1.75fr] gap-6 rounded-2xl bg-[#0a1836] p-8 md:p-10">
              {/* image */}
              <div className="flex flex-col justify-between">
                <div className="flex flex-col items-start">
                  <img src="/assets/woman.webp" alt="woman" className="inline-block" />
                </div>
              </div>
              <p className="text-[#7c8aaa] text-sm">
                The woman is intently carving a pumpkin, her eyes reflecting seriousness and anticipation. Next to her, a
                kitten stares curiously at her, its eyes filled with a desire to explore. Occasionally, the woman raises her
                head and smiles, engaging in a warm interaction with the kitten. This harmonious scene showcases the
                closeness and understanding between humans and animals, evoking a sense of beauty and warmth in life.
              </p>
            </div>
            {/* Item */}
            <div className="grid min-h-[280px] grid-cols-[1fr_1.75fr] gap-6 rounded-2xl bg-[#0a1836] p-8 md:p-10">
              {/* image */}
              <div className="flex flex-col justify-between">
                <div className="flex flex-col items-start">
                  <img src="/assets/img1.jpg" alt="flowers" className="inline-block" />
                </div>
              </div>
              <p className="text-[#7c8aaa] text-sm">
                Capture the beauty and tranquility of the flowers, incorporating reflections on life and nature. Through the
                vivid depiction of the flowers and the blurred backdrop, convey profound emotional responses or
                philosophical insights.
              </p>
            </div>
            {/* Item */}
            <div className="grid min-h-[280px] grid-cols-[1fr_1.75fr] gap-6 rounded-2xl bg-[#0a1836] p-8 md:p-10">
              {/* image */}
              <div className="flex flex-col justify-between">
                <div className="flex flex-col items-start gap-4">
                  <img src="/assets/scenic.jpg" alt="scenic" className="inline-block" />
                </div>
              </div>
              <p className="text-[#7c8aaa] text-sm">
                This picture showcases the stunning scenery of the wetland in Jiuzhaigou, Aba Prefecture, China. In the
                image, a golden reed marsh contrasts beautifully with the azure river, whose water shimmers in the sunlight.
                Trees and low-lying vegetation in the background are partially obscured by the reeds, creating a serene and
                natural atmosphere. Overall, this wetland exhibition showcases the harmony and beauty of nature.
              </p>
            </div>
            {/* Item */}
            <div className="grid min-h-[280px] grid-cols-[1fr_1.75fr] gap-6 rounded-2xl bg-[#0a1836] p-8 md:p-10">
              {/* image */}
              <div className="flex flex-col justify-between">
                <div className="flex flex-col items-start gap-4">
                  <img src="/assets/aitools.jpg" alt="aitools" className="inline-block" />
                </div>
              </div>
              <p className="text-[#7c8aaa] text-sm">
                The image depicts a female robot head, symbolizing the fusion of humanity and technology. The vibrant
                background and diverse icons represent the widespread application of AI in various fields. The image conveys
                a sense of futuristic optimism, emphasizing the potential of AI tools to revolutionize our world.
              </p>
            </div>
            {/* Item */}
            <div className="grid min-h-[280px] grid-cols-[1fr_1.75fr] gap-6 rounded-2xl bg-[#0a1836] p-8 md:p-10">
              {/* image */}
              <div className="flex flex-col justify-between">
                <div className="flex flex-col items-start gap-4">
                  <img src="/assets/dragon.jpg" alt="dragon" className="inline-block" />
                </div>
              </div>
              <p className="text-[#7c8aaa] text-sm">
                This image portrays a fantasy scene of a golden dragon and a figure in green robes. The dragon&apos;s grandeur
                and the figure&apos;s contemplation convey a sense of mystery and tranquility. The scene suggests a harmonious
                co-existence between nature and mankind, symbolizing balance and wisdom.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <Link href={`${lang}/explore`} className="mx-auto font-bold text-white">{dictionary.index.example_link_label}</Link>
          </div>
        </div>
      </section>

      {/* #FQA */}

      <section className="bg-[#eef0f4]">
        {/* Container */}
        <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-32">
          {/* Header */}
          <div className="mx-auto mb-8 flex max-w-3xl flex-col items-center text-center md:mb-12 lg:mb-16">
            <h2 className="text-3xl font-bold md:text-5xl">{dictionary.index.fqa_title}</h2>
          </div>
          {/* FAQ Items */}
          <div className="mb-8 grid grid-cols-1 justify-center gap-4 md:mb-12 lg:mb-16 lg:grid-cols-2">
            {/* FAQ Left Col */}
            <div className="w-full">
              <div className="mb-6 w-full rounded-xl bg-white p-8">
                <div className="flex cursor-pointer items-start justify-between">
                  <div className="text-xl font-bold">{dictionary.index.fqa_ask_1}</div>
                  <div className="relative ml-10 mt-1 flex h-5 w-5 items-center justify-center">
                    <div className="absolute h-5 w-0.5 bg-[#0b0b1f]"></div>
                    <div className="h-0.5 w-5 bg-[#0b0b1f]"></div>
                  </div>
                </div>
                <div className="w-full max-w-[640px] pt-4 lg:max-w-[960px]">
                  <p className="tracking-[0.2px]">{dictionary.index.fqa_answer_1}</p>
                </div>
              </div>
              <div className="mb-6 w-full rounded-xl bg-white p-8">
                <div className="flex cursor-pointer items-start justify-between">
                  <div className="text-xl font-bold">{dictionary.index.fqa_ask_2}</div>
                  <div className="relative ml-10 mt-1 flex h-5 w-5 items-center justify-center">
                    <div className="absolute h-5 w-0.5 bg-[#0b0b1f]"></div>
                    <div className="h-0.5 w-5 bg-[#0b0b1f]"></div>
                  </div>
                </div>
                <div className="w-full max-w-[640px] pt-4 lg:max-w-[960px]">
                  <p className="tracking-[0.2px]">{dictionary.index.fqa_answer_2}</p>
                </div>
              </div>
            </div>
            
            {/* FAQ Right Col */}
            <div className="w-full">
              <div className="mb-6 w-full rounded-xl bg-white p-8">
                <div className="flex cursor-pointer items-start justify-between">
                  <div className="text-xl font-bold">{dictionary.index.fqa_ask_3}</div>
                  <div className="relative ml-10 mt-1 flex h-5 w-5 items-center justify-center">
                    <div className="absolute h-5 w-0.5 bg-[#0b0b1f]"></div>
                    <div className="h-0.5 w-5 bg-[#0b0b1f]"></div>
                  </div>
                </div>
                <div className="w-full max-w-[640px] pt-4 lg:max-w-[960px]">
                  <p className="tracking-[0.2px]">{dictionary.index.fqa_answer_3}</p>
                </div>
              </div>
              <div className="mb-6 w-full rounded-xl bg-white p-8">
                <div className="flex cursor-pointer items-start justify-between">
                  <div className="text-xl font-bold">{dictionary.index.fqa_ask_4}</div>
                  <div className="relative ml-10 mt-1 flex h-5 w-5 items-center justify-center">
                    <div className="absolute h-5 w-0.5 bg-[#0b0b1f]"></div>
                    <div className="h-0.5 w-5 bg-[#0b0b1f]"></div>
                  </div>
                </div>
                <div className="w-full max-w-[640px] pt-4 lg:max-w-[960px]">
                  <p className="tracking-[0.2px]">{dictionary.index.fqa_answer_4}</p>
                </div>
              </div>

            </div>
          </div>
          <p className="text-center tracking-[0.2px]">{dictionary.index.fqa_note_label}
            <Link href={`${lang}/contact`} className="font-bold"> {dictionary.index.fqa_link_label}</Link>.</p>
        </div>
      </section>
    </>
  );
}
