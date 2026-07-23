import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, TouchableOpacity, TextInput, Modal, Alert} from 'react-native';
import Constants from 'expo-constants';
import { useState, useEffect, useCallback } from 'react';
import { NoEmojis, Validar} from './backend';
//import { obtenerSucursales, agregarSucursal, editarSucursal, eliminarSucursal } from './backend'
//import { obtenerAlmacenes } from './Almacenes/backend'
import { QuitarElemento, AddSucursal } from './backend';
import type { SucursalesScreenProps, FormerJSON } from './types';
import { usePagination } from '../context/PaginationContext'; import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

import datos from './datos.json'; import datosA from './Almacenes/datos.json'

export default function Sucursales({navigation}: SucursalesScreenProps) {

   const { theme, colors } = useTheme();
    const styles = getStyles(colors);

  //Inputs
  const [sucursal, setSucursal] = useState('');
  const [telefono, setTelefono] = useState('');
  const [query, setQuery] = useState('');

   //JSON
   //const [sucursales, setSucursales] = useState<Record<string, any>>({});
  const [sucursales, setSucursales] = useState<FormerJSON>(datos.SUCURSALES || {});
  //const [almacenes, setAlmacenes] = useState<Record<string, any>>({});
  const [almacenes, setAlmacenes] = useState<FormerJSON>(datosA.ALMACENES || {});
  const [sucursalesOG, setSucursalesOG] = useState<Record<string, any>>({});

  //Modales
  const [modalVisible, setModalVisible] = useState(false);
  const [EmodalVisible, setEModalVisible] = useState(false);
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

  // Cargar sucursales desde el servidor
  useFocusEffect(
    useCallback(() => {
      const cargarSucursales = async () => {
        try {
          setIsLoading(true);
          const data = await obtenerSucursales();
          
          // Convertir el array de sucursales a objeto con índices
          const sucursalesObj: Record<string, any> = {};
          if (Array.isArray(data)) {
            data.forEach((item: any, index: number) => {
              sucursalesObj[index + 1] = [item.sucursal, item.telefono];
            });
          }
          
          setSucursales(sucursalesObj);
          setSucursalesOG(sucursalesObj);
        } catch (error: any) {
          Alert.alert('Error', error.message || 'No se pudieron cargar las sucursales');
        } finally {
          setIsLoading(false);
        }
      };
      
      cargarSucursales();
    }, [])
  );

  const handleAgregar = async () => {
    const validation = Validar(2, sucursal, telefono, '', '');
    if (!validation.isValid) {
      Alert.alert('Error', validation.message);
      return;
    }

    try {
      const response = await agregarSucursal(sucursal, telefono);
      if (response.success) {
        // Recargar sucursales
        const data = await obtenerSucursales();
        const sucursalesObj: Record<string, any> = {};
        if (Array.isArray(data)) {
          data.forEach((item: any, index: number) => {
            sucursalesObj[index + 1] = [item.sucursal, item.telefono];
          });
        }
        setSucursales(sucursalesObj);
        setSucursalesOG(sucursalesObj);
        setModalVisible(false);
        setSucursal('');
        setTelefono('');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'No se pudo agregar la sucursal');
    }
  };

  const handleEditar = async () => {
  const validation = Validar(2, sucursal, telefono, '', '');
  if (!validation.isValid) {
    Alert.alert('Error', validation.message);
    return;
  }

  try {
    // Guardar la sucursal original antes de editarla
    const sucursalOriginal = sucursales[id]?.[0] || '';

    const response = await editarSucursal(id, sucursalOriginal, sucursal, telefono);
    if (response.success) {
      // Actualizar localmente
      const sucursalesActualizadas = { ...sucursales };
      sucursalesActualizadas[id] = [sucursal, telefono];
      setSucursales(sucursalesActualizadas);
      setSucursalesOG(sucursalesActualizadas);
      
      // También actualizar almacenes si el servidor no lo hace automáticamente o recargar almacenes desde el servidor
      const almacenesActualizados = await obtenerAlmacenes();
      setAlmacenes(almacenesActualizados);
      
      setEModalVisible(false);
      Alert.alert('Éxito', `Sucursal "${sucursalOriginal}" actualizada a "${sucursal}" en todos los almacenes`);
    }
  } catch (error: any) {
    Alert.alert('Error', error.message || 'No se pudo editar la sucursal');
  }
};

  const handleEliminar = async () => {
    try {
      const response = await eliminarSucursal(id);
      if (response.success) {
        const nuevasSucursales = { ...sucursales };
        delete nuevasSucursales[id];
        setSucursales(nuevasSucursales);
        setSucursalesOG(nuevasSucursales);
        setConfirm(false);
        setEModalVisible(false);
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'No se pudo eliminar la sucursal');
    }
  };
  export const eliminarSucursal = async (id: number) => {
  try {
    const token = await AsyncStorage.getItem('token');
    
    const response = await fetch(`${API_URL}/sucursales/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return await response.json();
  } catch (error) {
    console.log('Error:', error);
    throw error;
  }
};*/
//-----------------Paginación--------------------------------------------------------
  const [currentPage, setCurrentPage] = useState(1);
  const {itemsPerPage} = usePagination();
  const [sucursalesPaginadas, setSucursalesPaginadas] = useState<Record<string, any>>({});

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
  setSucursalesPaginadas(paginados);
};

// useEffect para actualizar la paginación cuando cambian los clientes
useEffect(() => {
  setCurrentPage(1); // Resetear a página 1 cuando cambian los datos
  const paginados = paginarClientes(sucursales, 1);
  setSucursalesPaginadas(paginados);
}, [sucursales]);


  return (
    <View style={styles.container}>
      <StatusBar style={theme === 'oscuro' ? 'light' : 'dark'}  />

      <View style={styles.navigation}>

      <TouchableOpacity
        style={styles.navIcons} onPress={() => navigation.navigate("Dashboard")}
      >
        <Ionicons name="grid-outline" size={20} color={colors.text} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navIcons} onPress={() => navigation.navigate("Compras")}
      >
        <Ionicons name="cart-outline" size={20} color={colors.text} />
      </TouchableOpacity>

       <TouchableOpacity
        style={styles.navIcons} onPress={() => navigation.navigate("Ventas")}
      >
        <Ionicons name="cash-outline" size={20} color={colors.text} />
      </TouchableOpacity>

      <View style={styles.navIcons} >
        <Ionicons name="business-outline" size={20} color={colors.primary} /></View>

       <TouchableOpacity
        style={styles.navIcons} onPress={() => navigation.navigate("Almacenes")}
      >
        <Ionicons name="cube-outline" size={20} color={colors.text} />
      </TouchableOpacity>

        <TouchableOpacity
        style={styles.navIcons} onPress={() => navigation.navigate("ListaDePrecios")}
      >
        <Ionicons name="pricetag-outline" size={20} color={colors.text} />
      </TouchableOpacity>

    </View>

    {/* Modal para añadir sucursales */}
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
                      <Text style={styles.modalTitle}>Añadir sucursal</Text>
                    </View>
        
                    <View style={styles.modalRow}>
                      <Text style={styles.modalLabel}>Sucursal:</Text>
                      <TextInput style={{...styles.input, width: 150}}
                      value={sucursal} onChangeText={(text) => setSucursal(NoEmojis(text))}/>
                    </View>
                    <View style={styles.modalRow}>
                      <Text style={styles.modalLabel}>Teléfono:</Text>
                      <TextInput style={{...styles.input, width: 150}}
                      value={telefono} onChangeText={(text) => setTelefono(NoEmojis(text))}/>
                    </View>
        
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                      <TouchableHighlight
                      underlayColor={colors.confirmUnderlay} style={styles.modalConfirm}
                        onPress={() => {
                          const validation = Validar(2,sucursal,telefono,'','');
                              if (!validation.isValid) {
                              Alert.alert('Error', validation.message);
                              return; 
                              }
                        setSucursales(AddSucursal(sucursales,id,sucursal,telefono))
                        setModalVisible(!modalVisible)
                      }}>
                        <Text style={styles.text}>Añadir registro</Text>
                      </TouchableHighlight>
                    </View>
        
                  </View>
                  </View>
                </Modal>
        
              {/* Modal para editar sucursales */}
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
                      <Text style={styles.modalTitle}>Editar sucursal</Text>
                    </View>
        
                    <View style={styles.modalRow}>
                      <Text style={styles.modalLabel}>Sucursal:</Text>
                      <TextInput style={{...styles.input, width: 150}}
                      value={sucursal} onChangeText={(text) => setSucursal(NoEmojis(text))}/>
                    </View>
                    <View style={styles.modalRow}>
                      <Text style={styles.modalLabel}>Teléfono:</Text>
                      <TextInput style={{...styles.input, width: 150}}
                      value={telefono} onChangeText={(text) => setTelefono(NoEmojis(text))}/>
                    </View>
        
                    <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                      <TouchableHighlight
                      underlayColor={colors.editUnderlay} style={[styles.modalEdit, {width: 150}]}
                        onPress={() => {
                          const validation = Validar(2,sucursal,telefono,'','');
                              if (!validation.isValid) {
                              Alert.alert('Error', validation.message);
                              return; 
                              }
                        setSucursales(AddSucursal(sucursales,id,sucursal,telefono))
                        setEModalVisible(!EmodalVisible)
                        }}>
                        <Text style={styles.text}>Confirmar cambios</Text>
                      </TouchableHighlight>
                      <TouchableHighlight
                      underlayColor={colors.deleteUnderlay} style={styles.modalDelete}
                        onPress={() => {
                          const categoriaEnUso = Object.values(almacenes || {}).some(
                                            (data) => data.length > 1 && data[1] === sucursal
                                          );

                                         if (categoriaEnUso) {
                                        Alert.alert(
                                        'No se puede borrar',
                                        `Esta sucursal tiene almacenes adentro. Sólo las sucursales vacías pueden borrarse.`
                                        );
                                        return;
                                        }
                                        setEModalVisible(false)
                          setConfirm(true)}}>
                        <Text style={styles.text}>Borrar registro</Text>
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
                                      setSucursales(QuitarElemento(sucursales, id));
                                      setConfirm(!Confirm);
                                    }}>
                                    <Ionicons name="checkmark" size={40} color={colors.text} />
                                  </TouchableOpacity>
                                </View>
                    
                              </View>
                              </View>
                            </Modal>

    {/*ScrollView*/}
      <ScrollView>
        <View style={styles.scroll}>
          
        <Text style={{  fontSize: 25, fontWeight: 'bold' ,color: colors.text}}>
        <Ionicons name="business" size={25} color={colors.text} /> Sucursales
        </Text>

        <Text style={{ fontSize: 15, paddingVertical: 10, color: colors.text}}>
          Seleccione el nombre de una sucursal en la tabla para modificar sus datos.
          </Text>
        
        <Text style={{ color: colors.text, fontSize: 15, paddingVertical: 10,}}>
          Para deshacer una busqueda, deje el criterio en blanco.</Text>

        <View style={{flexDirection: 'row', justifyContent: 'space-between', }}>
        <TouchableOpacity
        disabled = {AddOff}
        onPress={() => {
          setId(Object.keys(sucursales).length + 1)
          setSucursal(''); setTelefono('');
          setModalVisible(true)}}
        style={[styles.add, AddOff && styles.disabled]}>
            <Ionicons name="add" size={20} color={colors.text} />
          </TouchableOpacity>

            <View style={[styles.row, {alignItems: 'center'}]}>
                    <TextInput style={[styles.input, {backgroundColor: colors.background}]}
                    placeholder="Buscar sucursal" placeholderTextColor="#777"
                    value={query} onChangeText={setQuery}></TextInput>
                    <TouchableOpacity
                   onPress={() => {
                    if (query.trim() == ''){
                      setSucursales(datos.SUCURSALES || {})
                      setAddOff(false)
                    }
                    else {
                      const filtrado = Object.fromEntries(
                      Object.entries(datos.SUCURSALES || {}).filter(
                      ([id, data]) => data[0].toLowerCase().includes(query.toLowerCase())
                      ));
                      setSucursales(filtrado)
                      setAddOff(true)
                    }
                   }}
                    style={styles.add}>
                    <Ionicons name="search" size={20} color={colors.text} />
                   </TouchableOpacity>
                    </View>

          </View>
          
        <View style={styles.table}>
              <View style={[styles.row,{backgroundColor: colors.headerCell}]}>
                  <View style={styles.cell}>
                      <Text style={styles.text}>Sucursal</Text>
                      </View>
                  <View style={styles.cell}>
                      <Text style={styles.text}>Teléfono</Text>
                      </View>
                  </View>

                {/* Body - cada registro es una fila */}
                {!isLoading ? (
                Object.values(sucursalesPaginadas || {}).length > 0 ? (
                Object.entries(sucursalesPaginadas).map(([id, data]: [string, any]) => {
                const [sucursal, telefono] = data;
                return (
                <View key={id} style={styles.row}>
                <View style={styles.cell}>
                <TouchableOpacity
                  onPress={() => {
                    setId(Number(id))
                    setSucursal(sucursal); setTelefono(telefono);
                    setEModalVisible(true)
                  }}>
                  <Text style={styles.text}>{sucursal}</Text>
                  </TouchableOpacity>
                  </View>
                  <View style={styles.cell}>
                  <Text style={styles.text}>{telefono}</Text>
                  </View>
                </View>
                );
                })
              ) : (
            <Text style={{opacity: 0.8, textAlign: 'center', color: colors.text}}>
              No hay sucursales registradas</Text>
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
      Página {currentPage} de {Math.ceil(Object.keys(sucursales || {}).length / itemsPerPage)}
    </Text>
    
    <TouchableOpacity
      onPress={() => cambiarPagina(currentPage + 1)}
      style={[
        styles.paginationButton, 
        currentPage === Math.ceil(Object.keys(sucursales || {}).length / itemsPerPage) && styles.disabled
      ]}
      disabled={currentPage === Math.ceil(Object.keys(sucursales || {}).length / itemsPerPage)}
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
  text:{ color: colors.text},
  navigation: {
    backgroundColor: colors.navBackground,
    flexDirection: 'row', justifyContent: 'space-around',
  },
  navIcons:{padding: 10},
  scroll: {
    flex: 1,
    backgroundColor: colors.scrollBackground,
    padding: 18,
  },
  add: {
    backgroundColor: colors.input, padding: 10,
    borderRadius: 20,
  },
  disabled: {opacity: 0.6},
  //Tabla estilos
  table: {
   marginVertical: 20, marginHorizontal: 18,
   backgroundColor: colors.background,
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
   input: {
    backgroundColor: colors.scrollBackground, color: colors.text,
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
