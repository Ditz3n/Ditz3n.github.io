// LoadingScreen | This component is used to display a loading screen with an animation before entering the website
// Importing the cardio animation from the ldrs package
import { cardio } from 'ldrs';

// Registering the cardio animation
cardio.register();

// Declaring the LoadingScreen component
const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <l-cardio
        size="50" // The size of the animation
        stroke="4" // The thickness of the animation
        speed="1.2" // The speed of the animation
        color="gray" // The color of the animation
      ></l-cardio>
    </div>
  );
};

export default LoadingScreen;