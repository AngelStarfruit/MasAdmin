import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, ScrollView, TouchableHighlight, Image} from 'react-native';
import Constants from 'expo-constants';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import type { DashboardScreenProps } from './types';

import C from '../assets/C.png'; import V from '../assets/V.png'; import S from '../assets/S.png';
import D from '../assets/D.png'; import A from '../assets/A.png'; import $ from '../assets/$.png';

export default function Dashboard({navigation}: DashboardScreenProps ) {

  const [selectedValue, setSelectedValue] = useState('hoy');

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

    <View style={{paddingLeft: 10}}>
      <Text style={{
        fontSize:40,
        fontWeight: 'bold',
        color: '#2435f0',
      }}>MasAdmin</Text>
    </View>
      <View style={styles.navigation}>

      <TouchableHighlight
        style={styles.navIconsS}
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
        underlayColor={"#ddf"} style={styles.navIcons}
        onPress={() => navigation.navigate("Sucursales")} 
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
        <Text style={{ fontSize: 30, fontWeight: 'bold', 
          color: '#2435f0', paddingBottom: 10}}>
        Bienvenido, Ángel
        </Text>
        <Text style={{ fontSize: 25, fontWeight: 'bold' }}>
          Dashboard
          </Text>
          <View style={{flexDirection:'row'}}>
          <Text style={{ 
          fontSize: 20, 
          paddingTop: 10,}}>
          Mostrar información de:
          </Text>
          <Picker
            selectedValue={selectedValue}
            onValueChange={(itemValue) => setSelectedValue(itemValue)}
            style={styles.picker} itemStyle={styles.pickerItem}
            >
              <Picker.Item label="Hoy" value="hoy" />
              <Picker.Item label="Esta semana" value="semana" />
              <Picker.Item label="Este mes" value="mes" />
              <Picker.Item label="Este año" value="año" />
          </Picker>
          </View>
          <Text style={styles.box}>
            Ventas: $1000
            </Text>
          <Text style={styles.box}>
            Compras: $500
            </Text>
          <Text style={styles.box}>
            Gastos: $200
            </Text>
            <View style={styles.hr}/>
          <Text style={{ fontSize: 25, fontWeight: 'bold', 
            paddingBottom: 10
          }}>
          Agenda
          </Text>
          <View>
            <View style={styles.row}>
              <View style={styles.headerCell}>
                <Text style={styles.headerText}>Evento</Text>
                </View>
              <View style={styles.headerCell}>
                <Text style={styles.headerText}>Fecha</Text>
                </View>
              <View style={styles.headerCell}>
                <Text style={styles.headerText}>Lugar</Text>
                </View>
              <View style={styles.headerCell}>
                <Text style={styles.headerText}>Contacto</Text>
                </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}><Text>hjsakldfhl</Text></View>
              <View style={styles.cell}><Text>2023-10-15</Text></View>
              <View style={styles.cell}><Text>Centro de Convenciones</Text></View>
              <View style={styles.cell}><Text>contacto@evento.com</Text></View>
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
    backgroundColor: "white",
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
    fontWeight: 'bold', fontSize: 30, color: '#2435f0',
    paddingVertical: 40, marginVertical: 10,
    borderRadius: 10,
  },
  hr:{
    height: 1, 
    backgroundColor: '#bbb', 
    marginVertical: 8,
  },
  //Tabla estilos
  row: {flexDirection: 'row',},
  headerCell: {
    flex: 1, padding: 12,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
  },
  cell: {
    flex: 1, padding: 12,
    borderWidth: 1,
    backgroundColor: 'white',
  },
  headerText: {fontWeight: 'bold',},
  //---------------
  picker: {
    height: 50,
    marginLeft: 10,
    flex: 1,
    backgroundColor: 'white',
  },
  pickerItem: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
