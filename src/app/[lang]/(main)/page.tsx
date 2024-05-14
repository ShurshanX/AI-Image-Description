import Image from "next/image";
import Link from "next/link";
import React, { useState } from 'react';
import UploadForm from "@/app/\/[lang]/(main)/upload-form";
import { getDictionary, Dictionary } from '@/dictionaries'
import { Locale } from "@/i18n-config";
import { useUser } from "@clerk/nextjs";
import { IImage } from '@/actions/explore';

export default async function Home({ params: { lang } }: { params: { lang: Locale } }) {

  const dictionary: Dictionary = await getDictionary(lang);

  const user = await useUser;

  const imagesList:IImage[] = [];

  const fqas = [
    {
      question: dictionary.index.fqa_ask_1,
      answer: dictionary.index.fqa_answer_1
    },
    {
      question: dictionary.index.fqa_ask_2,
      answer: dictionary.index.fqa_answer_2
    },
    {
      question: dictionary.index.fqa_ask_3,
      answer: dictionary.index.fqa_answer_3
    },
    {
      question: dictionary.index.fqa_ask_4,
      answer: dictionary.index.fqa_answer_4
    }
  ];

  const index = fqas.length % 2 === 0 ? fqas.length/2  : fqas.length/2+1;
  const leftFqas = fqas.slice(0, index);
  const rightFqas  = fqas.slice(index);

  return (
    <main className="grow">

      <section className="px-4 mx-auto max-w-7xl pb-8 bg-white dark:bg-gray-900 lg:pb-24">
        <UploadForm dictionary={dictionary.index} lang={lang} />
      </section>

      {/* Example Use Cases */}
      <section className="py-10 sm:py-16 bg-gray-50 lg:py-20 dark:bg-gray-800 border-t border-b border-gray-100 dark:border-gray-700">
        <div className="px-4 mx-auto max-w-screen-xl">
          <h2 className="mb-4 text-2xl md:text-4xl font-bold tracking-tight text-gray-900 md:font-extrabold lg:leading-none dark:text-white md:text-center lg:mb-7">{dictionary.index.example_title}</h2>

          <div className="grid grid-cols-1 pt-8 border-gray-200 gap-5 dark:border-gray-700 md:grid-cols-3">
            {imagesList.map((image, index) => (

              <div key={index} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                  <img className="rounded-t-lg" src={image.imgurl} alt={image.keys}/>
                </a>
                <div className="p-5">
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{image.description}</p>
                </div>
              </div>
            ))
            }
          </div>
          <div className="flex flex-col items-center mt-12">
            <Link href={`${lang}/explore`} className="mx-auto text-lg lg:text-1xl font-bold dark:text-gray-400 text-gray-800 hover:text-gray-900  dark:hover:text-gray-200">{dictionary.index.example_link_label}</Link>
          </div>
        </div>
      </section>

      {/* #FQA */}

      <section className="bg-white dark:bg-gray-900 py-10 sm:py-16 lg:py-20">
        <div className="pb-8 px-4 mx-auto max-w-screen-2xl sm:pb-16 lg:px-6">
          <h2 className="mb-8 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white md:text-center">{dictionary.index.fqa_title}</h2>
          <div className="grid pt-8 text-left border-t border-gray-200 md:gap-16 dark:border-gray-700 md:grid-cols-2">
            <FQAPage list={leftFqas} />
            <FQAPage list={rightFqas} />
          </div>
          <p className=" mt-10 text-center dark:text-gray-400">{dictionary.index.fqa_note_label}
            <Link href={`${lang}/contact`} className="font-bold dark:text-gray-400 underline text-gray-800 hover:text-gray-900  dark:hover:text-gray-200"> {dictionary.index.fqa_link_label}</Link>.
          </p>
        </div>
      </section>
    </main>
  );
}

interface FQA {
  question: string;
  answer: string;
}

function FQAPage ({ list}: { list: FQA[]}) {
  return (
    <div>
      {
      list.map((faq, index) => (
        <div key={index} className="mb-10">
          <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
            <svg className="shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path>
            </svg>
            {faq.question}
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {faq.answer}
          </p>
        </div>
      ))
      }
    </div>
  )
}