import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Constants from 'expo-constants';
import { useState, useEffect, useMemo } from 'react';
import type { ExistenciasAlmacenScreenProps } from './types';
import { usePagination } from '../../context/PaginationContext';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

import datosS from '../datos.json';
import datosA from './datos.json';

export default function ExistenciasAlmacen({ navigation }: ExistenciasAlmacenScreenProps) {
  const { theme, colors } = useTheme();
  const styles = getStyles(colors);

  const sucursales: Record<string, any> = datosS.SUCURSALES || {};
  const almacenes: Record<string, any> = datosA.ALMACENES || {};
  const existencias: Record<string, any> = datosA.EXISTENCIAS_ALMACEN || {};

  const [existenciasFiltradas, setExistenciasFiltradas] = useState<Record<string, any>>(existencias);
  const [almacenesMostrados, setAlmacenesMostrados] = useState(almacenes);

  const [currentPage, setCurrentPage] = useState(1);
  const { itemsPerPage } = usePagination();

  const [selectedValue, setSelectedValue] = useState(
    almacenes[Object.keys(almacenes)[0]]?.[0] || ''
  );

  useEffect(() => {
    const filtradas = Object.fromEntries(
      Object.entries(datosA.EXISTENCIAS_ALMACEN || {}).filter(
        ([id, data]) => data[3] === selectedValue
      )
    );
    setExistenciasFiltradas(filtradas);
    setCurrentPage(1); // Reiniciar a primera página al filtrar
  }, [selectedValue]);

  const existenciasPaginadas = useMemo(() => {
    const entries = Object.entries(existenciasFiltradas || {});
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedEntries = entries.slice(startIndex, endIndex);
    return Object.fromEntries(paginatedEntries);
  }, [existenciasFiltradas, currentPage, itemsPerPage]);

  const totalPaginas = Math.ceil(Object.keys(existenciasFiltradas || {}).length / itemsPerPage);

  const cambiarPagina = (nuevaPagina: number) => {
    if (nuevaPagina < 1 || nuevaPagina > totalPaginas) return;
    setCurrentPage(nuevaPagina);
  };

  return (
    <View style={styles.container}>
      <StatusBar style={theme === 'oscuro' ? 'light' : 'dark'} />

      <View style={styles.navigation}>
        <TouchableOpacity style={styles.navIcons} onPress={() => navigation.navigate("Almacenes")}>
          <Ionicons name="arrow-back" size={25} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View style={styles.scroll}>
          <Text style={{ color: colors.text, fontSize: 25, fontWeight: 'bold' }}>
            Existencias por almacén
          </Text>
          <Text style={{ color: colors.text, fontSize: 15, paddingVertical: 10 }}>
            Inserte un almacén para ver sus existencias
          </Text>
          <Picker
            selectedValue={selectedValue}
            onValueChange={(itemValue) => setSelectedValue(itemValue)}
            style={styles.picker}
          >
            {Object.values(almacenesMostrados || {}).length > 0 ? (
              Object.values(almacenesMostrados).map((almacen: any, index) => (
                <Picker.Item
                  key={index}
                  label={String(almacen[0]) + ' (' + String(almacen[1]) + ')'}
                  value={String(almacen[0])}
                />
              ))
            ) : (
              <Picker.Item label="-" value="" />
            )}
          </Picker>

          <View style={styles.table}>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={styles.headerText}>Producto</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.headerText}>Marca</Text>
              </View>
              <View style={[styles.cell, { flex: 0.5 }]}>
                <Text style={styles.headerText}>Cantidad</Text>
              </View>
            </View>

            {Object.values(existenciasPaginadas || {}).length > 0 ? (
              Object.entries(existenciasPaginadas).map(([id, data]: [string, any]) => {
                const [descripcion, marca, cantidad] = data;
                return (
                  <View key={id} style={styles.row}>
                    <View style={styles.cell}>
                      <Text style={styles.text}>{descripcion}</Text>
                    </View>
                    <View style={styles.cell}>
                      <Text style={styles.text}>{marca}</Text>
                    </View>
                    <View style={[styles.cell, { flex: 0.5 }]}>
                      <Text style={styles.text}>{cantidad}</Text>
                    </View>
                  </View>
                );
              })
            ) : (
              <Text style={{ opacity: 0.8, marginVertical: 20, textAlign: 'center', color: colors.text }}>
                Este almacén está vacío
              </Text>
            )}
          </View>

          {/* Controles de paginación */}
          {Object.keys(existenciasFiltradas || {}).length > itemsPerPage && (
            <View style={styles.paginationContainer}>
              <TouchableOpacity
                onPress={() => cambiarPagina(currentPage - 1)}
                style={[styles.paginationButton, currentPage === 1 && styles.disabled]}
                disabled={currentPage === 1}
              >
                <Ionicons name="chevron-back" size={30} color={colors.headerCell} />
              </TouchableOpacity>

              <Text style={styles.text}>
                Página {currentPage} de {totalPaginas}
              </Text>

              <TouchableOpacity
                onPress={() => cambiarPagina(currentPage + 1)}
                style={[
                  styles.paginationButton,
                  currentPage === totalPaginas && styles.disabled,
                ]}
                disabled={currentPage === totalPaginas}
              >
                <Ionicons name="chevron-forward" size={30} color={colors.headerCell} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

// Estilos (igual que antes, sin cambios)
const getStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: Constants.statusBarHeight,
      backgroundColor: colors.background,
    },
    text: { color: colors.text },
    navigation: {
      backgroundColor: colors.navBackground,
    },
    navIcons: { padding: 10 },
    scroll: {
      flex: 1,
      backgroundColor: colors.scrollBackground,
      padding: 18,
    },
    table: {
      marginVertical: 20,
      marginBottom: 40,
      backgroundColor: colors.background,
    },
    row: { flexDirection: 'row' },
    cell: { flex: 1, padding: 2 },
    headerText: { color: colors.primary },
    disabled: { opacity: 0.6 },
    picker: {
      backgroundColor: colors.input,
      color: colors.text,
    },
    paginationContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      marginBottom: 40,
    },
    paginationButton: { padding: 5 },
  });