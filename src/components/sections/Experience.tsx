// Experience | This component is used to display the experience section of the website

// Importing useLanguage to manage the language state, and the different sections of the Experience component
import { useLanguage } from '../../context/LanguageContext'
import ProgrammingLanguages from './ProgrammingLanguages'
import Education from './Education'
import Tools from './Tools'

export default function Experience() {
  const { language } = useLanguage()

  return (
    <section id="experience" className="min-h-screen flex items-center justify-center px-8 sm:justify-start sm:px-16 md:px-24 lg:px-32 transition-all duration-300 pt-16 pb-16">
      <div className="text-left max-w-3xl transition-all duration-300">
        <h2 className="text-5xl md:text-6xl font-bold mb-12 text-gray-800 dark:text-white">
          {language === 'da' ? 'Erfaring' : 'Experience'}
        </h2>

        <div className="space-y-16">
          {/* Education Section */}
          <Education />
          
          {/* Programming Languages Section */}
          <ProgrammingLanguages />

          {/* Tools Section */}
          <Tools />
        </div>
      </div>
    </section>
  )
} 