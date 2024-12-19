import { createContext } from 'react';

// Defining the Theme types (light and dark)
type Theme = 'light' | 'dark';

type ThemeContextType = {
  theme: Theme;
};

// Creating the ThemeContext with the default value of undefined
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);