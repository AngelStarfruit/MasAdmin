import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, Image, Modal, TextInput, Alert } from 'react-native';
import Constants from 'expo-constants';
import type { AddRegistroCompraScreenProps } from './types';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { NumeroValido } from './backend';
import ControlCompras from './ControlCompras';

export default function AddRegistroCompra({ navigation }: AddRegistroCompraScreenProps) {

  const getImage = (nombre: any) => {
    switch (nombre){
      case 'B': return require('../../assets/B.png');
      case 'xr': return require('../../assets/xred.png');
      default: return require('../../assets/x.png');
   }
  }

  //Constantes de modales
  const [modalVisible, setModalVisible] = useState(false);
  const [Confirm, setConfirm] = useState(false);
  const [Receive, setReceive] = useState(false);

  //Constantes de pickers
  const [selectedProvider, setSelectedProvider] = useState('A');
  const [selectedBranch, setSelectedBranch] = useState('1');
  const [selectedProduct, setSelectedProduct] = useState('a');
  const [selectedStore, setSelectedStore] = useState('I');

  //Constante de input
  const [cantidad, setCantidad] = useState('');

  //Constantes de JSON
  const processCompra = {
    "Queso" : ["Caperucita",260.00,1],
    "Chorizo" : ["Chimex",23.99,1],
  };
  const processCompraAlmacen = {
    "Queso" : ["Caperucita",260.00,1],
    "Chorizo" : ["Chimex",23.99,1],
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

    <View style={styles.navigation}>
            <TouchableHighlight
            underlayColor={"#ddd"} style={styles.navIcons}
            onPress={() => setConfirm(true)} 
          >
            <Image source={getImage('B')} style={styles.navIconImage}/>
          </TouchableHighlight>
        </View>

      {/* Modal para agregar elementos a la compra */}
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
                    style={{height: 30, width: 30, alignItems: "flex-end"}}
                    underlayColor={'#ddd'}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Image source={getImage('x')} style={styles.lupaImage}/>
                    </TouchableHighlight>
                  </View>
      
                  <View>
                    <Text style={styles.modalTitle}>Agregar elementos</Text>
                  </View>
      
                  <View style={styles.hr}/>
                    <View style={styles.modalRow}>
                      <Text style={styles.modalLabel}>Elemento:</Text>
                      <View style={{width:130, height:50}}>
                        <Picker
                        style={styles.picker}
                        selectedValue={selectedProduct}
                        onValueChange={(itemValue) => setSelectedProduct(itemValue)}
                        >
                        <Picker.Item style={styles.pickerItem} label="a" value="a" />
                        </Picker></View>
                    </View>
                    <View style={styles.modalRow}>
                      <Text style={styles.modalLabel}>Cantidad:</Text>
                      <TextInput style={styles.input}
                                value={cantidad} onChangeText={setCantidad}
                                keyboardType='numeric'></TextInput>
                    </View>
                  <View style={styles.hr}/>
      
                  <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <TouchableHighlight
                    underlayColor={'#82ff92'} style={styles.modalConfirm}
                      onPress={() => {
                          const validation = NumeroValido(cantidad);
                            if (!validation.isValid) {
                            Alert.alert('Error', validation.message);
                              return; 
                            }
                            setCantidad('')
                            setModalVisible(!modalVisible)}}>
                      <Text>Agregar</Text>
                    </TouchableHighlight>
                  </View>
      
                </View>
                </View>
              </Modal>

      {/* Modal para recibir productos */}
                              <Modal
                                    animationType="slide"
                                    transparent={true}
                                    visible={Receive}
                                    onRequestClose={() => {
                                      setConfirm(!Receive);
                                    }}>
                                    <View style={styles.modalOverlay}>
                                    <View style={[styles.modalView, {marginVertical: 360}]}>
                          
                                      <View>
                                        <Text style={styles.modalTitle}>¿Recibir los artículos en el almacén?</Text>
                                      </View>
                          
                                      <View style={styles.hr}/>
                          
                                      <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                                        <TouchableHighlight
                                        underlayColor={'#ddd'} style={[styles.modalRegret, {width: 50}]}
                                          onPress={() => setReceive(!Receive)}>
                                          <Text>NO</Text>
                                        </TouchableHighlight>
                                        <TouchableHighlight
                                        underlayColor={'#82ff92'} style={[styles.modalConfirm, {width: 50}]}
                                          onPress={() => {
                                            setConfirm(!Receive);
                                            navigation.navigate("ControlCompras")
                                          }}>
                                          <Text>SÍ</Text>
                                        </TouchableHighlight>
                                      </View>
                          
                                    </View>
                                    </View>
                                  </Modal>

      {/* Modal para confirmar salida */}
                              <Modal
                                    animationType="slide"
                                    transparent={true}
                                    visible={Confirm}
                                    onRequestClose={() => {
                                      setConfirm(!Confirm);
                                    }}>
                                    <View style={styles.modalOverlay}>
                                    <View style={[styles.modalView, {marginVertical: 375}]}>
                          
                                      <View>
                                        <Text style={styles.modalTitle}>¿Salir sin guardar?</Text>
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
                                            navigation.navigate("ControlCompras")
                                          }}>
                                          <Text>SÍ</Text>
                                        </TouchableHighlight>
                                      </View>
                          
                                    </View>
                                    </View>
                                  </Modal>

      {/*ScrollView*/}
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
                  <View style={styles.headerCell}>
                      </View>
                  </View>
                  <ScrollView style={styles.showcase}>

                    {Object.entries(processCompra).map(([descripcion, [marca, costo, cantidad]], index) => (
                    <View key={index} style={styles.row}>
                    <View style={[styles.cell, {backgroundColor: '#e3e5ff'}]}>
                    <Text>{descripcion}</Text>
                    </View>
                    <View style={[styles.cell, {backgroundColor: '#e3e5ff'}]}>
                    <Text>{marca}</Text>
                    </View>
                    <View style={[styles.cell, {backgroundColor: '#e3e5ff'}]}>
                    <Text>{costo}</Text>
                    </View>
                    <View style={[styles.cell, {backgroundColor: '#e3e5ff'}]}>
                    <Text>{cantidad}</Text>
                    </View>
                    <View style={[styles.cell, {backgroundColor: '#e3e5ff'}]}>
                        <TouchableHighlight
                        style={{height:20, width:20}}
                        onPress={()=> alert("x")}
                        underlayColor={"#ffa6a6"}
                        >
                        <Image source={getImage('xr')} style={styles.navIconImage} />
                        </TouchableHighlight>
                        </View>
                      </View>
                    ))}  
                    
                  </ScrollView>
          </View>

          <View style={styles.row}>
          <TouchableHighlight
                underlayColor={'#5460ff'}
                  onPress={() => setModalVisible(true)}
                  style={styles.button}>
                  <Text style={styles.buttonText}>Agregar</Text>
              </TouchableHighlight>
          <TouchableHighlight
                underlayColor={'#5460ff'}
                  onPress={() => alert("enviar")}
                  style={styles.button}>
                  <Text style={styles.buttonText}>Enviar</Text>
              </TouchableHighlight>
              </View>
        <Text style={{  fontSize: 25, fontWeight: 'bold', marginVertical: 10 }}>
        Total: 0
        </Text>

        <View style={[styles.hr, {marginTop: 15}]}></View>

        <Text style={{  fontSize: 25, fontWeight: 'bold' }}>
        Recepciones al almacén
        </Text>

        <View style={styles.row}>
          <Text style={styles.textRow}>Almacen afectado:</Text>
          <View style={{width:150}}>
          <Picker
            style={styles.picker}
            selectedValue={selectedStore}
            onValueChange={(itemValue) => setSelectedStore(itemValue)}
          >
            <Picker.Item style={styles.pickerItem} label="I" value="I" />
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
                      <Text style={styles.headerText}>A recibir</Text>
                      </View>
                    <View style={styles.headerCell}>
                      </View>
                  </View>
                  <ScrollView style={styles.showcase}>

                    {Object.entries(processCompraAlmacen).map(([descripcion, [marca, costo, cantidad]], index) => (
                    <View key={index} style={styles.row}>
                    <View style={[styles.cell, {backgroundColor: '#e3e5ff'}]}>
                    <Text>{descripcion}</Text>
                    </View>
                    <View style={[styles.cell, {backgroundColor: '#e3e5ff'}]}>
                    <Text>{marca}</Text>
                    </View>
                    <View style={[styles.cell, {backgroundColor: '#e3e5ff'}]}>
                    <Text>{costo}</Text>
                    </View>
                    <View style={[styles.cell, {backgroundColor: '#e3e5ff'}]}>
                    <Text>{cantidad}</Text>
                    </View>
                    <View style={[styles.cell, {backgroundColor: '#e3e5ff'}]}>
                        <TouchableHighlight
                        style={{height:20, width:20}}
                        onPress={()=> alert("x")}
                        underlayColor={"#ffa6a6"}
                        >
                        <Image source={getImage('xr')} style={styles.navIconImage} />
                        </TouchableHighlight>
                        </View>
                      </View>
                    ))}
                    
                  </ScrollView>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'center',
            marginTop: 10, marginBottom: 50,}}>
          <TouchableHighlight
                underlayColor={'#5460ff'}
                  onPress={() => setReceive(true)}
                  style={styles.button}>
                  <Text style={styles.buttonText}>Aplicar cambios</Text>
              </TouchableHighlight>
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textRow:{
    fontSize: 20, 
    paddingVertical: 5, 
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#656fff',
    borderRadius: 20,
    width: 150,
    padding: 10,
    elevation: 5,
    shadowColor: "#000", shadowOffset: {height: 2, width: 0,}
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  //Tabla estilos
  table: {
    paddingTop: 20,
  },
  tableRow: {flexDirection: 'row',},
  headerCell: {
    flex: 1, padding: 12,
    backgroundColor: '#c2c6ff', 
    borderWidth: 1,
    borderColor: 'black',
  },
  showcase: {
    backgroundColor: '#e3e5ff',
    minHeight: 250
  },
  cell: {
    flex: 1, padding: 12,
    borderWidth: 1,
  },
  headerText: {
    fontWeight: 'bold',
  },
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
  //Modal estilos
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  modalView: {
    marginHorizontal: 30, marginVertical: 290,
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
  input: {
    backgroundColor: 'white', color: 'black',
    borderWidth: 1, borderColor: 'black', 
    height: 40, width: 120,
    marginTop: 10,
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
    elevation: 5,
    shadowColor: "#000", shadowOffset: {height: 2, width: 0,}
  },
  modalRegret: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 15,
    width: 130,
    justifyContent: 'center', alignItems: 'center',
    elevation: 5,
    shadowColor: "#000", shadowOffset: {height: 2, width: 0,}
  },
  modalDelete: {
    backgroundColor: '#ff8787',
    padding: 10,
    borderRadius: 15,
    width: 135,
    justifyContent: 'center', alignItems: 'center',
    elevation: 5,
    shadowColor: "#000", shadowOffset: {height: 2, width: 0,}
  }
  
});
