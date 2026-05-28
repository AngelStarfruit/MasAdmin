import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, ScrollView, TouchableHighlight, Image} from 'react-native';
import Constants from 'expo-constants';
import type { VentasScreenProps } from './types';

export default function Ventas({ navigation }: VentasScreenProps ) {

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
        underlayColor={"#ddf"} style={styles.navIcons}
        onPress={() => navigation.navigate("Compras")}
      >
        <Image source={getImage('C')} style={styles.navIconImage} /></TouchableHighlight>

        <TouchableHighlight
        style={styles.navIconsS}
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
          Ventas
          </Text>
          <Text style={{ fontSize: 20}}>
          Seleccione una sección:
          </Text>

        <TouchableHighlight 
        underlayColor={'#0015cd'}
        onPress={() => navigation.navigate("Clientes")}
        style={styles.touch}>
          <Text style={styles.touchText}>Clientes</Text>
          </TouchableHighlight>
          
          <TouchableHighlight 
        underlayColor={'#0015cd'}
        onPress={() => navigation.navigate("ControlVentas")}
        style={styles.touch}>
          <Text style={styles.touchText}>Control de ventas</Text>
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
    margin: 80,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchText: {
    color: 'white',
    fontWeight: 'bold', fontSize: 30,
    textAlign: 'center',
  },
});
