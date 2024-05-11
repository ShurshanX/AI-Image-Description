import { Locale } from "@/i18n-config";
import { getDictionary,Dictionary } from '@/dictionaries'
import ContactForm from "./contact-form";


export default async function Page({ params: { lang } }: { params: { lang: Locale }} ) {
  const dictionary:Dictionary = await getDictionary(lang);
  
  return (
    <section>
      
        {/* Contact Container */}
        <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:px-5 lg:py-16 dark:bg-gray-900">
            {/* Contact Title */}
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold md:text-5xl text-gray-900 dark:text-white">{dictionary.contact.title}</h2>
              <p className="mx-auto mb-12 mt-4 max-w-xl text-gray-600 dark:text-gray-400">{dictionary.contact.subtitle}</p>
            </div>
            <ContactForm dictionary={dictionary} />
        </div>
      </section>
  );
}

