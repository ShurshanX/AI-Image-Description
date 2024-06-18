'use client'
import Image from 'next/image';
import { ChangeEvent, useState, useRef,ClipboardEvent } from 'react';
import Dialogs, { AlertRef } from "@/components/alerts";

type ImagePickerProps = {
  onImageSelected?: (selectedImage: File | null) => void;
  member: boolean;
} 

export default function ImagePicker({ onImageSelected,member }: ImagePickerProps) {

    const alertRef = useRef<AlertRef | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isPickerShow, setIsPickerShow] = useState(false);

    //定义一个大小4M
    const MAX_FILE_SIZE_IN_BYTES_2M = 2 * 1024 * 1024; // 2 MB
    const MAX_FILE_SIZE_IN_BYTES_4M = 4 * 1024 * 1024; // 4 MB
    const FILE_SELECT_ERROR_MESSAGE = 'Failed to load the selected image. Please try again.';
    const SIZE_EXCEEDS_LIMIT_MESSAGE = 'The selected file exceeds the maximum allowed size.';
    const MAX_FILE_SIZE_IN_BYTES = member ? MAX_FILE_SIZE_IN_BYTES_4M : MAX_FILE_SIZE_IN_BYTES_2M;
    
    function handleImageSelect (e: ChangeEvent<HTMLInputElement>){
        if (!e.target.files || e.target.files.length === 0) {
          setErrorTips(FILE_SELECT_ERROR_MESSAGE);
            return;
        }

        const file = e.target.files[0];
        if (!file.type.startsWith('image/')) { 
          setErrorTips();
            return;
        }
        if (file.size > MAX_FILE_SIZE_IN_BYTES) {
            setErrorTips(SIZE_EXCEEDS_LIMIT_MESSAGE);
            return;
        }
        const reader = new FileReader();
        reader.onload = () => {
            setSelectedImage(reader.result as string);
            setIsPickerShow(true);
            if (typeof onImageSelected === 'function') {
              onImageSelected(null);
            }
        };
        reader.onerror = function () {
          setErrorTips(FILE_SELECT_ERROR_MESSAGE);
        };
        reader.readAsDataURL(file);
    };

    
    function setErrorTips(error: string = "select an image") {
      
      alertRef.current?.openModal({ type: 0, title: "Oops!", message: error })
  }

  function pasteHandeler(e: ClipboardEvent<HTMLInputElement>) {
    const items = e.clipboardData?.items;
    if (!items || !items[0])return;
    const file:File = items[0].getAsFile() as File;
    if (!file.type.startsWith('image/')) { 
      setErrorTips();
      return;
    }
    if (file && file.size > MAX_FILE_SIZE_IN_BYTES) {
      setErrorTips(SIZE_EXCEEDS_LIMIT_MESSAGE);
      return;
    }
 
    const reader = new FileReader();
    reader.onload = () => {
        setSelectedImage(reader.result as string);
        setIsPickerShow(true);
        if (typeof onImageSelected === 'function') {
          onImageSelected(file);
        }
    }
    reader.onerror = function () {
      setErrorTips(FILE_SELECT_ERROR_MESSAGE);
    };
    reader.readAsDataURL(file);
  }

    return (
        <>
            <Dialogs ref={alertRef} />
             <div  className={`${isPickerShow ? 'show' : 'hidden'} px-4 py-4`} onPaste={pasteHandeler} >
                  <input id="file" name="file" accept="image/png, image/jpeg" type="file"
                        className="sr-only" onChange={handleImageSelect}/>
                  <div id="image-container">
                    <label htmlFor="file" className="cursor-pointer rounded-md">
                      {selectedImage && <img id="image" src={selectedImage} alt="Selected Image"
                        className="w-full min-h-48 max-h-48  cursor-pointer"/>}
                    </label>
                  </div>
                </div>
                <div  className={`${!isPickerShow ? 'show' : 'hidden'} px-6 py-10`} onPaste={pasteHandeler}>
                  <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor"
                    aria-hidden="true">
                    <path fill-rule="evenodd"
                      d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                      clip-rule="evenodd" />
                  </svg>
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label htmlFor="file"
                      className="relative cursor-pointer rounded-md bg-white dark:bg-gray-900 font-semibold text-indigo-600 dark:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 dark:focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500 dark:hover:text-indigo-400">
                      <span>Click to Upload</span>
                    </label>
                    <p className="pl-1 dark:text-gray-400">or copy and paste</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600 dark:text-gray-400">PNG, JPG up to {member? '4MB':'2MB'}</p>
                </div>
        </>
    );
};