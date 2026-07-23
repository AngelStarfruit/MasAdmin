import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, TouchableOpacity, TextInput, Modal, Alert} from 'react-native';
import Constants from 'expo-constants';
import { useState, useEffect} from 'react';
import { Picker } from '@react-native-picker/picker';
import { NoEmojis, Validar } from './backend' 
//import { obtenerAlmacenes, agregarAlmacen, editarAlmacen, eliminarAlmacen } from './backend';
import { QuitarElemento, AddAlmacen } from './backend';
import type { AlmacenesInfoScreenProps, FormerJSON } from './types';
import { usePagination } from '../../context/PaginationContext'; import { useTheme } from '../../context/ThemeContext';
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
  const [selectedBranch, setSelectedBranch] = useState('');

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
  //-----------------Paginación--------------------------------------------------------
    const [currentPage, setCurrentPage] = useState(1);
    const {itemsPerPage} = usePagination();
    const [almacenesPaginados, setAlmacenesPaginados] = useState<Record<string, any>>({});
  
    const paginarClientes = (data: Record<string, any>, page: number) => {
    const entries = Object.entries(data || {});
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedEntries = entries.slice(startIndex, endIndex);
    
    return Object.fromEntries(paginatedEntries);
  };
  
  const cambiarPagina = (nuevaPagina: number) => {
    const totalPaginas = Math.ceil(Object.keys(sucursales || {}).length / itemsPerPage);
    if (nuevaPagina < 1 || nuevaPagina > totalPaginas) return;
    
    setCurrentPage(nuevaPagina);
    const paginados = paginarClientes(sucursales, nuevaPagina);
    setAlmacenesPaginados(paginados);
  };
  
  // useEffect para actualizar la paginación cuando cambian los clientes
  useEffect(() => {
    setCurrentPage(1); // Resetear a página 1 cuando cambian los datos
    const paginados = paginarClientes(sucursales, 1);
    setAlmacenesPaginados(paginados);
  }, [sucursales]);

  return (
    <View style={styles.container}>
      <StatusBar style={theme === 'oscuro' ? 'light' : 'dark'}  />

      <View style={styles.navigation}>
        <TouchableOpacity style={styles.navIcons}
        onPress={() => navigation.navigate("Almacenes")} 
      >
        <Ionicons name="arrow-back" size={25} color={colors.text} /></TouchableOpacity>
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
                          <TouchableOpacity
                          style={{height: 30, width: 30, alignItems: "flex-end"}}
                          onPress={() => setModalVisible(!modalVisible)}>
                          <Ionicons name="close" size={30} color={colors.text} />
                          </TouchableOpacity>
                        </View>
            
                        <View>
                          <Text style={styles.modalTitle}>Añadir almacén</Text>
                        </View>
            
                        <View style={styles.modalRow}>
                          <Text style={styles.modalLabel}>Almacén:</Text>
                          <TextInput style={{...styles.input, width: 150}}
                          value={almacen} onChangeText={(text) => setAlmacen(NoEmojis(text))}/>
                        </View>
                        <View style={styles.modalRow}>
                          <Text style={styles.modalLabel}>Sucursal:</Text>
                           <View style={{width:180, height:50}}>
                              <Picker
                              style={styles.input}
                              selectedValue={selectedBranch}
                              onValueChange={(itemValue) => setSelectedBranch(itemValue)}
                              >
                                <Picker.Item label="(Seleccione una sucursal)" value="" />
                              {Object.values(sucursales || {}).length > 0 ? (
                              Object.values(sucursales).map((sucursal: any, index) => (
                              <Picker.Item 
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
            
                        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                          <TouchableHighlight
                          underlayColor={colors.confirmUnderlay} style={styles.modalConfirm}
                            onPress={() => {
                              const validation = Validar(2,almacen,selectedBranch,'','');
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
                          <TouchableOpacity
                          style={{height: 30, width: 30, alignItems: "flex-end"}}
                          onPress={() => setEModalVisible(!EmodalVisible)}>
                          <Ionicons name="close" size={30} color={colors.text} />
                          </TouchableOpacity>
                        </View>
            
                        <View>
                          <Text style={styles.modalTitle}>Editar almacén</Text>
                        </View>
            
                        <View style={styles.modalRow}>
                          <Text style={styles.modalLabel}>Almacén:</Text>
                          <TextInput style={{...styles.input, width: 150}}
                          value={almacen} onChangeText={(text) => setAlmacen(NoEmojis(text))}/>
                        </View>
                        <View style={styles.modalRow}>
                          <Text style={styles.modalLabel}>Sucursal:</Text>
                          <View style={{width:180, height:55}}>
                              <Picker
                              style={styles.input}
                              selectedValue={selectedBranch}
                              onValueChange={(itemValue) => setSelectedBranch(itemValue)}
                              >
                              {Object.values(sucursales || {}).length > 0 ? (
                              Object.values(sucursales).map((sucursal: any, index) => (
                              <Picker.Item 
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
            
                        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                          <TouchableHighlight
                          underlayColor={colors.editUnderlay} style={styles.modalEdit}
                            onPress={() => {
                              const validation = Validar(1,almacen,'','','');
                                  if (!validation.isValid) {
                                  Alert.alert('Error', validation.message);
                                  return; 
                                 }
                              setAlmacenes(AddAlmacen(almacenes,id,almacen,selectedBranch))
                              setEModalVisible(!EmodalVisible)}}>
                            <Text style={styles.text}>Editar registro</Text>
                          </TouchableHighlight>
                          <TouchableHighlight
                          underlayColor={colors.deleteUnderlay} style={styles.modalDelete}
                            onPress={() => {
                              setEModalVisible(false)
                              setConfirm(true)}}>
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
                        <View style={styles.modalView}>
              
                          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                            <TouchableOpacity
                            style={{height: 30, width: 30, alignItems: "flex-end"}}
                            onPress={() => setBusqueda(!Busqueda)}>
                            <Ionicons name="close" size={30} color={colors.text} />
                            </TouchableOpacity>
                          </View>
              
                          <View>
                            <Text style={styles.modalTitle}>Buscar almacén</Text>
                          </View>
              
                          <View style={styles.modalRow}>
                            <Text style={styles.modalLabel}>Campo:</Text>
                            <View style={{width: 160, height: 55}}>
                                  <Picker
                                  selectedValue={selectedCriteria}
                                  onValueChange={(itemValue) => setSelectedCriteria(itemValue)}
                                  style={styles.input}
                                  >
                                  <Picker.Item label="Almacén" value="Almacén" />
                                  <Picker.Item label="Sucursal" value="Sucursal" />
                                  </Picker></View>
                          </View>
                          <View style={styles.modalRow}>
                            <TextInput style={{...styles.input, width: 150}}
                            value={query} onChangeText={(text) => setQuery(NoEmojis(text))}/>
                          </View>
              
                          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                            <TouchableHighlight
                            underlayColor={colors.confirmUnderlay} style={styles.modalConfirm}
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
                                    <View style={styles.modalView}>
                          
                                      <View>
                                        <Text style={styles.modalTitle}>¿Eliminar registro?</Text>
                                      </View>
                          
                                      <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                                        <TouchableOpacity onPress={() => {
                                            setEModalVisible(true)
                                            setConfirm(!Confirm)}}>
                                          <Ionicons name="close" size={40} color={colors.text} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {
                                            setAlmacenes(QuitarElemento(almacenes, id));
                                            setConfirm(!Confirm);
                                          }}><Ionicons name="checkmark" size={40} color={colors.text} />
                                        </TouchableOpacity>
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
          fontSize: 15, paddingVertical: 10, color: colors.text}}>
          Seleccione el nombre de un almacén en la tabla para modificar sus datos.
          </Text>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity
                disabled = {AddOff}
                onPress={() => {
                  if(Object.keys(sucursales).length > 0){
                  setId(Object.keys(almacenes).length + 1)
                  setAlmacen(''); 
                  setModalVisible(true)
                  }
                  else Alert.alert("Error","Registre al menos una sucursal primero")
                }}
                style={[styles.add, AddOff && styles.disabled]}>
                    <Ionicons name="add" size={20} color={colors.text} />
                  </TouchableOpacity>

                    <TouchableOpacity
                    onPress={() => {
                      setBusqueda(true)
                    }}
                    style={{...styles.add, padding: 10}}>
                    <Ionicons name="search" size={20} color={colors.text} />
                      </TouchableOpacity>
  
                  </View>

        <View style={styles.table}>
              <View style={[styles.row, {backgroundColor: colors.headerCell}]}>
                  <View style={styles.cell}>
                      <Text style={styles.text}>Almacén</Text>
                      </View>
                  <View style={styles.cell}>
                      <Text style={styles.text}>Sucursal</Text>
                      </View>
                  </View>

                  {/* Body - cada registro es una fila */}
                  {!isLoading ? (
                  Object.values(almacenesPaginados || {}).length > 0 ? (
                  Object.entries(almacenesPaginados).map(([id, data]: [string, any]) => {
                  const [almacen, sucursal] = data;
                  return(
                      <View key={id} style={styles.row}>
                      <View style={styles.cell}>
                          <TouchableOpacity
                          onPress={() => {
                            setId(Number(id))
                            setAlmacen(almacen); setSelectedBranch(sucursal);
                            setEModalVisible(true)}}>
                          <Text style={{color: colors.text}}>{almacen}</Text>
                          </TouchableOpacity>
                          </View> 
                      <View style={styles.cell}><Text style={{color: colors.text}}>{sucursal}</Text></View>
                </View>
                  )
                })
              ) : (
            <Text style={{opacity: 0.8, textAlign: 'center', color: colors.text}}>
              No hay almacenes registrados en esta sucursal</Text>
            )) : (
              <Text style={{opacity: 0.8, textAlign: 'center', color: colors.text}}>
              Cargando...</Text>
            )}
          </View>

          {/* Controles de paginación */}
{Object.keys(sucursales || {}).length > itemsPerPage && (
  <View style={styles.paginationContainer}>
    <TouchableOpacity
      onPress={() => cambiarPagina(currentPage - 1)}
      style={[styles.paginationButton, currentPage === 1 && styles.disabled]}
      disabled={currentPage === 1}
    >
        <Ionicons name="chevron-back" size={30} color={colors.headerCell} />
    </TouchableOpacity>
    
    <Text style={styles.text}>
      Página {currentPage} de {Math.ceil(Object.keys(almacenes || {}).length / itemsPerPage)}
    </Text>
    
    <TouchableOpacity
      onPress={() => cambiarPagina(currentPage + 1)}
      style={[
        styles.paginationButton, 
        currentPage === Math.ceil(Object.keys(almacenes || {}).length / itemsPerPage) && styles.disabled
      ]}
      disabled={currentPage === Math.ceil(Object.keys(almacenes || {}).length / itemsPerPage)}
    >
      <Ionicons name="chevron-forward" size={30} color={colors.headerCell} />
    </TouchableOpacity>
  </View>
)}
        
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
  text:{color: colors.text},
  navigation: {
    backgroundColor: colors.navBackground
  },
  navIcons:{padding: 10},
  scroll: {
    flex: 1,
    backgroundColor: colors.scrollBackground,
    padding: 18,
  },
  add: {
    backgroundColor: colors.background, padding: 10,
    borderRadius: 15,
  },
  disabled: {opacity: 0.6},
  input: {
    backgroundColor: colors.scrollBackground, color: colors.text, 
  },
  //Tabla estilos
  table: {
    marginVertical: 20, marginHorizontal: 18, 
    backgroundColor: colors.background
  },
  row: {flexDirection: 'row',},
  cell: {flex: 1, padding: 2,},
  //Modal estilos
  modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  justifyContent: 'center', alignItems: 'center',
},
modalView: {
  maxWidth: 350,
  padding: 12,
  backgroundColor: colors.modalBackground,
  borderRadius: 20,
},
  modalTitle: {
    fontSize: 25, fontWeight: 'bold',
    marginBottom: 9, textAlign: 'center',
    color: colors.text
  },
  modalRow:{
    flexDirection: 'row', justifyContent: 'space-evenly', 
    marginBottom: 18,
  },
  modalLabel:{
    fontSize: 20, color: colors.text
  },
  modalConfirm: {
    backgroundColor: colors.confirm, padding: 10, borderRadius: 20,
  },
  modalEdit: {
    backgroundColor: colors.edit, padding: 10, borderRadius: 20,
  },
  modalDelete: {
    backgroundColor: colors.delete, padding: 10, borderRadius: 20,
  },
    //Paginación
  paginationContainer: {
  flexDirection: 'row', justifyContent: 'space-evenly',
  alignItems: 'center',
  marginBottom: 40,
},
paginationButton: {padding: 5},
});
