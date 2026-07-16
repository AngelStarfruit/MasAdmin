import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, TextInput, Modal, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import Constants from 'expo-constants';
import { useState, useEffect, useCallback } from 'react';
import { NoEmojis, Validar } from './backend'
//import { obtenerClientes, agregarCliente, editarCliente, eliminarCliente } from './backend';
import { QuitarElemento, AddCliente } from './backend';
import { Picker } from '@react-native-picker/picker';
import { ClientesScreenProps, FormerJSON } from './types';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

import datos from './datos.json';

export default function Clientes({ navigation }: ClientesScreenProps ) {

  const { theme, colors } = useTheme();
  const styles = getStyles(colors);

  //Constatnes inputs
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [estado, setEstado] = useState('');
  const [query, setQuery] = useState('');

  //JSON
 //const [clientes, setClientes] = useState<Record<string, any>>({});
  const [clientes, setClientes] = useState<FormerJSON>(datos.CLIENTES || {});
  const [clientesOG, setClientesOG] = useState<Record<string, any>>({});

  //Constantes modales
  const [modalVisible, setModalVisible] = useState(false);
  const [EmodalVisible, setEModalVisible] = useState(false);
  const [Busqueda, setBusqueda] = useState(false);
  const [Confirm, setConfirm] = useState(false);

  //Constante picker
  const [selectedCriteria, setSelectedCriteria] = useState('Nombre');

  //Otras constantes
  const [id, setId] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [AddOff, setAddOff] = useState(false);
  const [idEmpresa, setIdEmpresa] = useState('');

  //Cargar ID de Empresa
  /*useFocusEffect(
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

  // Cargar sucursales desde el servidor
  useFocusEffect(
    useCallback(() => {
      const cargarClientes = async () => {
        try {
          setIsLoading(true);
          const data = await obtenerClientes();
          
          // Convertir el array de sucursales a objeto con índices
          const clientesObj: Record<string, any> = {};
          if (Array.isArray(data)) {
            data.forEach((item: any, index: number) => {
              clientesObj[index + 1] = [item.nombre, item.telefono, item.ciudad, item.estado];
            });
          }
          
          setClientes(clientesObj);
          setClientesOG(clientesObj);
        } catch (error: any) {
          Alert.alert('Error', error.message || 'No se pudieron cargar los clientes');
        } finally {
          setIsLoading(false);
        }
      };
      
      cargarClientes();
    }, [])
  );

  const handleAgregar = async () => {
    const validation = Validar(4, nombre, telefono, ciudad, estado);
    if (!validation.isValid) {
      Alert.alert('Error', validation.message);
      return;
    }

    try {
      const response = await agregarCliente(nombre, telefono, ciudad, estado);
      if (response.success) {
        // Recargar clientes
        const data = await obtenerClientes();
        const clientesObj: Record<string, any> = {};
        if (Array.isArray(data)) {
          data.forEach((item: any, index: number) => {
            clientesObj[index + 1] = [item.nombre, item.telefono, item.ciudad, item.estado];
          });
        }
        setClientes(clientesObj);
        setClientesOG(clientesObj);
        setModalVisible(false);
        setNombre('');
        setTelefono('');
        setCiudad('');
        setEstado('')
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'No se pudo agregar el cliente');
    }
  };

  const handleEditar = async () => {
    const validation = Validar(4, nombre, telefono, ciudad, estado);
    if (!validation.isValid) {
      Alert.alert('Error', validation.message);
      return;
    }

    try {
      const response = await editarCliente(id, nombre, telefono, ciudad, estado);
      if (response.success) {
        // Actualizar localmente
        const clientesActualizados = { ...clientes };
        clientesActualizados[id] = [nombre, telefono, ciudad, estado];
        setClientes(clientesActualizados);
        setProveedores(proveedoresActualizados);
        setEModalVisible(false);
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'No se pudo editar el cliente');
    }
  };

  const handleEliminar = async () => {
    try {
      const response = await eliminarCliente(id);
      if (response.success) {
        const nuevosClientes = { ...clientes };
        delete nuevosClientes[id];
        setClientes(nuevosClientes);
        setProveedoresOG(nuevasSucursales);
        setConfirm(false);
        setEModalVisible(false);
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'No se pudo eliminar el cliente');
    }
  };*/

  //-----------------Paginación--------------------------------------------------------
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(50);
  const [clientesPaginados, setClientesPaginados] = useState<Record<string, any>>({});

  const paginarClientes = (data: Record<string, any>, page: number) => {
  const entries = Object.entries(data || {});
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedEntries = entries.slice(startIndex, endIndex);
  
  return Object.fromEntries(paginatedEntries);
};

const cambiarPagina = (nuevaPagina: number) => {
  const totalPaginas = Math.ceil(Object.keys(clientes || {}).length / itemsPerPage);
  if (nuevaPagina < 1 || nuevaPagina > totalPaginas) return;
  
  setCurrentPage(nuevaPagina);
  const paginados = paginarClientes(clientes, nuevaPagina);
  setClientesPaginados(paginados);
};

// useEffect para actualizar la paginación cuando cambian los clientes
useEffect(() => {
  setCurrentPage(1); // Resetear a página 1 cuando cambian los datos
  const paginados = paginarClientes(clientes, 1);
  setClientesPaginados(paginados);
}, [clientes]);

  return (
    <View style={styles.container}>
      <StatusBar style={theme === 'oscuro' ? 'light' : 'dark'}  />

      <View style={styles.navigation}>
      
        <TouchableHighlight
        underlayColor={colors.navIconUnderlay} style={styles.navIcons}
        onPress={() => navigation.navigate("Ventas")} 
      >
        <Ionicons name="arrow-back" size={25} color={colors.text} />
      </TouchableHighlight>
    </View>

    {/* Modal para añadir clientes */}
        <Modal
              animationType="fade"
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
                  underlayColor={colors.scrollBackground}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Ionicons name="close" size={30} color={colors.text} />
                  </TouchableHighlight>
                </View>
    
                <View>
                  <Text style={styles.modalTitle}>Añadir cliente</Text>
                </View>
    
                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Nombre:</Text>
                  <TextInput style={{...styles.input, width: 200}}
                  value={nombre} onChangeText={(text) => setNombre(NoEmojis(text))}/>
                </View>
                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Teléfono:</Text>
                  <TextInput style={{...styles.input, width: 150}}
                  value={telefono} onChangeText={(text) => setTelefono(NoEmojis(text))}/>
                </View>
                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Ciudad:</Text>
                  <TextInput style={{...styles.input, width: 150}}
                  value={ciudad} onChangeText={(text) => setCiudad(NoEmojis(text))}/>
                </View>
                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Estado:</Text>
                  <TextInput style={{...styles.input, width: 150}}
                  value={estado} onChangeText={(text) => setEstado(NoEmojis(text))}/>
                </View>
    
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                  <TouchableHighlight
                  underlayColor={colors.confirmUnderlay} style={styles.modalConfirm}
                    onPress={() => {
                      const validation = Validar(4,nombre,telefono,ciudad,estado);
                          if (!validation.isValid) {
                          Alert.alert('Error', validation.message);
                          return; 
                          }
                      setClientes(AddCliente(clientes,id,nombre,telefono,ciudad,estado))
                      setModalVisible(!modalVisible)
                      }}>
                    <Text style={styles.text}>Añadir registro</Text>
                  </TouchableHighlight>
                </View>
    
              </View>
              </ScrollView>
              </KeyboardAvoidingView>
              </View>
            </Modal>
    
          {/* Modal para editar clientes */}
        <Modal
              animationType="fade"
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
                  underlayColor={colors.scrollBackground}
                  onPress={() => setEModalVisible(!EmodalVisible)}>
                  <Ionicons name="close" size={30} color={colors.text} />
                  </TouchableHighlight>
                </View>
    
                <View>
                  <Text style={styles.modalTitle}>Editar cliente</Text>
                </View>
    
                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Nombre:</Text>
                  <TextInput style={{...styles.input, width: 200}}
                  value={nombre} onChangeText={(text) => setNombre(NoEmojis(text))}/>
                </View>
                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Teléfono:</Text>
                  <TextInput style={{...styles.input, width: 150}}
                  value={telefono} onChangeText={(text) => setTelefono(NoEmojis(text))}/>
                </View>
                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Ciudad:</Text>
                  <TextInput style={{...styles.input, width: 150}}
                  value={ciudad} onChangeText={(text) => setCiudad(NoEmojis(text))}/>
                </View>
                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Estado:</Text>
                  <TextInput style={{...styles.input, width: 150}}
                  value={estado} onChangeText={(text) => setEstado(NoEmojis(text))}/>
                </View>
    
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                  <TouchableHighlight
                  underlayColor={colors.editUnderlay} style={styles.modalEdit}
                    onPress={() => {
                      const validation = Validar(4,nombre,telefono,ciudad,estado);
                          if (!validation.isValid) {
                          Alert.alert('Error', validation.message);
                          return; 
                          }
                      setClientes(AddCliente(clientes,id,nombre,telefono,ciudad,estado))
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
              </ScrollView>
              </KeyboardAvoidingView>
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
                        <View style={[styles.modalView, {marginVertical: 285}]}>
              
                          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                            <TouchableHighlight
                            style={{height: 30, width: 30, alignItems: "flex-end"}}
                            underlayColor={colors.scrollBackground}
                            onPress={() => setBusqueda(!Busqueda)}>
                            <Ionicons name="close" size={30} color={colors.text} />
                            </TouchableHighlight>
                          </View>
              
                          <View>
                            <Text style={styles.modalTitle}>Buscar cliente</Text>
                          </View>

                     <View>
                      <Text style={[styles.modalLabel, {marginBottom: 18}]}>
                        Para deshacer la busqueda, deje el criterio en blanco.</Text>
                    </View>
              
                          <View style={styles.modalRow}>
                            <Text style={styles.modalLabel}>Campo:</Text>
                            <View style={{width: 160, height: 55}}>
                                  <Picker
                                  selectedValue={selectedCriteria}
                                  onValueChange={(itemValue) => setSelectedCriteria(itemValue)}
                                  style={styles.picker}
                                  >
                                  <Picker.Item label="Nombre" value="Nombre" />
                                  <Picker.Item label="Ciudad" value="Ciudad" />
                                  <Picker.Item label="Estado" value="Estado" />
                                  </Picker></View>
                          </View>
                          <View style={styles.modalRow}>
                            <TextInput style={{...styles.input, width: 200}}
                            value={query} onChangeText={(text) => setQuery(NoEmojis(text))}/>
                          </View>
              
                          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                            <TouchableHighlight
                            underlayColor={colors.confirmUnderlay} style={styles.modalConfirm}
                               onPress={() => {
                          if(query.trim() == ''){
                            setClientes(datos.CLIENTES)
                            setAddOff(false)
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
              
                          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                            <TouchableHighlight
                            underlayColor={colors.regretUnderlay} style={styles.modalRegret}
                              onPress={() => setConfirm(!Confirm)}>
                              <Text style={[styles.text, {fontSize: 20}]}>NO</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                            underlayColor={colors.deleteUnderlay} style={styles.modalDelete}
                              onPress={() => {
                                setClientes(QuitarElemento(clientes, id));
                                setConfirm(!Confirm);
                                setEModalVisible(!EmodalVisible);
                              }}>
                              <Text style={[styles.text, {fontSize: 20}]}>SÍ</Text>
                            </TouchableHighlight>
                          </View>
              
                        </View>
                        </View>
                      </Modal>

      {/*ScrollView*/}
      <ScrollView>
        <View style={styles.scroll}>
        <Text style={{  fontSize: 25, fontWeight: 'bold', color: colors.text }}>
          <Ionicons name="people" size={25} color={colors.text} /> Clientes
        </Text>

        <Text style={{ 
          fontSize: 15, 
          paddingVertical: 10, color: colors.text}}>
          Seleccione el nombre de un cliente en la tabla para modificar sus datos.
          </Text>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableHighlight
                disabled={AddOff}
                underlayColor={colors.input}
                onPress={() => {
                  setId(Object.keys(clientes).length + 1)
                  setNombre(''); setTelefono(''); setCiudad(''); setEstado('')
                  setModalVisible(true)}}
                style={[styles.add, AddOff && styles.disabled]}>
                    <Text style={{ color: colors.text}}>Añadir cliente</Text>
                  </TouchableHighlight>

                      <TouchableHighlight
                      underlayColor={colors.input}
                      onPress={() => {
                        setBusqueda(true)
                      }}
                      style={{...styles.add,  padding: 10}}>
                      <Ionicons name="search" size={20} color={colors.text} />
                      </TouchableHighlight>
                      
                  </View>

        <View style={styles.table}>
              <View style={[styles.row, {backgroundColor: colors.headerCell}]}>
                  <View style={styles.cell}>
                      <Text style={styles.text}>Nombre</Text>
                      </View>
                  <View style={styles.cell}>
                      <Text style={styles.text}>Teléfono</Text>
                      </View>
                  <View style={styles.cell}>
                      <Text style={styles.text}>Ciudad</Text>
                  </View>
                      <View style={styles.cell}>
                      <Text style={styles.text}>Estado</Text>
                      </View>
                  </View>

                  {/* Body - cada registro es una fila */}
                  {!isLoading ? (
                  Object.values(clientesPaginados || {}).length > 0 ? (
                  Object.entries(clientesPaginados).map(([id, data]: [string, any]) => {
                  const [nombre, telefono, ciudad, estado] = data;
                  return(
                      <View key={id} style={styles.row}>
                      <View style={styles.cell}>
                          <TouchableHighlight
                          underlayColor={colors.input}
                          onPress={() => {
                            setId(Number(id))
                            setNombre(nombre); setTelefono(telefono); setCiudad(ciudad); setEstado(estado);
                            setEModalVisible(true)}}>
                          <Text style={styles.text}>{nombre}</Text>
                          </TouchableHighlight>
                          </View> 
                      <View style={styles.cell}><Text style={styles.text}>{telefono}</Text></View>
                      <View style={styles.cell}><Text style={styles.text}>{ciudad}</Text></View>
                      <View style={styles.cell}><Text style={styles.text}>{estado}</Text></View>
                </View>
                  )
               })
              ) : (
            <Text style={{opacity: 0.8,  textAlign: 'center', color: colors.text}}>
              No hay clientes registrados</Text>
            )) : (
              <Text style={{opacity: 0.8,  textAlign: 'center', color: colors.text}}>
              Cargando...</Text>
            )}
          </View>

          {/* Controles de paginación */}
{Object.keys(clientes || {}).length > itemsPerPage && (
  <View style={styles.paginationContainer}>
    <TouchableHighlight
      underlayColor={colors.input}
      onPress={() => cambiarPagina(currentPage - 1)}
      style={[styles.paginationButton, currentPage === 1 && styles.disabled]}
      disabled={currentPage === 1}
    >
        <Ionicons name="chevron-back" size={30} color={colors.headerCell} />
    </TouchableHighlight>
    
    <Text style={styles.text}>
      Página {currentPage} de {Math.ceil(Object.keys(clientes || {}).length / itemsPerPage)}
    </Text>
    
    <TouchableHighlight
      underlayColor={colors.input}
      onPress={() => cambiarPagina(currentPage + 1)}
      style={[
        styles.paginationButton, 
        currentPage === Math.ceil(Object.keys(clientes || {}).length / itemsPerPage) && styles.disabled
      ]}
      disabled={currentPage === Math.ceil(Object.keys(clientes || {}).length / itemsPerPage)}
    >
      <Ionicons name="chevron-forward" size={30} color={colors.headerCell} />
    </TouchableHighlight>
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
    marginTop: 10, padding: 10,
    borderRadius: 15,
  },
  disabled: { opacity: 0.6},
  input: {
    backgroundColor: colors.scrollBackground, color: colors.text,
    height: 40, width: 120,
    marginTop: 10,
  },
  //Tabla estilos
  table: {
    marginVertical: 20,
    marginHorizontal: -9, 
    backgroundColor: colors.background,
  },
  row: {flexDirection: 'row',},
  cell: {
    flex: 1, padding: 6,
  },
  //Modal estilos
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalView: {
    marginHorizontal: 18, marginVertical: 220,
    backgroundColor: colors.modalBackground,
    borderRadius: 20, padding: 20,
  },
  modalTitle: {
    fontSize: 30, fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: colors.text
  },
  modalRow:{
    flexDirection: 'row', 
    justifyContent: 'space-evenly', alignItems: 'center',
    marginBottom: 18,
  },
  modalLabel:{
    fontSize: 20, color: colors.text,
    textAlign: 'center'
  },
  modalConfirm: {
    backgroundColor: colors.confirm,
    padding: 10, borderRadius: 20,
  },
  modalEdit: {
    backgroundColor: colors.edit,
    padding: 10, borderRadius: 20,
  },
  modalRegret: {
    backgroundColor: colors.regret,
    padding: 10, borderRadius: 20,
  },
  modalDelete: {
    backgroundColor: colors.delete,
    padding: 10, borderRadius: 20,
  },
  //---------------
  picker: {
    backgroundColor: colors.scrollBackground, color: colors.text,
  },
  //Paginación
  paginationContainer: {
  flexDirection: 'row', justifyContent: 'space-evenly',
  alignItems: 'center',
  marginBottom: 40,
},
paginationButton: {
  padding: 5, borderRadius: 20,
  backgroundColor: colors.input,
},
});
