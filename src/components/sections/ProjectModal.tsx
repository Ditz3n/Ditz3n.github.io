import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { PauseIcon, PlayIcon, ChevronLeftIcon, ChevronRightIcon, DocumentTextIcon } from '@heroicons/react/24/solid';
import { useLanguage } from '../../context/LanguageContext';
import { languageLogos, toolsLogos } from '../Languages';

interface Project {
  title: { en: string; da: string };
  description: { en: string; da: string };
  video?: string;
  images: string[];
  languages: string[];
  pdf?: string;
}

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProject: Project | null;
  currentImageIndex: number;
  setCurrentImageIndex: (index: number) => void;
  isPaused: boolean;
  togglePause: () => void;
}

const getGradientColor = (index: number, total: number, isDarkMode: boolean): string => {
  const startColor = isDarkMode ? { r: 255, g: 78, b: 80 } : { r: 119, g: 161, b: 211 };
  const endColor = isDarkMode ? { r: 249, g: 212, b: 35 } : { r: 230, g: 132, b: 174 };
  const ratio = index / (total - 1);
  return `rgb(${Math.round(startColor.r + (endColor.r - startColor.r) * ratio)}, ${Math.round(startColor.g + (endColor.g - startColor.g) * ratio)}, ${Math.round(startColor.b + (endColor.b - startColor.b) * ratio)})`;
};

const MediaWrapper = ({
  src,
  alt,
  onClick,
  type,
  autoPlay = true,
  onEnded,
}: {
  src: string;
  alt: string;
  onClick: () => void;
  type: 'image' | 'video';
  autoPlay?: boolean;
  onEnded?: () => void;
}) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [isFading, setIsFading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(document.documentElement.classList.contains('dark'));
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (currentSrc !== src) {
      setIsFading(true);
      setIsLoaded(false);
      const fadeTimer = setTimeout(() => {
        setCurrentSrc(src);
        setIsFading(false);

        // For video, reset play state and auto-play
        if (type === 'video' && videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.play();
        }
      }, 300);

      return () => clearTimeout(fadeTimer);
    }
  }, [src, type]);

  useEffect(() => {
    const handleThemeChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', handleThemeChange);

    return () => mediaQuery.removeEventListener('change', handleThemeChange);
  }, []);

  return (
    <div className="relative w-full h-[350px] rounded-xl overflow-hidden">
      <div
        className={`absolute inset-0 transition-opacity duration-300 z-10 ${isFading ? 'opacity-100' : 'opacity-0'}`}
        style={{ backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff' }}
      />
      {type === 'image' ? (
        <img
          src={currentSrc}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 cursor-pointer ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onClick={onClick}
          onLoad={() => setIsLoaded(true)}
          loading="eager"
          style={{ aspectRatio: '4/3' }}
        />
      ) : (
        <video
          ref={videoRef}
          src={currentSrc}
          className="w-full h-full object-cover cursor-pointer"
          onClick={onClick}
          playsInline
          autoPlay={autoPlay}
          style={{ aspectRatio: '4/3' }}
          onEnded={onEnded}
        />
      )}
    </div>
  );
};

const ProjectModal: React.FC<ProjectModalProps> = ({
  isOpen,
  onClose,
  selectedProject,
  currentImageIndex,
  setCurrentImageIndex,
  isPaused,
  togglePause,
}) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(document.documentElement.classList.contains('dark'));
  const { language } = useLanguage();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [hasPausedForVideo, setHasPausedForVideo] = useState(false);

  const handleClose = useCallback(() => {
    setIsModalVisible(false);
    setIsClosing(true);

    const timer = setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [onClose]);

  const handleDotClick = useCallback((index: number) => {
    setCurrentImageIndex(index);
    if (!isPaused) {
      togglePause();
    }
  }, [isPaused, setCurrentImageIndex, togglePause]);

  const handleMediaInteraction = () => {
    if (!isVideoPlaying) {
      togglePause();
    }
  };

  const handleVideoEnd = () => {
    setIsVideoPlaying(false);
    togglePause();
  };

  const handlePrev = () => {
    if (selectedProject) {
      const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : selectedProject.images.length - 1;
      setCurrentImageIndex(newIndex);
      if (!isPaused) {
        togglePause();
      }
    }
  };

  const handleNext = () => {
    if (selectedProject) {
      const newIndex = currentImageIndex < selectedProject.images.length - 1 ? currentImageIndex + 1 : 0;
      setCurrentImageIndex(newIndex);
      if (!isPaused) {
        togglePause();
      }
    }
  };

  useEffect(() => {
    const handleThemeChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', handleThemeChange);

    return () => mediaQuery.removeEventListener('change', handleThemeChange);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setIsModalVisible(true);
      }, 10);
    }
  }, [isOpen]);

  // Pause when the video is shown
  useEffect(() => {
    if (selectedProject && selectedProject.images[currentImageIndex]?.endsWith('.mp4') && !isPaused && !hasPausedForVideo) {
      togglePause();
      setHasPausedForVideo(true);
    } else if (selectedProject && !selectedProject.images[currentImageIndex]?.endsWith('.mp4')) {
      setHasPausedForVideo(false);
    }
  }, [currentImageIndex, selectedProject, isPaused, togglePause, hasPausedForVideo]);

  const modalContent = useMemo(() => {
    if (!selectedProject) return null;

    const isCurrentItemVideo = selectedProject.images[currentImageIndex]?.endsWith('.mp4');
    const languages = selectedProject.languages;

    return (
      <div
        className={`dark:bg-[#1a1a1a] bg-white rounded-lg p-6 max-w-md w-full transition-all duration-500 ease-in-out transform ${languages && languages.length > 5 ? 'max-h-[80vh] min-h-[70vh] overflow-y-auto' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4 dark:text-white text-gray-700 text-center">
          {selectedProject.title[language]}
        </h2>
        <div className="shadow-md animated-gradient-border w-full h-full mb-4">
          <MediaWrapper
            src={selectedProject.images[currentImageIndex]}
            alt={selectedProject.title[language]}
            onClick={handleMediaInteraction}
            type={isCurrentItemVideo ? 'video' : 'image'}
            autoPlay={isCurrentItemVideo}
            onEnded={handleVideoEnd}
          />
        </div>
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

              return (
                <div
                  key={index}
                  className="relative w-2.5 h-2.5 rounded-full cursor-pointer transition-all duration-300"
                  onClick={() => handleDotClick(index)} // Click a dot to navigate
                >
                  <div
                    className={`absolute inset-0 rounded-full transition-all duration-300 ${
                      isActive ? 'opacity-100 scale-125' : 'opacity-0 scale-100'
                    }`}
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
        <p className="dark:text-white text-gray-700 text-center mb-4">
          {language === 'da' ? selectedProject.description.da : selectedProject.description.en}
        </p>
        <div className={`flex flex-wrap justify-center items-center mt-4`}>
          <div className={`flex flex-wrap justify-center items-center`}>
            {languages.map((language, index) => (
              <div
                key={index}
                className="shadow-sm p-[2px] bg-gradient-to-r from-[#77a1d3] via-[#79cbca] to-[#e684ae] dark:from-[#FF4E50] dark:to-[#F9D423] rounded-lg hover:scale-105 transition-transform duration-300 mx-2 my-2"
              >
                <div className="bg-white dark:bg-[#1a1a1a] p-1 rounded-lg flex items-center justify-center w-10 h-10">
                  <img
                    src={languageLogos[language as keyof typeof languageLogos] || toolsLogos[language as keyof typeof toolsLogos]}
                    alt={language}
                    className="w-6 h-6"
                    onError={(e) => {
                      e.currentTarget.src = '/path/to/default-logo.png';
                      e.currentTarget.alt = 'Image not found';
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
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
  }, [selectedProject, currentImageIndex, isDarkMode, language, isPaused, handleDotClick, handleClose, togglePause, isVideoPlaying]);

  if (!isOpen && !isClosing) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-y-auto transition-opacity duration-500 ease-in-out ${isModalVisible && !isClosing ? 'opacity-100' : 'opacity-0'}`}
      onClick={handleClose}
    >
      <div className={`bg-gradient-to-r from-[#77a1d3] via-[#79cbca] to-[#e684ae] dark:from-[#FF4E50] dark:to-[#F9D423] rounded-lg p-[2px] mx-4 sm:mx-0 my-8 ${selectedProject?.languages && selectedProject.languages.length > 5 ? 'max-w-lg' : 'max-w-md'}`}>
        {modalContent}
      </div>
    </div>
  );
};

export default ProjectModal;