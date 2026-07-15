import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Constants from 'expo-constants';
import { useState, useEffect} from 'react';
//import { obtenerSucursales } from '../backend'; import { obtenerAlmacenes, obtenerExistencias } from './backend';
import type { ExistenciasAlmacenScreenProps } from './types';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

import datosS from '../datos.json'; import datosA from './datos.json';

export default function ExistenciasAlmacen({ navigation }: ExistenciasAlmacenScreenProps ) {

  const { theme, colors } = useTheme();
    const styles = getStyles(colors);

  //JSONs para datos
  //const [sucursales, setSucursales] = useState<Record<string, any>>({});
  const sucursales: Record<string, any> = datosS.SUCURSALES || {}
  //const [almacenes, setAlmacenes] = useState<Record<string, any>>({});
  const almacenes: Record<string, any> = datosA.ALMACENES || {}
  //const [existencias, setExistencias] = useState<Record<string, any>>({});
  const existencias: Record<string, any> = datosA.EXISTENCIAS_ALMACEN || {}
   const [almacenesMostrados, setalmacenesMostrados] = useState(almacenes);
  const [existenciasMostradas, setExistenciasMostradas] = useState(existencias);

  //Constantes de pickers
  const [selectedBranch, setSelectedBranch] = useState(sucursales[Object.keys(sucursales)[0]]?.[0] || '');
  const [selectedValue, setSelectedValue] = useState(almacenes[Object.keys(almacenes)[0]]?.[0] || '');

  useEffect(() => {
  let existenciasFiltradas; let almacenesFiltrados
  
   almacenesFiltrados = Object.fromEntries(
      Object.entries(datosA.ALMACENES || {}).filter(
        ([id, data]) => data[1] === selectedBranch
      )
    );

    existenciasFiltradas = Object.fromEntries(
      Object.entries(datosA.EXISTENCIAS_ALMACEN || {}).filter(
        ([id, data]) => data[3] === selectedValue
      )
    );
  
  setExistenciasMostradas(existenciasFiltradas);
  setalmacenesMostrados(almacenesFiltrados);
}, [selectedBranch, selectedValue]);

/*// Cargar ID de empresa
  useFocusEffect(
    useCallback(() => {
      const cargarEmpresa = async () => {
        try {
          const id = await AsyncStorage.getItem('idEmpresa');
          if (id) setIdEmpresa(id);
        } catch (error) {
          console.log('Error cargando empresa', error);
        }
      };
      cargarEmpresa();
    }, [])
  );

  // Cargar sucursales desde el servidor
  useFocusEffect(
    useCallback(() => {
      const cargarSucursales = async () => {
        try {
          setIsLoading(true);
          const data = await obtenerSucursales();
          
          // Convertir el array de sucursales a objeto con índices
          const sucursalesObj: Record<string, any> = {};
          if (Array.isArray(data)) {
            data.forEach((item: any, index: number) => {
              sucursalesObj[index + 1] = [item.sucursal, item.telefono];
            });
          }
          
          setSucursales(sucursalesObj);
        } catch (error: any) {
          Alert.alert('Error', error.message || 'No se pudieron cargar las sucursales');
        } finally {
          setIsLoading(false);
        }
      };
      
      cargarSucursales();
    }, [])
  );

   // Cargar almacenes desde el servidor
  useFocusEffect(
    useCallback(() => {
      const cargarAlmacenes = async () => {
        try {
          setIsLoading(true);
          const data = await obtenerAlmacenes();
          
          // Convertir el array de almacenes a objeto con índices
          const almacenesObj: Record<string, any> = {};
          if (Array.isArray(data)) {
            data.forEach((item: any, index: number) => {
              almacenesObj[index + 1] = [item.almacen, item.sucursal];
            });
          }
          
          setAlmacenes(almacenesObj);
          setAlmacenesOG(almacenesObj);
        } catch (error: any) {
          Alert.alert('Error', error.message || 'No se pudieron cargar los almacenes');
        } finally {
          setIsLoading(false);
        }
      };
      
      cargarAlmacenes();
    }, [])
  );

   // Cargar existencias desde el servidor
  useFocusEffect(
    useCallback(() => {
      const cargarExistencias = async () => {
        try {
          setIsLoading(true);
          const data = await obtenerExistencias();
          
          // Convertir el array de existencias a objeto con índices
          const existenciasObj: Record<string, any> = {};
          if (Array.isArray(data)) {
            data.forEach((item: any, index: number) => {
              existenciasObj[index + 1] = [item.producto, item.cantidad];
            });
          }
          
          setExistencias(existenciasObj);
        } catch (error: any) {
          Alert.alert('Error', error.message || 'No se pudieron cargar las existencias de almacenes');
        } finally {
          setIsLoading(false);
        }
      };
      
      cargarExistencias();
    }, [])
  );
 */

  return (
    <View style={styles.container}>
      <StatusBar style={theme === 'oscuro' ? 'light' : 'dark'}  />

      <View style={styles.navigation}>
        <TouchableHighlight
        underlayColor={colors.navIconUnderlay} style={styles.navIcons}
        onPress={() => navigation.navigate("Almacenes")} 
      >
        <Ionicons name="arrow-back" size={25} color={colors.text} /></TouchableHighlight>
    </View>

      <ScrollView>
        <View style={styles.scroll}>
        <Text style={{  color: colors.text, fontSize: 25, fontWeight: 'bold' }}>
        Existencias por almacén
        </Text>
        <Text style={{ color: colors.text,
          fontSize: 15, 
          paddingVertical: 10,}}>
          Inserte una sucursal
          </Text>
          <Picker
              selectedValue={selectedBranch}
              onValueChange={(itemValue) => setSelectedBranch(itemValue)}
              style={styles.picker} itemStyle={styles.pickerItem}
              >
              {Object.values(sucursales || {}).length > 0 ? (
                Object.values(sucursales).map((sucursal: any, index) => (
                <Picker.Item 
                style={styles.pickerItem} 
                key={index} 
                label={String(sucursal[0])} 
                value={String(sucursal[0])} 
                />
                ))
                ) : (
                <Picker.Item label="-" value="" />
                )}
          </Picker>
        <Text style={{ color: colors.text,
          fontSize: 15, 
          paddingVertical: 10,}}>
          Inserte un almacén para ver sus existencias
          </Text>
          <Picker
              selectedValue={selectedValue}
              onValueChange={(itemValue) => setSelectedValue(itemValue)}
              style={styles.picker} itemStyle={styles.pickerItem}
              >
              {Object.values(almacenesMostrados || {}).length > 0 ? (
                    Object.values(almacenesMostrados).map((almacen: any, index) => (
                    <Picker.Item 
                    style={styles.pickerItem} 
                    key={index} 
                    label={String(almacen[0])} 
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
                      <Text style={styles.headerText}>Poducto</Text>
                      </View>
                  <View style={styles.cell}>
                      <Text style={styles.headerText}>Marca</Text>
                      </View>
                  <View style={[styles.cell, {flex: 0.5}]}>
                      <Text style={styles.headerText}>Cantidad</Text>
                      </View>
                  </View>

                  {/* Body - cada registro es una fila */}
                  {Object.values(existenciasMostradas || {}).length > 0 ? (
                  Object.entries(existenciasMostradas).map(([id, data]: [string, any]) => {
                  const [descripcion, marca, cantidad] = data;
                  return(
                      <View key={id} style={styles.row}>
                      <View style={styles.cell}><Text style={styles.text}>{descripcion}</Text></View>
                      <View style={styles.cell}><Text style={styles.text}>{marca}</Text></View>
                      <View style={[styles.cell, {flex: 0.5}]}><Text style={styles.text}>{cantidad}</Text></View>
                </View>
                )
                })
              ) : (
            <Text style={{opacity: 0.8, marginVertical: 20, textAlign: 'center', color: colors.text}}>Este almacén esta vacío</Text>
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
    padding: 10, 
    borderRadius: 50 ,
    marginTop: 20,
  },
  scroll: {
    flex: 1,
    backgroundColor: colors.scrollBackground,
    padding: 18,
  },
  //Tabla estilos
  table: {
    paddingVertical: 20,
    marginBottom: 80
  },
  row: {flexDirection: 'row',},
  cell: {
    flex: 1, padding: 6,
    backgroundColor: colors.background,
  },
  headerText: {color: colors.primary,},
  //---------------
  picker: {
    height: 55,
    marginLeft: 10,
    flex: 1,
    backgroundColor: colors.input,
    color: colors.text,
  },
  pickerItem: {
    fontSize: 16,
  },
});
