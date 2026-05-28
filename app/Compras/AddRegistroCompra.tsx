import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, Image, Modal } from 'react-native';
import Constants from 'expo-constants';
import type { AddRegistroCompraScreenProps } from './types';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';

export default function AddRegistroCompra({ navigation }: AddRegistroCompraScreenProps) {

  const getImage = (nombre: any) => {
   return require('../../assets/B.png');
  }

  const [selectedProvider, setSelectedProvider] = useState('A');
  const [selectedBranch, setSelectedBranch] = useState('1');

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

    <View style={styles.navigation}>
            <TouchableHighlight
            underlayColor={"#ddd"} style={styles.navIcons}
            onPress={() => navigation.navigate("ControlCompras")} 
          >
            <Image source={getImage('B')} style={styles.navIconImage}/>
          </TouchableHighlight>
        </View>

      <ScrollView>
        <View style={styles.scroll}>
        <Text style={{  fontSize: 25, fontWeight: 'bold' }}>
        Realizar compra
        </Text>

        <View style={styles.row}>
          <Text style={styles.textRow}>Proveedor:</Text>
          <View style={{width:150}}>
          <Picker
            style={styles.picker}
            selectedValue={selectedProvider}
            onValueChange={(itemValue) => setSelectedProvider(itemValue)}
          >
            <Picker.Item style={styles.pickerItem} label="A" value="A" />
          </Picker></View>
        </View>
        <View style={styles.row}>
          <Text style={styles.textRow}>Sucursal afectada:</Text>
          <View style={{width:150}}>
          <Picker
            style={styles.picker}
            selectedValue={selectedBranch}
            onValueChange={(itemValue) => setSelectedBranch(itemValue)}
          >
            <Picker.Item style={styles.pickerItem} label="1" value="1" />
          </Picker></View>
        </View>

        <View style={styles.table}>
              <View style={styles.tableRow}>
                  <View style={styles.headerCell}>
                      <Text style={styles.headerText}>Descripción</Text>
                      </View>
                  <View style={styles.headerCell}>
                      <Text style={styles.headerText}>Marca</Text>
                      </View>
                  <View style={styles.headerCell}>
                      <Text style={styles.headerText}>Costo</Text>
                      </View>
                  <View style={styles.headerCell}>
                      <Text style={styles.headerText}>Cantidad</Text>
                      </View>
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
  scroll: {
    flex: 1,
    backgroundColor: 'white',
    padding: 18,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  textRow:{
    fontSize: 20, 
    paddingVertical: 5, 
    fontWeight: 'bold',
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
    width: 200,
    marginTop: 10,
    padding: 10,
  },
  //Tabla estilos
  table: {
    paddingVertical: 20,
  },
  tableRow: {flexDirection: 'row',},
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
  headerText: {fontWeight: 'bold',},
  //------------------
  picker: {
    height: 50,
    marginLeft: 10,
    flex: 1,
    backgroundColor: '#eee', color: 'black',
  },
  pickerItem: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  
});
