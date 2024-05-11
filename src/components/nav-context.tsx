"use client"
import { createContext, useState, Dispatch, SetStateAction } from 'react';

interface NavContextType {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

const NavContext = createContext<NavContextType>({
  value: '',
  setValue: () => { },
});

export const NavProvider = ({ children,credits }: { children: React.ReactNode,credits:string }) => {
  const [value, setValue] = useState(credits);

  return (
    <NavContext.Provider value={{ value, setValue }}>
      {children}
    </NavContext.Provider>
  );
};

export default NavContext;