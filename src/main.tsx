// Main | This file is the entry point of the application
// Importing the StrictMode, createRoot, LanguageProvider, and ThemeProvider components, along with the App component and the CSS file
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { LanguageProvider } from './context/LanguageProvider';
import { ThemeProvider } from './context/ThemeProvider';

// Render the app
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>,
);