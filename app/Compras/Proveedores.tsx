import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, Image, TextInput, Modal} from 'react-native';
import Constants from 'expo-constants';
import type { ProveedoresScreenProps } from './types';
import { useState } from 'react';

import B from '../../assets/B.png'; 
import lupa from '../../assets/lupa.png';
import x from '../../assets/x.png';

export default function Proveedores({ navigation }: ProveedoresScreenProps) {

  const [modalVisible, setModalVisible] = useState(false);
  const [EmodalVisible, setEModalVisible] = useState(false);
  const [Confirm, setConfirm] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.navigation}>
        <TouchableHighlight
        underlayColor={"#ddf"} style={styles.navIcons}
        onPress={() => navigation.navigate("Compras")} 
      >
        <Image source={B} style={styles.navIconImage}/>
      </TouchableHighlight>
    </View>

    {/* Modal para añadir proveedores */}
    <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
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
              <Text style={styles.modalTitle}>Añadir proveedor</Text>
            </View>

            <View style={styles.hr}/>

            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Empresa:</Text>
              <TextInput style={{...styles.query, width: 150}}/>
            </View>
            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Teléfono:</Text>
              <TextInput style={{...styles.query, width: 150}}/>
            </View>
            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Ciudad:</Text>
              <TextInput style={{...styles.query, width: 150}}/>
            </View>
            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Estado:</Text>
              <TextInput style={{...styles.query, width: 150}}/>
            </View>

            <View style={styles.hr}/>

            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <TouchableHighlight
              underlayColor={'#82ff92'} style={styles.modalConfirm}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text>Añadir registro</Text>
              </TouchableHighlight>
            </View>

          </View>
          </View>
        </Modal>

      {/* Modal para editar proveedores */}
    <Modal
          animationType="slide"
          transparent={true}
          visible={EmodalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
            setEModalVisible(!EmodalVisible);
          }}>
          <View style={styles.modalOverlay}>
          <View style={styles.modalView}>

            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
              <TouchableHighlight
              underlayColor={'#ccc'}
              onPress={() => setEModalVisible(!EmodalVisible)}>
              <Image source={x} style={styles.lupaImage}/>
              </TouchableHighlight>
            </View>

            <View>
              <Text style={styles.modalTitle}>Editar proveedor</Text>
            </View>

            <View style={styles.hr}/>

            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Empresa:</Text>
              <TextInput style={{...styles.query, width: 150}}/>
            </View>
            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Teléfono:</Text>
              <TextInput style={{...styles.query, width: 150}}/>
            </View>
            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Ciudad:</Text>
              <TextInput style={{...styles.query, width: 150}}/>
            </View>
            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Estado:</Text>
              <TextInput style={{...styles.query, width: 150}}/>
            </View>

            <View style={styles.hr}/>

            <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <TouchableHighlight
              underlayColor={'#f3fe53'} style={styles.modalEdit}
                onPress={() => setEModalVisible(!EmodalVisible)}>
                <Text>Editar registro</Text>
              </TouchableHighlight>
              <TouchableHighlight
              underlayColor={'#ff9797'} style={styles.modalDelete}
                onPress={() => setConfirm(true)}>
                <Text>Borrar registro</Text>
              </TouchableHighlight>
            </View>

          </View>
          </View>
        </Modal>

      {/* Modal para confirmar borrado */}
                        <Modal
                              animationType="slide"
                              transparent={true}
                              visible={Confirm}
                              onRequestClose={() => {
                                alert('Modal has been closed.');
                                setConfirm(!Confirm);
                              }}>
                              <View style={styles.modalOverlay}>
                              <View style={[styles.modalView, {marginVertical: 375}]}>
                    
                                <View>
                                  <Text style={styles.modalTitle}>¿Eliminar registro?</Text>
                                </View>
                    
                                <View style={styles.hr}/>
                    
                                <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                                  <TouchableHighlight
                                  underlayColor={'#ddd'} style={[styles.modalRegret, {width: 50}]}
                                    onPress={() => setConfirm(!Confirm)}>
                                    <Text>NO</Text>
                                  </TouchableHighlight>
                                  <TouchableHighlight
                                  underlayColor={'#ff9797'} style={[styles.modalDelete, {width: 50}]}
                                    onPress={() => {
                                      setConfirm(!Confirm);
                                      setEModalVisible(!EmodalVisible);
                                    }}>
                                    <Text>SÍ</Text>
                                  </TouchableHighlight>
                                </View>
                    
                              </View>
                              </View>
                            </Modal>

      {/*ScrollView: */}
      <ScrollView>
        <View style={styles.scroll}>

        <Text style={{  fontSize: 25, fontWeight: 'bold' }}>
        Proveedores
        </Text>

        <Text style={{ 
          fontSize: 15, 
          paddingVertical: 10,}}>
          Seleccione la empresa de un proveedor en la tabla para modificar sus datos.
          </Text>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableHighlight
                underlayColor={'#ddd'}
                onPress={() => setModalVisible(true)}
                style={styles.add}>
                    <Text style={{fontWeight: 'bold'}}>Añadir proveedor</Text>
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
                      <Text style={styles.headerText}>Empresa</Text>
                      </View>
                  <View style={styles.headerCell}>
                      <Text style={styles.headerText}>Teléfono</Text>
                      </View>
                  <View style={styles.headerCell}>
                      <Text style={styles.headerText}>Ciudad</Text>
                      </View>
                  <View style={styles.headerCell}>
                      <Text style={styles.headerText}>Estado</Text>
                      </View>
                  </View>
                      <View style={styles.row}>
                        <View style={styles.cellF}>
                        <TouchableHighlight
                        underlayColor={'#ddd'}
                        onPress={() => setEModalVisible(true)}>
                        <Text>LALA</Text>
                        </TouchableHighlight>
                        </View> 
                      <View style={styles.cell}><Text>123-456-7890</Text></View>
                      <View style={styles.cell}><Text>Tampico</Text></View>
                      <View style={styles.cell}><Text>Tamaulipas</Text></View>
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
  query: {
    backgroundColor: 'white', color: 'black',
    borderWidth: 1, borderColor: 'black', 
    height: 40, width: 120,
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
  //Modal estilos
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  modalView: {
    marginHorizontal: 30, marginVertical: 230,
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
  modalEdit: {
    backgroundColor: '#f3fe53',
    padding: 10,
    borderRadius: 15,
    width: 135,
    justifyContent: 'center', alignItems: 'center',
  },
  modalRegret: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 15,
    width: 130,
    justifyContent: 'center', alignItems: 'center',
  },
  modalDelete: {
    backgroundColor: '#ff8787',
    padding: 10,
    borderRadius: 15,
    width: 135,
    justifyContent: 'center', alignItems: 'center',
  }
});
