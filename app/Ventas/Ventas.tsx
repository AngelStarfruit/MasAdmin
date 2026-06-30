import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableHighlight, Image, Alert} from 'react-native';
import Constants from 'expo-constants';
import type { VentasScreenProps } from './types';
import { useTheme } from '../../context/ThemeContext';
import datosC from './datos.json'; import datos from '../datos.json'; import datosA from '../Almacenes/datos.json';

export default function Ventas({ navigation }: VentasScreenProps ) {

  const { theme, colors } = useTheme();
    const styles = getStyles(colors);

  const getImage = (nombre: any) => {
  switch(nombre) {
    case 'C': return require('../../assets/C.png');
    case 'V': return require('../../assets/V.png');
    case 'S': return require('../../assets/S.png');
    case 'D': return require('../../assets/D.png');
    case 'A': return require('../../assets/A.png');
    default: return require('../../assets/$.png');
    }
  }

  //JSONs de datos
  const clientes = (datosC.CLIENTES || {});
  const sucursales = (datos.SUCURSALES || {});
  const productos = Object.fromEntries(
  Object.entries(datos.LISTA_PRECIOS || {}).filter(
      ([id, data]) => data[4] != "gasto"));
  const almacenes = (datosA.ALMACENES || {});

  return (
    <View style={styles.container}>
      <StatusBar style={theme === 'oscuro' ? 'light' : 'dark'}  />
      <View style={styles.navigation}>

      <TouchableHighlight
        underlayColor={colors.navIconUnderlay} style={styles.navIcons}
        onPress={() => navigation.navigate("Dashboard")}
      >
        <Image source={getImage('D')} style={styles.navIconImage} /></TouchableHighlight>

      <TouchableHighlight
        underlayColor={colors.navIconUnderlay} style={styles.navIcons}
        onPress={() => navigation.navigate("Compras")}
      >
        <Image source={getImage('C')} style={styles.navIconImage} /></TouchableHighlight>

        <TouchableHighlight
        style={styles.navIconsS}
      >
        <Image source={getImage('V')} style={styles.navIconImage} /></TouchableHighlight>

      <TouchableHighlight
        underlayColor={colors.navIconUnderlay} style={styles.navIcons}
        onPress={() => navigation.navigate("Sucursales")} 
      >
        <Image source={getImage('S')} style={styles.navIconImage} /></TouchableHighlight>

        <TouchableHighlight
        underlayColor={colors.navIconUnderlay} style={styles.navIcons}
        onPress={() => navigation.navigate("Almacenes")} 
      >
        <Image source={getImage('A')} style={styles.navIconImage} /></TouchableHighlight>

        <TouchableHighlight
        underlayColor={colors.navIconUnderlay} style={styles.navIcons}
        onPress={() => navigation.navigate("ListaDePrecios")} 
      >
        <Image source={getImage('$')} style={styles.navIconImage} /></TouchableHighlight>

    </View>
      
        <View style={styles.space}>

          <Text style={{ fontSize: 25, fontWeight: 'bold', color: colors.text }}>
          Ventas
          </Text>
          <Text style={{ fontSize: 20, color: colors.text }}>
          Seleccione una sección:
          </Text>

        <TouchableHighlight 
        underlayColor={colors.primaryUnderlay}
        onPress={() => navigation.navigate("Clientes")}
        style={styles.touch}>
          <Text style={styles.touchText}>Clientes</Text>
          </TouchableHighlight>
          
          <TouchableHighlight 
        underlayColor={colors.primaryUnderlay}
        onPress={() => {
                  if(Object.keys(clientes).length > 0 && Object.keys(sucursales).length > 0 
                  && Object.keys(productos).length > 0 && Object.keys(almacenes).length > 0){
                  navigation.navigate("ControlVentas")
                  }
                  else Alert.alert("Sección no disponible","Para usar esta función, asegurese de tener al menos un cliente, una sucursal, un producto y un producto o servicio")
                }}
        style={styles.touch}>
          <Text style={styles.touchText}>Control de ventas</Text>
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
  navIconImage: {
    width: 20, height: 20,
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
    margin: 80,
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
