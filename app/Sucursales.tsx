import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, Image, TextInput, Modal, Alert} from 'react-native';
import Constants from 'expo-constants';
import { useState } from 'react';
import { NoEmojis, Validar, QuitarElemento, AddSucursal } from './backend';
import type { SucursalesScreenProps, FormerJSON } from './types';
import datos from './datos.json';

export default function Sucursales({navigation}: SucursalesScreenProps) {

  const getImage = (nombre: any) => {
  switch(nombre) {
    case 'C': return require('../assets/C.png');
    case 'V': return require('../assets/V.png');
    case 'S': return require('../assets/S.png');
    case 'D': return require('../assets/D.png');
    case 'A': return require('../assets/A.png');
    case '$': return require('../assets/$.png');
    case 'x': return require('../assets/x.png');
    default: return require('../assets/lupa.png');
    }
  }

  //Inputs
  const [sucursal, setSucursal] = useState('');
  const [telefono, setTelefono] = useState('');
  const [query, setQuery] = useState('');

   //JSON
  const [sucursales, setSucursales] = useState<FormerJSON>(datos.SUCURSALES || {});

  //Modales
  const [modalVisible, setModalVisible] = useState(false);
  const [EmodalVisible, setEModalVisible] = useState(false);
  const [Confirm, setConfirm] = useState(false);

  //Otras constantes
  const [id, setId] = useState(1);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.navigation}>

      <TouchableHighlight
        underlayColor={"#ddf"} style={styles.navIcons}
        onPress={() => navigation.navigate("Dashboard")}
      >
        <Image source={getImage('D')} style={styles.navIconImage}/></TouchableHighlight>

      <TouchableHighlight
        underlayColor={"#ddf"} style={styles.navIcons}
        onPress={() => navigation.navigate("Compras")}
      >
        <Image source={getImage('C')} style={styles.navIconImage}/></TouchableHighlight>

        <TouchableHighlight
        underlayColor={"#ddf"} style={styles.navIcons}
        onPress={() => navigation.navigate("Ventas")}
      >
        <Image source={getImage('V')} style={styles.navIconImage}/></TouchableHighlight>

      <TouchableHighlight
        style={styles.navIconsS}
      >
        <Image source={getImage('S')} style={styles.navIconImage}/></TouchableHighlight>

        <TouchableHighlight
        underlayColor={"#ddf"} style={styles.navIcons}
        onPress={() => navigation.navigate("Almacenes")} 
      >
        <Image source={getImage('A')} style={styles.navIconImage}/></TouchableHighlight>

        <TouchableHighlight
        underlayColor={"#ddf"} style={styles.navIcons}
        onPress={() => navigation.navigate("ListaDePrecios")} 
      >
        <Image source={getImage('$')} style={styles.navIconImage}/></TouchableHighlight>

    </View>

    {/* Modal para añadir sucursales */}
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
                      <Text style={styles.modalTitle}>Añadir sucursal</Text>
                    </View>
        
                    <View style={styles.hr}/>
        
                    <View style={styles.modalRow}>
                      <Text style={styles.modalLabel}>Sucursal:</Text>
                      <TextInput style={{...styles.query, width: 150}}
                      value={sucursal} onChangeText={(text) => setSucursal(NoEmojis(text))}/>
                    </View>
                    <View style={styles.modalRow}>
                      <Text style={styles.modalLabel}>Teléfono:</Text>
                      <TextInput style={{...styles.query, width: 150}}
                      value={telefono} onChangeText={(text) => setTelefono(NoEmojis(text))}/>
                    </View>
        
                    <View style={styles.hr}/>
        
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                      <TouchableHighlight
                      underlayColor={'#82ff92'} style={styles.modalConfirm}
                        onPress={() => {
                          const validation = Validar(2,sucursal,telefono,'','');
                              if (!validation.isValid) {
                              Alert.alert('Error', validation.message);
                              return; 
                              }
                        setSucursales(AddSucursal(sucursales,id,sucursal,telefono))
                        setModalVisible(!modalVisible)
                      }}>
                        <Text>Añadir registro</Text>
                      </TouchableHighlight>
                    </View>
        
                  </View>
                  </View>
                </Modal>
        
              {/* Modal para editar sucursales */}
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
                      <Text style={styles.modalTitle}>Editar sucursal</Text>
                    </View>
        
                    <View style={styles.hr}/>
        
                    <View style={styles.modalRow}>
                      <Text style={styles.modalLabel}>Sucursal:</Text>
                      <TextInput style={{...styles.query, width: 150}}
                      value={sucursal} onChangeText={(text) => setSucursal(NoEmojis(text))}/>
                    </View>
                    <View style={styles.modalRow}>
                      <Text style={styles.modalLabel}>Teléfono:</Text>
                      <TextInput style={{...styles.query, width: 150}}
                      value={telefono} onChangeText={(text) => setTelefono(NoEmojis(text))}/>
                    </View>
        
                    <View style={styles.hr}/>
        
                    <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                      <TouchableHighlight
                      underlayColor={'#f3fe53'} style={styles.modalEdit}
                        onPress={() => {
                          const validation = Validar(2,sucursal,telefono,'','');
                              if (!validation.isValid) {
                              Alert.alert('Error', validation.message);
                              return; 
                              }
                        setModalVisible(!modalVisible)}}>
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
                                      setSucursales(QuitarElemento(sucursales, id));
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
        Sucursales
        </Text>

        <Text style={{ 
          fontSize: 15, 
          paddingVertical: 10,}}>
          Seleccione el nombre de una sucursal en la tabla para modificar sus datos.
          </Text>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TouchableHighlight
        underlayColor={'#f0f1ff'}
        onPress={() => {
          setId(Object.keys(sucursales).length + 1)
          setSucursal(''); setTelefono('');
          setModalVisible(true)}}
        style={styles.add}>
            <Text style={{fontWeight: 'bold'}}>Añadir sucursal</Text>
          </TouchableHighlight>

            <View style={styles.row}>
                    <TextInput style={styles.query}
                    placeholder="Buscar sucursal" placeholderTextColor="#999"
                    value={query} onChangeText={setQuery}></TextInput>
                    <TouchableHighlight
                    underlayColor={'#ddd'}
                   onPress={() => {
                    if (query.trim() == ''){
                      setSucursales(datos.SUCURSALES || {})
                    }
                    else {
                      const filtrado = Object.fromEntries(
                      Object.entries(datos.SUCURSALES || {}).filter(
                      ([id, data]) => data[0].toLowerCase().includes(query.toLowerCase())
                      ));
                      setSucursales(filtrado)
                    }
                   }}
                    style={{...styles.add, width: 40, padding: 10}}>
                    <Image source={getImage('lupa')} style={styles.lupaImage}/>
                   </TouchableHighlight>
                    </View>

          </View>
          
        <View style={styles.table}>
              <View style={styles.row}>
                  <View style={styles.headerCell}>
                      <Text style={styles.headerText}>Sucursal</Text>
                      </View>
                  <View style={styles.headerCell}>
                      <Text style={styles.headerText}>Teléfono</Text>
                      </View>
                  </View>

                {/* Body - cada registro es una fila */}
                {Object.values(sucursales || {}).length > 0 ? (
                Object.entries(sucursales).map(([id, data]: [string, any]) => {
                const [sucursal, telefono] = data;
                return (
                <View key={id} style={styles.row}>
                <View style={styles.cellF}>
                <TouchableHighlight
                underlayColor={'#ddd'}
                  onPress={() => {
                    setId(Number(id))
                    setSucursal(sucursal); setTelefono(telefono);
                    setEModalVisible(true)
                  }}>
                  <Text>{sucursal}</Text>
                  </TouchableHighlight>
                  </View>
                  <View style={styles.cell}>
                  <Text>{telefono}</Text>
                  </View>
                </View>
                );
                })
              ) : (
            <Text style={{opacity: 0.8, marginVertical: 20, textAlign: 'center'}}>No hay sucursales registradas</Text>
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
    flexDirection: 'row', justifyContent: 'space-around',
    padding: 5,
     elevation: 5,
    shadowColor: "#000", shadowOffset: {height: 2, width: 0,}
  },
  navIcons:{
    padding: 10, borderRadius: 50 ,
  },
  navIconsS:{
    padding: 10, borderRadius: 50 , backgroundColor: '#ddf',
  },
  navIconImage: {
    width: 20, height: 20,
  },
  lupaImage: {
    width: 15, height: 15,
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
  modalDelete: {
    backgroundColor: '#ff8787',
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
});
