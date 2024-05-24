"use client"
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import {initializePaddle,Paddle,Environments,Theme} from "@paddle/paddle-js";
import { useState,useEffect } from "react";
import { useContext } from 'react';
import ThemeContext from "@/components/theme-context";

interface Props{
    btnlabel:string;
    priceId:string;
    lang:string;
    token:string;
    env:Environments;
    email:string;
}
export default function Button({btnlabel,priceId,lang,token,env,email}:Props){

    const { isLoaded, userId} = useAuth();
    const router = useRouter();
    const [paddle, setPaddle] = useState<Paddle>();
    const {theme} = useContext(ThemeContext);
    
    useEffect(() => {
        initializePaddle(
          { 
            environment: env, 
            token: token,
            eventCallback: function(data) {
              //console.log(data);
            } ,
            checkout:{
              settings:{
                displayMode: "overlay",
                theme:theme,
                locale: lang
            }
          }
        }).then(
          (paddleInstance: Paddle | undefined) => {
            if (paddleInstance) {
              setPaddle(paddleInstance);
            }
          },
        );
      }, [theme]);

      function openCheckout (){
        paddle?.Checkout.open({
            items: [{ priceId: priceId, quantity: 1 }],
            customer: { email: email},
            customData:{userId:String(userId)}
          });
      }

    function onClickHandler() {
        if (!isLoaded || !userId) {
            router.push(`/${lang}/sign-in`);
            return;
        }
        openCheckout();
     }

    return (
        <button type="button" onClick={onClickHandler} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center">{btnlabel}</button>
    )
}