// Footer | This component is used to display the footer of the website
function Footer() {
  return (
    <section id="footer" className="items-center justify-center xs:px-32 sm:px-16 md:px-24 lg:px-32 transition-all duration-300 pt-8 pb-2 opacity-50">
      <div className="text-sm w-full max-w-[350px] sm:max-w-[450px] lg+:max-w-[700px] text-center transition-all duration-300 dark:text-gray-300 text-gray-600 cursor-default ">
        <h1>Copyright © 2024 Mads Villadsen</h1>
        <p className="mt-1">
          Built with <span className="inline dark:hidden">🩵</span><span className="hidden dark:inline">🧡</span> using 
          <a href="https://vite.dev/" target="_blank" rel="noopener noreferrer" className="link"> React + Vite </a> 
          and 
          <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer" className="link"> Tailwind CSS</a>
        </p>
      </div>
    </section>
  );
}

export default Footer;