import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, Modal, TextInput, Alert } from 'react-native';
import Constants from 'expo-constants';
import { type CategoriasScreenProps, single } from './types';
import { useState, useCallback } from 'react';
//import { obtenerCategorias, obtenerPrecios agregarCategoria, editarCategoria, eliminarCategoria } from './backend';
import { NoEmojis, Validar} from './backend';
import { AddCategoria, QuitarElemento } from './backend';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

import datos from './datos.json'; 

export default function AddRegistroVenta({ navigation }: CategoriasScreenProps) {

  const { theme, colors } = useTheme();
  const styles = getStyles(colors);

  //Constantes de modales
  const [modalVisible, setModalVisible] = useState(false);
  const [modalEVisible, setModalEVisible] = useState(false);
  const [Confirm, setConfirm] = useState(false);

  //Constante de input
  const [category, setCategory] = useState('');
  const [query, setQuery] = useState('')

  //JSONs de datos
  //const [categorias, setCategorias] = useState<single>({});
  const [categorias, setCategorias] = useState<single>(datos.CATEGORIAS || {});
  const [categoriasOG, setCategoriasOG] = useState<single>({});
  const [listaPrecios, setListaPrecios] = useState(datos.LISTA_PRECIOS || {});

  //Otras constantes
  const [id, setId] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [AddOff, setAddOff] = useState(false);
  const [idEmpresa, setIdEmpresa] = useState('');

  // Cargar categorías desde el servidor
  /*
  useFocusEffect(
    useCallback(() => {
      const cargarCategorias = async () => {
        try {
          setIsLoading(true);
          const data = await obtenerCategorias();
          setCategorias(data);
          setCategoriasOG(data);
        } catch (error: any) {
          Alert.alert('Error', error.message || 'No se pudieron cargar las categorías');
        } finally {
          setIsLoading(false);
        }
      };
      
      cargarCategorias();
    }, [])
  );

  const handleAgregar = async () => {
    const validation = Validar(1, category, '', '', '');
    if (!validation.isValid) {
      Alert.alert('Error', validation.message);
      return;
    }

    try {
      const response = await agregarCategoria(category);
      if (response.success) {
        // Recargar categorías
        const data = await obtenerCategorias();
        setCategorias(data);
        setCategoriasOG(data);
        setModalVisible(false);
        setCategory('');
        Alert.alert('Éxito', 'Categoría agregada correctamente');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'No se pudo agregar la categoría');
    }
  };

 const handleEditar = async () => {
  const validation = Validar(1, category, '', '', '');
  if (!validation.isValid) {
    Alert.alert('Error', validation.message);
    return;
  }

  try {
    // Si estás usando API
    const response = await editarCategoria(id, categoriaOriginal, category);
    if (response.success) {
      // Recargar datos actualizados
      const nuevasCategorias = await obtenerCategorias();
      const nuevosProductos = await obtenerListaPrecios();
      
      setCategorias(nuevasCategorias);
      setCategoriasOG(nuevasCategorias);
      setListaPrecios(nuevosProductos);
      
      setModalEVisible(false);
      Alert.alert('Éxito', 'Categoría y productos actualizados correctamente');
    }
  } catch (error: any) {
    Alert.alert('Error', error.message || 'No se pudo editar la categoría');
  }
};

 const handleEliminar = async () => {
    try {
      const response = await eliminarCategoria(id);
      if (response.success) {
        const nuevasCategorias = { ...categorias };
        delete nuevasCategorias[id];
        setCategorias(nuevasCategorias);
        setCategoriasOriginales(nuevasCategorias);
        setConfirm(false);
        setModalEVisible(false);
        Alert.alert('Éxito', 'Categoría eliminada correctamente');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'No se pudo eliminar la categoría');
    }
  }; */

  //-----------------Paginación--------------------------------------------------------
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(50);
  const [categoriasPaginadas, setCategoriasPaginadas] = useState<Record<string, any>>({});

  const paginarClientes = (data: Record<string, any>, page: number) => {
  const entries = Object.entries(data || {});
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedEntries = entries.slice(startIndex, endIndex);
  
  return Object.fromEntries(paginatedEntries);
};

const cambiarPagina = (nuevaPagina: number) => {
  const totalPaginas = Math.ceil(Object.keys(categorias || {}).length / itemsPerPage);
  if (nuevaPagina < 1 || nuevaPagina > totalPaginas) return;
  
  setCurrentPage(nuevaPagina);
  const paginados = paginarClientes(categorias, nuevaPagina);
  setCategoriasPaginadas(paginados);
};
 
  return (
    <View style={styles.container}>
     <StatusBar style={theme === 'oscuro' ? 'light' : 'dark'}  />

    <View style={styles.navigation}>
            <TouchableHighlight
            underlayColor={colors.navIconUnderlay} style={styles.navIcons}
            onPress={() => navigation.navigate("ListaDePrecios")}
          >
            <Ionicons name="arrow-back" size={25} color={colors.text} />
          </TouchableHighlight>
        </View>

      {/* Modal para añadir categorías */}
            <Modal
                  animationType="fade"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    setModalVisible(!modalVisible);
                  }}>
                  <View style={styles.modalOverlay}>
                  <View style={[styles.modalView, {marginVertical: 340}]}>
        
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                      <TouchableHighlight
                      style={{height: 30, width: 30, alignItems: "flex-end"}}
                      underlayColor={colors.scrollBackground}
                      onPress={() => setModalVisible(!modalVisible)}>
                      <Ionicons name="close" size={30} color={colors.text} />
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
                      underlayColor={colors.confirmUnderlay} style={styles.modalConfirm}
                        onPress={() => {
                          const validation = Validar(1,category,'','','');
                             if (!validation.isValid) {
                            Alert.alert('Error', validation.message);
                            return; 
                            }
                            setCategorias(AddCategoria(categorias,id,category))
                            setModalVisible(!modalVisible)
                          }}>
                        <Text style={styles.text}>Añadir registro</Text>
                      </TouchableHighlight>
                    </View>
        
                  </View>
                  </View>
                </Modal>
    
    {/* Modal para editar categorías */}
            <Modal
                  animationType="fade"
                  transparent={true}
                  visible={modalEVisible}
                  onRequestClose={() => {
                    setModalEVisible(!modalEVisible);
                  }}>
                  <View style={styles.modalOverlay}>
                  <View style={[styles.modalView, {marginVertical: 340}]}>
        
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                      <TouchableHighlight
                      style={{height: 30, width: 30, alignItems: "flex-end"}}
                      underlayColor={colors.scrollBackground}
                      onPress={() => setModalEVisible(!modalEVisible)}>
                      <Ionicons name="close" size={30} color={colors.text} />
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
                                      underlayColor={colors.editUnderlay} style={styles.modalEdit}
                                        onPress={() => {
                                          const validation = Validar(1,category,'','','');
                                              if (!validation.isValid) {
                                              Alert.alert('Error', validation.message);
                                              return; 
                                              }
                                          setCategorias(AddCategoria(categorias,id,category))
                                          setModalEVisible(!modalEVisible)}}>
                                        <Text style={styles.text}>Confirmar cambios</Text>
                                      </TouchableHighlight>
                                      <TouchableHighlight
                                      underlayColor={colors.deleteUnderlay} style={styles.modalDelete}
                                        onPress={() => {
                                          const categoriaEnUso = Object.values(listaPrecios || {}).some(
                                            (data) => data.length > 6 && data[6] === category
                                          );

                                         if (categoriaEnUso) {
                                        Alert.alert(
                                        'No se puede borrar',
                                        `Esta categoría tiene productos adentro. Sólo las categorías vacías pueden borrarse.`
                                        );
                                        return;
                                        }
                                        setModalEVisible(false)
                                          setConfirm(true)}}
                                        >
                                        <Text style={styles.text}>Borrar categoría</Text>
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
                                       <Text style={styles.modalTitle}>¿Eliminar categoría?</Text>
                                     </View>
                         
                                     <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                                       <TouchableHighlight
                                       underlayColor={colors.regretUnderlay} style={styles.modalRegret}
                                         onPress={() => {
                                          setModalEVisible(true)
                                          setConfirm(!Confirm)}}>
                                         <Text style={[styles.text, {fontSize: 20}]}>NO</Text>
                                       </TouchableHighlight>
                                       <TouchableHighlight
                                       underlayColor={colors.deleteUnderlay} style={[styles.modalDelete, {width: 50}]}
                                         onPress={() => {
                                           setCategorias(QuitarElemento(categorias, id));
                                           setConfirm(!Confirm);
                                         }}>
                                         <Text style={[styles.text, {fontSize: 20}]}>SI</Text>
                                       </TouchableHighlight>
                                     </View>
                         
                                   </View>
                                   </View>
                                 </Modal>

      {/*ScrollView*/}
      <ScrollView>
        <View style={styles.scroll}>
        <Text style={{  fontSize: 25, fontWeight: 'bold', color: colors.text }}>
        Gestionar categorías
        </Text>
        <Text style={{ color: colors.text, fontSize: 15, paddingVertical: 10,}}>
          Seleccione una categoría para editarla.</Text>
        <Text style={{ color: colors.text, fontSize: 15, paddingVertical: 10,}}>
          Para deshacer una busqueda, deje el criterio en blanco.</Text>

          <View style={styles.row}>
        <TouchableHighlight 
            disabled={AddOff}
            underlayColor={colors.input}
            onPress={() => {
                setId(Object.keys(categorias).length + 1)
                setCategory('')
                setModalVisible(true)}}
            style={[styles.add, AddOff && styles.disabled ]}>
            <Text style={{fontWeight: 'bold', color: colors.text}}>Agregar categorías</Text>
            </TouchableHighlight>

              <View style={styles.row}>
              <TextInput style={styles.input}
              placeholder="Buscar" placeholderTextColor="#777"
              value={query} onChangeText={setQuery}></TextInput>
             <TouchableHighlight
                underlayColor={colors.input}
                 onPress={() => {
                  if(query.trim() == ''){
                    setCategorias(datos.CATEGORIAS);
                    setAddOff(false)
                  }
                  else{
                    const filtrado = Object.fromEntries(
                      Object.entries(datos.CATEGORIAS || {}).filter(
                      ([id, data]) => data.toLowerCase().includes(query.toLowerCase())
                      ));
                      setCategorias(filtrado);
                      setAddOff(true)
                  }
                }}
                style={{...styles.add, padding: 10}}>
                <Ionicons name="search" size={20} color={colors.text} />
                </TouchableHighlight>
                </View></View>
        
        <View style={{marginVertical: 20, marginHorizontal: 27, backgroundColor: colors.background}}>
            
        {!isLoading ? (
        Object.values(categoriasPaginadas || {}).length > 0 ? (
        Object.entries(categoriasPaginadas).map(([id, data]: [string, any]) => {
            const categoria = data;
             return (
                              <View key={id}>
                                <View style={styles.cell}>
                                <TouchableHighlight
                                underlayColor={colors.input}
                                onPress={() => {
                                  setId(Number(id))
                                    setCategory(categoria)
                                    setModalEVisible(true)
                                  }}>
                                <Text style={styles.text}>{categoria}</Text>
                                </TouchableHighlight>
                                </View> 
                        </View>
                        );
                })
              ) : (
            <Text style={{opacity: 0.8, textAlign: 'center', color: colors.text}}>
              No hay categorías registradas</Text>
            )) : (
              <Text style={{opacity: 0.8, textAlign: 'center', color: colors.text}}>
              Cargando...</Text>
            )}
                        </View>

       {/* Controles de paginación */}
{Object.keys(categorias || {}).length > itemsPerPage && (
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
      Página {currentPage} de {Math.ceil(Object.keys(categorias || {}).length / itemsPerPage)}
    </Text>
    
    <TouchableHighlight
      underlayColor={colors.input}
      onPress={() => cambiarPagina(currentPage + 1)}
      style={[
        styles.paginationButton, 
        currentPage === Math.ceil(Object.keys(categorias|| {}).length / itemsPerPage) && styles.disabled
      ]}
      disabled={currentPage === Math.ceil(Object.keys(categorias || {}).length / itemsPerPage)}
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
  row: {
    flexDirection: 'row', justifyContent: 'space-between',
  },
  textRow:{
    fontSize: 20, paddingVertical: 5, 
  },
   add: {
    backgroundColor: colors.input,
    marginVertical: 10, padding: 10,
    borderRadius: 20,
  },
   disabled: { opacity: 0.6},
  cell: {flex: 1, padding: 6,},
  //Modal estilos
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalView: {
    marginHorizontal: 18, padding: 20,
    justifyContent: 'center',
    backgroundColor: colors.modalBackground,
  },
  modalTitle: {
    fontSize: 30, fontWeight: 'bold',
    marginBottom: 10,
    color: colors.text
  },
  input: {
    backgroundColor: colors.scrollBackground, color: colors.text,
  },
  modalRow:{
    flexDirection: 'row', justifyContent: 'space-evenly', 
    marginBottom: 24,
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
  modalRegret: {
    backgroundColor: colors.regret, padding: 10, borderRadius: 20,
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
paginationButton: {
  padding: 5, borderRadius: 20,
  backgroundColor: colors.input,
},
});
