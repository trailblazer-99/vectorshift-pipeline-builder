import React, { useEffect } from 'react';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

import { useStore } from './store';

function App() {
  const darkMode = useStore((state) => state.darkMode);
  const themeMode = useStore((state) => state.themeMode);
  const updateEffectiveTheme = useStore((state) => state.updateEffectiveTheme);

  // Synchronize with system theme preferences if in 'system' mode
  useEffect(() => {
    updateEffectiveTheme();

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = () => {
      updateEffectiveTheme();
    };

    // Support both older and modern browsers for matchMedia events
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleSystemThemeChange);
    } else {
      mediaQuery.addListener(handleSystemThemeChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleSystemThemeChange);
      } else {
        mediaQuery.removeListener(handleSystemThemeChange);
      }
    };
  }, [themeMode, updateEffectiveTheme]);

  return (
    <div className={`app-container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
    </div>
  );
}

export default App;
