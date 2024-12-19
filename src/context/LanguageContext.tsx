// LanguageContext.tsx | This component is used to manage the language state of the website

// Importing the createContext and useContext hooks from the React library
import { createContext, useContext, useState } from 'react';

// Defining the Language types (Danish and English)
type Language = 'da' | 'en';

type LanguageContextType = {
  language: Language;
};

// Creating the LanguageContext with the default value of undefined
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Detect browser language and default to 'en' if not Danish
  const [language] = useState<Language>(() => {
    const browserLang = navigator.language.toLowerCase();
    return browserLang.startsWith('da') ? 'da' : 'en';
  });

  return (
    <LanguageContext.Provider value={{ language }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook to use the language context
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export default LanguageProvider;