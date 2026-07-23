import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ThemeType = 'claro' | 'oscuro';

type ThemeContextType = {
  theme: ThemeType;
  toggleTheme: () => void;
  setTheme: (theme: ThemeType) => void;
  colors: typeof lightColors | typeof darkColors;
};

// Colores para cada tema
const lightColors = {
  background: '#ffffff',
  text: '#000000',
  primary: '#2435f0', primaryUnderlay: '#3a49f3', 
  secondary: '#e3e5ff',
  card: '#f5f5f5',
  input: '#dedede',
  headerCell: '#7684ff',
  navBackground: '#ffffff',
  scrollBackground: '#eeeeee',
  modalBackground: '#ffffff',
  enter: '#fc8a8a', enterUnderlay: '#ff9f9f',
  option: '#bdc2ff', optionUnderlay: '#cbcffe',
  confirm: '#62ff77', confirmUnderlay: '#90ff9f',
  edit: '#f3fe53', editUnderlay: '#f7ff80',
  delete: '#ff8787', deleteUnderlay: '#ff9797'
};

const darkColors = {
  background: '#121212',
  text: '#ffffff',
  primary: '#5c6bff', primaryUnderlay: '#6c7bff',
  secondary: '#2a2a3a',
  card: '#1e1e1e',
  input: '#2a2a2a',
  headerCell: '#2435f0',
  navBackground: '#1a1a1a',
  scrollBackground: '#1a1a1a',
  modalBackground: '#2a2a2a',
  enter: '#730101', enterUnderlay: '#8c0101',
  option: '#1d30ff', optionUnderlay: '#4f5eff',
  confirm: '#00620d', confirmUnderlay: '#1e942d',
  edit: '#8a9400', editUnderlay: '#bac700',
  delete: '#8e0000', deleteUnderlay: '#c20000'
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>('claro');

  // Cargar tema guardado al iniciar
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme) {
          setTheme(savedTheme as ThemeType);
        }
      } catch (error) {
        console.log('Error cargando tema', error);
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'claro' ? 'oscuro' : 'claro';
    setTheme(newTheme);
    AsyncStorage.setItem('theme', newTheme);
  };

  const setThemeValue = (newTheme: ThemeType) => {
    setTheme(newTheme);
    AsyncStorage.setItem('theme', newTheme);
  };

  const colors = theme === 'claro' ? lightColors : darkColors;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme: setThemeValue, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};