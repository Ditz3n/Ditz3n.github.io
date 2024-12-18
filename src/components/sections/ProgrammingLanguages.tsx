import { useLanguage } from '../../context/LanguageContext';

// Import Programming Languages Logos
import { languageLogos } from '../Languages';

// Funktion til at tjekke hvilket sprog brugerens system bruger
const ProgrammingLanguages = () => {
  const { language } = useLanguage();

  // Liste over programmeringssprog med logoer
  const languages = [
    { 
      name: 'React/React Native',
      logoUrl: languageLogos.react,
    },
    { 
      name: 'CSS',
      logoUrl: languageLogos.css,
    },
    { 
      name: 'HTML',
      logoUrl: languageLogos.html,
    },
    { 
      name: 'JavaScript',
      logoUrl: languageLogos.javascript,
    },
    { 
      name: 'TypeScript',
      logoUrl: languageLogos.typescript,
    },
    { 
      name: 'C#',
      logoUrl: languageLogos.csharp,
    },
    { 
      name: 'C++',
      logoUrl: languageLogos.cpp,
    },
    { 
      name: 'Python',
      logoUrl: languageLogos.python,
    },
    { 
      name: 'MongoDB',
      logoUrl: languageLogos.mongodb,
    },
    { 
      name: 'SQL',
      logoUrl: languageLogos.sql,
    },
    {
      name: 'Assembly',
      logoUrl: languageLogos.assembly,
    },
  ];

  return (
    <div>
      <h3 className="text-2xl sm:text-3xl font-bold mb-8 text-gray-800 dark:text-white">
        {language === 'da' ? 'Programmeringssprog' : 'Programming Languages'}
      </h3>
      
      <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-[350px] sm:max-w-[450px] lg+:max-w-[700px] transition-all duration-300">
        {language === 'da' 
          ? 'Herunder kan du se de programmeringssprog og teknologier, som jeg har erfaring med, gennem min uddannelse og personlige projekter. Dem, der står først, er de, jeg har mest erfaring med.' 
          : 'Below you can see the programming languages and technologies that I have experience with through my education and personal projects. The ones listed first are the ones I have the most experience with.'}
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full max-w-[350px] sm:max-w-[450px] lg+:max-w-[700px]">
        {languages.map((lang) => (
          <div key={lang.name} className="relative shadow-md group rounded-lg p-[2px] bg-gradient-to-r from-[#77a1d3] via-[#79cbca] to-[#e684ae] dark:from-[#FF4E50] dark:to-[#F9D423] hover:scale-105 transition-transform duration-200">
            <div className="bg-gray-50 dark:bg-[#222222] rounded-lg p-4 h-full transition-colors duration-200">
              <div className="flex flex-col items-center space-y-3">
                <img src={lang.logoUrl} alt={lang.name} className="h-12 sm:h-16 w-auto object-contain" />
                <span className="text-sm sm:text-base text-gray-800 dark:text-gray-200 text-center">{lang.name}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgrammingLanguages; 