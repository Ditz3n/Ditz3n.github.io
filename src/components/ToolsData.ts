// ToolsData | This component is used to export the different tools I have experience with and use them in the Tools.tsx component
// Importing the different logos for the tools section
import vscodeLogo from '../assets/logos/vscode_logo.png'
import cursorLogo from '../assets/logos/cursor_ai_logo.png'
import postmanLogo from '../assets/logos/postman_logo.png'
import figmaLogo from '../assets/logos/figma_logo.png'
import gitLogo from '../assets/logos/github_logo.png'
import gitlabLogo from '../assets/logos/gitlab_logo.png'
import dockerLogo from '../assets/logos/docker_logo.png'
import azureLogo from '../assets/logos/azure_data_studio_logo.png'
import clerkLogo from '../assets/logos/clerk_logo.png'

// Exporting the interface for the tools
export interface Tool {
    name: string;
    logoUrl: string;
  }

// Exporting the list of tools with their names and logo URLs
export const toolsData: Tool[] = [
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