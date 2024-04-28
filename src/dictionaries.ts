import 'server-only'
import type { Locale } from '@/i18n-config'

const dictionaries = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default)
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
  };
  navbar:{
    logo_alt: string;
    logo_title: string;
    home: string;
    language: string;
  };
  footer:{
    copyright:string;
    rights:string;
    privacy:string;
    terms:string;
    contact:string;
    coffee_buy_title:string;
    coffee_buy:string;
  }
}