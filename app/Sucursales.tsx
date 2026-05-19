import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, ScrollView, TouchableHighlight} from 'react-native';
import Constants from 'expo-constants';
import { useState } from 'react';

export default function Sucursales() {

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
        onPress={() => alert("1")}
      >
        <Text>D</Text></TouchableHighlight>
      <TouchableHighlight
        underlayColor={"#ddf"} style={styles.navIcons}
        onPress={() => alert("2")}
      >
        <Text>C</Text></TouchableHighlight>
        <TouchableHighlight
        underlayColor={"#ddf"} style={styles.navIcons}
        onPress={() => alert("3")}
      >
        <Text>V</Text></TouchableHighlight>
      <TouchableHighlight
        underlayColor={"#ddf"} style={styles.navIcons}
        onPress={() => alert("4")} 
      >
        <Text>S</Text></TouchableHighlight>
        <TouchableHighlight
        underlayColor={"#ddf"} style={styles.navIcons}
        onPress={() => alert("5")} 
      >
        <Text>A</Text></TouchableHighlight>
        <TouchableHighlight
        underlayColor={"#ddf"} style={styles.navIcons}
        onPress={() => alert("6")} 
      >
        <Text>$</Text></TouchableHighlight>
    </View>

      <ScrollView>
        <View style={styles.scroll}>
        <Text style={{  fontSize: 25, fontWeight: 'bold' }}>
        Sucursales
        </Text>
        <TouchableHighlight 
        underlayColor={'#f0f1ff'}
        onPress={() => alert("add")}
        style={styles.add}>
            <Text style={{fontWeight: 'bold'}}>Añadir sucursal</Text>
          </TouchableHighlight>
        <View style={styles.table}>
              <View style={styles.row}>
                  <View style={styles.headerCell}>
                      <Text style={styles.headerText}>Marca</Text>
                      </View>
                  <View style={styles.headerCell}>
                      <Text style={styles.headerText}>Descripción</Text>
                      </View>
                  <View style={styles.headerCell}>
                      <Text style={styles.headerText}>Cantidad</Text>
                      </View>
                  <View style={styles.headerCell}>
                      <Text style={styles.headerText}>Costo</Text>
                      </View>
                  </View>
                      <View style={styles.row}>
                      <View style={styles.cell}><Text>herramienta</Text></View>
                      <View style={styles.cell}><Text>algo que usar</Text></View>
                      <View style={styles.cell}><Text>17</Text></View>
                      <View style={styles.cell}><Text>$59.99</Text></View>
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
    padding: 10, 
    borderRadius: 50 ,
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
    width: 125,
    marginTop: 10,
    padding: 10
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
