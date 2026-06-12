import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, Image, Modal, TextInput, Alert } from 'react-native';
import Constants from 'expo-constants';
import type { CategoriasScreenProps } from './types';
import { useState } from 'react';
import { NoEmojis, Validar } from './backend';
import datos from './datos.json'; 

export default function AddRegistroVenta({ navigation }: CategoriasScreenProps) {

  const getImage = (nombre: any) => {
    switch (nombre){
      case 'B': return require('../assets/B.png');
      case 'lupa': return require('../assets/lupa.png');
      default: return require('../assets/x.png');
   }
  }
  //Constantes de modales
  const [modalVisible, setModalVisible] = useState(false);
  const [modalEVisible, setModalEVisible] = useState(false);
  const [Confirm, setConfirm] = useState(false);

  //Constante de input
  const [category, setCategory] = useState('');
  const [query, setQuery] = useState('')

  //JSONs de datos
  const [categorias, setCategorias] = useState(datos.CATEGORIAS);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

    <View style={styles.navigation}>
            <TouchableHighlight
            underlayColor={"#ddd"} style={styles.navIcons}
            onPress={() => navigation.navigate("ListaDePrecios")}
          >
            <Image source={getImage('B')} style={styles.navIconImage}/>
          </TouchableHighlight>
        </View>

      {/* Modal para añadir categorías */}
            <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    setModalVisible(!modalVisible);
                  }}>
                  <View style={styles.modalOverlay}>
                  <View style={[styles.modalView, {marginVertical: 330}]}>
        
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                      <TouchableHighlight
                      style={{height: 30, width: 30, alignItems: "flex-end"}}
                      underlayColor={'#eee'}
                      onPress={() => setModalVisible(!modalVisible)}>
                      <Image source={getImage('x')} style={styles.lupaImage}/>
                      </TouchableHighlight>
                    </View>
        
                    <View>
                      <Text style={styles.modalTitle}>Añadir categoría</Text>
                    </View>
        
                    <View style={styles.modalRow}>
                      <Text style={styles.modalLabel}>Nombre:</Text>
                      <TextInput style={{...styles.input, width: 150}}
                      value={category} onChangeText={(text) => setCategory(NoEmojis(text))}/>
                    </View>
        
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                      <TouchableHighlight
                      underlayColor={'#82ff92'} style={styles.modalConfirm}
                        onPress={() => {
                          const validation = Validar(1,category,'','','');
                             if (!validation.isValid) {
                            Alert.alert('Error', validation.message);
                            return; 
                            }
                            setModalVisible(!modalVisible)
                          }}>
                        <Text>Añadir registro</Text>
                      </TouchableHighlight>
                    </View>
        
                  </View>
                  </View>
                </Modal>
    
    {/* Modal para añadir categorías */}
            <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalEVisible}
                  onRequestClose={() => {
                    setModalEVisible(!modalEVisible);
                  }}>
                  <View style={styles.modalOverlay}>
                  <View style={[styles.modalView, {marginVertical: 330}]}>
        
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                      <TouchableHighlight
                      style={{height: 30, width: 30, alignItems: "flex-end"}}
                      underlayColor={'#eee'}
                      onPress={() => setModalEVisible(!modalEVisible)}>
                      <Image source={getImage('x')} style={styles.lupaImage}/>
                      </TouchableHighlight>
                    </View>
        
                    <View>
                      <Text style={styles.modalTitle}>Editar categoría</Text>
                    </View>
        
                    <View style={styles.modalRow}>
                      <Text style={styles.modalLabel}>Nombre:</Text>
                      <TextInput style={{...styles.input, width: 200}}
                      value={category} onChangeText={(text) => setCategory(NoEmojis(text))}/>
                    </View>
        
                    <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                                      <TouchableHighlight
                                      underlayColor={'#f3fe53'} style={styles.modalEdit}
                                        onPress={() => {
                                          const validation = Validar(1,category,'','','');
                                              if (!validation.isValid) {
                                              Alert.alert('Error', validation.message);
                                              return; 
                                              }
                                          setModalEVisible(!modalEVisible)}}>
                                        <Text>Editar categoría</Text>
                                      </TouchableHighlight>
                                      <TouchableHighlight
                                      underlayColor={'#ff9797'} style={styles.modalDelete}
                                        onPress={() => setConfirm(true)}
                                        >
                                        <Text>Borrar categoría</Text>
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
                                   <View style={[styles.modalView, {marginVertical: 310}]}>
                         
                                     <View>
                                       <Text style={styles.modalTitle}>¿Eliminar categoría?</Text>
                                     </View>

                                     <Text style={[styles.modalLabel, {textAlign: 'center', opacity: 0.5, marginBottom: 10}]}>
                                      Esta acción borrará la categoría y todos los productos que se encuentran en ella. Tenga en cuenta que esta acción no se podrá deshacer.</Text>
                         
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
                                           setModalEVisible(!modalEVisible);
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
        Gestionar categorías
        </Text>
        <Text style={{ 
          fontSize: 15, 
          paddingVertical: 10,}}>
          Seleccione una categoría para editarla.
          </Text>

          <View style={styles.row}>
        <TouchableHighlight 
            underlayColor={'#ddd'}
            onPress={() => {
                setCategory('')
                setModalVisible(true)}}
            style={[styles.add , {width: 160}]}>
            <Text style={{fontWeight: 'bold'}}>Agregar categorías</Text>
            </TouchableHighlight>

              <View style={styles.row}>
              <TextInput style={styles.query}
              placeholder="Buscar categoría" placeholderTextColor="#999"
              value={query} onChangeText={setQuery}></TextInput>
             <TouchableHighlight
                underlayColor={'#ddd'}
                 onPress={() => alert("search")}
                style={{...styles.add, width: 40, padding: 10}}>
                <Image source={getImage('lupa')} style={styles.lupaImage}/>
                </TouchableHighlight>
                </View></View>
        
        <View style={{marginBottom: 80}}>
            
        {Object.values(categorias || {}).length > 0 ? (
        Object.entries(categorias).map(([id, data]: [string, any]) => {
            const categoria = data;
             return (
                              <View key={id}>
                                <View style={styles.cell}>
                                <TouchableHighlight
                                underlayColor={'#eee'}
                                onPress={() => {
                                    setCategory(categoria)
                                    setModalEVisible(true)
                                  }}>
                                <Text>{categoria}</Text>
                                </TouchableHighlight>
                                </View> 
                        </View>
                        );
                })
              ) : (
            <Text style={{opacity: 0.8, marginVertical: 20, textAlign: 'center'}}>No hay categorías registradas</Text>
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textRow:{
    fontSize: 20, 
    paddingVertical: 5, 
    fontWeight: 'bold',
  },
  query: {
    backgroundColor: 'white', color: 'black',
    borderWidth: 1, borderColor: 'black', 
    height: 40, width: 120,
    marginTop: 10,
  },
   add: {
    backgroundColor: '#eee',
    width: 150,
    marginVertical: 10,
    padding: 10,
    borderRadius: 15,
    // elevation: 5,
    shadowColor: "#000", shadowOffset: {height: 2, width: 0,}
  },
  //Tabla estilos
  cell: {
    flex: 1, padding: 6,
    borderWidth: 1,
    backgroundColor: 'white',
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
    width: 90,
    justifyContent: 'center', alignItems: 'center',
    elevation: 5,
    shadowColor: "#000", shadowOffset: {height: 2, width: 0,}
  },
  modalRegret: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 20,
    width: 90,
    justifyContent: 'center', alignItems: 'center',
     elevation: 5,
    shadowColor: "#000", shadowOffset: {height: 2, width: 0,}
  },
  modalDelete: {
    backgroundColor: '#ff8787',
    padding: 10,
    borderRadius: 20,
    width: 90,
    justifyContent: 'center', alignItems: 'center',
     elevation: 5,
    shadowColor: "#000", shadowOffset: {height: 2, width: 0,}
  }
  
});
