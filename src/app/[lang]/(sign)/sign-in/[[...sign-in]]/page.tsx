
import { SignIn } from "@clerk/nextjs"
import { Locale } from "@/i18n-config";
import Policy from "@/components/policy";
export default function Page({ params: { lang } }: { params: { lang: Locale } }) {

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <SignIn signUpUrl={`/${lang}/sign-up`} />
      <Policy />
    </div>
  )
}