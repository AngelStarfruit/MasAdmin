import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type PaginacionContextType = {
  itemsPerPage: number;
  setItemsPerPage: (value: number) => void;
};

const PaginationContext = createContext<PaginacionContextType | undefined>(undefined);

export const PaginationProvider = ({ children }: { children: React.ReactNode }) => {
  const [itemsPerPage, setItemsPerPage] = useState(25);

  // Cargar valor guardado al iniciar
  useEffect(() => {
    const cargarPaginacion = async () => {
      try {
        const guardado = await AsyncStorage.getItem('itemsPerPage');
        if (guardado) {
          setItemsPerPage(Number(guardado));
        }
      } catch (error) {
        console.log('Error cargando paginación', error);
      }
    };
    cargarPaginacion();
  }, []);

  // Guardar cuando cambie
  const handleSetItemsPerPage = async (value: number) => {
    setItemsPerPage(value);
    try {
      await AsyncStorage.setItem('itemsPerPage', String(value));
    } catch (error) {
      console.log('Error guardando paginación', error);
    }
  };

  return (
    <PaginationContext.Provider value={{ itemsPerPage, setItemsPerPage: handleSetItemsPerPage }}>
      {children}
    </PaginationContext.Provider>
  );
};

export const usePagination = () => {
  const context = useContext(PaginationContext);
  if (!context) {
    throw new Error('usePaginacion debe ser usado con PaginacionProvider');
  }
  return context;
};