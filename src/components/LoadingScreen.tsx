import { cardio } from 'ldrs'; // Importerer cardio animationen fra ldr.

cardio.register(); // Registrerer cardio animationen.

const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <l-cardio
        size="50" // Animationens størrelse
        stroke="4" // Animationens tykkelse
        speed="1.2" // Animationens hastighed
        color="gray"
      ></l-cardio>
    </div>
  );
};

export default LoadingScreen; // Exporterer LoadingScreen.