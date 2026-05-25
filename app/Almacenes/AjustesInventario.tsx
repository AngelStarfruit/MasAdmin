import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, ScrollView, TouchableHighlight, Image, Modal} from 'react-native';
import Constants from 'expo-constants';
import { useState } from 'react';
import type { AjustesInventarioScreenProps } from './types';

import B from '../../assets/B.png';
import x from '../../assets/x.png';

export default function AjustesInventario({ navigation }: AjustesInventarioScreenProps ) {

  const [modalVisible, setModalVisible] = useState(false);

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

    {/* Modal para realizar ajustes*/}
                  <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                          setModalVisible(!modalVisible);
                        }}>
                        <View style={styles.modalOverlay}>
                        <View style={styles.modalView}>
              
                          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                            <TouchableHighlight
                            underlayColor={'#ccc'}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Image source={x} style={styles.lupaImage}/>
                            </TouchableHighlight>
                          </View>
              
                          <View>
                            <Text style={styles.modalTitle}>Realizar ajuste</Text>
                          </View>
              
                        </View>
                        </View>
                      </Modal>

      <ScrollView>
        <View style={styles.scroll}>
        <Text style={{  fontSize: 25, fontWeight: 'bold' }}>
        Ajustes de inventario
        </Text>
        <TouchableHighlight 
                underlayColor={'#ddd'}
                onPress={() => setModalVisible(true)}
                style={styles.add}>
                    <Text style={{fontWeight: 'bold'}}>Realizar ajuste</Text>
                  </TouchableHighlight>
        <View style={styles.table}>
              <View style={styles.row}>
                  <View style={styles.headerCell}>
                      <Text style={styles.headerText}>Almacen afectado</Text>
                      </View>
                  <View style={styles.headerCell}>
                      <Text style={styles.headerText}>Operación</Text>
                      </View>
                  <View style={styles.headerCell}>
                      <Text style={styles.headerText}>Fecha de ajuste</Text>
                      </View>
                  </View>
                      <View style={styles.row}>
                      <View style={styles.cell}><Text>Almacen objetos</Text></View>
                      <View style={styles.cell}><Text>entrada</Text></View>
                      <View style={styles.cell}><Text>3-03-2023</Text></View>
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
    width: 150,
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
  //Modal estilos
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  modalView: {
    marginHorizontal: 30, marginVertical: 30,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 30, fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
   hr:{
    height: 2, 
    backgroundColor: '#bbb', 
    marginBottom: 15,
  },
  modalRow:{
    flexDirection: 'row', 
    justifyContent: 'space-evenly', 
    marginBottom: 15,
    alignItems: 'center',
  },
  modalLabel:{
    fontSize: 20, fontWeight: 'bold',
  },
  modalConfirm: {
    backgroundColor: '#62ff77',
    padding: 10,
    borderRadius: 15,
    width: 130,
    justifyContent: 'center', alignItems: 'center',
  },
});