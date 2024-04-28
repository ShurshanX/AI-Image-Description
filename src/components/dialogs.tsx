import React, {forwardRef,useState, useImperativeHandle } from 'react';

export interface DialogRef {
    openModal: (options: DialogProps) => void;
    closeModal: () => void;
  }

  interface DialogProps {
    type: number;
    message: string;
    title: string;
  }

  const Dialogs = forwardRef<DialogRef>((props, ref) => {
    const [isOpen, setIsOpen] = useState('hidden');
    const [type, setType] = useState(0);
    const [message, setMessage] = useState('');
    const [title, setTitle] = useState('');
    //const ref = useRef<DialogRef>(null);

    useImperativeHandle(ref, () => ({
        openModal: (options:DialogProps) => {
          setIsOpen('show');
          setType(options.type);
          setTitle(options.title);
          setMessage(options.message);
          //console.log(options);
        },
        closeModal: () => setIsOpen('hidden'),
      }));
      
    return (
        <div id="popup-modal"  tabIndex={-1} className={`${isOpen} flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-gray-900/50`}>
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button type="button" onClick={() => setIsOpen('hidden')} className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                        <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className={`p-4 md:p-5 text-center text-sm ${type === 0 ? ' text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' : 'text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400'}`}>
                        {type === 0 ? <svg className="mx-auto mb-4 w-12 h-12" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg> :
                            <svg className="mx-auto mb-4 w-12 h-12" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>}
                        <h3 className="mb-2 text-sm font-semibold">{title}</h3>
                        <div className="mb-5 text-sm">
                            {message}
                        </div>
                        {type === 0 ?
                        <button type="button" onClick={() => setIsOpen('hidden')} className=" w-full text-white bg-red-800 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-red-300 font-semibold rounded-lg text-sm px-3 py-1.5 me-2 text-center  items-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                            Dismiss
                        </button>
                        :<button type="button" onClick={() => setIsOpen('hidden')} className=" w-full text-white bg-green-800 hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-green-300 font-semibold rounded-lg text-sm px-3 py-1.5 me-2 text-center items-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                            Dismiss
                        </button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
});
Dialogs.displayName = 'Dialogs';
export default Dialogs;