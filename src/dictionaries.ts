import 'server-only'
import type { Locale } from '@/i18n-config'

const dictionaries = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  zh: () => import('@/dictionaries/en.json').then((module) => module.default),
  de: () => import('@/dictionaries/en.json').then((module) => module.default),
  fr: () => import('@/dictionaries/en.json').then((module) => module.default),
  ja: () => import('@/dictionaries/en.json').then((module) => module.default),
  ko: () => import('@/dictionaries/en.json').then((module) => module.default),
  es: () => import('@/dictionaries/en.json').then((module) => module.default),
}
 

export const getDictionary = async (locale: Locale):Promise<Dictionary> =>
  dictionaries[locale]?.() ?? dictionaries.en();


export type Dictionary = {
  index: {
    title: string;
    subtitle: string;
    note: string;
    func_image_label: string;
    func_text_label: string;
    func_text_placeholder: string;
    func_submit_label: string;
    example_title: string;
    example_link_label: string;
    fqa_title: string;
    fqa_ask_1: string;
    fqa_answer_1: string;
    fqa_ask_2: string;
    fqa_answer_2: string;
    fqa_ask_3: string;
    fqa_answer_3: string;
    fqa_ask_4: string;
    fqa_answer_4: string;
    fqa_note_label: string;
    fqa_link_label: string;
    donation_label: string;
    donation_about: string;
    public_label: string;
    credits_label: string;
  };
  about:{
    about_title: string;
    about_description: string;
    contact_title: string;
    contact_description: string;
  };
  contact : {
    title: string;
    subtitle: string;
    first_name: string;
    last_name: string;
    email: string;
    message: string;
    submit: string;
  };
  navbar:{
    logo_alt: string;
    logo_title: string;
    home: string;
    blog: string;
    about: string;
    contact: string;
    explore: string;
    language: string;
    pricing: string;
    theme_label: string; 
    locale_label: string;
  };
  footer:{
    copyright:string;
    rights:string;
    privacy:string;
    terms:string;
    contact:string;
    coffee_buy_title:string;
    coffee_buy:string;
  };
  blog: {
    title: string;
    more_button_lable: string;
    back_button_lable: string;
    author_lable: string
  };
  policy: {
    back_button_lable: string
  };
  pricing: {
    title: string;
    subtitle: string;
    pricing_description: string;
    ko_fi_tips1: string;
    ko_fi_tips2: string;
    prices: {
      type: string;
      variantId: string;
      name: string;
      price: number;
      duration: string;
      buy_lable: string;
      description: string[];
    }[];
  };
}