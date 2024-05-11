import {type Locale } from "@/i18n-config";
import { LoadingFull } from "@/components/loading-skeleton";
import {ClerkLoaded, ClerkLoading } from '@clerk/nextjs'

export default async function Layout({
  children, params
}: Readonly<{
  children: React.ReactNode,
  params: { lang: Locale }
}>) {
  return (
    <>
        <ClerkLoading>
          <LoadingFull />
        </ClerkLoading>
        <ClerkLoaded>
          {children}
        </ClerkLoaded>
    </>
  );

}
