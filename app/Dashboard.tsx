import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, ScrollView, TouchableHighlight} from 'react-native';
import Constants from 'expo-constants';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';

export default function App() {

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
        <Text>1</Text></TouchableHighlight>
      <TouchableHighlight
        underlayColor={"#ddf"} style={styles.navIcons}
        onPress={() => alert("2")}
      >
        <Text>2</Text></TouchableHighlight>
        <TouchableHighlight
        underlayColor={"#ddf"} style={styles.navIcons}
        onPress={() => alert("3")}
      >
        <Text>3</Text></TouchableHighlight>
      <TouchableHighlight
        underlayColor={"#ddf"} style={styles.navIcons}
        onPress={() => alert("4")} 
      >
        <Text>4</Text></TouchableHighlight>
        <TouchableHighlight
        underlayColor={"#ddf"} style={styles.navIcons}
        onPress={() => alert("5")} 
      >
        <Text>5</Text></TouchableHighlight>
        <TouchableHighlight
        underlayColor={"#ddf"} style={styles.navIcons}
        onPress={() => alert("6")} 
      >
        <Text>6</Text></TouchableHighlight>
    </View>

      <ScrollView>
        <View style={styles.scroll}>
        <Text style={{ fontSize: 30, fontWeight: 'bold', 
          color: '#2435f0', paddingBottom: 10}}>
        Bienvenido
        </Text>
        <Text style={{ fontSize: 25, fontWeight: 'bold' }}>
          Dashboard
          </Text>
          <View style={{flexDirection:'row'}}>
          <Text style={{ 
          fontSize: 20, 
          paddingTop: 10,
          }}>
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
          <View style={styles.table}>
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
  hr:{
    height: 1, 
    backgroundColor: '#bbb', 
    marginVertical: 8,
  },
  //Tabla estilos
  table: {
    borderWidth: 1,
    borderColor: 'black',
  },
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
