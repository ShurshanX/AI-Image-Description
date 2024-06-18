import Link from "next/link";
import Tooltip from "@/components/Tooltip";
type Props = {
    imageUrl: string;
    text: string;
}

export function ShareButton({ imageUrl, text }: Props) {

    const twitterUrl = new URL('https://twitter.com/intent/tweet');
    const twitterParams = new URLSearchParams({
        url: imageUrl,
        text: text,
    });
    twitterUrl.search = twitterParams.toString();

    const facebookUrl = new URL('https://www.facebook.com/sharer/sharer.php');
    const facebookParams = new URLSearchParams({
        u: imageUrl,
        quote: text,
    });
    facebookUrl.search = facebookParams.toString();

    return (
        <div className="flex h-auto w-auto">
            <Tooltip title="Share on Twitter">
                <Link  href={twitterUrl.toString()}  className="opacity-50 hover:opacity-100 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2" target="_blank" rel="noopener noreferrer" title="Share on Twitter">
                    <svg className="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13.795 10.533 20.68 2h-3.073l-5.255 6.517L7.69 2H1l7.806 10.91L1.47 22h3.074l5.705-7.07L15.31 22H22l-8.205-11.467Zm-2.38 2.95L9.97 11.464 4.36 3.627h2.31l4.528 6.317 1.443 2.02 6.018 8.409h-2.31l-4.934-6.89Z" />
                    </svg>
                </Link>
            </Tooltip>
            <Tooltip title="Share on Facebook">
                <Link href={facebookUrl.toString()} className="opacity-50 hover:opacity-100 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2"  target="_blank" rel="noopener noreferrer" title="Share on Facebook">
                    <svg className="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z" clip-rule="evenodd" />
                    </svg>
                </Link>
            </Tooltip>
        </div>
    )
}