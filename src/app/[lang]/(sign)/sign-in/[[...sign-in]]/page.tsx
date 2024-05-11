
import { SignIn } from "@clerk/nextjs"
import { Locale } from "@/i18n-config";
import Policy from "@/components/policy";
import Login from "./login";
export default function Page({ params: { lang } }: { params: { lang: Locale } }) {

  return (
    <div className="flex flex-col items-center justify-center  bg-white dark:bg-gray-900 m-16">
      <Login lang={lang} />
      <Policy />
    </div>
  )
}