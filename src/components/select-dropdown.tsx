import { useState, useRef, useEffect } from 'react';

interface SelectDropdownProps {
    defaultValue?: Option;
    onChange?: (value: Option) => void;
    options: Option[];
    name: string;
    id: string;
}

interface Option {
    value: string;
    label: string;
    disabled?: boolean;
}

export function SelectDropdown({ defaultValue, options, name, id, onChange }: SelectDropdownProps) {

    const [option, setOption] = useState(defaultValue ?? options[0]);
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef<any>(null);

    useEffect(() => {
        const handleClickOutside = (event:MouseEvent) => {
          if (selectRef.current && !selectRef.current.contains(event.target)) {
            setIsOpen(false);
          }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
      }, [selectRef]);

    function handleOptionClick(option: Option) {
        if (onChange) {
            onChange(option);
        }
        setOption(option);
        setIsOpen(false);
    };

    return (
        <div className="relative" id="select-dropdown"  ref={selectRef}>

            <div id="select-button" className="relative flex items-center w-full text-sm font-medium text-left text-gray-600  dark:text-white" >
                <input id={id} name={name} value={option.value} type="hidden" />
                <label htmlFor="select_input" className="sr-only">Choose a state</label>
                <input id="select_input" value={option.label} onClick={() => setIsOpen(!isOpen)} className="w-full text-sm bg-gray-50 border border-gray-300 rounded-lg  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900  dark:focus:ring-blue-500 dark:focus:border-blue-500  dark:border-gray-600" />
                <svg className="w-2.5 h-2.5 absolute z-10 end-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                </svg>
            </div>
            {isOpen && <div id="dropdown-states" className="absolute z-10 w-full bg-white divide-y divide-gray-100 rounded-lg shadow  dark:bg-gray-700">

                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="states-button">
                    {options.map((option) => (
                        <li key={option.value} onClick={() => handleOptionClick(option)} className={`${ option.disabled? 'pointer-events-none text-gray-400 dark:text-gray-500 select-none ': 'text-gray-700 dark:text-gray-200'} inline-flex cursor-pointer w-full px-4 py-2 text-sm hover:bg-gray-100  dark:hover:bg-gray-600 dark:hover:text-white`}>
                            {option.label}
                        </li>))
                    }
                </ul>
            </div>}
        </div>
    )
}