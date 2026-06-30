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
  primary: '#2435f0',
  secondary: '#e3e5ff',
  card: '#f5f5f5',
  border: '#333333',
  input: '#eeeeee',
  headerCell: '#7684ff',
  cellUnderlay: '#dddddd',
  navBackground: '#ffffff',
  navIconUnderlay: '#ddddff',
  scrollBackground: '#eeeeee',
  modalBackground: '#ffffff',
  option: '#bdc2ff', optionUnderlay: '#cbcffe',
  confirm: '#62ff77', confirmUnderlay: '#90ff9f',
  edit: '#f3fe53', editUnderlay: '#f7ff80',
  delete: '#ff8787', deleteUnderlay: '#ff9797',
  regret: '#ccc', regretUnderlay: '#ddd'
};

const darkColors = {
  background: '#121212',
  text: '#ffffff',
  primary: '#5c6bff',
  secondary: '#2a2a3a',
  card: '#1e1e1e',
  border: '#cccccc',
  input: '#2a2a2a',
  headerCell: '#2435f0',
  cellUnderlay: '#3b3b3b',
  navBackground: '#1a1a1a',
  navIconUnderlay: '#0a0a4d',
  scrollBackground: '#1a1a1a',
  modalBackground: '#2a2a2a',
  option: '#1d30ff', optionUnderlay: '#4f5eff',
  confirm: '#00620d', confirmUnderlay: '#1e942d',
  edit: '#8a9400', editUnderlay: '#bac700',
  delete: '#8e0000', deleteUnderlay: '#c20000',
  regret: '#333',  regretUnderlay: '#444'
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