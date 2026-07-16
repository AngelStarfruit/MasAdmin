import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight} from 'react-native';
import Constants from 'expo-constants';
import type { ControlComprasScreenProps } from './types';
import { useState, useCallback } from 'react';
//import { obtenerCompras } from './backend';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

import datos from './datos.json'

export default function ControlCompras({ navigation }: ControlComprasScreenProps) {

  const { theme, colors } = useTheme();
    const styles = getStyles(colors);
    
  //Constantes JSON
  //const [registrosCompra, setRegistrosCompra] = useState<Record<string, any>>({});
  const [Compras, setCompras] = useState(datos.CONTROL_COMPRAS || {})

  const [isLoading, setIsLoading] = useState(false);

   /*useFocusEffect(
    useCallback(() => {
      const cargarCompras = async () => {
        try {
          setIsLoading(true);
          const data = await obtenerCompras();
          
          // Convertir el array de sucursales a objeto con índices
          const comprasObj: Record<string, any> = {};
          if (Array.isArray(data)) {
            data.forEach((item: any, index: number) => {
              comprasObj[index + 1] = [item.fecha, item.total, item.proveedor];
            });
          }
          
          setCompras(comprasObj);
        } catch (error: any) {
          Alert.alert('Error', error.message || 'No se pudieron cargar los registros de las compras');
        } finally {
          setIsLoading(false);
        }
      };
      
      cargarCompras();
    }, [])
  );*/
  
  return (
    <View style={styles.container}>
      <StatusBar style={theme === 'oscuro' ? 'light' : 'dark'}  />

    <View style={styles.navigation}>
            <TouchableHighlight
            underlayColor={colors.navIconUnderlay} style={styles.navIcons}
            onPress={() => navigation.navigate("Compras")} 
          >
            <Ionicons name="arrow-back" size={30} color={colors.text} />
          </TouchableHighlight>
        </View>

      <ScrollView>
        <View style={styles.scroll}>
        <Text style={{  fontSize: 25, fontWeight: 'bold', color: colors.text }}>
        Control de compras
        </Text>

        <TouchableHighlight 
        underlayColor={colors.cellUnderlay}
        onPress={() => navigation.navigate("AddRegistroCompra")}
        style={styles.add}>
            <Text style={{color: colors.text}}>Añadir registro de compra</Text>
          </TouchableHighlight>

        <View style={styles.table}>
              <View style={styles.row}>
                  <View style={[styles.cell, {flex: 0.6}]}>
                      <Text style={styles.headerText}>Fecha</Text>
                      </View>
                  <View style={[styles.cell, {flex: 0.7}]}>
                      <Text style={styles.headerText}>Total gastado</Text>
                      </View>
                  <View style={styles.cell}>
                      <Text style={styles.headerText}>Proveedor</Text>
                      </View>
                  </View>

                  {!isLoading ? (
                  Object.values(Compras || {}).length > 0 ? (
                  Object.entries(Compras).map(([id, data]: [string, any]) => {
                  const [fecha, total, proveedor] = data;
                  return(
                      <View key={id} style={styles.row}>
                      <View style={[styles.cell, {flex: 0.6}]}><Text style={styles.text}>{fecha.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3/$2/$1')}</Text></View>
                      <View style={[styles.cell, {flex: 0.7}]}><Text style={styles.text}>{Number(total).toFixed(2)}</Text></View>
                      <View style={styles.cell}><Text style={styles.text}>{proveedor}</Text></View>
                </View>
                )
                })
              ) : (
            <Text style={{opacity: 0.8, textAlign: 'center', color: colors.text}}>Esperando a que efectúe una compra...</Text>
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
  text:{
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
  cell: {flex: 1, padding: 6,},
  headerText: {color: colors.primary,},
});
