import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, ScrollView, TouchableHighlight, Image, TextInput} from 'react-native';
import Constants from 'expo-constants';
import { useState } from 'react';
import type { AlmacenesInfoScreenProps } from './types';

import B from '../../assets/B.png'; import lupa from '../../assets/lupa.png';

export default function AlmacenesInfo({ navigation }: AlmacenesInfoScreenProps ) {

  const [selectedValue, setSelectedValue] = useState('hoy');

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.navigation}>
        <TouchableHighlight
        underlayColor={"#ddf"} style={styles.navIcons}
        onPress={() => navigation.navigate("Almacenes")} 
      >
        <Image source={B} style={styles.navIconImage} /></TouchableHighlight>
    </View>

      <ScrollView>
        <View style={styles.scroll}>
        <Text style={{  fontSize: 25, fontWeight: 'bold' }}>
        Almacenes
        </Text>

        <Text style={{ 
          fontSize: 15, 
          paddingVertical: 10,}}>
          Seleccione el nombre de un almacen en la tabla para modificar sus datos.
          </Text>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableHighlight
                underlayColor={'#ddd'}
                onPress={() => alert("add")}
                style={styles.add}>
                    <Text style={{fontWeight: 'bold'}}>Añadir almacen</Text>
                  </TouchableHighlight>
                  <View style={{flexDirection: 'row'}}>
                    <TextInput style={styles.query}
                    placeholder="Buscar" placeholderTextColor="#aaa"/>
                    <TouchableHighlight
                    underlayColor={'#ddd'}
                    onPress={() => alert("search")}
                    style={{...styles.add, width: 40, padding: 10}}>
                    <Image source={lupa} style={styles.lupaImage}/>
                      </TouchableHighlight>
                      </View>
                  </View>

        <View style={styles.table}>
              <View style={styles.row}>
                  <View style={styles.headerCell}>
                      <Text style={styles.headerText}>Almacen</Text>
                      </View>
                  <View style={styles.headerCell}>
                      <Text style={styles.headerText}>Sucursal</Text>
                      </View>
                  </View>
                      <View style={styles.row}>
                      <View style={styles.cellF}>
                          <TouchableHighlight
                          underlayColor={'#ddd'}
                          onPress={() => alert("edit")}>
                          <Text>Objetos</Text>
                          </TouchableHighlight>
                          </View> 
                      <View style={styles.cell}><Text>Altama</Text></View>
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
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  navIcons:{
    padding: 10, 
    borderRadius: 50 ,
    marginTop: 20,
  },
  navIconImage: {
    width: 20, height: 20,
  },
  lupaImage: {
    width: 15, height: 15,
  },
  scroll: {
    flex: 1,
    backgroundColor: 'white',
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
    backgroundColor: '#eee',
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
