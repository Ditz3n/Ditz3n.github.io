// ProjectModal | This component is used to display the details of a project when a project is clicked on
// Importing useLanguage and useTheme hooks from the LanguageContext and ThemeContext, which are used to manage the language and theme of the website
import { useLanguage } from '../../hooks/useLanguage';
import { useTheme } from '../../hooks/useTheme';

// Impoting the data for the languages and tools, and a "missing image" image for when an image is not found
import { languageData } from '../LanguagesData';
import { toolsData } from '../ToolsData';
import missingImage from '../../assets/missingimage.png';

// Importing different hooks and components from the React library, and different icons from the Heroicons library
import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { PauseIcon, PlayIcon, ChevronLeftIcon, ChevronRightIcon, DocumentTextIcon } from '@heroicons/react/24/solid';

// Interface for the project object
interface Project {
  title: { en: string; da: string };
  description: { en: string; da: string };
  video?: string;
  images: string[];
  languages: string[];
  tools?: string[]; // Add this line
  pdf?: string;
  github?: string;
}

// Interface for the ProjectModalProps
interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProject: Project | null;
  currentImageIndex: number;
  setCurrentImageIndex: (index: number) => void;
  isPaused: boolean;
  togglePause: () => void;
}

// Object to map the language and tools names to the correct names in the data
const NAME_MAPPING: { [key: string]: string } = {
  'react': 'React/React Native',
  'typescript': 'TypeScript',
  'javascript': 'JavaScript',
  'html': 'HTML',
  'css': 'CSS',
  'c': 'C',
  'csharp': 'C#',
  'cpp': 'C++',
  'sql': 'SQL',
  'assembly': 'Assembly',
  'mongodb': 'MongoDB',
  'python': 'Python',
  'clerk': 'Clerk',
  'vscode': 'Visual Studio Code',
  'cursor': 'Cursor AI',
  'postman': 'Postman',
  'figma': 'Figma',
  'git': 'GitHub',
  'gitlab': 'GitLab',
  'docker': 'Docker',
  'azure': 'Azure Data Studio',
};

// Function to get the logo URL for a language or tool
const getLogoUrl = (langItem: string): string => {
  const mappedName = NAME_MAPPING[langItem.toLowerCase()] || langItem;
  return languageData.find(lang => lang.name === mappedName)?.logoUrl || 
         toolsData.find(tool => tool.name === mappedName)?.logoUrl ||
         missingImage;
};

// Function to get the gradient color for the dots in the modal
const getGradientColor = (index: number, total: number, isDarkMode: boolean): string => {
  const startColor = isDarkMode ? { r: 255, g: 78, b: 80 } : { r: 119, g: 161, b: 211 };
  const endColor = isDarkMode ? { r: 249, g: 212, b: 35 } : { r: 230, g: 132, b: 174 };
  const ratio = index / (total - 1);
  return `rgb(${Math.round(startColor.r + (endColor.r - startColor.r) * ratio)}, ${Math.round(startColor.g + (endColor.g - startColor.g) * ratio)}, ${Math.round(startColor.b + (endColor.b - startColor.b) * ratio)})`;
};

// MediaWrapper component to display images and videos in the modal with a fade effect
const MediaWrapper: React.FC<{
  src: string;
  alt: string;
  type: 'image' | 'video';
  autoPlay?: boolean;
  onEnded?: () => void;
}> = ({ src, alt, type, autoPlay = true, onEnded }) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [isFading, setIsFading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  // Fade effect when changing the image or video in the modal
  useEffect(() => {
    if (currentSrc !== src) {
      setIsFading(true);
      setIsLoaded(false);
      const fadeTimer = setTimeout(() => {
        setCurrentSrc(src);
        setIsFading(false);

        if (type === 'video' && videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.play();
        }
      }, 300);

      return () => clearTimeout(fadeTimer);
    }
  }, [src, type, currentSrc]);

  return (
    <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden">
      <div
        className={`absolute inset-0 transition-opacity duration-300 z-10 ${isFading ? 'opacity-100' : 'opacity-0'}`}
        style={{ backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff' }}
      />
      {type === 'image' ? (
        <img
          src={currentSrc}
          alt={alt}
          className={`w-full h-full object-contain transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setIsLoaded(true)}
          loading="eager"
        />
      ) : (
        <video
          ref={videoRef}
          src={currentSrc}
          className="w-full h-full object-contain"
          playsInline
          autoPlay={autoPlay}
          onEnded={onEnded}
        />
      )}
    </div>
  );
};

// ProjectModal component to display the details of a project when a project is clicked on
const ProjectModal: React.FC<ProjectModalProps> = ({
  isOpen,
  onClose,
  selectedProject,
  currentImageIndex,
  setCurrentImageIndex,
  isPaused,
  togglePause,
}) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const { language } = useLanguage();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [hasPausedForVideo, setHasPausedForVideo] = useState(false);

  // Function to close the modal
  const handleClose = useCallback(() => {
    setIsModalVisible(false);
    setIsClosing(true);

    const timer = setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [onClose]);
 
  // Function to handle clicking on the dots to change the image in the modal
  const handleDotClick = useCallback((index: number) => {
    setCurrentImageIndex(index);
    if (!isPaused) {
      togglePause();
    }
  }, [isPaused, setCurrentImageIndex, togglePause]);

  // Function to handle the video ending
  const handleVideoEnd = useCallback(() => {
    togglePause();
  }, [togglePause]);

  // Functions to handle the left arrow button in the modal to go to the previous image or video
  const handlePrev = useCallback(() => {
    if (selectedProject) {
      const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : selectedProject.images.length - 1;
      setCurrentImageIndex(newIndex);
      if (!isPaused) {
        togglePause();
      }
    }
  }, [selectedProject, currentImageIndex, isPaused, setCurrentImageIndex, togglePause]);
  

  // Function to handle the right arrow button in the modal to go to the next image or video
  const handleNext = useCallback(() => {
    if (selectedProject) {
      const newIndex = currentImageIndex < selectedProject.images.length - 1 ? currentImageIndex + 1 : 0;
      setCurrentImageIndex(newIndex);
      if (!isPaused) {
        togglePause();
      }
    }
  }, [selectedProject, currentImageIndex, isPaused, setCurrentImageIndex, togglePause]);

  // useEffect to show the modal when it is opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setIsModalVisible(true);
      }, 10);
    }
  }, [isOpen]);

  // UseEffect that ensures the slideshow pauses when a video is displayed and resumes when an image is displayed.
  useEffect(() => {
    if (selectedProject && selectedProject.images[currentImageIndex]?.endsWith('.mp4') && !isPaused && !hasPausedForVideo) {
      togglePause();
      setHasPausedForVideo(true);
    } else if (selectedProject && !selectedProject.images[currentImageIndex]?.endsWith('.mp4')) {
      setHasPausedForVideo(false);
    }
  }, [currentImageIndex, selectedProject, isPaused, togglePause, hasPausedForVideo]);

  // useEffect that memoizes the modalContent to optimize performance by recomputing the content only when selectedProject changes. 
  const modalContent = useMemo(() => {
    if (!selectedProject) return null;

    // Check if the current item is a video
    const isCurrentItemVideo = selectedProject.images[currentImageIndex]?.endsWith('.mp4');

    // Programming languages and Tools used in the project
    const languages = selectedProject.languages;
    const tools = selectedProject.tools || [];

    return (
      <div
        className={`dark:bg-[#1a1a1a] bg-white rounded-lg p-6 max-w-md w-full transition-all duration-500 ease-in-out transform max-h-[80vh] min-h-[70vh] overflow-y-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4 dark:text-white text-gray-700 text-center">
          {selectedProject.title[language]}
        </h2>
        { /* Display the images or videos in the project */ }
        <div className="shadow-md animated-gradient-border w-full h-full mb-4">
          <MediaWrapper
            src={selectedProject.images[currentImageIndex]}
            alt={selectedProject.title[language]}
            type={isCurrentItemVideo ? 'video' : 'image'}
            autoPlay={isCurrentItemVideo}
            onEnded={handleVideoEnd}
          />
        </div>
        { /* Display the left arrow to navigate between images and videos */ }
        <div className="flex items-center justify-between mb-4">
          <div className="p-[2px] bg-gradient-to-r from-[#77a1d3] via-[#79cbca] to-[#e684ae] dark:from-[#FF4E50] dark:to-[#F9D423] rounded-md">
            <button
              className="bg-gray-50 dark:bg-[#222222] text-gray-700 dark:text-gray-300 p-2 rounded shadow-sm hover:bg-gray-100 dark:hover:bg-[#272727] transition-colors duration-200"
              onClick={handlePrev}
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center space-x-2">
          {selectedProject.images.map((_, index) => {
            const isActive = index === currentImageIndex;

            // Display the dots to navigate between images and videos
            return (
              <div
                key={index}
                className="relative w-2.5 h-2.5 rounded-full cursor-pointer transition-all duration-300 dots"
                onClick={() => handleDotClick(index)}
              >
                <div
                  className={`absolute inset-0 rounded-full transition-all duration-300 ${isActive ? 'opacity-100 scale-125' : 'opacity-0 scale-100'}`}
                  style={{ backgroundColor: getGradientColor(index, selectedProject.images.length, isDarkMode) }}
                />
                <div
                  className={`absolute inset-0 rounded-full transition-all duration-300 ${isActive ? 'opacity-0' : 'opacity-100'}`}
                  style={{ backgroundColor: 'rgb(200, 200, 200)' }}
                />
              </div>
            );
          })}
          </div>
          { /* Display the right arrow to navigate between images and videos */ }
          <div className="flex items-center space-x-2">
            <div className="p-[2px] bg-gradient-to-r from-[#77a1d3] via-[#79cbca] to-[#e684ae] dark:from-[#FF4E50] dark:to-[#F9D423] rounded-md">
              <button
                className="bg-gray-50 dark:bg-[#222222] text-gray-700 dark:text-gray-300 p-2 rounded shadow-sm hover:bg-gray-100 dark:hover:bg-[#272727] transition-colors duration-200"
                onClick={togglePause}
              >
                {isPaused ? <PlayIcon className="w-5 h-5" /> : <PauseIcon className="w-5 h-5" />}
              </button>
            </div>
            <div className="p-[2px] bg-gradient-to-r from-[#77a1d3] via-[#79cbca] to-[#e684ae] dark:from-[#FF4E50] dark:to-[#F9D423] rounded-md">
              <button
                className="bg-gray-50 dark:bg-[#222222] text-gray-700 dark:text-gray-300 p-2 rounded shadow-sm hover:bg-gray-100 dark:hover:bg-[#272727] transition-colors duration-200"
                onClick={handleNext}
              >
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        <p className="dark:text-white text-gray-800 text-center mb-4">
          {language === 'da' ? selectedProject.description.da : selectedProject.description.en}
        </p>
        { /* Display the languages and tools used in the project */ }
        <div className="flex flex-wrap justify-center items-center mt-4">
          <div className="flex flex-wrap justify-center items-center">
           {[...languages, ...tools].map((item, index) => (
              <div
                key={index}
                className="shadow-sm p-[2px] bg-gradient-to-r from-[#77a1d3] via-[#79cbca] to-[#e684ae] dark:from-[#FF4E50] dark:to-[#F9D423] rounded-lg mx-2 my-2"
              >
                <div className="bg-white dark:bg-[#1a1a1a] p-1 rounded-lg flex items-center justify-center w-10 h-10">
                  <img
                    src={getLogoUrl(item)}
                    alt={item}
                    className="w-6 h-6"
                    onError={(e) => {
                      e.currentTarget.src = missingImage;
                      e.currentTarget.alt = 'Image not found';
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          { /* Display the PDF and GitHub links if they exist */ }
          <div className="w-full flex justify-center items-center space-x-4 mt-4">
            {selectedProject.pdf && (
              <div className="p-[2px] bg-gradient-to-r from-[#77a1d3] via-[#79cbca] to-[#e684ae] dark:from-[#FF4E50] dark:to-[#F9D423] rounded-md">
                <button
                  className="shadow-sm px-[18px] py-2 rounded bg-gray-50 dark:bg-[#222222] text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#272727] transition-colors duration-200 flex items-center"
                  onClick={() => window.open(selectedProject.pdf, '_blank')}
                >
                  <DocumentTextIcon className="w-5 h-[28px] mx-2" />
                </button>
              </div>
            )}
            {selectedProject.github && (
              <div className="p-[2px] bg-gradient-to-r from-[#77a1d3] via-[#79cbca] to-[#e684ae] dark:from-[#FF4E50] dark:to-[#F9D423] rounded-md">
                <button
                  className="shadow-sm px-4 py-2.5 rounded bg-gray-50 dark:bg-[#222222] text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#272727] transition-colors duration-200 flex items-center"
                  onClick={() => window.open(selectedProject.github, '_blank')}
                >
                  <DocumentTextIcon className="w-5 h-[24px] mx-2" />
                </button>
              </div>
            )}
            { /* Display the close button */ }
            <div className="p-[2px] bg-gradient-to-r from-[#77a1d3] via-[#79cbca] to-[#e684ae] dark:from-[#FF4E50] dark:to-[#F9D423] rounded-md">
              <button
                className="shadow-sm px-4 py-2.5 rounded bg-gray-50 dark:bg-[#222222] text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#272727] transition-colors duration-200 flex items-center"
                onClick={handleClose}
              >
                <span className="mx-2">{language === 'da' ? 'Luk' : 'Close'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }, [selectedProject, currentImageIndex, isDarkMode, language, isPaused, handleDotClick, handleClose, togglePause, handleNext, handlePrev, handleVideoEnd]);

  if (!isOpen && !isClosing) return null;

  // The modal itself
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-y-auto transition-opacity duration-500 ease-in-out ${isModalVisible && !isClosing ? 'opacity-100' : 'opacity-0'}`}
      onClick={handleClose}
    >
      <div className={`bg-gradient-to-r from-[#77a1d3] via-[#79cbca] to-[#e684ae] dark:from-[#FF4E50] dark:to-[#F9D423] rounded-lg mt-5 p-[2px] mx-4 sm:mx-0 my-8 ${selectedProject?.languages && selectedProject.languages.length > 5 ? 'max-w-lg' : 'max-w-md'}`}>
        {modalContent}
      </div>
    </div>
  );
};

export default ProjectModal;