import { useEffect, useState } from 'react';
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

interface Project {
  title: { en: string; da: string };
  description: { en: string; da: string };
  video?: string;
  images: string[];
  languages: string[];
  pdf?: string;
}

function App() {
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!isPaused && selectedProject) {
      interval = setInterval(() => {
        handleNextImage();
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isPaused, selectedProject]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isModalOpen]);

  useEffect(() => {
    // Preload videos
    const preloadVideos = () => {
      const videos = [
        electronicCarVideo,
      ];
      videos.forEach((videoSrc) => {
        const video = document.createElement('video');
        video.src = videoSrc;
        video.preload = 'auto';
        video.load();
      });
    };

    preloadVideos();
  }, []);

  const openModal = (project: Project, initialIndex: number) => {
    setSelectedProject(project);
    setCurrentImageIndex(initialIndex);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  const handleNextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % selectedProject.images.length);
    }
  };

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
              <TailwindIndicator />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;