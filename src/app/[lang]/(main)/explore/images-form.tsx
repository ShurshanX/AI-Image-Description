"use client"
import { IImage } from '@/actions/explore';
import { LoadingFull } from '@/components/loading-from';
import { useRef, useState, useActionState,useEffect } from "react";
import { useFormStatus } from "react-dom";
import { useInView } from 'react-intersection-observer'
import { ClientMdxPage } from '@/components/mdx-page-client';

export function ImagesForm({ images,pageParam }: { images: IImage[],pageParam:number }) {

    console.log("init page:"+pageParam);
    const[tips,setTips] = useState('Loading...');

    const [imageList, setImageList] = useState<IImage[]>(images);
    const [searchText, setSearchText] = useState('');
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState<number>(pageParam);
    const { ref, inView } = useInView();

    async function formAction(formData: FormData) {

        setTips('Loading...');
        setPage(1);
        setHasMore(true);
        const keys = formData.get('keys') as string;
        setSearchText(keys);
        const imageList:any = [];
        setImageList(imageList);
    }



      async function loadMore() {

        if (!hasMore) return;
        const pageNum = Number(page)+1;
        setPage(pageNum);

        const imageList:any = [];
        if (!imageList || imageList.length === 0 || imageList.length < 9) {
            setHasMore(false);
            setTips('No more data');
        }
        if(imageList.length > 0){
            setImageList((prevImages)=>([...prevImages,...imageList]));
        }
      }

      useEffect(() => {
        if (inView) {
            loadMore()
        }
      }, [inView])

    return (
        <>
            <form className="flex items-center w-full mx-auto" action={formAction}>
                <LoadingFull />
                <label htmlFor="keys" className="sr-only">Search</label>
                <div className="relative w-full">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="text-gray-400 dark:text-gray-200" width="14" height="14" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.15625 14.0625C11.4182 14.0625 14.0625 11.4182 14.0625 8.15625C14.0625 4.89432 11.4182 2.25 8.15625 2.25C4.89432 2.25 2.25 4.89432 2.25 8.15625C2.25 11.4182 4.89432 14.0625 8.15625 14.0625Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M12.332 12.332L15.7492 15.7492" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                    <input type="text" id="keys" name='keys' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search keys name..." />
                </div>
                <SubmitLoading />
            </form>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3 py-10" >
                {imageList.length>0?imageList.map((image, index) => (

                    <div key={index} className="flex flex-col items-center max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <a>
                            <img className="rounded-t-lg" src={image.imgurl} alt={image.keys}/>
                        </a>
                        <div className="p-5">
                            {/* <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{image.description}</p> */}
                            <div className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                <ClientMdxPage mdxSource= {image.description}/>
                            </div>
                        </div>
                    </div>
                )):<p className='text-gray-500 dark:text-gray-400 text-center col-span-3 h-svh'>No results for <strong>{`"${searchText}"`}</strong></p>
                }
                <div ref={ref} className='text-center col-span-1 md:col-span-3 text-gray-500 dark:text-gray-400'>
                    {tips}
                </div>
            </div>
            
        </>
    )

}

function SubmitLoading() {
    const { pending } = useFormStatus();
    return (
        <button disabled={pending} type="submit" className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            {pending ? <svg width="20" height="20" fill="currentColor" className="animate-spin" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z">
                </path>
            </svg> :
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>}
            <span className="sr-only">Search</span>
        </button>
    );
}