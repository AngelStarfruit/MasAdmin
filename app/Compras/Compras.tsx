import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableHighlight, Image, Alert } from 'react-native';
import Constants from 'expo-constants';
import type { ComprasScreenProps } from './types';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import datosP from './datos.json'; import datos from '../datos.json'; import datosA from '../Almacenes/datos.json';

export default function Compras({ navigation }: ComprasScreenProps ) {

   const { theme, colors } = useTheme();
    const styles = getStyles(colors);

   //JSONs de datos
  const proveedores = (datosP.PROVEEDORES || {});
  const sucursales = (datos.SUCURSALES || {});
  const productos = Object.fromEntries(
  Object.entries(datos.LISTA_PRECIOS || {}).filter(
      ([id, data]) => data[4] === "producto"));
  const gastos = Object.fromEntries(
  Object.entries(datos.LISTA_PRECIOS || {}).filter(
      ([id, data]) => data[4] === "gasto"));
  const almacenes = (datosA.ALMACENES || {});

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

        <TouchableHighlight 
        underlayColor={colors.primaryUnderlay}
        onPress={() => navigation.navigate("Proveedores")}
        style={styles.touch}>
          <Text style={styles.touchText}>Proveedores</Text>
          </TouchableHighlight>

          <TouchableHighlight 
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
          </TouchableHighlight>
        
        <TouchableHighlight 
        underlayColor={colors.primaryUnderlay}
        onPress={() => {
          if(Object.keys(proveedores).length > 0 && Object.keys(gastos).length > 0){
          navigation.navigate("ControlGastos")
          }
          else Alert.alert("Sección no disponible","Para usar esta función, asegurese de tener al menos un proveedor y un gasto")
        }}
        style={styles.touch}>
          <Text style={styles.touchText}>Control de gastos</Text>
          </TouchableHighlight>

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
    elevation: 5,
    shadowColor: "#000", shadowOffset: {height: 2, width: 0,}
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
    marginHorizontal: 80, marginVertical: 40,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: "#000", shadowOffset: {height: 4, width: 0,}
  },
  touchText: {
    color: colors.background,
    fontWeight: 'bold', fontSize: 30,
    textAlign: 'center',
  },
});
