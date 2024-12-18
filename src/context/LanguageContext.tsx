import { createContext, useContext, useState } from 'react'

type Language = 'da' | 'en'

type LanguageContextType = {
  language: Language
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Detect browser language and default to 'en' if not Danish
  const [language] = useState<Language>(() => {
    const browserLang = navigator.language.toLowerCase()
    return browserLang.startsWith('da') ? 'da' : 'en'
  })

  return (
    <LanguageContext.Provider value={{ language }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
} 