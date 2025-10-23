
import React from 'react';
import { Language } from '../types';

interface LanguageSwitcherProps {
  currentLang: Language;
  onSwitch: () => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ currentLang, onSwitch }) => {
  return (
    <button
      onClick={onSwitch}
      className="absolute top-4 right-4 bg-gray-800 bg-opacity-70 text-white px-4 py-2 rounded-md hover:bg-cyan-700 transition-colors duration-200 text-sm z-20"
    >
      {currentLang === 'en' ? '切换到中文' : 'Switch to English'}
    </button>
  );
};

export default LanguageSwitcher;
   