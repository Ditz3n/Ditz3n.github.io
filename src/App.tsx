// App | Main component of the application

// Importing a lot of stuff from React and other files to use in the App component
import { useEffect, useState, useCallback } from 'react';
import LoadingScreen from './components/LoadingScreen';
import SectionNavigation from './components/SectionNavigation';
import Home from './components/sections/Home';
import About from './components/sections/About';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import { TailwindIndicator } from './components/TailwindIndicator';
import ProjectModal from './components/sections/ProjectModal';
import Contact from './components/sections/Contact';
import Footer from './components/sections/Footer';
import electronicCarVideo from './assets/project/electronic_car/electronic_car7.mp4';

// Interface for the Project object
interface Project {
  title: { en: string; da: string };
  description: { en: string; da: string };
  video?: string;
  images: string[];
  languages: string[];
  pdf?: string;
}

// Main App component
function App() {
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // useEffect hook to set a timer to remove the loading screen after 2400ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2400);
    return () => clearTimeout(timer);
  }, []);

  // Function to set the next image in the project modal
  const handleNextImage = useCallback(() => {
    if (selectedProject) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % selectedProject.images.length);
    }
  }, [selectedProject]);

  // useEffect hook to handle the automatic image change in the project modal
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!isPaused && selectedProject) {
      interval = setInterval(() => {
        handleNextImage();
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isPaused, selectedProject, handleNextImage]);

  // useEffect hook to handle the overflow of the body when the modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isModalOpen]);

  // useEffect hook to preload the videos in the project modals because they would not play otherwise
  // I had to do this because the videos would not play in the modal on slower devices if they were not preloaded
  useEffect(() => {
    const preloadVideos = () => {
      const videos = [electronicCarVideo];
      videos.forEach((videoSrc) => {
        const video = document.createElement('video');
        video.src = videoSrc;
        video.preload = 'auto';
        video.load();
      });
    };

    preloadVideos();
  }, []);

  // Function to open the modal with the selected project and the initial image index
  const openModal = (project: Project, initialIndex: number) => {
    setSelectedProject(project);
    setCurrentImageIndex(initialIndex);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  // Function to handle the previous image in the project modal
  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  return (
    <div className="w-full min-h-screen bg-white dark:bg-[#1a1a1a] transition-colors duration-300 overflow-x-hidden">
      {loading ? (
        <LoadingScreen />
      ) : (
        <div className={`opacity-100 transition-opacity duration-300`}>
          <div className="fixed top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-[#77a1d3] via-[#79cbca] to-[#e684ae] dark:from-[#FF4E50] dark:to-[#F9D423] z-40 animate-gradient"></div>
          <div className="pt-[4px]">
            <div className="flex">
              {/* Main content of the application */}
              <main className="flex-1 overflow-y-auto md:pb-0 pb-24">
                <Home />
                <About />
                <Experience />
                <Projects openModal={openModal} />
                <Contact />
                <Footer />
                <ProjectModal
                  isOpen={isModalOpen}
                  onClose={closeModal}
                  selectedProject={selectedProject}
                  currentImageIndex={currentImageIndex}
                  setCurrentImageIndex={setCurrentImageIndex}
                  isPaused={isPaused}
                  togglePause={togglePause}
                />
              </main>
              <SectionNavigation />
              {/* Tailwind CSS indicator which can only be seen in development */}
              <TailwindIndicator />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;