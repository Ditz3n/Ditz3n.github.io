import { useLanguage } from '../../context/LanguageContext'

const Contact = () => {
  const { language } = useLanguage()

  return (
    <section id="contact" className="flex items-center justify-center px-8 sm:justify-start sm:px-16 md:px-24 lg:px-32 transition-all duration-300 pt-8 xs:pb-16 md:pb-32">
      <div className="text-left max-w-3xl transition-all duration-300">
        <h2 className="text-5xl md:text-6xl font-bold mb-12 text-gray-800 dark:text-white">
          {language === 'da' ? 'Kontakt' : 'Contact'}
        </h2>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-[350px] sm:max-w-[450px] lg+:max-w-[700px] transition-all duration-300">
          {language === 'da' ? 'Skulle du have lyst til at kontakte mig, kan dette gøres på disse platforme:' : 'If you would like to contact me, you can do so on these platforms:'}
        </p>
        <div className="flex flex-col xs:grid xs:grid-cols-5 md:flex md:flex-col gap-4 rounded sm:min-w-[450px] lg+:min-w-[700px]">
   
          {/* LinkedIn */}
          <div className="p-[2px] rounded-md bg-gradient-to-r from-[#77a1d3] via-[#79cbca] to-[#e684ae] dark:from-[#FF4E50] dark:to-[#F9D423]">
            <button
              type="button"
              onClick={() => window.open("https://www.linkedin.com/in/mads-villadsen-880792288/", "_blank")}
              className="flex items-center justify-center w-full h-full bg-gray-50 dark:bg-[#222222] text-gray-800 dark:text-white rounded-[5px] px-4 py-2 text-xs font-medium uppercase leading-normal shadow-md focus:outline-none focus:ring-0 box-border transition-all duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-[#272727]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
              </svg>
              <span className="hidden md:block ml-2">LinkedIn</span>
            </button>
          </div>

          {/* Facebook */}
          <div className="p-[2px] rounded-md bg-gradient-to-r from-[#77a1d3] via-[#79cbca] to-[#e684ae] dark:from-[#FF4E50] dark:to-[#F9D423]">
            <button
              type="button"
              onClick={() => window.open("https://www.facebook.com/Ditz3n/?locale=da_DK", "_blank")}
              className="flex items-center justify-center w-full h-full bg-gray-50 dark:bg-[#222222] text-gray-800 dark:text-white rounded-[5px] px-4 py-2 text-xs font-medium uppercase leading-normal shadow-md focus:outline-none focus:ring-0 box-border transition-all duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-[#272727]"
            >
            <div className="flex items-center justify-center md:flex-row md:space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
              <span className="hidden md:block">Facebook</span>
            </div>
          </button>
          </div>

          {/* GitHub */}
          <div className="p-[2px] rounded-md bg-gradient-to-r from-[#77a1d3] via-[#79cbca] to-[#e684ae] dark:from-[#FF4E50] dark:to-[#F9D423]">
            <button
              type="button"
              onClick={() => window.open("https://github.com/Ditz3n", "_blank")}
              className="flex items-center justify-center w-full h-full bg-gray-50 dark:bg-[#222222] text-gray-800 dark:text-white rounded-[5px] px-4 py-2 text-xs font-medium uppercase leading-normal shadow-md focus:outline-none focus:ring-0 box-border transition-all duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-[#272727]"
            >
            <div className="flex items-center justify-center md:flex-row md:space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span className="hidden md:block">GitHub</span>
            </div>
          </button>
          </div>

          {/* Discord */}
          <div className="p-[2px] rounded-md bg-gradient-to-r from-[#77a1d3] via-[#79cbca] to-[#e684ae] dark:from-[#FF4E50] dark:to-[#F9D423]">
            <button
              type="button"
              onClick={() => window.open("https://discordlookup.com/user/225262706486149120", "_blank")}
              className="flex items-center justify-center w-full h-full bg-gray-50 dark:bg-[#222222] text-gray-800 dark:text-white rounded-[5px] px-4 py-2 text-xs font-medium uppercase leading-normal shadow-md focus:outline-none focus:ring-0 box-border transition-all duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-[#272727]"
            >
            <div className="flex items-center justify-center md:flex-row md:space-x-2">
              <svg
                className="h-4 w-4"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M19.54 0c1.356 0 2.46 1.104 2.46 2.472v21.528l-2.58-2.28-1.452-1.344-1.536-1.428.636 2.22h-13.608c-1.356 0-2.46-1.104-2.46-2.472v-16.224c0-1.368 1.104-2.472 2.46-2.472h16.08zm-4.632 15.672c2.652-.084 3.672-1.824 3.672-1.824 0-3.864-1.728-6.996-1.728-6.996-1.728-1.296-3.372-1.26-3.372-1.26l-.168.192c2.04.624 2.988 1.524 2.988 1.524-1.248-.684-2.472-1.02-3.612-1.152-.864-.096-1.692-.072-2.424.024l-.204.024c-.42.036-1.44.192-2.724.756-.444.204-.708.348-.708.348s.996-.948 3.156-1.572l-.12-.144s-1.644-.036-3.372 1.26c0 0-1.728 3.132-1.728 6.996 0 0 1.008 1.74 3.66 1.824 0 0 .444-.54.804-.996-1.524-.456-2.1-1.416-2.1-1.416l.336.204.048.036.047.027.014.006.047.027c.3.168.6.3.876.408.492.192 1.08.384 1.764.516.9.168 1.956.228 3.108.012.564-.096 1.14-.264 1.74-.516.42-.156.888-.384 1.38-.708 0 0-.6.984-2.172 1.428.36.456.792.972.792.972zm-5.58-5.604c-.684 0-1.224.6-1.224 1.332 0 .732.552 1.332 1.224 1.332.684 0 1.224-.6 1.224-1.332.012-.732-.54-1.332-1.224-1.332zm4.38 0c-.684 0-1.224.6-1.224 1.332 0 .732.552 1.332 1.224 1.332.684 0 1.224-.6 1.224-1.332s-.644-1.332-1.224-1.332z" />
              </svg>
              <span className="hidden md:block">Discord</span>
            </div>
          </button>
          </div>

          {/* Reddit */}
          <div className="p-[2px] rounded-md bg-gradient-to-r from-[#77a1d3] via-[#79cbca] to-[#e684ae] dark:from-[#FF4E50] dark:to-[#F9D423]">
            <button
              type="button"
              onClick={() => window.open("https://www.reddit.com/user/Ditz3n", "_blank")}
              className="flex items-center justify-center w-full h-full bg-gray-50 dark:bg-[#222222] text-gray-800 dark:text-white rounded-[5px] px-4 py-2 text-xs font-medium uppercase leading-normal shadow-md focus:outline-none focus:ring-0 box-border transition-all duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-[#272727]"
            >
              <div className="flex items-center justify-center md:flex-row md:space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 512 512"
                  className="h-4 w-4"
                >
                  <path d="M373 138.6c-25.2 0-46.3-17.5-51.9-41l0 0c-30.6 4.3-54.2 30.7-54.2 62.4l0 .2c47.4 1.8 90.6 15.1 124.9 36.3c12.6-9.7 28.4-15.5 45.5-15.5c41.3 0 74.7 33.4 74.7 74.7c0 29.8-17.4 55.5-42.7 67.5c-2.4 86.8-97 156.6-213.2 156.6S45.5 410.1 43 323.4C17.6 311.5 0 285.7 0 255.7c0-41.3 33.4-74.7 74.7-74.7c17.2 0 33 5.8 45.7 15.6c34-21.1 76.8-34.4 123.7-36.4l0-.3c0-44.3 33.7-80.9 76.8-85.5C325.8 50.2 347.2 32 373 32c29.4 0 53.3 23.9 53.3 53.3s-23.9 53.3-53.3 53.3zM157.5 255.3c-20.9 0-38.9 20.8-40.2 47.9s17.1 38.1 38 38.1s36.6-9.8 37.8-36.9s-14.7-49.1-35.7-49.1zM395 303.1c-1.2-27.1-19.2-47.9-40.2-47.9s-36.9 22-35.7 49.1c1.2 27.1 16.9 36.9 37.8 36.9s39.3-11 38-38.1zm-60.1 70.8c1.5-3.6-1-7.7-4.9-8.1c-23-2.3-47.9-3.6-73.8-3.6s-50.8 1.3-73.8 3.6c-3.9 .4-6.4 4.5-4.9 8.1c12.9 30.8 43.3 52.4 78.7 52.4s65.8-21.6 78.7-52.4z" />
                </svg>
                <span className="hidden md:block">Reddit</span>
              </div>
            </button>
          </div>
          
          {/* Email */}
          <div className="p-[2px] rounded-md bg-gradient-to-r from-[#77a1d3] via-[#79cbca] to-[#e684ae] dark:from-[#FF4E50] dark:to-[#F9D423]">
            <button
              type="button"
              onClick={() => window.location.href = "mailto:mvmads@gmail.com"}
              className="flex items-center justify-center w-full h-full bg-gray-50 dark:bg-[#222222] text-gray-800 dark:text-white rounded-[5px] px-4 py-2 text-xs font-medium uppercase leading-normal shadow-md focus:outline-none focus:ring-0 box-border transition-all duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-[#272727]"
            >
              <div className="flex items-center justify-center md:flex-row md:space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 4H4C2.9 4 2 4.9 2 6v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"/>
                </svg>
                <span className="hidden md:block">Email</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 