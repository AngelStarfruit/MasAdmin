import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, Image, TextInput, Modal, Alert} from 'react-native';
import Constants from 'expo-constants';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { NoEmojis, Validar } from './backend';
import type { AlmacenesInfoScreenProps, FormerJSON } from './types';
import datosA from './datos.json'; import datosS from '../datos.json'

export default function AlmacenesInfo({ navigation }: AlmacenesInfoScreenProps ) {

  const getImage = (nombre: any) => {
  switch(nombre) {
    case 'B': return require('../../assets/B.png');
    case 'x': return require('../../assets/x.png');
    default: return require('../../assets/lupa.png');
    }
  }

  //Constantes de inputs
  const [almacen, setAlmacen] = useState('');
  const [query, setQuery] = useState('');

  //JSONs de datos
  const [almacenes, setAlmacenes] = useState<FormerJSON>(datosA.ALMACENES || {});
  const sucursales: Record<string, any> = datosS.SUCURSALES || {};

  //Constantes de pickers
  const [selectedCriteria, setSelectedCriteria] = useState('Almacén');
  const [selectedBranch, setSelectedBranch] = useState(sucursales[Object.keys(sucursales)[0]]?.[0] || '');

  //Modales
  const [modalVisible, setModalVisible] = useState(false);
  const [EmodalVisible, setEModalVisible] = useState(false);
  const [Busqueda, setBusqueda] = useState(false);
  const [Confirm, setConfirm] = useState(false);

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

    {/* Modal para añadir almacenes */}
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
                          underlayColor={'#eee'}
                          onPress={() => setModalVisible(!modalVisible)}>
                          <Image source={getImage('x')} style={styles.lupaImage}/>
                          </TouchableHighlight>
                        </View>
            
                        <View>
                          <Text style={styles.modalTitle}>Añadir almacén</Text>
                        </View>
            
                        <View style={styles.hr}/>
            
                        <View style={styles.modalRow}>
                          <Text style={styles.modalLabel}>Almacén:</Text>
                          <TextInput style={{...styles.query, width: 150}}
                          value={almacen} onChangeText={(text) => setAlmacen(NoEmojis(text))}/>
                        </View>
                        <View style={styles.modalRow}>
                          <Text style={styles.modalLabel}>Sucursal:</Text>
                           <View style={{width:130, height:50}}>
                              <Picker
                              style={[styles.picker, {backgroundColor: "#eee"}]}
                              selectedValue={selectedBranch}
                              onValueChange={(itemValue) => setSelectedBranch(itemValue)}
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
                              <Picker.Item label="Sin sucursales" value="" />
                            )}
                              </Picker></View>
                        </View>
            
                        <View style={styles.hr}/>
            
                        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                          <TouchableHighlight
                          underlayColor={'#82ff92'} style={styles.modalConfirm}
                            onPress={() => {
                              const validation = Validar(1,almacen,'','','');
                                  if (!validation.isValid) {
                                  Alert.alert('Error', validation.message);
                                  return; 
                                 }
                              setModalVisible(!modalVisible)}}>
                            <Text>Añadir registro</Text>
                          </TouchableHighlight>
                        </View>
            
                      </View>
                      </View>
                    </Modal>
            
                  {/* Modal para editar almacenes */}
                <Modal
                      animationType="slide"
                      transparent={true}
                      visible={EmodalVisible}
                      onRequestClose={() => {
                        setEModalVisible(!EmodalVisible);
                      }}>
                      <View style={styles.modalOverlay}>
                      <View style={styles.modalView}>
            
                        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                          <TouchableHighlight
                          style={{height: 30, width: 30, alignItems: "flex-end"}}
                          underlayColor={'#eee'}
                          onPress={() => setEModalVisible(!EmodalVisible)}>
                          <Image source={getImage('x')} style={styles.lupaImage}/>
                          </TouchableHighlight>
                        </View>
            
                        <View>
                          <Text style={styles.modalTitle}>Editar almacén</Text>
                        </View>
            
                        <View style={styles.hr}/>
            
                        <View style={styles.modalRow}>
                          <Text style={styles.modalLabel}>Almacén:</Text>
                          <TextInput style={{...styles.query, width: 150}}
                          value={almacen} onChangeText={(text) => setAlmacen(NoEmojis(text))}/>
                        </View>
                        <View style={styles.modalRow}>
                          <Text style={styles.modalLabel}>Sucursal:</Text>
                          <View style={{width:180, height:55}}>
                              <Picker
                              style={[styles.picker, {backgroundColor: "#eee"}]}
                              selectedValue={selectedBranch}
                              onValueChange={(itemValue) => setSelectedBranch(itemValue)}
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
                                <Picker.Item label="Sin sucursales" value="" />
                                )}
                              </Picker>
                              </View>
                        </View>
            
                        <View style={styles.hr}/>
            
                        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                          <TouchableHighlight
                          underlayColor={'#f3fe53'} style={styles.modalEdit}
                            onPress={() => {
                              const validation = Validar(1,almacen,'','','');
                                  if (!validation.isValid) {
                                  Alert.alert('Error', validation.message);
                                  return; 
                                 }
                              setEModalVisible(!EmodalVisible)}}>
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
      {/* Modal para realizar una búsqueda */}
                  <Modal
                        animationType="slide"
                        transparent={true}
                        visible={Busqueda}
                        onRequestClose={() => {
                          setBusqueda(!Busqueda);
                        }}>
                        <View style={styles.modalOverlay}>
                        <View style={[styles.modalView, {marginVertical: 290}]}>
              
                          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                            <TouchableHighlight
                            style={{height: 30, width: 30, alignItems: "flex-end"}}
                            underlayColor={'#eee'}
                            onPress={() => setBusqueda(!Busqueda)}>
                            <Image source={getImage('x')} style={styles.lupaImage}/>
                            </TouchableHighlight>
                          </View>
              
                          <View>
                            <Text style={styles.modalTitle}>Buscar almacén</Text>
                          </View>
              
                          <View style={styles.hr}/>
              
                          <View style={styles.modalRow}>
                            <Text style={styles.modalLabel}>Criterio:</Text>
                            <View style={{width: 160, height: 55}}>
                                  <Picker
                                  selectedValue={selectedCriteria}
                                  onValueChange={(itemValue) => setSelectedCriteria(itemValue)}
                                  style={styles.picker} itemStyle={styles.pickerItem}
                                  >
                                  <Picker.Item label="Almacén" value="Almacén" />
                                  <Picker.Item label="Sucursal" value="Sucursal" />
                                  </Picker></View>
                          </View>
                          <View style={styles.modalRow}>
                            <TextInput style={{...styles.query, width: 150}}
                            value={query} onChangeText={(text) => setQuery(NoEmojis(text))}/>
                          </View>
              
                          <View style={styles.hr}/>
              
                          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                            <TouchableHighlight
                            underlayColor={'#82ff92'} style={[styles.modalConfirm, {width: 90}]}
                              onPress={() => {
                          if(query.trim() == ''){
                            setAlmacenes(datosA.ALMACENES)
                          }
                          else {
                            let index = 0
                            if(selectedCriteria == "Sucursal"){
                              index = 1
                          }
                          const filtrado = Object.fromEntries(
                            Object.entries(datosA.ALMACENES || {}).filter(
                            ([id, data]) => data[index].toLowerCase().includes(query.toLowerCase())
                            ));
                            setAlmacenes(filtrado)
                          }
                              setBusqueda(!Busqueda)}}>
                              <Text>Buscar</Text>
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

      <ScrollView>
        <View style={styles.scroll}>
        <Text style={{  fontSize: 25, fontWeight: 'bold' }}>
        Almacenes
        </Text>

        <Text style={{ 
          fontSize: 15, 
          paddingVertical: 10,}}>
          Seleccione el nombre de un almacén en la tabla para modificar sus datos.
          </Text>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableHighlight
                underlayColor={'#ddd'}
                onPress={() => {
                  if(Object.keys(sucursales).length > 0){
                  setAlmacen(''); 
                  setModalVisible(true)
                  }
                  else Alert.alert("Error","Registre al menos una sucursal primero")
                }}
                style={styles.add}>
                    <Text style={{fontWeight: 'bold'}}>Añadir almacén</Text>
                  </TouchableHighlight>

                    <TouchableHighlight
                    underlayColor={'#ddd'}
                    onPress={() => {
                      setBusqueda(true)
                    }}
                    style={{...styles.add, width: 40, padding: 10}}>
                    <Image source={getImage('lupa')} style={styles.lupaImage}/>
                      </TouchableHighlight>
  
                  </View>

        <View style={styles.table}>
              <View style={styles.row}>
                  <View style={styles.headerCell}>
                      <Text style={styles.headerText}>Almacén</Text>
                      </View>
                  <View style={styles.headerCell}>
                      <Text style={styles.headerText}>Sucursal</Text>
                      </View>
                  </View>

                  {/* Body - cada registro es una fila */}
                  {Object.values(almacenes || {}).length > 0 ? (
                  Object.entries(almacenes).map(([id, data]: [string, any]) => {
                  const [almacen, sucursal] = data;
                  return(
                      <View key={id} style={styles.row}>
                      <View style={styles.cellF}>
                          <TouchableHighlight
                          underlayColor={'#ddd'}
                          onPress={() => {
                            setAlmacen(almacen); setSelectedBranch(sucursal);
                            setEModalVisible(true)}}>
                          <Text>{almacen}</Text>
                          </TouchableHighlight>
                          </View> 
                      <View style={styles.cell}><Text>{sucursal}</Text></View>
                </View>
                  )
                })
              ) : (
            <Text style={{opacity: 0.8, marginVertical: 20, textAlign: 'center'}}>No hay almacenes registrados en esta sucursal</Text>
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
    height: 40, width: 150,
    marginTop: 10,
    padding: 10,
    borderRadius: 15,
    elevation: 5,
    shadowColor: "#000", shadowOffset: {height: 2, width: 0,}
  },
  query: {
    backgroundColor: 'white', color: 'black', 
    borderWidth: 1, borderColor: 'black', 
    height: 40, width: 150,
    marginTop: 10,
  },
  //Tabla estilos
  table: {
    paddingVertical: 20,
    elevation: 5,
    shadowColor: "#000", shadowOffset: {height: 2, width: 0,},
    marginBottom: 80
  },
  row: {flexDirection: 'row',},
  headerCell: {
    flex: 1, padding: 6,
    backgroundColor: '#e3e5ff',
    borderWidth: 1,
    borderColor: 'black',
  },
  cell: {
    flex: 1, padding: 6,
    borderWidth: 1,
    backgroundColor: 'white',
  },
  cellF: {
    flex: 1, padding: 6,
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
    borderRadius: 20,
    width: 130,
    justifyContent: 'center', alignItems: 'center',
    elevation: 5,
    shadowColor: "#000", shadowOffset: {height: 2, width: 0,}
  },
  modalEdit: {
    backgroundColor: '#f3fe53',
    padding: 10,
    borderRadius: 20,
    width: 135,
    justifyContent: 'center', alignItems: 'center',
    elevation: 5,
    shadowColor: "#000", shadowOffset: {height: 2, width: 0,}
  },
  modalRegret: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 20,
    width: 130,
    justifyContent: 'center', alignItems: 'center',
    elevation: 5,
    shadowColor: "#000", shadowOffset: {height: 2, width: 0,}
  },
  modalDelete: {
    backgroundColor: '#ff8787',
    padding: 10,
    borderRadius: 20,
    width: 135,
    justifyContent: 'center', alignItems: 'center',
    elevation: 5,
    shadowColor: "#000", shadowOffset: {height: 2, width: 0,}
  },
  //------------------
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
