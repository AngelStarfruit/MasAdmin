import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableHighlight, Image, Alert } from 'react-native';
import Constants from 'expo-constants';
import type { ComprasScreenProps } from './types';
import datosP from './datos.json'; import datos from '../datos.json'; import datosA from '../Almacenes/datos.json';

export default function Compras({ navigation }: ComprasScreenProps ) {

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
      <StatusBar style="auto" />
      <View style={styles.navigation}>

      <TouchableHighlight
        underlayColor={"#ddf"} style={styles.navIcons}
        onPress={() => navigation.navigate("Dashboard")}
      >
        <Image source={getImage('D')} style={styles.navIconImage} /></TouchableHighlight>

      <TouchableHighlight
        style={styles.navIconsS}
      >
        <Image source={getImage('C')} style={styles.navIconImage} /></TouchableHighlight>

        <TouchableHighlight
        underlayColor={"#ddf"} style={styles.navIcons}
        onPress={() => navigation.navigate("Ventas")}
      >
        <Image source={getImage('V')} style={styles.navIconImage} /></TouchableHighlight>

      <TouchableHighlight
        underlayColor={"#ddf"} style={styles.navIcons}
        onPress={() => navigation.navigate("Sucursales")} 
      >
        <Image source={getImage('S')} style={styles.navIconImage} /></TouchableHighlight>

        <TouchableHighlight
        underlayColor={"#ddf"} style={styles.navIcons}
        onPress={() => navigation.navigate("Almacenes")} 
      >
        <Image source={getImage('A')} style={styles.navIconImage} /></TouchableHighlight>

        <TouchableHighlight
        underlayColor={"#ddf"} style={styles.navIcons}
        onPress={() => navigation.navigate("ListaDePrecios")} 
      >
        <Image source={getImage('$')} style={styles.navIconImage} /></TouchableHighlight>

    </View>
      
        <View style={styles.space}>

        <Text style={{ fontSize: 25, fontWeight: 'bold' }}>
          Compras
          </Text>
          <Text style={{ fontSize: 20}}>
          Seleccione una sección:
          </Text>

        <TouchableHighlight 
        underlayColor={'#0015cd'}
        onPress={() => navigation.navigate("Proveedores")}
        style={styles.touch}>
          <Text style={styles.touchText}>Proveedores</Text>
          </TouchableHighlight>

          <TouchableHighlight 
        underlayColor={'#0015cd'}
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
        underlayColor={'#0015cd'}
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

const styles = StyleSheet.create({
  container:{
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  navigation: {
    backgroundColor: "white",
    flexDirection: 'row', justifyContent: 'space-around',
    padding: 5,
    elevation: 5,
    shadowColor: "#000", shadowOffset: {height: 2, width: 0,}
  },
  navIcons:{
    padding: 10, borderRadius: 50 ,
  },
  navIconsS:{
    padding: 10, borderRadius: 50 , backgroundColor: '#ddf',
  },
  navIconImage: {
    width: 20, height: 20,
  },
  space: {
    flex: 1,
    backgroundColor: '#eee',
    padding: 18,
  },
  touch: {
    flex: 1,
    textAlign: 'center',
    backgroundColor: '#0012a8',
    marginHorizontal: 80, marginVertical: 40,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: "#000", shadowOffset: {height: 4, width: 0,}
  },
  touchText: {
    color: 'white',
    fontWeight: 'bold', fontSize: 30,
    textAlign: 'center',
  },
});
