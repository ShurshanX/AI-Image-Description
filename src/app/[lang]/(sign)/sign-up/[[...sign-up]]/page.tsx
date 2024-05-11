import { SignUp } from "@clerk/nextjs"
import { Locale } from "@/i18n-config";
import Policy from "@/components/policy";
import Logout from "./logout";
export default function Page({ params: { lang } }: { params: { lang: Locale } }) {
  
  return (
    <div className="flex flex-col items-center justify-center  bg-white dark:bg-gray-900 m-16">
      <Logout lang={lang}/>
      <Policy/>
    </div>
  )
}