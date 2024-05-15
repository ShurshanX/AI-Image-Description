"use client";
import { useFormStatus } from "react-dom";
import { useEffect, useRef, useContext } from "react";
import ImagePicker from "@/components/imagepicker";
import { useState } from "react";
import { LoadingOverlay } from "@/components/loading-from";
import { Dictionary } from '@/dictionaries'
import { Locale } from "@/i18n-config";
import ReactMarkdown from 'react-markdown';
import { ImageDescriptionResponse } from "@/types/responses";
import ShiftAndByteBufferMatcher from "@/scripts/ShiftAndByteBufferMatcher";
import Dialogs, { DialogRef } from "@/components/dialogs";
import NavContext from "@/components/nav-context";
import { useAuth } from "@clerk/nextjs";
import { RemoteMdxPage } from "@/components/mdx-page-remote";
import { defaultComponents } from '@/components/mdx-page-client';


export default function UploadForm({ lang, dictionary }: { lang: Locale, dictionary: Dictionary["index"] }) {

    const formRef = useRef<HTMLFormElement | null>(null);
    const [imageDesc, setImageDesc] = useState<string>('');
    
    const dialogRef = useRef<DialogRef | null>(null);
    const { setValue } = useContext(NavContext);
    const { userId } = useAuth();

    const handleImageSelected = (selectedImage: string | null) => {
        //console.log('Image selected:', selectedImage);
        setImageDesc('');
    };

    async function formAction(formData: FormData) {
       
        formData.set("lang", lang);
        const it = streamingFetch(`/api/home`, {
            method: 'POST',
            body: formData,
        })

        for await (let value of it) {
            const individualJSONObjects = value.split('{');
            for (const individualJSON of individualJSONObjects) {
                if (individualJSON.length > 0) {
                    try {
                        //console.log('Parsing one JSON:', individualJSON);
                        const parsedJSON = JSON.parse(`{${individualJSON}`) as ImageDescriptionResponse; // Add braces for valid parsing
                        if (parsedJSON.error_code) {

                            setErrorTips(parsedJSON.error_msg);
                            break;
                        }
                        setImageDesc((prev) => prev + parsedJSON.description);

                    } catch (error) {
                        console.error('Error parsing JSON:', error);
                    }
                }
            }
        }
        if (userId) {
            const credits = "0";
            setValue(credits);
        }

        formRef.current?.reset();
       

        function setErrorTips(error: string = "please select image") {
            setImageDesc('');
            dialogRef.current?.openModal({ type: 0, title: "Oops!", message: error })
        }
    }

    return (
        <>
            <Dialogs ref={dialogRef} />
            <form action={formAction} ref={formRef} className="flex flex-col mt-16 justify-center items-center w-full relative">

               <LoadingOverlay />

                <h1 className="mb-4 text-3xl font-bold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">{dictionary.title}</h1>

                <p className="mb-5 text-lg font-normal text-gray-500 lg:text-1xl sm:px-16 xl:px-28 dark:text-gray-400">{dictionary.subtitle}</p>

                {userId && <div className="items-center justify-between py-2 px-4 mb-4 rounded-lg text-blue-700 bg-blue-100 dark:bg-blue-900 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800">
                    <p className="text-sm font-semibold text-blue-700  dark:text-white dark:decoration-white decoration-blue-500">{dictionary.credits_label}</p>
                    </div>
                }
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:px-16 xl:px-28">
              
                    <div className="col-span-full">
                        <label htmlFor="cover-photo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{dictionary.func_image_label}</label>
                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 dark:border-gray-400">
                            <ImagePicker onImageSelected={handleImageSelected}/>
                        </div>
                    </div>
                    <div className="col-span-full">
                        <label htmlFor="des" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{dictionary.func_text_label}</label>
                        <div className="mt-2">

                            
                            <ReactMarkdown components={defaultComponents} skipHtml={true} className={`${imageDesc === '' ? 'text-gray-400 dark:text-gray-400' : 'text-gray-900 dark:text-white'} max-h-[160px] min-h-[160px] overflow-y-auto not-prose block w-full p-2.5 text-sm bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:border-gray-600   dark:focus:ring-blue-500 dark:focus:border-blue-500`}>
                                {imageDesc === '' ? `${dictionary.func_text_placeholder}` : imageDesc}
                            </ReactMarkdown>
                            {/* 
                                    <textarea id="des" data-provide="markdown" name="des" rows={6} value={imageDesc} placeholder={dictionary.func_text_placeholder}
                                        className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                        
                                    </textarea>
                                    */}
                        </div>
                        {/* <p className="mt-3 text-sm leading-6 text-gray-600">{dictionary.note}</p> */}
                        <div className="flex mt-3">
                            <div className="flex items-center h-5">
                                <input id="public" name="public" type="checkbox" defaultChecked={true} aria-describedby="remember" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
                            </div>
                            <label htmlFor="public" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{dictionary.public_label}</label>
                        </div>
                        <p className="mt-5 text-sm leading-6 text-gray-600 dark:text-gray-400">{dictionary.donation_about}☕😊&nbsp;&nbsp;&nbsp;&nbsp;<a className="text-sm underline font-bold text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200" href="https://ko-fi.com/imgdesgen">{dictionary.donation_label}</a> ☕️</p>
                    </div>
                    
                    <div className="flex col-span-full justify-center items-center w-full">
                        <SubmitLoading dictionary={dictionary} />
                    </div>
                </div>


            </form>
        </>
    );
}

function Submit() {
    const { pending } = useFormStatus();
    return (
        <button disabled={pending} className="rounded-md bg-indigo-600 w-full px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{pending ? "Submitting" : "Generate Description"}</button>
    );
}



function SubmitLoading({ dictionary }: { dictionary: Dictionary["index"] }) {
    const { pending } = useFormStatus();
    return (
        <button disabled={pending} className="py-2 px-4 flex justify-center items-center  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg dark:focus:ring-blue-900">
            {pending && <svg width="20" height="20" fill="currentColor" className="mr-2 animate-spin" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z">
                </path>
            </svg>}
            {dictionary.func_submit_label}
        </button>
    );
}

async function* streamingFetch(input: RequestInfo | URL, init?: RequestInit) {

    const response = await fetch(input, init)
    const bytesStream = convertStreamToIterator(response.body!);
    const parserBuff = new ShiftAndByteBufferMatcher();
    for await (const chunk of parserBuff.processStreamingData(bytesStream)) {
        yield chunk;
    }
}



async function* convertStreamToIterator(stream: ReadableStream<Uint8Array>): AsyncIterableIterator<Uint8Array> {
    const reader = stream.getReader();

    for (; ;) {
        const { done, value } = await reader?.read() ?? { done: false, value: undefined }
        if (done) break;

        try {
            yield value
        }
        catch (e: any) {
            console.warn(e.message)
        }

    }
}