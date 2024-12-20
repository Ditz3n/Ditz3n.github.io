// Footer | This component is used to display the footer of the website
import { useLanguage } from '../../hooks/useLanguage';

function Footer() {
  const { language } = useLanguage();

  return (
    <section id="footer" className="flex items-center justify-center px-4 sm:px-16 md:px-24 lg:px-32 transition-all duration-300 pt-8 pb-2 opacity-50">
      <div className="text-sm w-full max-w-[350px] sm:min-w-[450px] lg+:min-w-[700px] text-center transition-all duration-300 dark:text-gray-300 text-gray-600 cursor-default">
        <h1>Copyright © 2024 Mads Villadsen</h1>
        <p className="mt-1">
          {language === 'da' ? 'Bygget med' : 'Built with'} <span className="inline dark:hidden">🤍</span><span className="hidden dark:inline">🧡</span> {language === 'da' ? 'ved hjælp af' : 'using'} 
          <a href="https://vite.dev/" target="_blank" rel="noopener noreferrer" className="link"> React + Vite </a> 
          {language === 'da' ? 'og' : 'and'} 
          <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer" className="link"> Tailwind CSS</a>
        </p>
      </div>
    </section>
  );
}

export default Footer;