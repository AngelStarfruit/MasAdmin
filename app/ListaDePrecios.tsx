import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, ScrollView, TouchableHighlight, Image} from 'react-native';
import Constants from 'expo-constants';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import type { ListaDePreciosScreenProps } from './types';

import C from '../assets/C.png'; import V from '../assets/V.png'; import S from '../assets/S.png';
import D from '../assets/D.png'; import A from '../assets/A.png'; import $ from '../assets/$.png';

export default function ListaDePrecios({ navigation }: ListaDePreciosScreenProps) {

  const [selectedValue, setSelectedValue] = useState('A');

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.navigation}>

      <TouchableHighlight
        underlayColor={"#ddf"} style={styles.navIcons}
        onPress={() => navigation.navigate("Dashboard")}
      >
        <Image source={D} style={styles.navIconImage} />
      </TouchableHighlight>

      <TouchableHighlight
        underlayColor={"#ddf"} style={styles.navIcons}
        onPress={() => navigation.navigate("Compras")}
      >
        <Image source={C} style={styles.navIconImage} />
      </TouchableHighlight>

        <TouchableHighlight
        underlayColor={"#ddf"} style={styles.navIcons}
        onPress={() => navigation.navigate("Ventas")}
      >
        <Image source={V} style={styles.navIconImage} />
      </TouchableHighlight>

      <TouchableHighlight
        underlayColor={"#ddf"} style={styles.navIcons}
        onPress={() => navigation.navigate("Sucursales")} 
      >
        <Image source={S} style={styles.navIconImage} />
      </TouchableHighlight>

        <TouchableHighlight
        underlayColor={"#ddf"} style={styles.navIcons}
        onPress={() => navigation.navigate("Almacenes")} 
      >
        <Image source={A} style={styles.navIconImage} />
      </TouchableHighlight>

        <TouchableHighlight
        style={styles.navIconsS} 
      >
        <Image source={$} style={styles.navIconImage} />
      </TouchableHighlight>

    </View>

      <ScrollView>
        <View style={styles.scroll}>
        <Text style={{  fontSize: 25, fontWeight: 'bold' }}>
          Lista de precios
        </Text>
        <Text style={{ 
          fontSize: 20, 
          paddingVertical: 10,}}>
          Inserte un grupo de productos
          </Text>
          <Picker
              selectedValue={selectedValue}
              onValueChange={(itemValue) => setSelectedValue(itemValue)}
              style={styles.picker} itemStyle={styles.pickerItem}
              >
                <Picker.Item label="A" value="A" />
          </Picker>
          <TouchableHighlight 
                underlayColor={'#f0f1ff'}
                onPress={() => alert("add")}
                style={styles.add}>
                    <Text style={{fontWeight: 'bold'}}>Añadir producto</Text>
                  </TouchableHighlight>
          <View style={styles.table}>
                <View style={styles.row}>
                        <View style={styles.headerCell}>
                          <Text style={styles.headerText}>Descripción</Text>
                          </View>
                        <View style={styles.headerCell}>
                          <Text style={styles.headerText}>Marca</Text>
                          </View>
                        <View style={styles.headerCell}>
                          <Text style={styles.headerText}>Costo</Text>
                          </View>
                      </View>
                      <View style={styles.row}>
                        <View style={styles.cellF}><Text>Jabón</Text></View>
                        <View style={styles.cell}><Text>ZOTE</Text></View>
                        <View style={styles.cell}><Text>$29.99</Text></View>
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
  add: {
    backgroundColor: 'white',
    width: 125,
    marginTop: 10,
    padding: 10
  },
  //Tabla estilos
  table: {
    paddingVertical: 20
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
  picker: {
    height: 50,
    marginLeft: 10,
    flex: 1,
    backgroundColor: 'white',
    color: 'black',
  },
  pickerItem: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
