import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, Modal, TextInput, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import Constants from 'expo-constants';
import { Picker } from '@react-native-picker/picker';
import { useState, useEffect, useCallback} from 'react';
import { NoEmojis, Validar, NumeroValido, CostoValido, AddElemento, QuitarElemento} from './backend'
//import { obtenerPrecios, agregarPrecio, editarPrecio, eliminarPrecio, obtenerCategorias } from './backend'
import { AddPrecio } from './backend';
import type { ListaDePreciosScreenProps, ContenidoPaquete } from './types';
import { useTheme } from '../context/ThemeContext';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import datos from './datos.json'

export default function ListaDePrecios({ navigation }: ListaDePreciosScreenProps) {

  const { theme, colors } = useTheme();
    const styles = getStyles(colors);

  //Constantes de inputs
  const [descripcion, setDescripcion] = useState('');
  const [marca, setMarca] = useState('');
  const [costo, setCosto] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [tipo, setTipo] = useState('')

  //Constantes de modales
  const [modalVisible, setModalVisible] = useState(false);
  const [EmodalVisible, setEModalVisible] = useState(false);
  const [NewPaquete, setNewPaquete] = useState(false);
  const [Paquete, setPaquete] = useState(false);
  const [AlterPaquete, setAlterPaquete] = useState(false);
  const [Confirm, setConfirm] = useState(false);

  //JSON con los datos
  //const [listaPrecios, setListaPrecios] = useState<Record<string, any>>({});
  const [listaPreciosOG, setListaPreciosOG] = useState<Record<string, any>>({});
  let listaPrecios: Record<string, any> = datos.LISTA_PRECIOS // <----❌ Eliminar esto
  //const [categorias, setCategorias] = useState<Record<string, any>>({});
  const categorias: Record<string, any>  = datos.CATEGORIAS
  const productos = Object.fromEntries(
  Object.entries(datos.LISTA_PRECIOS || {}).filter(
      ([id, data]) => data[4] === "producto"));
  const [elementosMostrados, setElementosMostrados] = useState(listaPrecios);
  //JSON para crear paquetes
  const [contenidoPaquete, setContenidoPaquete] = useState<ContenidoPaquete>({});

  //Constantes de picker
  const [selectedCategory, setSelectedCategory] = useState('Servicios');
  const [selectedControl, setSelectedControl] = useState('Ninguno');
  const [unidad, setUnidad] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(listaPrecios[Object.keys(listaPrecios)[0]]?.[0] || '');
  const [productMarca, setProductMarca] = useState(productos[Object.keys(productos)[0]]?.[1] || '');
    const [productCosto, setProductCosto] = useState(productos[Object.keys(productos)[0]]?.[2] || '');

  /*useFocusEffect(
  useCallback(() => {
    const cargarLista = async () => {
      try {
        setIsLoading(true);
        const data = await obtenerPrecios();
        setListaPrecios(data);
        setListaPreciosOG(data);
        setElementosMostrados(data);
      } catch (error: any) {
        Alert.alert('Error', error.message || 'No se pudieron cargar los datos');
      } finally {
        setIsLoading(false);
      }
    };
    cargarLista();
  }, [])
  );*/
  useEffect(() => {
  let filtrados;
  //datos.LISTA_PRECIOS ----> listaPrecios
  if (selectedCategory === 'Servicios') {
    filtrados = Object.fromEntries(
      Object.entries(datos.LISTA_PRECIOS || {}).filter(
        ([id, data]) => data[4] === "servicio"
      )
    );
  } else if (selectedCategory === 'Paquetes') {
    filtrados = Object.fromEntries(
      Object.entries(datos.LISTA_PRECIOS || {}).filter(
        ([id, data]) => data[4] === "paquete"
      )
    );
  } else {
    filtrados = Object.fromEntries(
      Object.entries(datos.LISTA_PRECIOS || {}).filter(
        ([id, data]) => data[6] === selectedCategory
      )
    );
  }
  
  setElementosMostrados(filtrados);
}, [selectedCategory]);
  //IDs
  const [id, setId] = useState(1);
  const [idP, setIdP] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [idEmpresa, setIdEmpresa] = useState('');

  //Desabilitar características
  const [editPaqueteOff, setEditPaqueteOff] = useState(false);
  const [fieldOn, setFieldOn] = useState(true);
  const [editOn, setEditOn] = useState(true);

  /*const handleAgregar = async () => {
  const validation = Validar(3, descripcion, marca, costo, '');
  if (!validation.isValid) {
    Alert.alert('Error', validation.message);
    return;
  }

  try {
    const response = await agregarPrecio({
      descripcion,
      marca,
      costo: Number(costo),
      unidad: selectedUValue,
      tipo: selectedTValue,
      categoria: selectedCategory
    });

    if (response.success) {
      const data = await obtenerListaPrecios();
      setListaPrecios(data);
      setListaPreciosOriginal(data);
      setModalVisible(false);
      Alert.alert('Éxito', 'Producto agregado correctamente');
    }
  } catch (error: any) {
    Alert.alert('Error', error.message);
  }
}; 

const handleEditar = async () => {
  let validation = Validar(3, descripcion, marca, costo, '');
  if (!editMarcaOn) {
    validation = Validar(2, descripcion, costo, '', '');
  }
  if (!editCostoOn) {
    validation = Validar(1, descripcion, '', '', '');
  }
  if (!validation.isValid) {
    Alert.alert('Error', validation.message);
    return;
  }

  try {
    const response = await editarPrecio(id, {
      descripcion,
      marca,
      costo: Number(costo),
      unidad,
      tipo,
      categoria: category
    });

    if (response.success) {
      const data = await obtenerListaPrecios();
      setListaPrecios(data);
      setListaPreciosOriginal(data);
      setEModalVisible(false);
      Alert.alert('Éxito', 'Producto actualizado correctamente');
    }
  } catch (error: any) {
    Alert.alert('Error', error.message);
  }
}; 

const handleEliminar = async () => {
  try {
    const response = await eliminarPrecio(id);
    if (response.success) {
      const data = await obtenerListaPrecios();
      setListaPrecios(data);
      setListaPreciosOriginal(data);
      setConfirm(false);
      setEModalVisible(false);
      Alert.alert('Éxito', 'Producto eliminado correctamente');
    }
  } catch (error: any) {
    Alert.alert('Error', error.message);
  }
};

useFocusEffect(
    useCallback(() => {
      const cargarCategorias = async () => {
        try {
          setIsLoading(true);
          const data = await obtenerCategorias();
          setCategorias(data);
        } catch (error: any) {
          Alert.alert('Error', error.message || 'No se pudieron cargar las categorías');
        } finally {
          setIsLoading(false);
        }
      };
      cargarCategorias();
    }, [])
  );*/

  return (
    <View style={styles.container}>
      <StatusBar style={theme === 'oscuro' ? 'light' : 'dark'}  />

      <View style={styles.navigation}>

      <TouchableHighlight
        underlayColor={colors.navIconUnderlay} style={styles.navIcons}
        onPress={() => navigation.navigate("Dashboard")}
      >
        <Ionicons name="grid-outline" size={20} color={colors.text} />
      </TouchableHighlight>

      <TouchableHighlight
        underlayColor={colors.navIconUnderlay} style={styles.navIcons}
        onPress={() => navigation.navigate("Compras")}
      >
        <Ionicons name="cart-outline" size={20} color={colors.text} />
      </TouchableHighlight>

        <TouchableHighlight
        underlayColor={colors.navIconUnderlay} style={styles.navIcons}
        onPress={() => navigation.navigate("Ventas")}
      >
        <Ionicons name="cash-outline" size={20} color={colors.text} />
      </TouchableHighlight>

      <TouchableHighlight
        underlayColor={colors.navIconUnderlay} style={styles.navIcons}
        onPress={() => navigation.navigate("Sucursales")} 
      >
        <Ionicons name="business-outline" size={20} color={colors.text} />
      </TouchableHighlight>

        <TouchableHighlight
        underlayColor={colors.navIconUnderlay} style={styles.navIcons}
        onPress={() => navigation.navigate("Almacenes")} 
      >
        <Ionicons name="cube-outline" size={20} color={colors.text} />
      </TouchableHighlight>

        <TouchableHighlight
        style={styles.navIconsS} 
      >
        <Ionicons name="pricetag-outline" size={20} color={colors.text} />
      </TouchableHighlight>

    </View>

    {/* Modal para añadir elementos */}
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
                      <Text style={styles.modalTitle}>Añadir elemento</Text>
                    </View>

                     <Text style={[styles.modalLabel, {textAlign: 'center', opacity: 0.5, marginBottom: 10}]}>
                        <Ionicons name="information-circle-outline" size={20}  color={colors.text} /> {''}
                        La categoría que se asignará a este producto será {selectedCategory}</Text>
        
                    <View style={styles.hr}/>
        
                    <View style={styles.modalRow}>
                      <Text style={styles.modalLabel}>Descripción:</Text>
                      <TextInput style={{...styles.input, width: 150}}
                      value={descripcion} onChangeText={(text) => setDescripcion(NoEmojis(text))}/>
                    </View>
                    <View style={styles.modalRow}>
                      <Text style={[styles.modalLabel, !fieldOn && styles.disable]}>Marca:</Text>
                      <TextInput style={[styles.input, !fieldOn && styles.disable, { width: 150}]}
                      editable={fieldOn}
                      value={marca} onChangeText={(text) => setMarca(NoEmojis(text))}/>
                    </View>
                    <View style={styles.modalRow}>
                      <Text style={styles.modalLabel}>Costo:</Text>
                      <TextInput style={{...styles.input, width: 150}}
                      keyboardType='numeric'
                      value={costo} onChangeText={(text) => setCosto(NoEmojis(text))}/>
                    </View>
                    <View style={styles.modalRow}>
                      <Text style={[styles.modalLabel, !fieldOn && styles.disable]}>Unidad:</Text>
                      <TextInput style={[styles.input, !fieldOn && styles.disable, { width: 150}]}
                      editable={fieldOn}
                      value={unidad} onChangeText={(text) => setUnidad(NoEmojis(text))}/>
                    </View>
                    <View style={{alignItems:'center'}}>
                      <Text style={[styles.modalLabel, !fieldOn && styles.disable ,{marginBottom: 15}]}>Control adicional:</Text>
                      <View style={{height: 55, width: 150, marginBottom: 15}}><Picker
                      enabled={fieldOn}
                        selectedValue={selectedControl}
                        onValueChange={(itemValue) => setSelectedControl(itemValue)}
                        style={[styles.picker, !fieldOn && styles.disable , {backgroundColor: colors.scrollBackground}]} itemStyle={styles.pickerItem}
                        >
                        <Picker.Item label="Ninguno" value="Ninguno" />
                        <Picker.Item label="Lote" value="Lote" />
                      </Picker></View>
                    </View>
        
                    <View style={styles.hr}/>
        
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                      <TouchableHighlight
                      underlayColor={colors.confirmUnderlay} style={styles.modalConfirm}
                        onPress={() => {
                          let validation = Validar(3,descripcion,marca,costo,'');
                          if(!fieldOn){
                            validation = Validar(2,descripcion,costo,'','');
                          }
                          const validationNum = CostoValido(costo)
                             if (!validation.isValid) {
                            Alert.alert('Error', validation.message);
                            return; 
                            }
                            if (!validationNum.isValid) {
                            Alert.alert('Error', validationNum.message);
                            return; 
                            }
                            if (selectedCategory == 'Servicios'){
                            setElementosMostrados(AddPrecio(elementosMostrados,id,descripcion,'',Number(costo),'','servicio',contenidoPaquete,'',''))
                            setModalVisible(!modalVisible)
                            }
                            else if (selectedCategory == 'Paquetes'){
                              if (Object.keys(listaPrecios).length > 0){
                              setNewPaquete(true)
                              setIdP(1); setContenidoPaquete({});
                              }
                              else Alert.alert("Error","Para poder registrar un paquete, registre por lo menos un producto para incluir en los paquetes")
                            }
                            else{
                            setElementosMostrados(AddPrecio(elementosMostrados,id,descripcion,marca,Number(costo),unidad,'producto',contenidoPaquete,selectedCategory,selectedControl))
                            setModalVisible(!modalVisible)
                            }
                          }}>
                        <Text style={styles.text}>Añadir registro</Text>
                      </TouchableHighlight>
                    </View>
        
                  </View>
                  </View>
                </Modal>
        
              {/* Modal para editar elementos */}
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
                  <View style={[styles.modalView, {marginVertical: 150}]}>
        
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                      <TouchableHighlight
                      style={{height: 30, width: 30, alignItems: "flex-end"}}
                      underlayColor={colors.scrollBackground}
                      onPress={() => setEModalVisible(!EmodalVisible)}>
                      <Ionicons name="close" size={20} color={colors.text} />
                      </TouchableHighlight>
                    </View>
        
                    <View>
                      <Text style={styles.modalTitle}>Editar elemento</Text>
                      <Text style={[styles.modalLabel, {textAlign: 'center', opacity: 0.5, marginBottom: 10}]}>
                        <Ionicons name="information-circle-outline" size={20}  color={colors.text} /> {''}
                        El tipo y la categoría no se pueden modificar</Text>
                    </View>
        
                    <View style={styles.hr}/>
        
                    <View style={styles.modalRow}>
                      <Text style={styles.modalLabel}>Descripción:</Text>
                      <TextInput style={[styles.input, {width: 150}]}
                      value={descripcion} onChangeText={(text) => setDescripcion(NoEmojis(text))}/>
                    </View>
                    <View style={styles.modalRow}>
                      <Text style={[styles.modalLabel, !editOn && styles.disable]}>Marca:</Text>
                      <TextInput style={[styles.input, !editOn && styles.disable, {width: 150}]}
                       editable = {editOn}
                      value={marca} onChangeText={(text) => setMarca(NoEmojis(text))}/>
                    </View>
                    <View style={styles.modalRow}>
                      <Text style={styles.modalLabel}>Costo:</Text>
                      <TextInput style={[styles.input, {width: 150}]}
                      keyboardType='numeric'
                      value={costo} onChangeText={setCosto}/>
                    </View>

                    <View style={styles.modalRow}>
                      <Text style={[styles.modalLabel, !editOn && styles.disable]}>Unidad:</Text>
                      <TextInput style={[styles.input, !fieldOn && styles.disable, { width: 150}]}
                      editable={editOn}
                      value={unidad} onChangeText={(text) => setUnidad(NoEmojis(text))}/>
                    </View>
                    <View style={{alignItems:'center'}}>
                      <Text style={[styles.modalLabel, !editOn && styles.disable ,{marginBottom: 15}]}>Control adicional:</Text>
                      <View style={{height: 55, width: 150, marginBottom: 15}}><Picker
                      enabled={editOn}
                        selectedValue={selectedControl}
                        onValueChange={(itemValue) => setSelectedControl(itemValue)}
                        style={[styles.picker, !editOn && styles.disable , {backgroundColor: colors.scrollBackground}]} itemStyle={styles.pickerItem}
                        >
                        <Picker.Item label="Ninguno" value="Ninguno" />
                        <Picker.Item label="Lote" value="Lote" />
                      </Picker></View>
                    </View>
        
                    <View style={styles.hr}/>
        
                    <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                      <TouchableHighlight
                      disabled = {editPaqueteOff}
                      underlayColor={colors.editUnderlay} style={[styles.modalEdit, editPaqueteOff && styles.disable]}
                        onPress={() =>  setPaquete(true)}>
                        <Text style={styles.text}>Editar paquete</Text>
                      </TouchableHighlight>
                      <TouchableHighlight
                      underlayColor={colors.editUnderlay} style={styles.modalEdit}
                        onPress={() => {
                          const validationNum = CostoValido(costo)
                          let validation = Validar(4,descripcion,marca,costo,unidad);
                          if(!editOn){
                            validation = Validar(2,descripcion,costo,'','');
                          }
                             if (!validation.isValid) {
                            Alert.alert('Error', validation.message);
                            return; 
                            }
                            if (!validationNum.isValid) {
                            Alert.alert('Error', validationNum.message);
                            return; 
                            }
                        setElementosMostrados(AddPrecio(elementosMostrados,id,descripcion,marca,Number(costo),unidad,tipo,contenidoPaquete,selectedCategory,selectedControl))
                        setEModalVisible(!EmodalVisible)
                        }}>
                        <Text style={styles.text}>Confirmar cambios</Text>
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
                      underlayColor={colors.regretUnderlay} style={[styles.modalRegret , { width: 50}]}
                        onPress={() => setConfirm(!Confirm)}>
                        <Text style={styles.text}>NO</Text>
                      </TouchableHighlight>
                      <TouchableHighlight
                      underlayColor={colors.deleteUnderlay} style={[styles.modalDelete , { width: 50}]}
                        onPress={() => {
                          setElementosMostrados(QuitarElemento(elementosMostrados,id))
                          setConfirm(!Confirm);
                          setEModalVisible(!EmodalVisible);
                        }}>
                        <Text style={styles.text}>SÍ</Text>
                      </TouchableHighlight>
                    </View>
        
                  </View>
                  </View>
                </Modal>

      {/* Modal para agregar paquete */}
            <Modal
                  animationType="fade"
                  transparent={true}
                  visible={NewPaquete}
                  onRequestClose={() => {
                    setNewPaquete(!NewPaquete);
                  }}>
                  <View style={styles.modalOverlay}>
                  <View style={[styles.modalView, {marginVertical: 160}]}>

                  <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                      <TouchableHighlight
                      style={{height: 30, width: 30, alignItems: "flex-end"}}
                      underlayColor={colors.scrollBackground}
                      onPress={() => setNewPaquete(!NewPaquete)}>
                      <Ionicons name="close" size={20} color={colors.text} />
                      </TouchableHighlight>
                    </View>
        
                    <View>
                      <Text style={styles.modalTitle}>Definir paquete</Text>
                    </View>
        
                    <View style={styles.hr}/>
        
                   <View>
                      <Text style={[styles.modalLabel, {textAlign: 'center'}]}>
                        Ingrese los productos que contendrá este paquete</Text>
                    </View>

                    <View style={styles.table}>
                        <View style={styles.row}>
                        <View style={[styles.headerCell, {backgroundColor: colors.headerCell}]}>
                            <Text style={styles.headerText}>Descripción</Text>
                            </View>
                            <View style={[styles.headerCell, {backgroundColor: colors.headerCell}]}>
                            <Text style={styles.headerText}>Marca</Text>
                              </View>
                            <View style={[styles.headerCell, {backgroundColor: colors.headerCell}]}>
                            <Text style={styles.headerText}>Cantidad</Text>
                              </View>
                              <View style={[styles.headerCell, {backgroundColor: colors.headerCell, flex: 0.2}]}>
                              </View>
                              </View>
                              <ScrollView style={styles.showcase} showsVerticalScrollIndicator={true}>
                          {Object.entries(contenidoPaquete).map(([id, [descripcion, marca, cantidad]], index) => (
                          <View key={index} style={styles.row}>
                          <View style={[styles.cell, {backgroundColor: colors.secondary}]}>
                          <Text style={styles.text}>{descripcion}</Text>
                            </View>
                          <View style={[styles.cell, {backgroundColor: colors.secondary}]}>
                          <Text style={styles.text}>{marca}</Text>
                            </View>
                            <View style={[styles.cell, {backgroundColor: colors.secondary}]}>
                            <Text style={styles.text}>{cantidad}</Text>
                            </View>
                            <View style={[styles.cell, {backgroundColor: colors.secondary, flex: 0.2}]}>
                            <TouchableHighlight
                            style={{height:25, width:25}}
                            onPress={() => {
                              setContenidoPaquete(QuitarElemento(contenidoPaquete, Number(id)))}}
                            underlayColor={colors.deleteUnderlay}
                            >
                               <Ionicons name="close" size={20} color='red' />
                            </TouchableHighlight>
                            </View>
                          </View>
                          ))}
                              </ScrollView>
                          </View>

                    <View style={[styles.row, {justifyContent: 'center', marginBottom: 15}]}>
                              <TouchableHighlight
                                    underlayColor={colors.optionUnderlay}
                                      onPress={() => setAlterPaquete(true)}
                                      style={styles.buttonRegister}>
                                      <Text style={styles.buttonText}>Agregar</Text>
                                  </TouchableHighlight>
                                  </View>
                    
                    <View style={styles.hr}/>

                    <View style={[styles.row, {justifyContent: 'center'}]}>
                      <TouchableHighlight
                      underlayColor={colors.confirmUnderlay} style={[styles.modalConfirm, {width: 150}]}
                        onPress={() => {
                          if(Object.keys(contenidoPaquete).length > 0){
                            setElementosMostrados(AddPrecio(elementosMostrados,id,descripcion,'',Number(costo),'','paquete',contenidoPaquete,'',''))
                            setNewPaquete(!NewPaquete)
                            setModalVisible(!modalVisible)}
                          else Alert.alert("Error","Por favor, agregue los productos que contendrá el paquete")
                          }}>
                        <Text style={styles.text}>Añadir paquete</Text>
                      </TouchableHighlight>
                      </View>
        
                  </View>
                  </View>
                </Modal>
      
      {/* Modal para editar paquete */}
            <Modal
                  animationType="fade"
                  transparent={true}
                  visible={Paquete}
                  onRequestClose={() => {
                    setPaquete(!Paquete);
                  }}>
                  <View style={styles.modalOverlay}>
                  <View style={[styles.modalView, {marginVertical: 160}]}>

                  <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                      <TouchableHighlight
                      style={{height: 30, width: 30, alignItems: "flex-end"}}
                      underlayColor={colors.scrollBackground}
                      onPress={() => setPaquete(!Paquete)}>
                      <Ionicons name="close" size={20} color={colors.text} />
                      </TouchableHighlight>
                    </View>
        
                    <View>
                      <Text style={styles.modalTitle}>Editar paquete</Text>
                    </View>
        
                    <View style={styles.hr}/>
        
                   <View>
                      <Text style={[styles.modalLabel, {textAlign: 'center'}]}>
                        Ingrese los productos que contendrá este paquete</Text>
                    </View>

                    <View style={styles.table}>
                        <View style={styles.row}>
                        <View style={[styles.headerCell, {backgroundColor: colors.headerCell}]}>
                            <Text style={styles.headerText}>Descripción</Text>
                            </View>
                             <View style={[styles.headerCell, {backgroundColor: colors.headerCell}]}>
                            <Text style={styles.headerText}>Marca</Text>
                              </View>
                            <View style={[styles.headerCell, {backgroundColor: colors.headerCell}]}>
                            <Text style={styles.headerText}>Cantidad</Text>
                              </View>
                              <View style={[styles.headerCell, {backgroundColor: colors.headerCell, flex: 0.2}]}>
                              </View>
                              </View>
                              <ScrollView style={styles.showcase} showsVerticalScrollIndicator={true}>

                                {Object.entries(contenidoPaquete).map(([id,[descripcion, marca, cantidad]], index) => (
                          <View key={index} style={styles.row}>
                          <View style={[styles.cell, {backgroundColor: colors.secondary}]}>
                          <Text style={styles.text}>{descripcion}</Text>
                            </View>
                            <View style={[styles.cell, {backgroundColor: colors.secondary}]}>
                            <Text style={styles.text}>{marca}</Text>
                            </View>
                            <View style={[styles.cell, {backgroundColor: colors.secondary}]}>
                            <Text style={styles.text}>{cantidad}</Text>
                            </View>
                            <View style={[styles.cell, {backgroundColor: colors.secondary, flex: 0.2}]}>
                            <TouchableHighlight
                            style={{height:25, width:25}}
                            onPress={() => {
                              setContenidoPaquete(QuitarElemento(contenidoPaquete, Number(id)))}}
                            underlayColor={colors.deleteUnderlay}
                            >
                               <Ionicons name="close" size={20} color='red' />
                            </TouchableHighlight>
                            </View>
                          </View>
                          ))}  
                               
                              </ScrollView>
                          </View>

                    <View style={[styles.row, {justifyContent: 'center', marginBottom: 15}]}>
                              <TouchableHighlight
                                    underlayColor={colors.optionUnderlay}
                                      onPress={() => setAlterPaquete(true)}
                                      style={styles.buttonRegister}>
                                      <Text style={styles.buttonText}>Agregar</Text>
                                  </TouchableHighlight>
                                  </View>
                    
                    <View style={styles.hr}/>

                    <View style={[styles.row, {justifyContent: 'center'}]}>
                     <TouchableHighlight
                    underlayColor={colors.editUnderlay} style={[styles.modalEdit, {width: 150}]}
                    onPress={() => {
                    // Actualizar en elementosMostrados
                    const nuevoElementosMostrados = {
                    ...elementosMostrados,
                    [id]: [
                    elementosMostrados[id][0],
                    elementosMostrados[id][1],
                    elementosMostrados[id][2],
                    elementosMostrados[id][3],
                    elementosMostrados[id][4],
                    contenidoPaquete,  // Nuevo contenido
                    elementosMostrados[id][6]
                    ]
                    };
                    setElementosMostrados(nuevoElementosMostrados);
    
                    // También actualizar listaPrecios si es necesario
                    Alert.alert('Exito', 'Cambios al paquete guardados');
                    setPaquete(!Paquete);
                    }}>
                    <Text style={styles.text}>Confirmar cambios</Text>
                    </TouchableHighlight>
                      </View>
        
                  </View>
                  </View>
                </Modal>
      
      {/* Modal para definir elementos para los paquetes*/}
                <Modal
                      animationType="fade"
                      transparent={true}
                      visible={AlterPaquete}
                      onRequestClose={() => {
                        setAlterPaquete(!AlterPaquete);
                      }}>
                      <View style={styles.modalOverlay}>
                      <View style={[styles.modalView, {marginVertical: 280}]}>
            
                        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                          <TouchableHighlight
                           style={{height: 30, width: 30, alignItems: "flex-end"}}
                          underlayColor={colors.scrollBackground}
                          onPress={() => setAlterPaquete(!AlterPaquete)}>
                         <Ionicons name="close" size={20} color={colors.text} />
                          </TouchableHighlight>
                        </View>
            
                        <View>
                          <Text style={styles.modalTitle}>Agregar elementos</Text>
                        </View>
            
                        <View style={styles.hr}/>
                          <View style={styles.modalRow}>
                            <Text style={styles.modalLabel}>Elemento:</Text>
                            <View style={{width:150, height:55}}>
                              <Picker
                        style={[styles.picker, {backgroundColor: colors.scrollBackground}]}
                        selectedValue={selectedProduct}
                        onValueChange={(itemValue) => {
                        setSelectedProduct(itemValue);
                        const productoEncontrado = (productos as any)[itemValue]; // ← Acceder por ID
                        if (productoEncontrado) {
                          setProductMarca(productoEncontrado[1]);
                          setProductCosto(productoEncontrado[2]);
                        }
                        }}
                        >
                        {Object.entries(productos || {}).length > 0 ? (
                        Object.entries(productos)
                        .sort((a, b) => {
                        const nombreA = String(a[1][0]).toLowerCase();
                        const nombreB = String(b[1][0]).toLowerCase();
                         return nombreA.localeCompare(nombreB);  
                        })
                        .map(([id, producto]: [string, any]) => (
                        <Picker.Item 
                        style={styles.pickerItem} 
                        key={id} 
                        label={String(producto[0]) + ' - ' + String(producto[1])} 
                        value={String(producto[0]) + '-' + String(producto[1])}  // ← Usar el ID como value
                        />
                        ))
                        ) : (
                        <Picker.Item label="-" value="" />
                         )}
                        </Picker></View>
                          </View>
                          <View style={styles.modalRow}>
                            <Text style={styles.modalLabel}>Cantidad:</Text>
                            <TextInput style={styles.input}
                                        value={cantidad} onChangeText={setCantidad}
                                        keyboardType='numeric'></TextInput>
                          </View>
                        <View style={styles.hr}/>
            
                        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                          <TouchableHighlight
                          underlayColor={colors.confirmUnderlay} style={styles.modalConfirm}
                            onPress={() => {
                              const validation = NumeroValido(cantidad);
                                  if (!validation.isValid) {
                              Alert.alert('Error', validation.message);
                              return; 
                            }
                            setContenidoPaquete(AddElemento(contenidoPaquete, idP, selectedProduct.split('-')[0], selectedProduct.split('-')[1], Number(cantidad)))
                            setIdP(idP + 1); setCantidad('')
                            setAlterPaquete(!AlterPaquete)}}>
                            <Text style={styles.text}>Agregar</Text>
                          </TouchableHighlight>
                        </View>
            
                      </View>
                      </View>
                    </Modal>

      {/*ScrollView*/}
      <ScrollView>
        <View style={styles.scroll}>
        <Text style={{  fontSize: 25, fontWeight: 'bold', color: colors.text }}>
          <Ionicons name="pricetag" size={25} color={colors.text} /> Lista de precios
        </Text>
        <Text style={{color: colors.text ,
          fontSize: 15, 
          paddingVertical: 10,}}>
          Seleccione una categoría para filtrar los elementos y ver aquellos ubicados en dicha categoría
          </Text>
        <Text style={{ color: colors.text ,
          fontSize: 15, 
          paddingVertical: 10,}}>
          Seleccione la descripción de un elemento en la tabla para modificar sus datos.
          </Text> 
          <View style={{height: 55}}>
          <Picker
              selectedValue={selectedCategory}
              onValueChange={(itemValue) => setSelectedCategory(itemValue)}
              style={styles.picker} itemStyle={styles.pickerItem}
              >
                <Picker.Item label="Servicios" value="Servicios" />
                <Picker.Item label="Paquetes" value="Paquetes" />
                {Object.values(categorias || {}).length > 0 ? (
                     Object.values(categorias).map((categoria: any, id) => (
                     <Picker.Item 
                     style={styles.pickerItem} 
                    key={id} 
                    label={String(categoria)} 
                    value={String(categoria)} 
                    />
                    ))
                    ) : null}
          </Picker></View>

          <View style={[styles.row, {justifyContent: "space-between"}]}>
          <TouchableHighlight 
                underlayColor={colors.cellUnderlay}
                onPress={() => {
                  setId(Object.keys(listaPrecios).length + 1)
                  setDescripcion(''); setMarca(''); setCosto(''); setUnidad(''); setContenidoPaquete({})
                  if (selectedCategory == 'Servicios' || selectedCategory == 'Paquetes'){
                    setFieldOn(false)
                  }
                  else setFieldOn(true)
                  setModalVisible(true)}}
                style={styles.add}>
                    <Text style={{fontWeight: 'bold', color: colors.text}}>Añadir elemento</Text>
                  </TouchableHighlight>
          <TouchableHighlight 
                underlayColor={colors.cellUnderlay}
                onPress={() => navigation.navigate("Categorias")}
                style={[styles.add , {width: 180}]}>
                    <Text style={{fontWeight: 'bold', color: colors.text}}>Gestionar categorías</Text>
                  </TouchableHighlight>
                  </View>
                  
                  <View style={styles.hr}/>
          <View style={[styles.table, {marginBottom: 80}]}>
                <View style={styles.row}>
                        <View style={styles.headerCell}>
                          <Text style={styles.headerText}>Descripción</Text>
                          </View>
                        <View style={styles.headerCell}>
                          <Text style={styles.headerText}>Marca</Text>
                          </View>
                        <View style={[styles.headerCell, {flex: 0.8}]}>
                          <Text style={styles.headerText}>Costo</Text>
                          </View>
                        <View style={[styles.headerCell, {flex: 0.8}]}>
                          <Text style={styles.headerText}>Unidad</Text>
                          </View>
                      </View>

                {/* Body - cada registro es una fila */}
                {!isLoading ? (
                Object.values(elementosMostrados || {}).length > 0 ? (
                 Object.entries(elementosMostrados).map(([id, data]: [string, any]) => {
                  const [descripcion, marca, costo, unidad, tipo, contenidoPaquete, categoria, control] = data;
                  return(
                      <View key={id} style={styles.row}>
                        <View style={styles.cellF}>
                        <TouchableHighlight
                        underlayColor={colors.cellUnderlay}
                        onPress={() => {

                          if (tipo != "paquete"){
                            setEditPaqueteOff(true)
                          } else setEditPaqueteOff(false)

                          if (tipo != "producto"){
                            setEditOn(false);
                          } else setEditOn(true)

                          setId(Number(id))
                          setDescripcion(String(descripcion)); setMarca(String(marca)); setCosto(String(costo)); setUnidad(unidad); setTipo(tipo); setSelectedControl(control)
                          setContenidoPaquete(contenidoPaquete); 
                          setIdP(contenidoPaquete.length)
                          setEModalVisible(true)}}>
                        <Text style={styles.text}>{descripcion}</Text>
                        </TouchableHighlight>
                        </View> 
                        <View style={styles.cell}><Text style={styles.text}>{marca}</Text></View>
                        <View style={[styles.cell, {flex: 0.8}]}><Text style={styles.text}>{tipo === "gasto" ? "" : Number(costo).toFixed(2)}</Text></View>
                        <View style={[styles.cell, {flex: 0.8}]}><Text style={styles.text}>{unidad}</Text></View>
                </View>
                  );
                  })
                ) : (
            <Text style={{opacity: 0.8, marginVertical: 20, textAlign: 'center', color: colors.text}}>
              No hay elementos en esta categoría</Text>
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
    backgroundColor: colors.background,
  },
  text:{color: colors.text},
  navigation: {
    backgroundColor: colors.navBackground,
    flexDirection: 'row', justifyContent: 'space-around',
    padding: 5
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
  showcase: {
    backgroundColor: colors.secondary,
    maxHeight: 200, minHeight: 200
  },
  add: {
    backgroundColor: colors.input,
    width: 150,
    marginTop: 10,
    padding: 10,
    borderRadius: 15,
  },
  input:{
    backgroundColor: colors.scrollBackground, color: colors.text,
    height: 40, width: 120,
    marginTop: 10,
  },
  disable: {opacity: 0.6},
   hr:{
    height: 2, 
    backgroundColor: '#777', 
    marginVertical: 8,
  },
  //Tabla estilos
  table: {paddingVertical: 20},
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
    flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalView: {
    marginHorizontal: 18, marginVertical: 140,
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
  modalRegret: {
    backgroundColor: colors.regret,
    padding: 10,
    borderRadius: 20,
    width: 130,
    justifyContent: 'center', alignItems: 'center',
  },
  modalEdit: {
    backgroundColor: colors.edit,
    padding: 10,
    borderRadius: 20,
    width: 90,
    justifyContent: 'center', alignItems: 'center',
  },
  modalDelete: {
    backgroundColor: colors.delete,
    padding: 10,
    borderRadius: 20,
    width: 90,
    justifyContent: 'center', alignItems: 'center',
  },
  buttonRegister: {
    backgroundColor: colors.option,
    width: 150,
    padding: 10,
    borderRadius: 20,
  },
  buttonText: {
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
  },
  //---------------
  picker: {
    height: 50,
    marginLeft: 10,
    flex: 1,
    backgroundColor: colors.input,
    color: colors.text,
  },
  pickerItem: {
    fontSize: 16,
    fontWeight: 'bold',
  },

});
