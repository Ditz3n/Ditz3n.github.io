// Tools | This component is used to display the tools I have experience with
// useLanguage.ts to manage English or Danish language
import { useLanguage } from '../../hooks/useLanguage'

// Importing the tools data
import { toolsData } from '../ToolsData'

// Function to check the user's system language
const Tools = () => {
  const { language } = useLanguage()

// Interface for the tools
interface Tool {
  name: string;
  logoUrl: string;
}

  return (
    <div className="mb-16">
      {/* Title and Description */}
      <h3 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800 dark:text-white">
        {language === 'da' ? 'Værktøjer' : 'Tools'}
      </h3>
      
      <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-[350px] sm:max-w-[450px] lg+:max-w-[700px] transition-all duration-300">
        {language === 'da' 
          ? 'Herunder kan du se de værktøjer og IDE\'er, jeg har erfaring med. Som i det tidligere afsnit, er dem, der står først, er de, jeg har mest erfaring med.'
          : 'Below you can see the tools and IDEs I have experience with. As in the previous section, the ones listed first are the ones I have the most experience with.'}
      </p>

      {/* Display tools in a grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full max-w-[350px] sm:max-w-[450px] lg+:max-w-[700px]">
        {toolsData.map((tool: Tool) => (
          <div key={tool.name} className="relative shadow-md group rounded-lg p-[2px] bg-gradient-to-r from-[#77a1d3] via-[#79cbca] to-[#e684ae] dark:from-[#FF4E50] dark:to-[#F9D423]">
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