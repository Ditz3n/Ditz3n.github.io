import { useLanguage } from '../../context/LanguageContext'

// Importer forskellige værktøjslogoer
import vscodeLogo from '../../assets/logos/vscode_logo.png'
import cursorLogo from '../../assets/logos/cursor_ai_logo.png'
import postmanLogo from '../../assets/logos/postman_logo.png'
import figmaLogo from '../../assets/logos/figma_logo.png'
import gitLogo from '../../assets/logos/github_logo.png'
import gitlabLogo from '../../assets/logos/gitlab_logo.png'
import dockerLogo from '../../assets/logos/docker_logo.png'
import azureLogo from '../../assets/logos/azure_data_studio_logo.png'
import clerkLogo from '../../assets/logos/clerk_logo.png'

// Funktion til at tjekke hvilket sprog brugerens system bruger
const Tools = () => {
  const { language } = useLanguage()

  // Liste over værktøjer med logoer
  const tools = [
    { 
      name: 'Visual Studio Code', 
      logoUrl: vscodeLogo 
    },
    { 
      name: 'Cursor AI', 
      logoUrl: cursorLogo 
    },
    { 
      name: 'GitHub', 
      logoUrl: gitLogo 
    },
    { 
      name: 'GitLab', 
      logoUrl: gitlabLogo 
    },
    { 
      name: 'Docker', 
      logoUrl: dockerLogo 
    },
    { 
      name: 'Postman', 
      logoUrl: postmanLogo 
    },
    { 
      name: 'Azure Data Studio', 
      logoUrl: azureLogo 
    },
    { 
      name: 'Figma', 
      logoUrl: figmaLogo 
    },
    { 
      name: 'Clerk', 
      logoUrl: clerkLogo 
    },
  ]

  return (
    <div className="mb-16">
      <h3 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800 dark:text-white">
        {language === 'da' ? 'Værktøjer' : 'Tools'}
      </h3>
      
      <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-[350px] sm:max-w-[450px] lg+:max-w-[700px] transition-all duration-300">
        {language === 'da' 
          ? 'Herunder kan du se de værktøjer og IDE\'er, jeg har erfaring med. Som i det tidligere afsnit, er dem, der står først, er de, jeg har mest erfaring med.'
          : 'Below you can see the tools and IDEs I have experience with. As in the previous section, the ones listed first are the ones I have the most experience with.'}
      </p>

      {/* Visning af værktøjer i en grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full max-w-[350px] sm:max-w-[450px] lg+:max-w-[700px]">
        {tools.map((tool) => (
          <div key={tool.name} className="relative shadow-md group rounded-lg p-[2px] bg-gradient-to-r from-[#77a1d3] via-[#79cbca] to-[#e684ae] dark:from-[#FF4E50] dark:to-[#F9D423] hover:scale-105 transition-transform duration-200">
            <div className="bg-gray-50 dark:bg-[#222222] rounded-lg p-4 h-full transition-colors duration-200">
              <div className="flex flex-col items-center space-y-3">
                <img src={tool.logoUrl} alt={tool.name} className="h-12 sm:h-16 w-auto object-contain" />
                <span className="text-sm sm:text-base text-gray-800 dark:text-gray-200 text-center">{tool.name}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Tools 