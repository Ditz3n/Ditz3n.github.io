// languageContext | This component is used to manage the language of the website
// Importing the createContext function from the React library
import { createContext } from 'react';

// Defining the Language types (Danish and English)
type Language = 'da' | 'en';

// Defining the LanguageContextType
type LanguageContextType = {
  language: Language;
};

// Creating the LanguageContext with the default value of undefined
export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);