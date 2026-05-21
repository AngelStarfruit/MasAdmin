import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, ScrollView, TouchableHighlight, Image, TextInput} from 'react-native';
import Constants from 'expo-constants';
import { useState } from 'react';
import type { SucursalesScreenProps } from './types';

import C from '../assets/C.png'; import V from '../assets/V.png'; import S from '../assets/S.png';
import D from '../assets/D.png'; import A from '../assets/A.png'; import $ from '../assets/$.png';

export default function Sucursales({navigation}: SucursalesScreenProps) {

  const [selectedValue, setSelectedValue] = useState('hoy');

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.navigation}>

      <TouchableHighlight
        underlayColor={"#ddf"} style={styles.navIcons}
        onPress={() => navigation.navigate("Dashboard")}
      >
        <Image source={D} style={styles.navIconImage}/></TouchableHighlight>

      <TouchableHighlight
        underlayColor={"#ddf"} style={styles.navIcons}
        onPress={() => navigation.navigate("Compras")}
      >
        <Image source={C} style={styles.navIconImage}/></TouchableHighlight>

        <TouchableHighlight
        underlayColor={"#ddf"} style={styles.navIcons}
        onPress={() => navigation.navigate("Ventas")}
      >
        <Image source={V} style={styles.navIconImage}/></TouchableHighlight>

      <TouchableHighlight
        style={styles.navIconsS}
      >
        <Image source={S} style={styles.navIconImage}/></TouchableHighlight>

        <TouchableHighlight
        underlayColor={"#ddf"} style={styles.navIcons}
        onPress={() => navigation.navigate("Almacenes")} 
      >
        <Image source={A} style={styles.navIconImage}/></TouchableHighlight>

        <TouchableHighlight
        underlayColor={"#ddf"} style={styles.navIcons}
        onPress={() => navigation.navigate("ListaDePrecios")} 
      >
        <Image source={$} style={styles.navIconImage}/></TouchableHighlight>

    </View>

      <ScrollView>
        <View style={styles.scroll}>
        <Text style={{  fontSize: 25, fontWeight: 'bold' }}>
        Sucursales
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TouchableHighlight
        underlayColor={'#f0f1ff'}
        onPress={() => alert("add")}
        style={styles.add}>
            <Text style={{fontWeight: 'bold'}}>Añadir sucursal</Text>
          </TouchableHighlight>
          <TextInput style={styles.query}
          placeholder="Buscar" placeholderTextColor="#aaa"/>
          </View>
        <View style={styles.table}>
              <View style={styles.row}>
                  <View style={styles.headerCell}>
                      <Text style={styles.headerText}>Sucursal</Text>
                      </View>
                  <View style={styles.headerCell}>
                      <Text style={styles.headerText}>Teléfono</Text>
                      </View>
                  </View>
                      <View style={styles.row}>
                      <View style={styles.cellF}><Text>Altama</Text></View>
                      <View style={styles.cell}><Text>123-456-7890</Text></View>
                </View>
          </View>
        
        </View>
      </ScrollView>
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
  scroll: {
    flex: 1,
    backgroundColor: '#eee',
    padding: 18,
  },
  box: {
    flex: 1,
    textAlign: 'center',
    backgroundColor: '#e3e5ff',
    fontWeight: 'bold', fontSize: 20, color: '#2435f0',
    paddingVertical: 40, marginVertical: 10,
    borderRadius: 10,
  },
  add: {
    backgroundColor: 'white',
    height: 40, width: 150,
    marginTop: 10,
    padding: 10
  },
  query: {
    backgroundColor: 'white', color: 'black', 
    borderWidth: 1, borderColor: 'black', 
    height: 40, width: 150,
    marginTop: 10,
  },
  //Tabla estilos
  table: {
    paddingVertical: 20,
  },
  row: {flexDirection: 'row',},
  headerCell: {
    flex: 1, padding: 12,
    backgroundColor: '#e3e5ff',
    borderWidth: 1,
    borderColor: 'black',
  },
  cell: {
    flex: 1, padding: 12,
    borderWidth: 1,
    backgroundColor: 'white',
  },
  cellF: {
    flex: 1, padding: 12,
    borderWidth: 1,
    backgroundColor: '#eee',
  },
  headerText: {fontWeight: 'bold',},
  //---------------
});
