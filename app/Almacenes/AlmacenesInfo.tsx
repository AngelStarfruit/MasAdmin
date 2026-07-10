import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, TextInput, Modal, Alert} from 'react-native';
import Constants from 'expo-constants';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { NoEmojis, Validar } from './backend' 
//import { obtenerAlmacenes, agregarAlmacen, editarAlmacen, eliminarAlmacen } from './backend';
import { QuitarElemento, AddAlmacen } from './backend';
import type { AlmacenesInfoScreenProps, FormerJSON } from './types';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import datosA from './datos.json'; import datosS from '../datos.json'

export default function AlmacenesInfo({ navigation }: AlmacenesInfoScreenProps ) {

  const { theme, colors } = useTheme();
  const styles = getStyles(colors);

  //Constantes de inputs
  const [almacen, setAlmacen] = useState('');
  const [query, setQuery] = useState('');

  //JSONs de datos
  //const [sucursales, setSucursales] = useState<Record<string, any>>({});
  const [almacenes, setAlmacenes] = useState<FormerJSON>(datosA.ALMACENES || {});
  const [almacenesOG, setAlmacenesOG] = useState<Record<string, any>>({});
  const sucursales: Record<string, any> = datosS.SUCURSALES || {};

  //Constantes de pickers
  const [selectedCriteria, setSelectedCriteria] = useState('Almacén');
  const [selectedBranch, setSelectedBranch] = useState(sucursales[Object.keys(sucursales)[0]]?.[0] || '');

  //Modales
  const [modalVisible, setModalVisible] = useState(false);
  const [EmodalVisible, setEModalVisible] = useState(false);
  const [Busqueda, setBusqueda] = useState(false);
  const [Confirm, setConfirm] = useState(false);

  //Otras constantes
  const [id, setId] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [AddOff, setAddOff] = useState(false);
  const [idEmpresa, setIdEmpresa] = useState('');

  /*// Cargar ID de empresa
  useFocusEffect(
    useCallback(() => {
      const cargarEmpresa = async () => {
        try {
          const id = await AsyncStorage.getItem('idEmpresa');
          if (id) setIdEmpresa(id);
        } catch (error) {
          console.log('Error cargando empresa', error);
        }
      };
      cargarEmpresa();
    }, [])
  );

  // Cargar almacenes desde el servidor
  useFocusEffect(
    useCallback(() => {
      const cargarAlmacenes = async () => {
        try {
          setIsLoading(true);
          const data = await obtenerAlmacenes();
          
          // Convertir el array de almacenes a objeto con índices
          const almacenesObj: Record<string, any> = {};
          if (Array.isArray(data)) {
            data.forEach((item: any, index: number) => {
              almacenesObj[index + 1] = [item.almacen, item.sucursal];
            });
          }
          
          setAlmacenes(almacenesObj);
          setAlmacenesOG(almacenesObj);
        } catch (error: any) {
          Alert.alert('Error', error.message || 'No se pudieron cargar los almacenes');
        } finally {
          setIsLoading(false);
        }
      };
      
      cargarAlmacenes();
    }, [])
  );

  const handleAgregar = async () => {
    const validation = Validar(2, almacen, sucursal, '', '');
    if (!validation.isValid) {
      Alert.alert('Error', validation.message);
      return;
    }

    try {
      const response = await agregarAlmacen(almacen, sucursal);
      if (response.success) {
        // Recargar almacenes
        const data = await obtenerAlmacenes();
        const almacenesObj: Record<string, any> = {};
        if (Array.isArray(data)) {
          data.forEach((item: any, index: number) => {
            almacenesObj[index + 1] = [item.almacen, item.sucursal];
          });
        }
        setAlmacenes(almacenesObj);
        setAlmacenesOG(almacenesObj);
        setModalVisible(false);
        setAlmacen('');
        setSucursal('');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'No se pudo agregar el almacén');
    }
  };

  const handleEditar = async () => {
    const validation = Validar(2, almacen, sucursal, '', '');
    if (!validation.isValid) {
      Alert.alert('Error', validation.message);
      return;
    }

    try {
      const response = await editarAlmacen(id, almacen, sucursal);
      if (response.success) {
        // Actualizar localmente
        const almacenesActualizados = { ...almacenes };
        almacenesActualizados[id] = [almacen, sucursal];
        setAlmacenes(almacenesActualizados);
        setAlmacenesOG(almacenesActualizados);
        setEModalVisible(false);
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'No se pudo editar el almacén');
    }
  };

  const handleEliminar = async () => {
    try {
      const response = await eliminarAlmacen(id);
      if (response.success) {
        const nuevosAlmacenes = { ...almacenes };
        delete nuevosAlmacenes[id];
        setAlmacenes(nuevosAlmacenes);
        setAlmacenesOG(nuevosAlmacenes);
        setConfirm(false);
        setEModalVisible(false);
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'No se pudo eliminar el almacén');
    }
  }; */

  return (
    <View style={styles.container}>
      <StatusBar style={theme === 'oscuro' ? 'light' : 'dark'}  />

      <View style={styles.navigation}>
        <TouchableHighlight
        underlayColor={colors.navIconUnderlay} style={styles.navIcons}
        onPress={() => navigation.navigate("Almacenes")} 
      >
        <Ionicons name="arrow-back" size={25} color={colors.text} /></TouchableHighlight>
    </View>

    {/* Modal para añadir almacenes */}
                <Modal
                      animationType="fade"
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
                          underlayColor={colors.scrollBackground}
                          onPress={() => setModalVisible(!modalVisible)}>
                          <Ionicons name="close" size={20} color={colors.text} />
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
                           <View style={{width:180, height:50}}>
                              <Picker
                              style={styles.picker}
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
                          underlayColor={colors.confirmUnderlay} style={styles.modalConfirm}
                            onPress={() => {
                              const validation = Validar(1,almacen,'','','');
                                  if (!validation.isValid) {
                                  Alert.alert('Error', validation.message);
                                  return; 
                                 }
                              setAlmacenes(AddAlmacen(almacenes,id,almacen,selectedBranch))
                              setModalVisible(!modalVisible)
                              }}>
                            <Text style={styles.text}>Añadir registro</Text>
                          </TouchableHighlight>
                        </View>
            
                      </View>
                      </View>
                    </Modal>
            
                  {/* Modal para editar almacenes */}
                <Modal
                      animationType="fade"
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
                          underlayColor={colors.scrollBackground}
                          onPress={() => setEModalVisible(!EmodalVisible)}>
                          <Ionicons name="close" size={20} color={colors.text} />
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
                              style={styles.picker}
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
                          underlayColor={colors.editUnderlay} style={styles.modalEdit}
                            onPress={() => {
                              const validation = Validar(1,almacen,'','','');
                                  if (!validation.isValid) {
                                  Alert.alert('Error', validation.message);
                                  return; 
                                 }
                                 setQuery('')
                              setAlmacenes(AddAlmacen(almacenes,id,almacen,selectedBranch))
                              setEModalVisible(!EmodalVisible)}}>
                            <Text style={styles.text}>Editar registro</Text>
                          </TouchableHighlight>
                          <TouchableHighlight
                          underlayColor={colors.deleteUnderlay} style={styles.modalDelete}
                            onPress={() => setConfirm(true)}>
                            <Text style={styles.text}>Borrar registro</Text>
                          </TouchableHighlight>
                        </View>
            
                      </View>
                      </View>
                    </Modal>
      {/* Modal para realizar una búsqueda */}
                  <Modal
                        animationType="fade"
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
                            underlayColor={colors.scrollBackground}
                            onPress={() => setBusqueda(!Busqueda)}>
                            <Ionicons name="close" size={20} color={colors.text} />
                            </TouchableHighlight>
                          </View>
              
                          <View>
                            <Text style={styles.modalTitle}>Buscar almacén</Text>
                          </View>
              
                          <View style={styles.hr}/>
              
                          <View style={styles.modalRow}>
                            <Text style={styles.modalLabel}>Campo:</Text>
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
                            underlayColor={colors.confirmUnderlay} style={[styles.modalConfirm, {width: 90}]}
                              onPress={() => {
                          if(query.trim() == ''){
                            setAlmacenes(datosA.ALMACENES)
                            setAddOff(false)
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
                            setAddOff(true)
                          }
                              setBusqueda(!Busqueda)}}>
                              <Text style={styles.text}>Buscar</Text>
                            </TouchableHighlight>
                          </View>
              
                        </View>
                        </View>
                      </Modal>
      
      {/* Modal para confirmar borrado */}
                              <Modal
                                    animationType="fade"
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
                                        underlayColor={colors.regretUnderlay} style={[styles.modalRegret, {width: 50}]}
                                          onPress={() => setConfirm(!Confirm)}>
                                          <Text style={styles.text}>NO</Text>
                                        </TouchableHighlight>
                                        <TouchableHighlight
                                        underlayColor={colors.deleteUnderlay} style={[styles.modalDelete, {width: 50}]}
                                          onPress={() => {
                                            setQuery('')
                                            setAlmacenes(QuitarElemento(almacenes, id));
                                            setConfirm(!Confirm);
                                            setEModalVisible(!EmodalVisible);
                                          }}>
                                          <Text style={styles.text}>SÍ</Text>
                                        </TouchableHighlight>
                                      </View>
                          
                                    </View>
                                    </View>
                                  </Modal>

      <ScrollView>
        <View style={styles.scroll}>
        <Text style={{  fontSize: 25, fontWeight: 'bold', color: colors.text}}>
        <Ionicons name="cube" size={25} color={colors.text} /> Almacenes
        </Text>

        <Text style={{ 
          fontSize: 15, 
          paddingVertical: 10, color: colors.text}}>
          Seleccione el nombre de un almacén en la tabla para modificar sus datos.
          </Text>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableHighlight
                disabled = {AddOff}
                underlayColor={colors.input}
                onPress={() => {
                  if(Object.keys(sucursales).length > 0){
                  setId(Object.keys(almacenes).length + 1)
                  setAlmacen(''); 
                  setModalVisible(true)
                  }
                  else Alert.alert("Error","Registre al menos una sucursal primero")
                }}
                style={[styles.add, AddOff && styles.addOff]}>
                    <Text style={{fontWeight: 'bold', color: colors.text}}>Añadir almacén</Text>
                  </TouchableHighlight>

                    <TouchableHighlight
                    underlayColor={colors.input}
                    onPress={() => {
                      setBusqueda(true)
                    }}
                    style={{...styles.add, width: 40, padding: 10}}>
                    <Ionicons name="search" size={20} color={colors.text} />
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
                  {!isLoading ? (
                  Object.values(almacenes || {}).length > 0 ? (
                  Object.entries(almacenes).map(([id, data]: [string, any]) => {
                  const [almacen, sucursal] = data;
                  return(
                      <View key={id} style={styles.row}>
                      <View style={styles.cellF}>
                          <TouchableHighlight
                          underlayColor={colors.input}
                          onPress={() => {
                            setId(Number(id))
                            setAlmacen(almacen); setSelectedBranch(sucursal);
                            setEModalVisible(true)}}>
                          <Text style={{color: colors.text}}>{almacen}</Text>
                          </TouchableHighlight>
                          </View> 
                      <View style={styles.cell}><Text style={{color: colors.text}}>{sucursal}</Text></View>
                </View>
                  )
                })
              ) : (
            <Text style={{opacity: 0.8, marginVertical: 20, textAlign: 'center', color: colors.text}}>
              No hay almacenes registrados en esta sucursal</Text>
            )) : (
              <Text style={{opacity: 0.8, marginVertical: 20, textAlign: 'center', color: colors.text}}>
              Cargando...</Text>
            )}
          </View>
        
        </View>
      </ScrollView>
    </View>
  );
}

const getStyles = (colors: any) => StyleSheet.create({
  container:{
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: colors.background
  },
  text:{
    color: colors.text
  },
  navigation: {
    backgroundColor: colors.navBackground,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  navIcons:{
    padding: 10, 
    borderRadius: 50 ,
    marginTop: 20,
  },
  scroll: {
    flex: 1,
    backgroundColor: colors.scrollBackground,
    padding: 18,
  },
   add: {
    backgroundColor: colors.background,
    height: 40, width: 150,
    marginTop: 10,
    padding: 10,
    borderRadius: 15,
  },
  addOff: {opacity: 0.6},
  query: {
    backgroundColor: colors.scrollBackground, color: colors.text, 
    height: 40, width: 150,
    marginTop: 10,
  },
  //Tabla estilos
  table: {
    paddingVertical: 20,
    marginBottom: 80
  },
  row: {flexDirection: 'row',},
  headerCell: {
    flex: 1, padding: 6,
    backgroundColor: colors.headerCell,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cell: {
    flex: 1, padding: 6,
    borderWidth: 1,
    backgroundColor: colors.background,
    borderColor: colors.border,
  },
  cellF: {
    flex: 1, padding: 6,
    borderWidth: 1,
    backgroundColor: colors.input,
    borderColor: colors.border,
  },
  headerText: {fontWeight: 'bold', color: colors.text},
  //Modal estilos
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalView: {
    marginHorizontal: 18, marginVertical: 290,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.modalBackground,
    borderRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 30, fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: colors.text
  },
   hr:{
    height: 2, 
    backgroundColor: '#777', 
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
    color: colors.text
  },
  modalConfirm: {
    backgroundColor: colors.confirm,
    padding: 10,
    borderRadius: 20,
    width: 130,
    justifyContent: 'center', alignItems: 'center',
  },
  modalEdit: {
    backgroundColor: colors.edit,
    padding: 10,
    borderRadius: 20,
    width: 135,
    justifyContent: 'center', alignItems: 'center',
  },
  modalRegret: {
    backgroundColor: colors.regret,
    padding: 10,
    borderRadius: 20,
    width: 130,
    justifyContent: 'center', alignItems: 'center',
  },
  modalDelete: {
    backgroundColor: colors.delete,
    padding: 10,
    borderRadius: 20,
    width: 135,
    justifyContent: 'center', alignItems: 'center',
  },
  //------------------
  picker: {
    height: 50,
    marginLeft: 10,
    flex: 1,
    backgroundColor: colors.scrollBackground,
    color: colors.text,
  },
  pickerItem: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
