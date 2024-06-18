import React, { useState, useEffect, useRef } from 'react';

interface  ClipboardProps {
    className?: string;
    value : string;
}
export default function Clipboard({ className, value  }: ClipboardProps) {
    const [copied, setCopied] = useState(false);
    
    async function handleCopy(){
        navigator.clipboard.writeText(value)
        .then(() => {
            setCopied(true);
        })
        .catch(err => {
            console.error('Failed to copy: ', err);
        });
    };

    useEffect(() => {
        if (copied) {
            setTimeout(() => { setCopied(false) }, 1500); // Reset 'copied' state after 1.5 seconds
        }
    }, [copied]);

    return (

        // <div className="relative h-full w-full">
        //     {children}
            <div className={`${className} flex flex-col items-center group`}>
                <button type='button' onClick={handleCopy} className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2">
                    {copied ? <span id="success-icon-contact-details" className="inline-flex items-center">
                        <svg className="w-4 h-4 text-blue-700 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 12">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5" />
                        </svg>
                    </span> :
                        <span id="default-icon-contact-details">
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                            </svg>
                        </span>

                    }
                </button>
                <div id="tooltip-contact-details" className="absolute z-10 bottom-4 mb-8 flex-col items-center hidden  group-hover:flex text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm  dark:bg-gray-700">
                    <span className='px-3 py-2 whitespace-nowrap'>{copied ? 'Copied!' : 'Copy to clipboard'}</span>
                    <div className="w-3 h-3 -m-1 rotate-45 bg-gray-900 dark:bg-gray-700"></div>
                </div>
            </div>
        // </div>
    );
};