import { useLanguage } from '../../context/LanguageContext'
import profilePic from '../../assets/mads.jpg'

export default function About() {
  const { language } = useLanguage()

  return (
    <section id="about" className="min-h-screen flex items-center justify-center px-8 sm:justify-start sm:px-16 md:px-24 lg:px-32 transition-all duration-300 pt-16">
      <div className="text-left max-w-3xl transition-all duration-300">
        <h2 className="text-5xl sm:text-6xl font-bold mb-12 text-gray-800 dark:text-white">
          {language === 'da' ? 'Om mig' : 'About me'}
        </h2>
        
        <div className="flex flex-col gap-12">
          <div className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 space-y-6 max-w-[350px] sm:max-w-[450px] lg+:max-w-[700px] transition-all duration-300">
            {language === 'da' ? (
              <>
                <p>
                  Hej! Jeg hedder Mads. Jeg er i øjeblikket softwareingeniørstuderende på Aarhus Universitet, 
                  hvor jeg specialiserer mig i webudvikling og softwarearkitektur.
                </p>
                <p>
                Min rejse inden for software og hardware begyndte med en tidlig fascination af teknologi. 
                Jeg husker tydeligt, hvordan jeg som 8-årig sparede sammen i to år for at købe min første computer, 
                og kort tid efter blev jeg dybt interesseret i at udvikle de ting, jeg oplevede på skærmen. Siden 
                da har jeg arbejdet med forskellige teknologier og frameworks, og har nu særligt fokuseret på React 
                og moderne frontend-udvikling, da det er det område, jeg brænder mest for.
                </p>
                <p>
                  Ved siden af mit studie arbejder jeg på forskellige personlige projekter, 
                  hvor jeg eksperimenterer med nye teknologier og forbedrer mine færdigheder. 
                  Denne hjemmeside er et af disse projekter!
                </p>
              </>
            ) : (
              <>
                <p>
                  Hi! I'm Mads. I'm currently a software engineering student at Aarhus University, 
                  specializing in web development and software architecture.
                </p>
                <p>
                  My journey into software and hardware began with an early fascination with technology. 
                  I vividly remember how, as an 8-year-old, I saved up for two years to buy my first computer, 
                  and shortly after, I became deeply interested in developing the things I experienced on the screen. 
                  Since then, I have worked with various technologies and frameworks, and have now focused particularly 
                  on React and modern frontend development, as it is the area I am most passionate about.
                </p>
                <p>
                  Alongside my studies, I work on various personal projects, 
                  where I experiment with new technologies and improve my skills. 
                  This website is one of those projects!
                </p>
              </>
            )}
          </div>

          <div className="relative max-w-[300px] sm:max-w-[350px] lg+:max-w-[400px] mx-auto aspect-square transition-all duration-300 z-0 group">
            <div className="shadow-lg animated-gradient-border">
              <div className="relative w-full h-full rounded-xl overflow-hidden">
                <img 
                  src={profilePic} 
                  alt="Mads Villadsen" 
                  className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-[0.3]"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-xl font-bold">
                    {language === 'da' ? 'Hej Verden!' : 'Hello World!'} 🎉
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}