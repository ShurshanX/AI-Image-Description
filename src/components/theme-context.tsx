// ThemeContext.tsx
"use client"
import { createContext, useState, Dispatch, SetStateAction } from 'react';
import { useEffect,useLayoutEffect } from 'react';


export type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
}

function getLocalStoredTheme():Theme {
  let storedTheme:Theme = 'dark';
  if (typeof window !== 'undefined') {
      storedTheme = localStorage.getItem('color-theme') as Theme;
  }
  //console.log("storedTheme:" + storedTheme);
  return storedTheme??'dark';
}

const ThemeContext = createContext<ThemeContextType>({
  theme: getLocalStoredTheme(),
  setTheme: () => {},
});

export const ThemeProvider = ({ children,storedTheme }:{ children: React.ReactNode,storedTheme:string}) => {
 
  const [theme, setTheme] = useState<Theme>(storedTheme as Theme);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;