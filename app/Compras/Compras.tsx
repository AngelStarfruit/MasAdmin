import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableHighlight, Alert } from 'react-native';
import Constants from 'expo-constants';
import type { ComprasScreenProps } from './types';
import { useCallback } from 'react';
import {useFocusEffect} from '@react-navigation/native';
//import { obtenerProveedores } from './backend'; import { obtenerAlmacenes } from '../Almacenes/backend';
//import { obtenerSucursales, obtenerPrecios } from '../backend';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

import datosP from './datos.json'; import datos from '../datos.json'; import datosA from '../Almacenes/datos.json';

export default function Compras({ navigation }: ComprasScreenProps ) {

   const { theme, colors } = useTheme();
    const styles = getStyles(colors);

   //JSONs de datos
  //const [proveedores, setProveedores] = useState<Record<string, any>>({});
  const proveedores = (datosP.PROVEEDORES || {});
  //const [sucursales, setSucursales] = useState<Record<string, any>>({});
  const sucursales = (datos.SUCURSALES || {});
  //const [listaPrecios, setListaPrecios] = useState<Record<string, any>>({});
  const productos = Object.fromEntries(
  Object.entries(datos.LISTA_PRECIOS || {}).filter(
      ([id, data]) => data[4] === "producto"));
  //const [almacenes, setAlmacenes] = useState<Record<string, any>>({});
  const almacenes = (datosA.ALMACENES || {});

  /*useFocusEffect(
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

  // Cargar proveedores desde el servidor
  useFocusEffect(
    useCallback(() => {
      const cargarProveedores = async () => {
        try {
          setIsLoading(true);
          const data = await obtenerProveedores();
          
          // Convertir el array de proveedores a objeto con índices
          const proveedoresObj: Record<string, any> = {};
          if (Array.isArray(data)) {
            data.forEach((item: any, index: number) => {
              proveedoresObj[index + 1] = [item.empresa, item.telefono, item.ciudad, item.estado];
            });
          }
          
          setProveedores(proveedoresObj);
        } catch (error: any) {
          Alert.alert('Error', error.message || 'No se pudieron cargar los proveedores');
        } finally {
          setIsLoading(false);
        }
      };
      
      cargarProveedores();
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

  // Cargar precios desde el servidor
  useFocusEffect(
    useCallback(() => {
      const cargarPrecios = async () => {
        try {
          setIsLoading(true);
          const data = await obtenerPrecios();
          
          // Convertir el array de precios a objeto con índices
          const preciosObj: Record<string, any> = {};
          if (Array.isArray(data)) {
            data.forEach((item: any, index: number) => {
              preciosObj[index + 1] = [item.descripcion, item.marca, item.costo, item.unidad, item.tipo, item.contenido, item.categoría];
            });
          }
          
          setPrecios(preciosObj);
        } catch (error: any) {
          Alert.alert('Error', error.message || 'No se pudieron cargar los precios');
        } finally {
          setIsLoading(false);
        }
      };
      
      cargarPrecios();
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
        } catch (error: any) {
          Alert.alert('Error', error.message || 'No se pudieron cargar los almacenes');
        } finally {
          setIsLoading(false);
        }
      };
      
      cargarAlmacenes();
    }, [])
  );
  
  */

  return (
    <View style={styles.container}>
      <StatusBar style={theme === 'oscuro' ? 'light' : 'dark'}  />
      <View style={styles.navigation}>

      <TouchableHighlight
        underlayColor={colors.navIconUnderlay} style={styles.navIcons}
        onPress={() => navigation.navigate("Dashboard")}
      >
        <Ionicons name="grid-outline" size={20} color={colors.text} /></TouchableHighlight>

      <TouchableHighlight
        style={styles.navIconsS}
      >
        <Ionicons name="cart-outline" size={20} color={colors.text} /></TouchableHighlight>

        <TouchableHighlight
        underlayColor={colors.navIconUnderlay} style={styles.navIcons}
        onPress={() => navigation.navigate("Ventas")}
      >
        <Ionicons name="cash-outline" size={20} color={colors.text} /></TouchableHighlight>

      <TouchableHighlight
        underlayColor={colors.navIconUnderlay} style={styles.navIcons}
        onPress={() => navigation.navigate("Sucursales")} 
      >
        <Ionicons name="business-outline" size={20} color={colors.text} /></TouchableHighlight>

        <TouchableHighlight
        underlayColor={colors.navIconUnderlay} style={styles.navIcons}
        onPress={() => navigation.navigate("Almacenes")} 
      >
        <Ionicons name="cube-outline" size={20} color={colors.text} /></TouchableHighlight>

        <TouchableHighlight
        underlayColor={colors.navIconUnderlay} style={styles.navIcons}
        onPress={() => navigation.navigate("ListaDePrecios")} 
      >
        <Ionicons name="pricetag-outline" size={20} color={colors.text} /></TouchableHighlight>

    </View>
      
        <View style={styles.space}>

        <Text style={{ fontSize: 25, fontWeight: 'bold' , color: colors.text}}>
         <Ionicons name="cart" size={25} color={colors.text} />  Compras
          </Text>
          <Text style={{ fontSize: 20, color: colors.text}}>
          Seleccione una sección:
          </Text>

        <View style={{flex: 1, justifyContent: 'space-evenly', alignItems: 'center'}}>
        <View style={{height:150, width: 225}}><TouchableHighlight 
        underlayColor={colors.primaryUnderlay}
        onPress={() => navigation.navigate("Proveedores")}
        style={styles.touch}>
          <Text style={styles.touchText}>
            Proveedores</Text>
          </TouchableHighlight></View>

          <View style={{height:150, width: 225}}><TouchableHighlight 
        underlayColor={colors.primaryUnderlay}
        onPress={() => {
          if(Object.keys(proveedores).length > 0 && Object.keys(sucursales).length > 0 
          && Object.keys(productos).length > 0 && Object.keys(almacenes).length > 0){
          navigation.navigate("ControlCompras")
          }
          else Alert.alert("Sección no disponible","Para usar esta función, asegurese de tener al menos un proveedor, una sucursal, un producto y un almacén")
        }}
        style={styles.touch}>
          <Text style={styles.touchText}>Control de compras</Text>
          </TouchableHighlight></View>
        
         <View style={{height:150, width: 225}}><TouchableHighlight 
        underlayColor={colors.primaryUnderlay}
        onPress={() => {
          navigation.navigate("ControlGastos")
        }}
        style={styles.touch}>
          <Text style={styles.touchText}>Control de gastos</Text>
          </TouchableHighlight></View>
          </View>

        </View>
      
    </View>
  );
}

const getStyles = (colors: any) => StyleSheet.create({
  container:{
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: colors.background
  },
  navigation: {
    backgroundColor: colors.navBackground,
    flexDirection: 'row', justifyContent: 'space-around',
    padding: 5,
  },
  navIcons:{
    padding: 10, borderRadius: 50 ,
  },
  navIconsS:{
    padding: 10, borderRadius: 50 , backgroundColor: colors.navIconUnderlay,
  },
  space: {
    flex: 1,
    backgroundColor: colors.scrollBackground,
    padding: 18,
  },
  touch: {
    flex: 1,
    textAlign: 'center',
    backgroundColor: colors.primary,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchText: {
    color: colors.background,
    fontWeight: 'bold', fontSize: 30,
    textAlign: 'center',
  },
});
