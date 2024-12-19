// Projects | This component is used to display the different projects I have worked on
// useLanguage.ts to manage English or Danish language
import { useLanguage } from '../../hooks/useLanguage'

// Projects.ts to display the different projects
import { projectsData } from '../ProjectsData'

// Project interface
interface Project {
  title: { en: string; da: string };
  description: { en: string; da: string };
  video?: string;
  images: string[];
  languages: string[];
  tools: string[];
  pdf?: string;
  github?: string;
}

// ProjectsProps interface
interface ProjectsProps {
  openModal: (project: Project, initialIndex: number) => void;
}

// Projects component to display a list of projects and handle language selection
const Projects = ({ openModal }: ProjectsProps) => {
  const { language } = useLanguage();

  return (
    <section id="projects" className="flex items-center justify-center px-8 sm:justify-start sm:px-16 md:px-24 lg:px-32 transition-all duration-300 pt-8 pb-16">
      {/* Title and Description */}
      <div className="text-left max-w-3xl transition-all duration-300">
        <h2 className="text-5xl md:text-6xl font-bold mb-12 text-gray-800 dark:text-white">
          {language === 'da' ? 'Projekter' : 'Projects'}
        </h2>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-[350px] sm:max-w-[450px] lg+:max-w-[700px] transition-all duration-300">
          {language === 'da' 
            ? 'Herunder finder du en oversigt over nogle af de projekter, jeg har arbejdet på. Klik på et projekt for at se flere detaljer, og for nogle projekter er det desuden muligt at downloade relevante rapporter.'
            : 'Below you will find an overview of some of the projects I have worked on. Click on a project to see more details, and for some projects, it is also possible to download relevant reports.'}
        </p>
        
        {/* Mapping the projects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4 w-full max-w-[450px] lg+:max-w-[700px]">
          {projectsData.map((project, index) => (
            <div key={index} className="shadow-md relative group rounded-lg p-[2px] bg-gradient-to-r from-[#77a1d3] via-[#79cbca] to-[#e684ae] dark:from-[#FF4E50] dark:to-[#F9D423] hover:scale-105 transition-transform duration-200" onClick={() => openModal(project, 0)}>
            <div className="bg-gray-50 dark:bg-[#222222] rounded-lg p-2 h-full flex flex-col items-center justify-center transition-colors duration-200">
              <img src={project.images[0]} alt={project.title[language]} className="h-24 w-full object-cover rounded-md" />
              <div className="flex-grow flex items-center justify-center">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 text-center">{project.title[language]}</h3>
              </div>
            </div>
          </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;