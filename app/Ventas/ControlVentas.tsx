import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight} from 'react-native';
import Constants from 'expo-constants';
import { useState, useCallback } from 'react';
//import { obtenerVentas } from './backend';
import type { ControlVentasScreenProps } from './types';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

import datos from './datos.json'

export default function ControlVentas({ navigation }: ControlVentasScreenProps ) {

  const { theme, colors } = useTheme();
  const styles = getStyles(colors);

  //const [Ventas, setVentas] = useState<Record<string, any>>({});
  const [Ventas, setVentas] = useState(datos.CONTROL_VENTAS || {})

  const [isLoading, setIsLoading] = useState(false);

  /*useFocusEffect(
    useCallback(() => {
      const cargarVentas = async () => {
        try {
          setIsLoading(true);
          const data = await obtenerVentas();
          
          // Convertir el array de sucursales a objeto con índices
          const ventasObj: Record<string, any> = {};
          if (Array.isArray(data)) {
            data.forEach((item: any, index: number) => {
              ventasObj[index + 1] = [item.fecha, item.total, item.cliente];
            });
          }
          
          setVentas(ventasObj);
        } catch (error: any) {
          Alert.alert('Error', error.message || 'No se pudieron cargar los registros de las ventas');
        } finally {
          setIsLoading(false);
        }
      };
      
      cargarVentas();
    }, [])
  );*/

  return (
    <View style={styles.container}>
      <StatusBar style={theme === 'oscuro' ? 'light' : 'dark'}  />

      <View style={styles.navigation}>
        <TouchableHighlight
        underlayColor={colors.navIconUnderlay} style={styles.navIcons}
        onPress={() => navigation.navigate("Ventas")} 
      >
        <Ionicons name="arrow-back" size={30} color={colors.text} />
      </TouchableHighlight>
    </View>

      {/*ScrollView*/}
      <ScrollView>
        <View style={styles.scroll}>
        <Text style={{  fontSize: 25, fontWeight: 'bold', color: colors.text }}>
        Control de ventas
        </Text>
        <TouchableHighlight 
        underlayColor={colors.input}
        onPress={() => navigation.navigate("AddRegistroVenta")}
        style={styles.add}>
            <Text style={{ color: colors.text}}>Añadir registro de venta</Text>
          </TouchableHighlight>
        <View style={styles.table}>
              <View style={styles.row}>
                  <View style={[styles.cell, {flex: 0.6}]}>
                      <Text style={styles.headerText}>Fecha</Text>
                      </View>
                  <View style={[styles.cell, {flex: 0.6}]}>
                      <Text style={styles.headerText}>Total ganado</Text>
                      </View>
                  <View style={styles.cell}>
                      <Text style={styles.headerText}>Cliente</Text>
                      </View>
                  </View>

                {!isLoading ? (
                Object.values(Ventas || {}).slice(-50).length > 0 ? (
                Object.entries(Ventas).slice(-50).map(([id, data]: [string, any]) => {
                  const [fecha, total, cliente] = data;
                  return(
                      <View key={id} style={styles.row}>
                      <View style={[styles.cell, {flex: 0.6}]}><Text style={styles.text}>{fecha.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3/$2/$1')}</Text></View>
                      <View style={[styles.cell, {flex: 0.6}]}><Text style={styles.text}>{Number(total).toFixed(2)}</Text></View>
                      <View style={styles.cell}><Text style={styles.text}>{cliente}</Text></View>
                </View>
                )
                 })
              ) : (
            <Text style={{opacity: 0.8, textAlign: 'center', color: colors.text}}>Esperando a que efectúe una venta...</Text>
            )) : (
            <Text style={{opacity: 0.8, textAlign: 'center', color: colors.text}}>
              Cargando...</Text>
            )}

          </View>
        
        </View>
      </ScrollView>
    </View>
  );
}

const getStyles = (colors: any) => StyleSheet.create({
  container:{
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: colors.background
  },
  text: {
    color: colors.text
  },
  navigation: {
    backgroundColor: colors.navBackground,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  navIcons:{
    borderRadius: 50 ,
    marginTop: 20,
  },
  scroll: {
    flex: 1,
    backgroundColor: colors.scrollBackground,
    padding: 18,
  },
  add: {
    backgroundColor: colors.input,
    marginTop: 10, padding: 10,
    borderRadius: 20,
  },
  //Tabla estilos
  table: {
    marginTop: 20, marginBottom: 80, backgroundColor: colors.background
  },
  row: {flexDirection: 'row',},
  cell: {flex: 1, padding: 6},
  headerText: {color: colors.primary,},
});
