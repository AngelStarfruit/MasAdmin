import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, TouchableOpacity, TextInput, Modal, Alert } from 'react-native';
import Constants from 'expo-constants';
import type { ProveedoresScreenProps, FormerJSON } from './types';
import { useState, useEffect, useCallback } from 'react';
import { Picker } from '@react-native-picker/picker';
import { NoEmojis, Validar } from './backend'
//import { obtenerProveedores, agregarProveedor, editarProveedor, eliminarProveedor } from './backend';
import { QuitarElemento, AddProveedor } from './backend';
import { useFocusEffect } from '@react-navigation/native';
import { usePagination } from '../../context/PaginationContext'; import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

import datos from './datos.json';

export default function Proveedores({ navigation }: ProveedoresScreenProps) {

  const { theme, colors } = useTheme();
  const styles = getStyles(colors);

  //Constantes de inputs
  const [empresa, setEmpresa] = useState('');
  const [telefono, setTelefono] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [estado, setEstado] = useState('');
  const [query, setQuery] = useState('');

  //JSON
  //const [proveedores, setProveedores] = useState<Record<string, any>>({});
  const [proveedores, setProveedores] = useState<FormerJSON>(datos.PROVEEDORES || {});
  const [proveedoresOG, setProveedoresOG] = useState<Record<string, any>>({});

  //Modales
  const [modalVisible, setModalVisible] = useState(false);
  const [EmodalVisible, setEModalVisible] = useState(false);
  const [Confirm, setConfirm] = useState(false);
  const [Busqueda, setBusqueda] = useState(false);

  //Constante de picker
  const [selectedCriteria, setSelectedCriteria] = useState('Empresa');

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

  // Cargar proveedores desde el servidor
  useFocusEffect(
    useCallback(() => {
      const cargarProveedores = async () => {
        try {
          setIsLoading(true);
          const data = await obtenerProveedores();
          
          // Convertir el array de proveedores a objeto con índices
          const proveedoresObj: Record<string, any> = {};
          if (Array.isArray(data)) {
            data.forEach((item: any, index: number) => {
              proveedoresObj[index + 1] = [item.empresa, item.telefono, item.ciudad, item.estado];
            });
          }
          
          setProveedores(proveedoresObj);
          setProveedoresOG(proveedoresObj);
        } catch (error: any) {
          Alert.alert('Error', error.message || 'No se pudieron cargar los proveedores');
        } finally {
          setIsLoading(false);
        }
      };
      
      cargarProveedores();
    }, [])
  );

  const handleAgregar = async () => {
    const validation = Validar(4, empresa, telefono, ciudad, estado);
    if (!validation.isValid) {
      Alert.alert('Error', validation.message);
      return;
    }

    try {
      const response = await agregarProveedor(empresa, telefono, ciudad, estado);
      if (response.success) {
        // Recargar proveedores
        const data = await obtenerProveedores();
        const proveedoresObj: Record<string, any> = {};
        if (Array.isArray(data)) {
          data.forEach((item: any, index: number) => {
            proveedoresObj[index + 1] = [item.empresa, item.telefono, item.ciudad, item.estado];
          });
        }
        setProveedores(proveedoresObj);
        setProveedoresOG(proveedoresObj);
        setModalVisible(false);
        setEmpresa('');
        setTelefono('');
        setCiudad('');
        setEstado('')
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'No se pudo agregar el proveedor');
    }
  };

  const handleEditar = async () => {
    const validation = Validar(4, empresa, telefono, ciudad, estado);
    if (!validation.isValid) {
      Alert.alert('Error', validation.message);
      return;
    }

    try {
      const response = await editarProveedor(id, empresa, telefono, ciudad, estado);
      if (response.success) {
        // Actualizar localmente
        const proveedoresActualizados = { ...proveedores };
        proveedoresActualizados[id] = [empresa, telefono, ciudad, estado];
        setProveedores(proveedoresActualizados);
        setProveedores(proveedoresActualizados);
        setEModalVisible(false);
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'No se pudo editar el proveedor');
    }
  };

  const handleEliminar = async () => {
    try {
      const response = await eliminarProveedor(id);
      if (response.success) {
        const nuevosProveedores = { ...proveedores };
        delete nuevosProveedores[id];
        setProveedores(nuevosProveedores);
        setProveedoresOG(nuevosProveedores);
        setConfirm(false);
        setEModalVisible(false);
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'No se pudo eliminar el proveedor');
    }
  };*/
    //-----------------Paginación--------------------------------------------------------
    const [currentPage, setCurrentPage] = useState(1);
    const {itemsPerPage} = usePagination();
    const [proveedoresPaginados, setProveedoresPaginados] = useState<Record<string, any>>({});
  
    const paginarClientes = (data: Record<string, any>, page: number) => {
    const entries = Object.entries(data || {});
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedEntries = entries.slice(startIndex, endIndex);
    
    return Object.fromEntries(paginatedEntries);
  };
  
  const cambiarPagina = (nuevaPagina: number) => {
    const totalPaginas = Math.ceil(Object.keys(proveedores || {}).length / itemsPerPage);
    if (nuevaPagina < 1 || nuevaPagina > totalPaginas) return;
    
    setCurrentPage(nuevaPagina);
    const paginados = paginarClientes(proveedores, nuevaPagina);
    setProveedoresPaginados(paginados);
  };
  
  // useEffect para actualizar la paginación cuando cambian los clientes
  useEffect(() => {
    setCurrentPage(1); // Resetear a página 1 cuando cambian los datos
    const paginados = paginarClientes(proveedores, 1);
    setProveedoresPaginados(paginados);
  }, [proveedores]);

  return (
    <View style={styles.container}>
      <StatusBar style={theme === 'oscuro' ? 'light' : 'dark'}  />

      <View style={styles.navigation}>
        <TouchableOpacity style={styles.navIcons}
        onPress={() => navigation.navigate("Compras")} 
      >
        <Ionicons name="arrow-back" size={25} color={colors.text} />
      </TouchableOpacity>
    </View>

    {/* Modal para añadir proveedores */}
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
              <Text style={styles.modalTitle}>Añadir proveedor</Text>
            </View>

            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Empresa:</Text>
              <TextInput style={{...styles.input, width: 150}}
              value={empresa} onChangeText={(text) => setEmpresa(NoEmojis(text))}/>
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
                  const validation = Validar(4,empresa,telefono,ciudad,estado);
                        if (!validation.isValid) {
                        Alert.alert('Error', validation.message);
                        return; 
                        }
                  setProveedores(AddProveedor(proveedores,id,empresa,telefono,ciudad,estado))
                  setModalVisible(!modalVisible)
                  }}>
                <Text style={styles.text}>Añadir registro</Text>
              </TouchableHighlight>
            </View>

          </View>
          </View>
        </Modal>

      {/* Modal para editar proveedores */}
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
              <Text style={styles.modalTitle}>Editar proveedor</Text>
            </View>

            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Empresa:</Text>
              <TextInput style={{...styles.input, width: 150}}
              value={empresa} onChangeText={(text) => setEmpresa(NoEmojis(text))}/>
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
                  const validation = Validar(4,empresa,telefono,ciudad,estado);
                        if (!validation.isValid) {
                        Alert.alert('Error', validation.message);
                        return; 
                        }
                  setProveedores(AddProveedor(proveedores,id,empresa,telefono,ciudad,estado))
                  setEModalVisible(!EmodalVisible)}}>
                <Text style={styles.text}>Editar registro</Text>
              </TouchableHighlight>
              <TouchableHighlight
              underlayColor={colors.deleteUnderlay} style={styles.modalDelete}
                onPress={() => {
                  setEModalVisible(false);
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
                      <Text style={styles.modalTitle}>Buscar proveedor</Text>
                    </View>

                    <View>
                      <Text style={[styles.modalLabel, { marginBottom: 10, textAlign: 'center'}]}>
                        Para deshacer la busqueda, deje el criterio en blanco.</Text>
                    </View>
        
                    <View style={styles.modalRow}>
                      <Text style={styles.modalLabel}>Campo:</Text>
                      <View style={{width: 160, height: 55}}>
                            <Picker
                            selectedValue={selectedCriteria}
                            onValueChange={(itemValue) => setSelectedCriteria(itemValue)}
                            style={styles.input}
                            >
                            <Picker.Item label="Empresa" value="Empresa" />
                            <Picker.Item label="Ciudad" value="Ciudad" />
                            <Picker.Item label="Estado" value="Estado" />
                            </Picker></View>
                    </View>
                    <View style={styles.modalRow}>
                      <Text style={styles.modalLabel}>Criterio:</Text>
                      <TextInput style={{...styles.input, width: 150}}
                      value={query} onChangeText={(text) => setQuery(NoEmojis(text))}/>
                    </View>
        
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                      <TouchableHighlight
                      underlayColor={colors.confirmUnderlay} style={styles.modalConfirm}
                        onPress={() => {
                          if(query.trim() == ''){
                            setProveedores(datos.PROVEEDORES)
                            setAddOff(false)
                          }
                          else {
                            let index = 0
                            switch(selectedCriteria){
                            case "Empresa": {index = 0; break}
                            case "Ciudad": {index = 2; break}
                            default: {index = 3; break}
                          }
                          const filtrado = Object.fromEntries(
                            Object.entries(datos.PROVEEDORES || {}).filter(
                            ([id, data]) => data[index].toLowerCase().includes(query.toLowerCase())
                            ));
                            setProveedores(filtrado)
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
                                setEModalVisible(true);
                                      setConfirm(!Confirm)}}>
                                    <Ionicons name="close" size={40} color={colors.text} />
                                  </TouchableOpacity>
                                  <TouchableOpacity onPress={() => {
                                      setProveedores(QuitarElemento(proveedores, id));
                                      setConfirm(!Confirm);
                                    }}><Ionicons name="checkmark" size={40} color={colors.text} />
                                  </TouchableOpacity>
                                </View>
                    
                              </View>
                              </View>
                            </Modal>

      {/*ScrollView: */}
      <ScrollView>
        <View style={styles.scroll}>

        <Text style={{  fontSize: 25, fontWeight: 'bold', color: colors.text }}>
          <Ionicons name="people" size={25} color={colors.text} /> Proveedores
        </Text>

        <Text style={{ 
          fontSize: 15, 
          paddingVertical: 10, color: colors.text}}>
          Seleccione la empresa de un proveedor en la tabla para modificar sus datos.
          </Text>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity
                disabled={AddOff}
                onPress={() => {
                  setId(Object.keys(proveedores).length + 1)
                  setEmpresa(''); setTelefono(''); setCiudad(''); setEstado(''); 
                  setModalVisible(true)}}
                style={[styles.add , AddOff && styles.disabled]}>
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
              <View style={[styles.row,{backgroundColor: colors.headerCell}]}>
                  <View style={styles.cell}>
                      <Text style={styles.text}>Empresa</Text>
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
                  Object.values(proveedoresPaginados || {}).length > 0 ? (
                  Object.entries(proveedoresPaginados).map(([id, data]: [string, any]) => {
                  const [empresa, telefono, ciudad, estado] = data;
                  return(
                      <View key={id} style={styles.row}>
                        <View style={styles.cell}>
                        <TouchableOpacity
                        onPress={() => {
                          setId(Number(id))
                          setEmpresa(empresa); setTelefono(telefono); setCiudad(ciudad); setEstado(estado);
                          setEModalVisible(true)}}>
                        <Text style={styles.text}>{empresa}</Text>
                        </TouchableOpacity>
                        </View> 
                      <View style={styles.cell}><Text style={styles.text}>{telefono}</Text></View>
                      <View style={styles.cell}><Text style={styles.text}>{ciudad}</Text></View>
                      <View style={styles.cell}><Text style={styles.text}>{estado}</Text></View>
                </View>
                  )
                  })
              ) : (
            <Text style={{opacity: 0.8, textAlign: 'center', color: colors.text}}>
              No hay proveedores registrados</Text>
            )) : (
              <Text style={{opacity: 0.8, textAlign: 'center', color: colors.text}}>
              Cargando...</Text>
            )}

 {/* Controles de paginación */}
{Object.keys(proveedores || {}).length > itemsPerPage && (
  <View style={styles.paginationContainer}>
    <TouchableOpacity
      onPress={() => cambiarPagina(currentPage - 1)}
      style={[styles.paginationButton, currentPage === 1 && styles.disabled]}
      disabled={currentPage === 1}
    >
        <Ionicons name="chevron-back" size={30} color={colors.headerCell} />
    </TouchableOpacity>
    
    <Text style={styles.text}>
      Página {currentPage} de {Math.ceil(Object.keys(proveedores || {}).length / itemsPerPage)}
    </Text>
    
    <TouchableOpacity
      onPress={() => cambiarPagina(currentPage + 1)}
      style={[
        styles.paginationButton, currentPage === Math.ceil(Object.keys(proveedores || {}).length / itemsPerPage) && styles.disabled
      ]}
      disabled={currentPage === Math.ceil(Object.keys(proveedores || {}).length / itemsPerPage)}
    >
      <Ionicons name="chevron-forward" size={30} color={colors.headerCell} />
    </TouchableOpacity>
  </View>
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
  text:{ color: colors.text},
  navigation: { backgroundColor: colors.navBackground },
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
  disabled: {
    opacity: 0.6,
  },
  input: {
    backgroundColor: colors.scrollBackground, color: colors.text,
  },
  //Tabla estilos
  table: {
    marginVertical: 20,
    backgroundColor: colors.background
  },
  row: {flexDirection: 'row',},
  cell: {flex: 1, padding: 2},
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
    marginBottom: 9,
    textAlign: 'center',
    color: colors.text
  },
  modalRow:{
    flexDirection: 'row', 
    justifyContent: 'space-evenly', alignItems: 'center',
    marginBottom: 18,
  },
  modalLabel:{
    fontSize: 20, color: colors.text
  },
  modalConfirm: {
    backgroundColor: colors.confirm,  padding: 10, borderRadius: 20,
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
