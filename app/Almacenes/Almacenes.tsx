import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, ScrollView, TouchableHighlight, Image} from 'react-native';
import Constants from 'expo-constants';
import { AlmacenesScreenProps } from './types';

import C from '../../assets/C.png'; import V from '../../assets/V.png'; import S from '../../assets/S.png';
import D from '../../assets/D.png'; import A from '../../assets/A.png'; import $ from '../../assets/$.png';

export default function Almacenes({ navigation }: AlmacenesScreenProps ) {

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.navigation}>

      <TouchableHighlight
        underlayColor={"#ddf"} style={styles.navIcons}
        onPress={() => navigation.navigate("Dashboard")}
      >
        <Image source={D} style={styles.navIconImage} /></TouchableHighlight>

      <TouchableHighlight
        underlayColor={"#ddf"} style={styles.navIcons}
        onPress={() => navigation.navigate("Compras")}
      >
        <Image source={C} style={styles.navIconImage} /></TouchableHighlight>

        <TouchableHighlight
        underlayColor={"#ddf"} style={styles.navIcons}
        onPress={() => navigation.navigate("Ventas")}
      >
        <Image source={V} style={styles.navIconImage} /></TouchableHighlight>

      <TouchableHighlight
        underlayColor={"#ddf"} style={styles.navIcons}
        onPress={() => navigation.navigate("Sucursales")} 
      >
        <Image source={S} style={styles.navIconImage} /></TouchableHighlight>

        <TouchableHighlight
        style={styles.navIconsS} 
      >
        <Image source={A} style={styles.navIconImage} /></TouchableHighlight>

        <TouchableHighlight
        underlayColor={"#ddf"} style={styles.navIcons}
        onPress={() => navigation.navigate("ListaDePrecios")} 
      >
        <Image source={$} style={styles.navIconImage} /></TouchableHighlight>

    </View>
      
        <View style={styles.space}>

          <Text style={{ fontSize: 25, fontWeight: 'bold' }}>
          Almacenes
          </Text>
          <Text style={{ fontSize: 20}}>
          Seleccione una sección:
          </Text>

        <TouchableHighlight 
        underlayColor={'#0015cd'}
        onPress={() => navigation.navigate("AlmacenesInfo")}
        style={styles.touch}>
          <Text style={styles.touchText}>Almacenes</Text>
          </TouchableHighlight>

          <TouchableHighlight 
        underlayColor={'#0015cd'}
        onPress={() => navigation.navigate("ExistenciasAlmacen")}
        style={styles.touch}>
          <Text style={styles.touchText}>Existencias por almacen</Text>
          </TouchableHighlight>

          <TouchableHighlight 
        underlayColor={'#0015cd'}
        onPress={() => navigation.navigate("AjustesInventario")}
        style={styles.touch}>
          <Text style={styles.touchText}>Ajustes de inventario</Text>
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
    marginVertical: 40, marginHorizontal: 80,
    padding: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchText: {
    color: 'white',
    fontWeight: 'bold', fontSize: 30,
    textAlign: 'center',
  },
});
