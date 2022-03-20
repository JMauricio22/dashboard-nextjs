import { useState, useEffect } from 'react';
import { Switch } from '@headlessui/react';
import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from '@heroicons/react/solid';

function DarkModeButton() {
  const { theme, setTheme } = useTheme();
  const [enabled, setEnabled] = useState(false);

  const toggleTheme = (dark: boolean) => {
    setTheme(dark ? 'dark' : 'light');
    setEnabled(dark);
  };

  useEffect(() => {
    setEnabled(theme === 'dark');
  }, []);

  return (
    <Switch
      checked={enabled}
      onChange={toggleTheme}
      className={`${
        enabled ? 'bg-gray-700' : 'bg-gray-700'
      } relative inline-flex items-center h-7 rounded-full w-16 mr-3 overflow-hidden`}
    >
      <span className="sr-only">Enable DarkMode</span>
      <span
        className={`transform transition ease-in-out duration-200 z-20 ${
          enabled ? 'translate-x-9 bg-gray-500' : 'translate-x-1 bg-white'
        } inline-block w-6 h-6 transform rounded-full`}
       />

      {theme === 'dark' ? (
        <span
          className={`absolute left-1 z-10
          top-1/2 w-6 h-6 bg-transparent 
          transform -translate-y-1/2 rounded-full
          `}
        >
          <MoonIcon className="text-gray-800" />
        </span>
      ) : (
        <span
          className={`absolute right-1 z-10
          top-1/2 w-6 h-6 bg-transparent 
          transform -translate-y-1/2 rounded-full
          `}
        >
          <SunIcon className="text-orange-300" />
        </span>
      )}
    </Switch>
  );
}

export default DarkModeButton;
