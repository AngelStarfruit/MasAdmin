import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, Image, Modal } from 'react-native';
import Constants from 'expo-constants';
import type { ControlGastosScreenProps } from './types';
import { useState } from 'react';
import datos from './datos.json'

export default function ControlGastos({ navigation }: ControlGastosScreenProps) {

  const getImage = (nombre: any) => {
   return require('../../assets/B.png');
  }

  const [registrosGastos, setRegistrosGastos] = useState(datos.CONTROL_GASTOS)

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

    <View style={styles.navigation}>
            <TouchableHighlight
            underlayColor={"#ddd"} style={styles.navIcons}
            onPress={() => navigation.navigate("Compras")} 
          >
            <Image source={getImage('B')} style={styles.navIconImage}/>
          </TouchableHighlight>
        </View>

      <ScrollView>
        <View style={styles.scroll}>
        <Text style={{  fontSize: 25, fontWeight: 'bold' }}>
        Control de gastos
        </Text>

          <TouchableHighlight 
        underlayColor={'#f0f1ff'}
        onPress={() => navigation.navigate("AddRegistroGasto")}
        style={styles.add}>
            <Text style={{fontWeight: 'bold'}}>Añadir registro de gasto</Text>
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

                  {Object.entries(registrosGastos).slice(-10).map(([id, [fecha, total, proveedor]], index) => (
                      <View style={styles.row}>
                      <View style={styles.cell}><Text>{fecha}</Text></View>
                      <View style={styles.cell}><Text>{Number(total).toFixed(2)}</Text></View>
                      <View style={styles.cell}><Text>{proveedor}</Text></View>
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
    width: 200,
    marginTop: 10,
    padding: 10,
    borderRadius: 15,
    elevation: 5,
    shadowColor: "#000", shadowOffset: {height: 2, width: 0,}
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
  headerText: {fontWeight: 'bold',},
});
