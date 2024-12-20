// Home | This component is used to display the home section of the website (the first part the user sees when they enter the website)
// Importing different hooks and components from the React library
import { useEffect, useState } from 'react';

// Importing useLanguage and AnimatedText from the context and components folders used for managing the language and animating the text
import { useLanguage } from '../../hooks/useLanguage';
import AnimatedText from '../AnimatedText';

// Home component
export default function Home() {
  const { language } = useLanguage();
  const [displayedText, setDisplayedText] = useState('');
  const fullText = 'Mads Villadsen';
  const [dotPosition, setDotPosition] = useState(0);

  // Typing effect which types out the full name (Mads Villadsen)
  useEffect(() => {
    setDisplayedText(''); // Reset displayedText at the start of the effect to avoid the text already being displayed
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayedText(fullText.substring(0, index)); // Typing effect
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100); // Typing speed

    return () => clearInterval(interval);
  }, [fullText]);

  // Blinking dot effect
  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDotPosition((prev) => (prev === 0 ? 1 : 0)); // Alternate position every 3 seconds
    }, 1500);

    return () => clearInterval(dotInterval);
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-8 sm:justify-start sm:px-16 md:px-24 lg:px-32 transition-all duration-300 pt-0"
    >
      <div className="text-left max-w-3xl transition-all duration-300">
        <AnimatedText className="text-gray-800 dark:text-white font-bold text-3xl sm:text-4xl lg+:text-5xl mb-4 transition-all duration-300">
          {language === 'da' ? 'Velkommen! Jeg hedder' : 'Hey there! My name is'}
        </AnimatedText>
        <h1 className="leading-tight font-bold mb-6 transition-all duration-300">
          <div className="bg-gradient-to-r from-[#77a1d3] via-[#79cbca] to-[#e684ae] dark:from-[#FF4E50] dark:to-[#F9D423] text-transparent bg-clip-text">
            <span className="text-7xl md:text-8xl lg+:text-[10rem] block transition-all duration-300">
              {/* Dynamic rendering with manual break */}
              <span className="inline-block">
                {displayedText.split(' ')[0]}
              </span>
              {displayedText.length > 4 && <br />} {/* Break after 'Mads' */}
              <span className="inline-block">
                {displayedText.split(' ')[1] || ''}
                {displayedText === fullText && (
                  <span
                    className={`inline-block transition-opacity duration-150 ${
                      dotPosition === 0 ? 'opacity-0' : 'opacity-100'
                    }`}
                    style={{ color: '#F9D423 dark:color-[#FF4E50]' }}
                  >
                    .
                  </span>
                )}
              </span>
            </span>
          </div>
        </h1>
        { /* Displaying the text before and after the name with the AnimatedText component */}
        <div className="text-gray-800 dark:text-white font-bold text-2xl sm:text-3xl lg+:text-4xl space-y-2">
          <AnimatedText className="block transition-all duration-300">
            {language === 'da'
              ? 'Softwareingenørstuderende'
              : 'Software Engineering Student'}
          </AnimatedText>
          <AnimatedText className="block transition-all duration-300">
            {language === 'da'
              ? 'ved Aarhus Universitet'
              : 'at Aarhus University'}
          </AnimatedText>
        </div>
      </div>
    </section>
  );
}