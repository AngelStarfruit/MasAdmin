import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, TextInput, Modal, Alert} from 'react-native';
import Constants from 'expo-constants';
import { useState, useCallback } from 'react';
import { NoEmojis, Validar} from './backend';
//import { obtenerSucursales, agregarSucursal, editarSucursal, eliminarSucursal } from './backend'
//import { obtenerAlmacenes } from './Almacenes/backend'
import { QuitarElemento, AddSucursal } from './backend';
import type { SucursalesScreenProps, FormerJSON } from './types';
import { useTheme } from '../context/ThemeContext';
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

  return (
    <View style={styles.container}>
      <StatusBar style={theme === 'oscuro' ? 'light' : 'dark'}  />

      <View style={styles.navigation}>

      <TouchableHighlight
        underlayColor={colors.navIconUnderlay} style={styles.navIcons}
        onPress={() => navigation.navigate("Dashboard")}
      >
        <Ionicons name="grid-outline" size={20} color={colors.text} /></TouchableHighlight>

      <TouchableHighlight
        underlayColor={colors.navIconUnderlay} style={styles.navIcons}
        onPress={() => navigation.navigate("Compras")}
      >
        <Ionicons name="cart-outline" size={20} color={colors.text} /></TouchableHighlight>

        <TouchableHighlight
        underlayColor={colors.navIconUnderlay} style={styles.navIcons}
        onPress={() => navigation.navigate("Ventas")}
      >
        <Ionicons name="cash-outline" size={20} color={colors.text} /></TouchableHighlight>

      <TouchableHighlight
        style={styles.navIconsS}
      >
        <Ionicons name="business-outline" size={20} color={colors.text} /></TouchableHighlight>

        <TouchableHighlight
        underlayColor={colors.navIconUnderlay} style={styles.navIcons}
        onPress={() => navigation.navigate("Almacenes")} 
      >
        <Ionicons name="cube-outline" size={20} color={colors.text} /></TouchableHighlight>

        <TouchableHighlight
        underlayColor={colors.navIconUnderlay} style={styles.navIcons}
        onPress={() => navigation.navigate("ListaDePrecios")} 
      >
        <Ionicons name="pricetag-outline" size={20} color={colors.text} /></TouchableHighlight>

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
                      <TouchableHighlight
                      style={{height: 30, width: 30, alignItems: "flex-end"}}
                      underlayColor={colors.input}
                      onPress={() => setModalVisible(!modalVisible)}>
                      <Ionicons name="close" size={20} color={colors.text} />
                      </TouchableHighlight>
                    </View>
        
                    <View>
                      <Text style={styles.modalTitle}>Añadir sucursal</Text>
                    </View>
        
                    <View style={styles.hr}/>
        
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
        
                    <View style={styles.hr}/>
        
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
                      <TouchableHighlight
                      style={{height: 30, width: 30, alignItems: "flex-end"}}
                      underlayColor={colors.input}
                      onPress={() => setEModalVisible(!EmodalVisible)}>
                      <Ionicons name="close" size={20} color={colors.text} />
                      </TouchableHighlight>
                    </View>
        
                    <View>
                      <Text style={styles.modalTitle}>Editar sucursal</Text>
                    </View>
        
                    <View style={styles.hr}/>
        
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
        
                    <View style={styles.hr}/>
        
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
                                      setSucursales(QuitarElemento(sucursales, id));
                                      setConfirm(!Confirm);
                                      setEModalVisible(!EmodalVisible);
                                    }}>
                                    <Text style={styles.text}>SI</Text>
                                  </TouchableHighlight>
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

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TouchableHighlight
        disabled = {AddOff}
        underlayColor={colors.cellUnderlay}
        onPress={() => {
          setId(Object.keys(sucursales).length + 1)
          setSucursal(''); setTelefono('');
          setModalVisible(true)}}
        style={[styles.add, AddOff && styles.addOff]}>
            <Text style={{fontWeight: 'bold', color: colors.text}}>Añadir sucursal</Text>
          </TouchableHighlight>

            <View style={styles.row}>
                    <TextInput style={styles.query}
                    placeholder="Buscar sucursal" placeholderTextColor="#777"
                    value={query} onChangeText={setQuery}></TextInput>
                    <TouchableHighlight
                    underlayColor={colors.cellUnderlay}
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
                    style={{...styles.add, width: 40, padding: 10}}>
                    <Ionicons name="search" size={20} color={colors.text} />
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
                {!isLoading ? (
                Object.values(sucursales || {}).length > 0 ? (
                Object.entries(sucursales).map(([id, data]: [string, any]) => {
                const [sucursal, telefono] = data;
                return (
                <View key={id} style={styles.row}>
                <View style={styles.cellF}>
                <TouchableHighlight
                underlayColor={colors.cellUnderlay}
                  onPress={() => {
                    setId(Number(id))
                    setSucursal(sucursal); setTelefono(telefono);
                    setEModalVisible(true)
                  }}>
                  <Text style={styles.text}>{sucursal}</Text>
                  </TouchableHighlight>
                  </View>
                  <View style={styles.cell}>
                  <Text style={styles.text}>{telefono}</Text>
                  </View>
                </View>
                );
                })
              ) : (
            <Text style={{opacity: 0.8, marginVertical: 20, textAlign: 'center', color: colors.text}}>
              No hay sucursales registradas</Text>
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
    flexDirection: 'row', justifyContent: 'space-around',
    padding: 5,
  },
  navIcons:{
    padding: 10, borderRadius: 50 ,
  },
  navIconsS:{
    padding: 10, borderRadius: 50 , backgroundColor: colors.navIconUnderlay,
  },
  scroll: {
    flex: 1,
    backgroundColor: colors.scrollBackground,
    padding: 18,
  },
  add: {
    backgroundColor: colors.input,
    height: 40, width: 150,
    marginTop: 10,
    padding: 10,
    borderRadius: 15,
  },
  addOff: {opacity: 0.6},
  query: {
    backgroundColor: colors.input, color: colors.text,  
    height: 40, width: 120,
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
   input: {
    backgroundColor: colors.scrollBackground, color: colors.text,
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
    fontSize: 20, fontWeight: 'bold', color: colors.text
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
  modalDelete: {
    backgroundColor: colors.delete,
    padding: 10,
    borderRadius: 20,
    width: 135,
    justifyContent: 'center', alignItems: 'center',
  },
  modalRegret: {
    backgroundColor: colors.regret,
    padding: 10,
    borderRadius: 20,
    width: 80,
    justifyContent: 'center', alignItems: 'center',
  },
});
