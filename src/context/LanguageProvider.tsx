// LanguageProvider.tsx | This component is used to manage the language of the website
// Importing the useState and LanguageContext from the React library
import React, { useState } from 'react';
import { LanguageContext } from './languageContext';

// Defining the Language types (Danish and English)
type Language = 'da' | 'en';

// LanguageProvider component to provide language context to its children
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

export default LanguageProvider;