import { useFormStatus } from "react-dom";


export function LoadingFull() {
    const { pending } = useFormStatus();
    return (
        <div className={`${pending ? 'show' : 'hidden'} fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center bg-black bg-opacity-50`}>
            <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600"></div>
        </div>
    );
}

export function LoadingOverlay() {
    const { pending } = useFormStatus();
    return (
        <div className={`${pending ? 'show' : 'hidden'} w-full`}>
            <div className="absolute bg-gray-50 bg-opacity-50 z-20 h-full w-full flex items-center justify-center dark:bg-gray-900 dark:bg-opacity-50">
                <div className="flex items-center">
                    {/* <span className="text-3xl mr-4">Loading</span> 
                    <span className="text-3xl mr-4">Loading</span>*/}
                    <svg className="animate-spin h-8 w-8 text-blue-600 dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path className="opacity-75" fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                        </path>
                    </svg>
                </div>
            </div>
        </div>
    );
}