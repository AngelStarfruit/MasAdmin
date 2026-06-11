import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, ScrollView, TouchableHighlight, Image} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Constants from 'expo-constants';
import { useState } from 'react';
import type { ExistenciasAlmacenScreenProps } from './types';
import datosS from '../datos.json'; import datosA from './datos.json';

export default function ExistenciasAlmacen({ navigation }: ExistenciasAlmacenScreenProps ) {

  const getImage = (nombre: any) => {
   return require('../../assets/B.png');
  }

  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedValue, setSelectedValue] = useState('');

  //JSONs para datos
  const [sucursales, setSucursales] = useState(datosS.SUCURSALES)
  const [almacenes, setAlmacenes] = useState(datosA.ALMACENES)
  const [existencias, setExistencias] = useState(datosA.EXISTENCIAS_ALMACEN)

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.navigation}>
        <TouchableHighlight
        underlayColor={"#ddf"} style={styles.navIcons}
        onPress={() => navigation.navigate("Almacenes")} 
      >
        <Image source={getImage('B')} style={styles.navIconImage} /></TouchableHighlight>
    </View>

      <ScrollView>
        <View style={styles.scroll}>
        <Text style={{  fontSize: 25, fontWeight: 'bold' }}>
        Existencias por almacén
        </Text>
        <Text style={{ 
          fontSize: 15, 
          paddingVertical: 10,}}>
          Inserte una sucursal
          </Text>
          <Picker
              selectedValue={selectedBranch}
              onValueChange={(itemValue) => setSelectedBranch(itemValue)}
              style={styles.picker} itemStyle={styles.pickerItem}
              >
              {Object.values(sucursales || {}).length > 0 ? (
                Object.values(sucursales).map((sucursal: any, index) => (
                <Picker.Item 
                style={styles.pickerItem} 
                key={index} 
                label={String(sucursal[0])} 
                value={String(sucursal[0])} 
                />
                ))
                ) : (
                <Picker.Item label="-" value="" />
                )}
          </Picker>
        <Text style={{ 
          fontSize: 15, 
          paddingVertical: 10,}}>
          Inserte un almacén para ver sus existencias
          </Text>
          <Picker
              selectedValue={selectedValue}
              onValueChange={(itemValue) => setSelectedValue(itemValue)}
              style={styles.picker} itemStyle={styles.pickerItem}
              >
              {Object.entries(almacenes).map(([id, [almacen, sucursal]], index) => (
                <Picker.Item key={index} label={almacen} value={sucursal} />
              ))}
          </Picker>
        <View style={styles.table}>
              <View style={styles.row}>
                  <View style={styles.headerCell}>
                      <Text style={styles.headerText}>Poducto</Text>
                      </View>
                  <View style={styles.headerCell}>
                      <Text style={styles.headerText}>Marca</Text>
                      </View>
                  <View style={styles.headerCell}>
                      <Text style={styles.headerText}>Cantidad</Text>
                      </View>
                  <View style={styles.headerCell}>
                      <Text style={styles.headerText}>Precio</Text>
                      </View>
                  </View>

                  {Object.entries(existencias).map(([id, [descripcion, marca, cantidad, precio, almacen]], index) => (
                      <View key={index} style={styles.row}>
                      <View style={styles.cell}><Text>{descripcion}</Text></View>
                      <View style={styles.cell}><Text>{marca}</Text></View>
                      <View style={styles.cell}><Text>{cantidad}</Text></View>
                      <View style={styles.cell}><Text>{Number(precio).toFixed(2)}</Text></View>
                </View>
                ))}

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
  //Tabla estilos
  table: {
    paddingVertical: 20,
    elevation: 5,
    shadowColor: "#000", shadowOffset: {height: 2, width: 0,}
  },
  row: {flexDirection: 'row',},
  headerCell: {
    flex: 1, padding: 6,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
  },
  cell: {
    flex: 1, padding: 6,
    borderWidth: 1,
    backgroundColor: 'white',
  },
  headerText: {fontWeight: 'bold', color: '#2435f0',},
  //---------------
  picker: {
    height: 50,
    marginLeft: 10,
    flex: 1,
    backgroundColor: '#eee',
    color: 'black',
  },
  pickerItem: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
