import { type Locale } from "@/i18n-config";

export default async function Layout({
  children, params
}: Readonly<{
  children: React.ReactNode,
  params: { lang: Locale }
}>) {

  return (
    <div className="flex flex-col  dark:bg-gray-900">
      {children}
    </div>
  );
}
