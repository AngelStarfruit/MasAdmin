import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableHighlight, Image, Alert} from 'react-native';
import Constants from 'expo-constants';
import { AlmacenesScreenProps } from './types';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import datos from '../datos.json'; import datosA from './datos.json';

export default function Almacenes({ navigation }: AlmacenesScreenProps ) {

  const { theme, colors } = useTheme();
  const styles = getStyles(colors);

  //JSONs de datos
  const sucursales = (datos.SUCURSALES || {});
  const almacenes = (datosA.ALMACENES || {});
  const productos = Object.fromEntries(
  Object.entries(datos.LISTA_PRECIOS || {}).filter(
      ([id, data]) => data[4] === "producto"));

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
        underlayColor={colors.navIconUnderlay} style={styles.navIcons}
        onPress={() => navigation.navigate("Compras")}
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
        style={styles.navIconsS} 
      >
        <Ionicons name="cube-outline" size={20} color={colors.text} /></TouchableHighlight>

        <TouchableHighlight
        underlayColor={colors.navIconUnderlay} style={styles.navIcons}
        onPress={() => navigation.navigate("ListaDePrecios")} 
      >
        <Ionicons name="pricetag-outline" size={20} color={colors.text} /></TouchableHighlight>

    </View>
      
        <View style={styles.space}>

          <Text style={{ fontSize: 25, fontWeight: 'bold', color: colors.text }}>
          <Ionicons name="cube" size={25} color={colors.text} /> Almacenes
          </Text>
          <Text style={{ fontSize: 20, color: colors.text}}>
          Seleccione una sección:
          </Text>

        <TouchableHighlight 
        underlayColor={colors.primaryUnderlay}
        onPress={() => navigation.navigate("AlmacenesInfo")}
        style={styles.touch}>
          <Text style={styles.touchText}>Almacenes</Text>
          </TouchableHighlight>

          <TouchableHighlight 
        underlayColor={colors.primaryUnderlay}
        onPress={() => {
          if(Object.keys(sucursales).length > 0 && Object.keys(almacenes).length > 0){
          navigation.navigate("ExistenciasAlmacen")
        }
        else Alert.alert("Sección no disponible", "Para usar esta función, asegurese de tener al menos una sucursal y un almacén")
      }}
        style={styles.touch}>
          <Text style={styles.touchText}>Existencias por almacén</Text>
          </TouchableHighlight>

          <TouchableHighlight 
        underlayColor={colors.primaryUnderlay}
        onPress={() => {
          if(Object.keys(sucursales).length > 0 && Object.keys(almacenes).length > 0 && Object.keys(productos).length > 0){
          navigation.navigate("AjustesInventario")
          }
          else Alert.alert("Sección no disponible", "Para usar esta función, asegurese de tener al menos una sucursal, un almacén y un producto")
        }}
        style={styles.touch}>
          <Text style={styles.touchText}>Ajustes de inventario</Text>
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
    marginVertical: 40, marginHorizontal: 80,
    padding: 20,
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
