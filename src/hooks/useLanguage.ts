// useLanguage | This hook is used to manage the language state of the website
// Importing the useContext hook from the React library, and the LanguageContext from the languageContext
import { useContext } from 'react';
import { LanguageContext } from '../context/languageContext';

// useLanguage hook to manage the language state
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}