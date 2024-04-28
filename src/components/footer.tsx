import { Dictionary } from '@/dictionaries'
export default function Footer({dictionary }: {dictionary: Dictionary["footer"] }) {
  return (
<footer className="block">
    {/*-- Container */}
    <div className="flex flex-col mx-auto max-w-7xl mt-4 mb-4 justify-center px-5 md:px-0 md:items-center h-full md:h-14">
      
      <div
        className="flex flex-col-reverse justify-center gap-2 md:gap-10 md:flex-row md:items-start">

        <div className="md:inline-flex md:mt-4">
          <p className="text-[#636262] text-sm md:text-base"> © Copyright 2024. All rights reserved. </p>
        </div>
        <div className="md:inline-flex md:mt-4">
          <p className="text-[#636262] text-sm md:text-base"> <a className="text-sm" title='click view AI Describe Picture Terms of Use' href="/en/privacy-policy">Privacy Policy</a> </p>
        </div>
        <div className="md:inline-flex md:mt-4">
          <p className="text-[#636262] text-sm md:text-base"> <a className="text-sm" title='click view AI Describe Picture Privacy Policy' href="/en/terms-of-services">Terms of Use</a> </p>
        </div>
        <div className="md:inline-flex md:mt-4">
          <p>
            <strong>{dictionary.coffee_buy_title}</strong>
            <a className="text-sm underline" href="https://ko-fi.com/imgdesgen">{dictionary.coffee_buy}</a> ☕️
          </p>
        </div>
        <div className="md:inline-flex md:mt-4">
          <div className="flex max-w-[272px] items-start justify-start">
            <img src="/assets/email.svg" alt="email Picture" className="mr-3 inline-block" />
            <p className="text-[#636262] text-sm md:text-base"> <a href="mailto:imgdesgen@gmail.com" title='Send an email to AI Image Description Generator: Free online describe image, Text Extraction & Code Conversion'>imgdesgen@gmail.com</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
  )
    }