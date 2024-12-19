// useTheme.ts | This component is used to manage the theme of the website
// Importing the useContext hook from the React library
import { useContext } from 'react';
import { ThemeContext } from '../context/themeContext';

// useTheme hook to manage the theme state
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}