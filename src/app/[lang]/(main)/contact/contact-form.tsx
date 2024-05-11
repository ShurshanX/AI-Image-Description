"use client"
import { useFormStatus, useFormState  } from "react-dom";
import { Dictionary } from '@/dictionaries'
import { addContactInfo } from "@/actions/contact";
import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Dialogs,{DialogRef} from "@/components/dialogs";



export default function ContactForm({ dictionary }: { dictionary: Dictionary }) {

    const [state, action] = useFormState(addContactInfo, undefined)
    const dialogRef = useRef<DialogRef|null>(null);
    
    const formRef = useRef<HTMLFormElement | null>(null);
    const router = useRouter();


    useEffect(() => {
    
        if (state?.success) {
            dialogRef.current?.openModal({type: 1, title: "Success!", message: state?.message})
            formRef.current?.reset();
            router.back();
        }else if (state?.message) {
           
            dialogRef.current?.openModal({type: 0, title: "Oops!", message: state?.message})
        }
      }, [state]);



    return (
        <>
            {/* Contact Form */}
            <Dialogs ref={dialogRef}/>
            <form action={action} ref={formRef} className="mb-4 text-left sm:px-4 md:px-20" name="wf-form-name">
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label htmlFor="first_name" className={`block mb-2 text-sm font-medium ${state?.errors?.first_name?'text-red-700 dark:text-red-500':'text-gray-900 dark:text-white'}`}>{dictionary.contact.first_name}</label>
                        <input type="text" id="first_name" name="first_name" className={
                            state?.errors?.first_name ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500':
                            'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            } placeholder="John"  required/>
                        {state?.errors?.first_name && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{state.errors.first_name}</p>}
                        
                       
                    </div>
                    <div>
                        <label htmlFor="last_name" className={`block mb-2 text-sm font-medium ${state?.errors?.last_name?'text-red-700 dark:text-red-500':'text-gray-900 dark:text-white'}`}>{dictionary.contact.last_name}</label>
                        <input type="text" id="last_name" name="last_name" className={
                            state?.errors?.last_name ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500':
                            'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            } placeholder="Doe"  required/>
                        {state?.errors?.last_name && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{state.errors.last_name}</p>}
                    </div>
                </div>
                <div className="mb-6">
                    <label htmlFor="email" className={`block mb-2 text-sm font-medium ${state?.errors?.email?'text-red-700 dark:text-red-500':'text-gray-900 dark:text-white'}`}>{dictionary.contact.email}</label>
                    <input type="text" id="email" name="email" className={
                            state?.errors?.email ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500':
                            'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            } placeholder="john.doe@company.com"  required/>
                    {state?.errors?.email && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{state.errors.email}</p>}
                </div>
                <div className="mb-8">
                    <label htmlFor="message" className={`block mb-2 text-sm font-medium ${state?.errors?.message?'text-red-700 dark:text-red-500':'text-gray-900 dark:text-white'}`}>{dictionary.contact.message}</label>
                    <textarea id="message" name="message" rows={4} className={
                            state?.errors?.message ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500':
                            'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            } placeholder="Write your thoughts here..." required> </textarea>
                    {state?.errors?.message && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{state.errors.message}</p>}
                </div>
                <SubmitLoading dictionary={dictionary["contact"]} />
            </form>
        </>
    )
}

function SubmitLoading({ dictionary }: { dictionary: Dictionary["contact"] }) {

    const { pending } = useFormStatus();
    return (
        <button disabled={pending} type="submit" className="mr-5 flex w-full items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:mr-6 lg:mr-8">
            {
                pending && <svg width="20" height="20" fill="currentColor" className="mr-2 animate-spin" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                    <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z">
                    </path>
                </svg>
            }
            <p className="mr-6 font-bold">{dictionary.submit}</p>
            <svg fill="currentColor" viewBox="0 0 20 21" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-none">
                <title>Arrow Right</title>
                <polygon points="16.172 9 10.101 2.929 11.515 1.515 20 10 19.293 10.707 11.515 18.485 10.101 17.071 16.172 11 0 11 0 9"></polygon>
            </svg>
        </button>
    );
}