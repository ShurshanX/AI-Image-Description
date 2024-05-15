"use client"
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
interface Props{
    btnlabel:string;
    variantId:string;
    lang:string;
}
export default function Button({btnlabel,variantId,lang}:Props){
    
    const { isLoaded, userId} = useAuth();
    const router = useRouter();
    function onClickHandler() {
        if (!isLoaded || !userId) {
            router.push(`/${lang}/sign-in`);
            return;
        }
        window.open(`https://imageaiqa.lemonsqueezy.com/buy/${variantId}?checkout[custom][user_id]=${userId}`);
     }

    return (
        <button type="button" onClick={onClickHandler} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center">{btnlabel}</button>
    )
}