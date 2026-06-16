import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, Image, TextInput, Modal, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import Constants from 'expo-constants';
import { useState } from 'react';
import { NoEmojis, Validar } from './backend';
import { Picker } from '@react-native-picker/picker';
import { ClientesScreenProps, FormerJSON } from './types';
import datos from './datos.json';

export default function Clientes({ navigation }: ClientesScreenProps ) {

  const getImage = (nombre: any) => {
  switch(nombre) {
    case 'B': return require('../../assets/B.png');
    case 'x': return require('../../assets/x.png');
    default: return require('../../assets/lupa.png');
    }
  }

  //Constatnes inputs
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [estado, setEstado] = useState('');
  const [query, setQuery] = useState('');

  //JSON
  const [clientes, setClientes] = useState<FormerJSON>(datos.CLIENTES || {});

  //Constantes modales
  const [modalVisible, setModalVisible] = useState(false);
  const [EmodalVisible, setEModalVisible] = useState(false);
  const [Busqueda, setBusqueda] = useState(false);
  const [Confirm, setConfirm] = useState(false);

  //Constante picker
  const [selectedCriteria, setSelectedCriteria] = useState('Nombre');

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.navigation}>
      
        <TouchableHighlight
        underlayColor={"#ddf"} style={styles.navIcons}
        onPress={() => navigation.navigate("Ventas")} 
      >
        <Image source={getImage('B')} style={styles.navIconImage}/>
      </TouchableHighlight>
    </View>

    {/* Modal para añadir clientes */}
        <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}>
              <View style={styles.modalOverlay}>
                <KeyboardAvoidingView 
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={{ flex: 1 }}
                        >  
                      <ScrollView 
                           showsVerticalScrollIndicator={false}
                          keyboardShouldPersistTaps="handled"
                        >
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
                  <Text style={styles.modalTitle}>Añadir cliente</Text>
                </View>
    
                <View style={styles.hr}/>
    
                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Nombre:</Text>
                  <TextInput style={{...styles.query, width: 200}}
                  value={nombre} onChangeText={(text) => setNombre(NoEmojis(text))}/>
                </View>
                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Teléfono:</Text>
                  <TextInput style={{...styles.query, width: 150}}
                  value={telefono} onChangeText={(text) => setTelefono(NoEmojis(text))}/>
                </View>
                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Ciudad:</Text>
                  <TextInput style={{...styles.query, width: 150}}
                  value={ciudad} onChangeText={(text) => setCiudad(NoEmojis(text))}/>
                </View>
                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Estado:</Text>
                  <TextInput style={{...styles.query, width: 150}}
                  value={estado} onChangeText={(text) => setEstado(NoEmojis(text))}/>
                </View>
    
                <View style={styles.hr}/>
    
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                  <TouchableHighlight
                  underlayColor={'#82ff92'} style={styles.modalConfirm}
                    onPress={() => {
                      const validation = Validar(4,nombre,telefono,ciudad,estado);
                          if (!validation.isValid) {
                          Alert.alert('Error', validation.message);
                          return; 
                          }
                      setModalVisible(!modalVisible)}}>
                    <Text>Añadir registro</Text>
                  </TouchableHighlight>
                </View>
    
              </View>
              </ScrollView>
              </KeyboardAvoidingView>
              </View>
            </Modal>
    
          {/* Modal para editar clientes */}
        <Modal
              animationType="slide"
              transparent={true}
              visible={EmodalVisible}
              onRequestClose={() => {
                setEModalVisible(!EmodalVisible);
              }}>
              <View style={styles.modalOverlay}>
                <KeyboardAvoidingView 
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={{ flex: 1 }}
                        >  
                      <ScrollView 
                           showsVerticalScrollIndicator={false}
                          keyboardShouldPersistTaps="handled"
                        >
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
                  <Text style={styles.modalTitle}>Editar cliente</Text>
                </View>
    
                <View style={styles.hr}/>
    
                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Nombre:</Text>
                  <TextInput style={{...styles.query, width: 200}}
                  value={nombre} onChangeText={(text) => setNombre(NoEmojis(text))}/>
                </View>
                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Teléfono:</Text>
                  <TextInput style={{...styles.query, width: 150}}
                  value={telefono} onChangeText={(text) => setTelefono(NoEmojis(text))}/>
                </View>
                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Ciudad:</Text>
                  <TextInput style={{...styles.query, width: 150}}
                  value={ciudad} onChangeText={(text) => setCiudad(NoEmojis(text))}/>
                </View>
                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Estado:</Text>
                  <TextInput style={{...styles.query, width: 150}}
                  value={estado} onChangeText={(text) => setEstado(NoEmojis(text))}/>
                </View>
    
                <View style={styles.hr}/>
    
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                  <TouchableHighlight
                  underlayColor={'#f3fe53'} style={styles.modalEdit}
                    onPress={() => {
                      const validation = Validar(4,nombre,telefono,ciudad,estado);
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
              </ScrollView>
              </KeyboardAvoidingView>
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
                            <Text style={styles.modalTitle}>Buscar cliente</Text>
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
                                  <Picker.Item label="Nombre" value="Nombre" />
                                  <Picker.Item label="Ciudad" value="Ciudad" />
                                  <Picker.Item label="Estado" value="Estado" />
                                  </Picker></View>
                          </View>
                          <View style={styles.modalRow}>
                            <TextInput style={{...styles.query, width: 200}}
                            value={query} onChangeText={(text) => setQuery(NoEmojis(text))}/>
                          </View>
              
                          <View style={styles.hr}/>
              
                          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                            <TouchableHighlight
                            underlayColor={'#82ff92'} style={[styles.modalConfirm, {width: 90}]}
                               onPress={() => {
                          if(query.trim() == ''){
                            setClientes(datos.CLIENTES)
                          }
                          else {
                            let index = 0
                            switch(selectedCriteria){
                            case "Nombre": {index = 0; break}
                            case "Ciudad": {index = 2; break}
                            default: {index = 3; break}
                          }
                          const filtrado = Object.fromEntries(
                            Object.entries(datos.CLIENTES || {}).filter(
                            ([id, data]) => data[index].toLowerCase().includes(query.toLowerCase())
                            ));
                            setClientes(filtrado)
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
                            underlayColor={'#ddd'} style={styles.modalRegret}
                              onPress={() => setConfirm(!Confirm)}>
                              <Text>NO</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                            underlayColor={'#ff9797'} style={styles.modalDelete}
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

      {/*ScrollView*/}
      <ScrollView>
        <View style={styles.scroll}>
        <Text style={{  fontSize: 25, fontWeight: 'bold' }}>
        Clientes
        </Text>

        <Text style={{ 
          fontSize: 15, 
          paddingVertical: 10,}}>
          Seleccione el nombre de un cliente en la tabla para modificar sus datos.
          </Text>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableHighlight
                underlayColor={'#ddd'}
                onPress={() => {
                  setNombre(''); setTelefono(''); setCiudad(''); setEstado('')
                  setModalVisible(true)}}
                style={styles.add}>
                    <Text style={{fontWeight: 'bold'}}>Añadir cliente</Text>
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
                      <Text style={styles.headerText}>Nombre</Text>
                      </View>
                  <View style={styles.headerCell}>
                      <Text style={styles.headerText}>Teléfono</Text>
                      </View>
                  <View style={[styles.headerCell, {flex: 0.8}]}>
                      <Text style={styles.headerText}>Ciudad</Text>
                  </View>
                      <View style={styles.headerCell}>
                      <Text style={styles.headerText}>Estado</Text>
                      </View>
                  </View>

                  {/* Body - cada registro es una fila */}
                  {Object.values(clientes || {}).length > 0 ? (
                  Object.entries(clientes).map(([id, data]: [string, any]) => {
                  const [nombre, telefono, ciudad, estado] = data;
                  return(
                      <View key={id} style={styles.row}>
                      <View style={styles.cellF}>
                          <TouchableHighlight
                          underlayColor={'#ddd'}
                          onPress={() => {
                            setNombre(nombre); setTelefono(telefono); setCiudad(ciudad); setEstado(estado);
                            setEModalVisible(true)}}>
                          <Text>{nombre}</Text>
                          </TouchableHighlight>
                          </View> 
                      <View style={styles.cell}><Text>{telefono}</Text></View>
                      <View style={[styles.cell, {flex: 0.8}]}><Text>{ciudad}</Text></View>
                      <View style={styles.cell}><Text>{estado}</Text></View>
                </View>
                  )
               })
              ) : (
            <Text style={{opacity: 0.8, marginVertical: 20, textAlign: 'center'}}>No hay clientes registrados</Text>
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
    width: 125, height: 40,
    marginTop: 10,
    padding: 10,
    elevation: 5,
    borderRadius: 15,
    shadowColor: "#000", shadowOffset: {height: 2, width: 0,}
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
    marginHorizontal: 30, marginVertical: 220,
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
  //---------------
  picker: {
    height: 60,
    marginLeft: 10,
    flex: 1,
    backgroundColor: '#eee', color: 'black',
  
  },
  pickerItem: {
    fontSize: 16,
    fontWeight: 'bold',
  }
});
