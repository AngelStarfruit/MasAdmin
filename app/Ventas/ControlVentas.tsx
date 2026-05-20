import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, ScrollView, TouchableHighlight} from 'react-native';
import Constants from 'expo-constants';
import { useState } from 'react';
import type { ControlVentasScreenProps } from './types';

export default function ControlVentas({ navigation }: ControlVentasScreenProps ) {

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
        underlayColor={"#ddf"} style={styles.navIcons}
        onPress={() => alert("6")} 
      >
        <Text>B</Text></TouchableHighlight>
    </View>

      <ScrollView>
        <View style={styles.scroll}>
        <Text style={{  fontSize: 25, fontWeight: 'bold' }}>
        Control ventas
        </Text>
        <TouchableHighlight 
        underlayColor={'#f0f1ff'}
        onPress={() => alert("add")}
        style={styles.add}>
            <Text style={{fontWeight: 'bold'}}>Añadir registro de venta</Text>
          </TouchableHighlight>
        <View style={styles.table}>
              <View style={styles.row}>
                  <View style={styles.headerCell}>
                      <Text style={styles.headerText}>Fecha</Text>
                      </View>
                  <View style={styles.headerCell}>
                      <Text style={styles.headerText}>Total</Text>
                      </View>
                  <View style={styles.headerCell}>
                      <Text style={styles.headerText}>Proveedor</Text>
                      </View>
                  </View>
                      <View style={styles.row}>
                      <View style={styles.cell}><Text>herramienta</Text></View>
                      <View style={styles.cell}><Text>algo que usar</Text></View>
                      <View style={styles.cell}><Text>17</Text></View>
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
    backgroundColor: 'white',
    width: 200,
    marginTop: 10,
    padding: 10,
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
  headerText: {fontWeight: 'bold',},
  //---------------
});
