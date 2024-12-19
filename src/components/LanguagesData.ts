// LanguagesData | This component is used to export the different programming languages I have experience with and use them in the ProgrammingLanguages.tsx component
// Importing the different logos for each programming language
import reactLogo from '../assets/logos/react_logo.png';
import cssLogo from '../assets/logos/css_logo.png';
import htmlLogo from '../assets/logos/html_logo.png';
import javaScriptLogo from '../assets/logos/javascript_logo.png';
import typescriptLogo from '../assets/logos/typescript_logo.png';
import csharpLogo from '../assets/logos/c_sharp_logo.png';
import cppLogo from '../assets/logos/cpp_logo.png';
import pythonLogo from '../assets/logos/python_logo.png';
import mongodbLogo from '../assets/logos/mongodb_logo.png';
import sqlLogo from '../assets/logos/sql_logo.png';
import cLogo from '../assets/logos/c_logo.png';
import assemblyLogo from '../assets/logos/assembly_logo.png';

// Exporting the interface for the programming languages
export interface Language {
  name: string;
  logoUrl: string;
}

// Exporting the list of programming languages with their names and logo URLs
export const languageData: Language[] = [
  { 
    name: 'React/React Native',
    logoUrl: reactLogo
  },
  { 
    name: 'CSS',
    logoUrl: cssLogo
  },
  { 
    name: 'HTML',
    logoUrl: htmlLogo
  },
  { 
    name: 'JavaScript',
    logoUrl: javaScriptLogo
  },
  { 
    name: 'TypeScript',
    logoUrl: typescriptLogo
  },
  { 
    name: 'C#',
    logoUrl: csharpLogo
  },
  { 
    name: 'C++',
    logoUrl: cppLogo
  },
  { 
    name: 'C',
    logoUrl: cLogo
  },
  { 
    name: 'Python',
    logoUrl: pythonLogo
  },
  { 
    name: 'MongoDB',
    logoUrl: mongodbLogo
  },
  { 
    name: 'SQL',
    logoUrl: sqlLogo
  },
  {
    name: 'Assembly',
    logoUrl: assemblyLogo
  },
];