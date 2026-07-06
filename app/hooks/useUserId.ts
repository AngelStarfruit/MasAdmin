
import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useEntId = () => {
  const [EntId, setEntId] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      const cargarIdEmpresa = async () => {
        try {
          const usuarioGuardado = await AsyncStorage.getItem('usuarioSesion');
          if (usuarioGuardado) {
            const usuario = JSON.parse(usuarioGuardado);
            // Obtener el último elemento del array
            const ultimoValor = usuario[usuario.length - 1] || '';
            setEntId(ultimoValor);
          }
        } catch (error) {
          console.log('Error cargando usuario', error);
        }
      };
      cargarIdEmpresa();
    }, [])
  );

  return EntId;
};