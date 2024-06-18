
interface TooltipProps {
    title: string;
    children: React.ReactNode;
}


export default function Tooltip({ title, children }: TooltipProps){
    return (
      <div className="relative flex flex-col items-center group">
        {children}
        <div className="absolute bottom-4 hidden flex-col items-center mb-6  group-hover:flex">
          <span className="relative z-10 p-2 text-sm font-medium leading-none text-white whitespace-nowrap bg-gray-900 dark:bg-gray-700 shadow-lg rounded-md">
            {title}
          </span>
          <div className="relative w-3 h-3 -mt-2 bottom-0 rotate-45 bg-gray-900 dark:bg-gray-700"></div>
        </div>
      </div>
    );
  };