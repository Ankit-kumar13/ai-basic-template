import React, { useState } from 'react';
import { Calculator } from './Calculator-View';

export const Application = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="container mx-auto px-4 py-8">
        <h1 className={`text-4xl font-bold text-center mb-8 ${
          theme === 'dark' ? 'text-white' : 'text-gray-800'
        }`}>
          Professional Calculator
        </h1>
        <Calculator theme={theme} onThemeChange={handleThemeChange} />
      </div>
    </div>
  );
};
