// ThemeProvider | This component is used to provide the theme context to its children
// Importing useState, useEffect, and the ThemeContext
import React, { useState, useEffect } from 'react';
import { ThemeContext } from './themeContext';

// Defining the Theme types (light and dark)
type Theme = 'light' | 'dark';

// ThemeProvider component to provide theme context to its children
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Set initial theme based on user's system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Listen for changes in system theme preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light');
    };

    // Listen for changes in the system theme preference
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Update the theme class on the html
  useEffect(() => {
    // Toggle the 'dark' class on the html element based on the theme
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>;
}

export default ThemeProvider;