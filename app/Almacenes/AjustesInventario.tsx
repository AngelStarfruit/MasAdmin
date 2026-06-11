import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, Image} from 'react-native';
import Constants from 'expo-constants';
import { useState } from 'react';
import type { AjustesInventarioScreenProps } from './types';
import datos from './datos.json'

export default function AjustesInventario({ navigation }: AjustesInventarioScreenProps ) {

  const getImage = (nombre: any) => {
   return require('../../assets/B.png');
  }

  const [ajustesInventario, setAjustesInventario] = useState(datos.AJUSTES_INVENTARIO);

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
        Ajustes de inventario
        </Text>
        <TouchableHighlight 
                underlayColor={'#ddd'}
                onPress={() => navigation.navigate("AddAjustesInventario")}
                style={styles.add}>
                    <Text style={{fontWeight: 'bold'}}>Realizar ajuste</Text>
                  </TouchableHighlight>
        <View style={styles.table}>
              <View style={styles.row}>
                  <View style={styles.headerCell}>
                      <Text style={styles.headerText}>Almacen afectado</Text>
                      </View>
                  <View style={[styles.headerCell, {flex: 0.6}]}>
                      <Text style={styles.headerText}>Operación</Text>
                      </View>
                  <View style={styles.headerCell}>
                      <Text style={styles.headerText}>Fecha de ajuste</Text>
                      </View>
                  </View>

                  {Object.values(ajustesInventario || {}).length > 0 ? (
                   Object.entries(ajustesInventario).map(([id, data]: [string, any]) => {
                    const [almacenAfectado, operacion, fechaAjuste] = data;
                    return(
                      <View key={id} style={styles.row}>
                      <View style={styles.cell}><Text>{almacenAfectado}</Text></View>
                      <View style={[styles.cell, {flex: 0.6}]}><Text>{operacion}</Text></View>
                      <View style={styles.cell}><Text>{fechaAjuste}</Text></View>
                </View>
                    )
                })
              ) : (
            <Text style={{opacity: 0.8, marginVertical: 20, textAlign: 'center'}}>Esperando a que efectúe un ajuste...</Text>
            )}

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
    width: 150,
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
  headerText: {fontWeight: 'bold', color: '#2435f0',},
});