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
  const [unidad, setUnidad] = useState('');

  //Constantes de modales
  const [modalVisible, setModalVisible] = useState(false);
  const [EmodalVisible, setEModalVisible] = useState(false);
  const [NewPaquete, setNewPaquete] = useState(false);
  const [Paquete, setPaquete] = useState(false);
  const [AlterPaquete, setAlterPaquete] = useState(false);
  const [AlterAgrupacion, setAlterAgrupacion] = useState(false);
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
  const noAlmacenables = Object.fromEntries(
  Object.entries(datos.LISTA_PRECIOS || {}).filter(
      ([id, data]) => data[4] === "no almacenable"));
  const [elementosMostrados, setElementosMostrados] = useState(listaPrecios);
  //JSON para crear paquetes
  const [contenidoPaquete, setContenidoPaquete] = useState<ContenidoPaquete>({});

  //Constantes de picker
  const [selectedCategory, setSelectedCategory] = useState('Sin categoria');
  const [selectedECategory, setSelectedECategory] = useState('');
  const [selectedControl, setSelectedControl] = useState('Ninguno'); const [selectedType, setSelectedType] = useState('producto')
  const [selectedProduct, setSelectedProduct] = useState('');
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
  if (selectedCategory === 'No almacenables') {
    filtrados = Object.fromEntries(
      Object.entries(datos.LISTA_PRECIOS || {}).filter(
        ([id, data]) => data[4] === "no almacenable"
      )
    )
  }else if (selectedCategory === 'Agrupaciones') {
    filtrados = Object.fromEntries(
      Object.entries(datos.LISTA_PRECIOS || {}).filter(
        ([id, data]) => data[4] === "agrupacion"
      )
    )
  }else if (selectedCategory === 'Sin categoria') {
    filtrados = Object.fromEntries(
      Object.entries(datos.LISTA_PRECIOS || {}).filter(
        ([id, data]) => data[4] != "no almacenable" && data[4] != "agrupacion" && data[6] === ""
      )
    )
  }else {
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
  const [editContenidoOff, setEditContenidoOff] = useState(false);

  const [fieldMarcaOn, setFieldMarcaOn] = useState(true); const [fieldCostoOn, setFieldCostoOn] = useState(true); 
  const [fieldUnidadOn, setFieldUnidadOn] = useState(true); const [fieldControlOn, setFieldControlOn] = useState(true);
  const [fieldTipoOn, setFieldTipoOn] = useState(true);

  const [editMarcaOn, setEditMarcaOn] = useState(true);  const [editCostoOn, setEditCostoOn] = useState(true); 
  const [editUnidadOn, setEditUnidadOn] = useState(true);  const [editControlOn, setEditControlOn] = useState(true);
  const [editCategoriaOn, setEditCategoriaOn] = useState(true); 

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
        style={[styles.navIcons , {backgroundColor: colors.navIconUnderlay}]}
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
                      <Ionicons name="close" size={20} color={colors.text} />
                      </TouchableHighlight>
                    </View>
        
                    <View>
                      <Text style={styles.modalTitle}>Añadir elemento</Text>
                    </View>

                     <Text style={[styles.modalLabel, {textAlign: 'center', opacity: 0.5, marginBottom: 10}]}>
                        <Ionicons name="information-circle-outline" size={20}  color={colors.text} /> {''}
                        {selectedCategory === "Sin categoria" ? <Text>Este elemento no contará con categoría.</Text>  
                          : selectedCategory == "No almacenables" ? <Text>Este elemento será un no almacenable.</Text>  
                          : selectedCategory == "Agrupaciones" ? <Text>Este elemento será una agrupación</Text> 
                          :<Text>La categoría de este elemento será {selectedCategory.toLowerCase()} </Text> }
                          </Text>
        
                    <View style={styles.modalRow}>
                      <Text style={styles.modalLabel}>Descripción:</Text>
                      <TextInput style={{...styles.input, width: 150}}
                      value={descripcion} onChangeText={(text) => setDescripcion(NoEmojis(text))}/>
                    </View>
                    <View style={styles.modalRow}>
                      <Text style={[styles.modalLabel, !fieldMarcaOn && styles.disable]}>Marca:</Text>
                      <TextInput style={[styles.input, !fieldMarcaOn && styles.disable, { width: 150}]}
                      editable={fieldMarcaOn}
                      value={marca} onChangeText={(text) => setMarca(NoEmojis(text))}/>
                    </View>
                    <View style={styles.modalRow}>
                      <Text style={[styles.modalLabel, !fieldCostoOn && styles.disable]}>Costo:</Text>
                      <TextInput style={[styles.input, !fieldCostoOn && styles.disable, { width: 150}]}
                      editable={fieldCostoOn}
                      keyboardType='numeric'
                      value={costo} onChangeText={(text) => setCosto(NoEmojis(text))}/>
                    </View>
                    <View style={styles.modalRow}>
                      <Text style={[styles.modalLabel, !fieldUnidadOn && styles.disable]}>Unidad:</Text>
                      <TextInput style={[styles.input, !fieldUnidadOn && styles.disable, { width: 150}]}
                      editable={fieldUnidadOn}
                      value={unidad} onChangeText={(text) => setUnidad(NoEmojis(text))}/>
                    </View>
                    <View style={styles.modalRow}>
                      <Text style={[styles.modalLabel, !fieldControlOn && styles.disable ,{marginBottom: 15}]}>Control adicional:</Text>
                      <View style={{height: 55, width: 150, marginBottom: 5}}><Picker
                      enabled={fieldControlOn}
                        selectedValue={selectedControl}
                        onValueChange={(itemValue) => setSelectedControl(itemValue)}
                        style={[styles.picker, !fieldControlOn && styles.disable , {backgroundColor: colors.scrollBackground}]} itemStyle={styles.pickerItem}
                        >
                        <Picker.Item label="Ninguno" value="Ninguno" />
                        <Picker.Item label="Lote" value="Lote" />
                        <Picker.Item label="Lote y Fecha de Caducidad" value="LoteFechaCaducidad" />
                      </Picker></View>
                      </View>
                      <View style={styles.modalRow}>
                      <Text style={[styles.modalLabel, !fieldTipoOn && styles.disable]}>Tipo:</Text>
                      <View style={{height: 55, width: 150, marginBottom: 5}}><Picker
                      enabled={fieldTipoOn}
                        selectedValue={selectedType}
                         onValueChange={(itemValue) => { setSelectedType(itemValue);
                        if (itemValue === 'servicio') {
                        setFieldUnidadOn(false); setFieldControlOn(false); setFieldMarcaOn(false);
                        } 
                        if (itemValue === 'paquete') {
                        setFieldUnidadOn(false); setFieldControlOn(true); setFieldMarcaOn(false);
                        } else {
                        // Si es "producto", habilitar
                        setFieldUnidadOn(true); setFieldControlOn(true); setFieldMarcaOn(true);
                        }
                        }}
                        style={[styles.picker, !fieldTipoOn && styles.disable , {backgroundColor: colors.scrollBackground}]} itemStyle={styles.pickerItem}
                        >
                        <Picker.Item label="Producto" value="producto" />
                        <Picker.Item label="Servicio" value="servicio" />
                        <Picker.Item label="Paquete" value="paquete" />
                      </Picker></View>
                    </View>
        
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                      <TouchableHighlight
                      underlayColor={colors.confirmUnderlay} style={styles.modalConfirm}
                        onPress={() => {
                          let validation = Validar(4,descripcion,marca,costo,unidad);
                          if (selectedCategory == 'Agrupaciones'){
                            validation = Validar(1,descripcion,'','','');
                          }
                          else if(selectedType == 'servicio' || selectedType == 'paquete'){
                            validation = Validar(2,descripcion,costo,'','');
                          }
                          else if(selectedCategory == 'No almacenables'){
                            validation = Validar(2,descripcion,marca,'','');
                          }
                          const validationNum = CostoValido(costo)
                             if (!validation.isValid) {
                            Alert.alert('Error', validation.message);
                            return; 
                            }
                            if (fieldCostoOn){
                              if (!validationNum.isValid) {
                              Alert.alert('Error', validationNum.message);
                              return; 
                            }
                            }
                            if (selectedType == 'servicio'){
                            setElementosMostrados(AddPrecio(elementosMostrados,id,descripcion,'',Number(costo),'','servicio',contenidoPaquete,'','Ninguno'))
                            setModalVisible(!modalVisible)
                            }
                            else if (selectedType == 'paquete'){
                              if (Object.keys((productos)).length > 0){
                              setNewPaquete(true)
                              setIdP(1); setContenidoPaquete({});
                              }
                              else Alert.alert("Error","Para poder registrar un paquete, registre por lo menos un producto para incluir en los paquetes")
                            }
                            else if (selectedCategory == 'No almacenables'){
                            setElementosMostrados(AddPrecio(elementosMostrados,id,descripcion,marca,0,'','no almacenable',contenidoPaquete,'','Ninguno'))
                            setModalVisible(!modalVisible)
                            }
                            else if (selectedCategory == 'Agrupaciones'){
                              if (Object.keys((noAlmacenables)).length > 0){
                              setNewPaquete(true)
                              setIdP(1); setContenidoPaquete({});
                              }
                              else Alert.alert("Error","Para poder registrar una agrupacion, registre por lo menos un elemento no almacenable para incluir en las agrupaciones")
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
                  </ScrollView></KeyboardAvoidingView>
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
                  <View style={[styles.modalView, {marginVertical: 130}]}>
        
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
                        El tipo de registro no se puede modificar</Text>
                    </View>
        
                    <View style={styles.modalRow}>
                      <Text style={styles.modalLabel}>Descripción:</Text>
                      <TextInput style={[styles.input, {width: 150}]}
                      value={descripcion} onChangeText={(text) => setDescripcion(NoEmojis(text))}/>
                    </View>
                    <View style={styles.modalRow}>
                      <Text style={[styles.modalLabel, !editMarcaOn && styles.disable]}>Marca:</Text>
                      <TextInput style={[styles.input, !editMarcaOn && styles.disable, {width: 150}]}
                       editable = {editMarcaOn}
                      value={marca} onChangeText={(text) => setMarca(NoEmojis(text))}/>
                    </View>
                    <View style={styles.modalRow}>
                      <Text style={[styles.modalLabel, !editCostoOn && styles.disable]}>Costo:</Text>
                      <TextInput style={[styles.input, !editCostoOn && styles.disable,, {width: 150}]}
                      editable={editCostoOn}
                      keyboardType='numeric'
                      value={costo} onChangeText={setCosto}/>
                    </View>

                    <View style={styles.modalRow}>
                      <Text style={[styles.modalLabel, !editUnidadOn && styles.disable]}>Unidad:</Text>
                      <TextInput style={[styles.input, !editUnidadOn && styles.disable, { width: 150}]}
                      editable={editUnidadOn}
                      value={unidad} onChangeText={(text) => setUnidad(NoEmojis(text))}/>
                    </View>
                    <View style={styles.modalRow}>
                      <Text style={[styles.modalLabel, !editControlOn && styles.disable ,{marginBottom: 15}]}>Control adicional:</Text>
                      <View style={{height: 55, width: 150, marginBottom: 5}}><Picker
                      enabled={editControlOn}
                        selectedValue={selectedControl}
                        onValueChange={(itemValue) => setSelectedControl(itemValue)}
                        style={[styles.picker, !editControlOn && styles.disable , {backgroundColor: colors.scrollBackground}]} itemStyle={styles.pickerItem}
                        >
                        <Picker.Item label="Ninguno" value="Ninguno" />
                        <Picker.Item label="Lote" value="Lote" />
                      </Picker></View>
                    </View><View style={styles.modalRow}>
                      <Text style={[styles.modalLabel, !editCategoriaOn && styles.disable ,{marginBottom: 15}]}>Categoría:</Text>
                      <View style={{height: 55, width: 200, marginBottom: 5}}><Picker
                      enabled={editCategoriaOn}
                        selectedValue={selectedECategory}
                        onValueChange={(itemValue) => setSelectedECategory(itemValue)}
                        style={[styles.picker, !editCategoriaOn && styles.disable , {backgroundColor: colors.scrollBackground}]} itemStyle={styles.pickerItem}
                        >
                       <Picker.Item label="(Sin categoría)" value="" />
                        {Object.values(categorias || {}).length > 0 ? (
                        Object.values(categorias)
                        .sort((a, b) => {
                        const nombreA = String(a).toLowerCase();
                        const nombreB = String(b).toLowerCase();
                        return nombreA.localeCompare(nombreB);
                        })
                        .map((categoria: any, id) => (
                      <Picker.Item 
                       style={styles.pickerItem} 
                        key={id} 
                        label={String(categoria)} 
                        value={String(categoria)} 
                        />
                        ))
                        ) : null}
                      </Picker></View>
                    </View>
        
                    <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                      <TouchableHighlight
                      disabled = {editContenidoOff}
                      underlayColor={colors.editUnderlay} style={[styles.modalEdit, editContenidoOff && styles.disable]}
                        onPress={() => setPaquete(true)}>
                        <Text style={styles.text}>Editar contenido</Text>
                      </TouchableHighlight>
                      <TouchableHighlight
                      underlayColor={colors.editUnderlay} style={styles.modalEdit}
                        onPress={() => {
                          const validationNum = CostoValido(costo)
                          let validation = Validar(4,descripcion,marca,costo,unidad);
                          if(selectedCategory == 'Agrupaciones'){
                            validation = Validar(1,descripcion,'','','');
                          }
                          else if(selectedType == 'servicio' || selectedType == 'paquete'){
                            validation = Validar(2,descripcion,costo,'','');
                          }
                          else if(selectedCategory == 'No almacenables'){
                            validation = Validar(2,descripcion,marca,'','');
                          }
                             if (!validation.isValid) {
                            Alert.alert('Error', validation.message);
                            return; 
                            }
                            if (editCostoOn){
                              if (!validationNum.isValid) {
                              Alert.alert('Error', validationNum.message);
                              return; 
                              }
                          }
                        setElementosMostrados(AddPrecio(elementosMostrados,id,descripcion,marca,Number(costo),unidad,selectedType,contenidoPaquete,selectedECategory,selectedControl))
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
        
                    <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                      <TouchableHighlight
                      underlayColor={colors.regretUnderlay} style={styles.modalRegret}
                        onPress={() => setConfirm(!Confirm)}>
                        <Text style={styles.text}>NO</Text>
                      </TouchableHighlight>
                      <TouchableHighlight
                      underlayColor={colors.deleteUnderlay} style={styles.modalDelete}
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
                  <View style={[styles.modalView, {marginHorizontal: 9, marginVertical: 210}]}>

                  <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                      <TouchableHighlight
                      style={{height: 30, width: 30, alignItems: "flex-end"}}
                      underlayColor={colors.scrollBackground}
                      onPress={() => setNewPaquete(!NewPaquete)}>
                      <Ionicons name="close" size={20} color={colors.text} />
                      </TouchableHighlight>
                    </View>
        
                    <View>
                      <Text style={styles.modalTitle}>Definir contenido</Text>
                    </View>
        
                   <View>
                      <Text style={[styles.modalLabel, {textAlign: 'center'}]}>
                        Ingrese los elementos del contenido</Text>
                    </View>

                    <View style={styles.table}>
                      <ScrollView style={styles.showcase} showsVerticalScrollIndicator={true}>
                        <View style={styles.row}>
                        <View style={[styles.headerCell, {backgroundColor: 'transparent'}]}>
                            <Text style={styles.headerText}>Descripción</Text>
                            </View>
                            <View style={[styles.headerCell, {backgroundColor: 'transparent'}]}>
                            <Text style={styles.headerText}>Marca</Text>
                              </View>
                            <View style={[styles.headerCell, {backgroundColor: 'transparent', flex: 0.5}]}>
                            <Text style={styles.headerText}>Cantidad</Text>
                              </View>
                              <View style={[styles.headerCell, {backgroundColor: 'transparent', flex: 0.15}]}>
                              </View>
                              </View>
                          {Object.entries(contenidoPaquete).map(([id, [descripcion, marca, cantidad]], index) => (
                          <View key={index} style={styles.row}>
                          <View style={[styles.cell, {backgroundColor: 'transparent'}]}>
                          <Text style={styles.text}>{descripcion}</Text>
                            </View>
                          <View style={[styles.cell, {backgroundColor: 'transparent'}]}>
                          <Text style={styles.text}>{marca}</Text>
                            </View>
                            <View style={[styles.cell, {backgroundColor: 'transparent', flex: 0.5}]}>
                            <Text style={styles.text}>{cantidad}</Text>
                            </View>
                            <View style={[styles.cell, {backgroundColor: 'transparent', flex: 0.15}]}>
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
                                      onPress={() => {
                                        setSelectedProduct(''); setCantidad(''); 
                                        if (selectedType == 'paquete'){
                                        setAlterPaquete(true)
                                      }
                                      else if (selectedType == 'agrupacion'){
                                        setAlterAgrupacion(true)
                                      }
                                      }}
                                      style={styles.buttonRegister}>
                                      <Text style={{color: colors.text}}>Agregar</Text>
                                  </TouchableHighlight>
                                  </View>

                    <View style={[styles.row, {justifyContent: 'center'}]}>
                      <TouchableHighlight
                      underlayColor={colors.confirmUnderlay} style={styles.modalConfirm}
                        onPress={() => {
                          if(Object.keys(contenidoPaquete).length > 0){
                            setElementosMostrados(AddPrecio(elementosMostrados,id,descripcion,'',Number(costo),'','paquete',contenidoPaquete,'',selectedControl))
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
                  <View style={[styles.modalView, {marginHorizontal: 9, marginVertical: 210}]}>

                  <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                      <TouchableHighlight
                      style={{height: 30, width: 30, alignItems: "flex-end"}}
                      underlayColor={colors.scrollBackground}
                      onPress={() => setPaquete(!Paquete)}>
                      <Ionicons name="close" size={20} color={colors.text} />
                      </TouchableHighlight>
                    </View>
        
                    <View>
                      <Text style={styles.modalTitle}>Editar contenido</Text>
                    </View>
        
                   <View>
                      <Text style={[styles.modalLabel, {textAlign: 'center'}]}>
                        Ingrese los elementos del contenido</Text>
                    </View>

                    <View style={[styles.table]}>
                              <ScrollView style={styles.showcase} showsVerticalScrollIndicator={true}>
                        <View style={styles.row}>
                        <View style={[styles.headerCell, {backgroundColor: 'transparent'}]}>
                            <Text style={styles.headerText}>Descripción</Text>
                            </View>
                             <View style={[styles.headerCell, {backgroundColor: 'transparent'}]}>
                            <Text style={styles.headerText}>Marca</Text>
                              </View>
                            <View style={[styles.headerCell, {backgroundColor: 'transparent', flex: 0.5}]}>
                            <Text style={styles.headerText}>Cantidad</Text>
                              </View>
                              <View style={[styles.headerCell, {backgroundColor: 'transparent', flex: 0.15}]}>
                              </View>
                              </View>

                                {Object.entries(contenidoPaquete).map(([id,[descripcion, marca, cantidad]], index) => (
                          <View key={index} style={styles.row}>
                          <View style={[styles.cell, {backgroundColor: 'transparent'}]}>
                          <Text style={styles.text}>{descripcion}</Text>
                            </View>
                            <View style={[styles.cell, {backgroundColor: 'transparent'}]}>
                            <Text style={styles.text}>{marca}</Text>
                            </View>
                            <View style={[styles.cell, {backgroundColor: 'transparent', flex: 0.5}]}>
                            <Text style={styles.text}>{cantidad}</Text>
                            </View>
                            <View style={[styles.cell, {backgroundColor: 'transparent', flex: 0.15}]}>
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
                                      onPress={() => {
                                        setSelectedProduct(''); setCantidad(''); 
                                        if (selectedType == 'paquete'){
                                        setAlterPaquete(true)
                                      }
                                      else if (selectedType == 'agrupacion'){
                                        setAlterAgrupacion(true)
                                      }
                                      }}
                                      style={styles.buttonRegister}>
                                      <Text style={{color: colors.text}}>Agregar</Text>
                                  </TouchableHighlight>
                                  </View>

                    <View style={[styles.row, {justifyContent: 'center'}]}>
                     <TouchableHighlight
                    underlayColor={colors.editUnderlay} style={styles.modalEdit}
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
                    elementosMostrados[id][6],
                    elementosMostrados[id][7],]
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
                      <View style={[styles.modalView, {marginVertical: 310}]}>
            
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
                          <View style={styles.modalRow}>
                            <Text style={styles.modalLabel}>Elemento:</Text>
                            <View style={{width:200, height:55}}>
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
                        }} >
                        <Picker.Item label="(Seleccione un producto)" value="" />
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
                        value={id}  // ← Usar el ID como value
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
            
                        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                          <TouchableHighlight
                          underlayColor={colors.confirmUnderlay} style={styles.modalConfirm}
                            onPress={() => {
                              const validation = Validar(1,selectedProduct,'','','');
                              const validationNum = NumeroValido(cantidad);  
                              if (!validation.isValid) {
                            Alert.alert('Error', validation.message);
                            return; 
                            }
                                  if (!validationNum.isValid) {
                              Alert.alert('Error', validationNum.message);
                              return; 
                            }
                            const productoSeleccionado = (productos as any)[selectedProduct];
                            if (!productoSeleccionado) {
                            Alert.alert('Error', 'Producto no encontrado');
                                return;
                            }
                            setContenidoPaquete(AddElemento(contenidoPaquete, idP, productoSeleccionado[0], productoSeleccionado[1], Number(cantidad)))
                            setIdP(idP + 1); 
                            setAlterPaquete(!AlterPaquete)}}>
                            <Text style={styles.text}>Agregar</Text>
                          </TouchableHighlight>
                        </View>
            
                      </View>
                      </View>
                    </Modal>
      
      {/* Modal para definir elementos para las agrupaciones*/}
                <Modal
                      animationType="fade"
                      transparent={true}
                      visible={AlterAgrupacion}
                      onRequestClose={() => {
                        setAlterAgrupacion(!AlterAgrupacion);
                      }}>
                      <View style={styles.modalOverlay}>
                      <View style={[styles.modalView, {marginVertical: 310}]}>
            
                        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                          <TouchableHighlight
                           style={{height: 30, width: 30, alignItems: "flex-end"}}
                          underlayColor={colors.scrollBackground}
                          onPress={() => setAlterAgrupacion(!AlterAgrupacion)}>
                         <Ionicons name="close" size={20} color={colors.text} />
                          </TouchableHighlight>
                        </View>
            
                        <View>
                          <Text style={styles.modalTitle}>Agregar elementos</Text>
                        </View>
            
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
                        }}>
                          <Picker.Item label="(Seleccione un producto)" value="" />
                        {Object.entries(noAlmacenables || {}).length > 0 ? (
                        Object.entries(noAlmacenables)
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
            
                        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                          <TouchableHighlight
                          underlayColor={colors.confirmUnderlay} style={styles.modalConfirm}
                            onPress={() => {
                              const validation = Validar(1,selectedProduct,'','','');
                              const validationNum = NumeroValido(cantidad);  
                              if (!validation.isValid) {
                            Alert.alert('Error', validation.message);
                            return; 
                            }
                                  if (!validationNum.isValid) {
                              Alert.alert('Error', validationNum.message);
                              return; 
                            }
                            setContenidoPaquete(AddElemento(contenidoPaquete, idP, selectedProduct.split('-')[0], selectedProduct.split('-')[1], Number(cantidad)))
                            setIdP(idP + 1); 
                            setAlterAgrupacion(!AlterAgrupacion)}}>
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
        <Text style={{color: colors.text , fontSize: 15, paddingVertical: 10,}}>
          Seleccione una categoría para filtrar los elementos y ver aquellos ubicados en dicha categoría
          </Text>
        <Text style={{ color: colors.text ,fontSize: 15, paddingVertical: 10,}}>
          Seleccione la descripción de un elemento en la tabla para modificar sus datos.
          </Text> 
          <View style={{height: 55}}>
          <Picker
              selectedValue={selectedCategory}
              onValueChange={(itemValue) => setSelectedCategory(itemValue)}
              style={styles.picker} itemStyle={styles.pickerItem}
              >
                <Picker.Item label="REGISTROS SIN CLASIFICAR" value="Sin categoria" />
                 {Object.values(categorias || {}).length > 0 ? (
                  Object.values(categorias)
                  .sort((a, b) => {
                  const nombreA = String(a).toLowerCase();
                  const nombreB = String(b).toLowerCase();
                  return nombreA.localeCompare(nombreB);
                  })
                  .map((categoria: any, id) => (
                  <Picker.Item 
                    style={styles.pickerItem} 
                    key={id} 
                    label={String(categoria)} 
                    value={String(categoria)} 
                    />
                      ))
                    ) : null}
                <Picker.Item label="NO ALMACENABLES" value="No almacenables" />
                <Picker.Item label="AGRUPACIONES" value="Agrupaciones" />
          </Picker></View>

          <View style={[styles.row, {justifyContent: "space-between"}]}>
          <TouchableHighlight 
                underlayColor={colors.cellUnderlay}
                onPress={() => {
                  setId(Object.keys(listaPrecios).length + 1)
                  setDescripcion(''); setMarca(''); setCosto(''); setUnidad(''); setContenidoPaquete({})
                  if (selectedCategory == 'No almacenables'){
                    setFieldUnidadOn(false); setFieldControlOn(false); setFieldCostoOn(false); setFieldMarcaOn(true); setFieldTipoOn(false)
                  }
                  else if (selectedCategory == 'Agrupaciones'){
                    setFieldUnidadOn(false); setFieldControlOn(false); setFieldCostoOn(false); setFieldMarcaOn(false); setFieldTipoOn(false)
                  }
                  else {
                    setFieldUnidadOn(true); setFieldControlOn(true); setFieldCostoOn(true); setFieldMarcaOn(true); setFieldTipoOn(true)
                  }
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
                  <Text style={{ color: colors.text ,fontSize: 15, paddingVertical: 5,}}>
          <Ionicons name="pricetag-outline" size={18} color={colors.text} /> PRODUCTOS {'   '}
           <Ionicons name="construct-outline" size={18} color={colors.text} /> SERVICIOS {'   '}
            <Ionicons name="cube-outline" size={18} color={colors.text} /> PAQUETES
          </Text> 
          <Text style={{ color: colors.text ,fontSize: 15, paddingVertical: 5,}}>
          Los productos con el icono {' '}<Ionicons name="layers-outline" size={15} color={colors.text} /> {' '}
          estan controlados por lotes.
          </Text> 
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
                          <View style={[styles.headerCell, {flex: 0.2}]}>
                          </View>
                      </View>

                {/* Body - cada registro es una fila */}
                {!isLoading ? (
                Object.values(elementosMostrados || {}).length > 0 ? (
                 Object.entries(elementosMostrados).map(([id, data]: [string, any]) => {
                  const [descripcion, marca, costo, unidad, tipo, contenidoPaquete, categoria, control] = data;
                  return(
                      <View key={id} style={styles.row}>
                        <View style={styles.cell}>
                        <TouchableHighlight
                        underlayColor={colors.input}
                        onPress={() => {

                          if (tipo == "producto"){
                            setEditContenidoOff(true); setEditMarcaOn(true); setEditCostoOn(true); setEditUnidadOn(true); setEditControlOn(true); setEditCategoriaOn(true);
                          }
                          else if (tipo == "servicio"){
                            setEditContenidoOff(true); setEditMarcaOn(false); setEditCostoOn(true); setEditUnidadOn(false); setEditControlOn(false); setEditCategoriaOn(true);
                          }
                          else if (tipo == "paquete"){
                            setEditContenidoOff(false); setEditMarcaOn(false); setEditCostoOn(true); setEditUnidadOn(false); setEditControlOn(true); setEditCategoriaOn(true);
                          }
                          else if (tipo == "no almacenable"){
                            setEditContenidoOff(true); setEditMarcaOn(true); setEditCostoOn(false); setEditUnidadOn(false); setEditControlOn(false); setEditCategoriaOn(false);
                          }
                          else{
                            setEditContenidoOff(false); setEditMarcaOn(false); setEditCostoOn(false); setEditUnidadOn(false); setEditControlOn(false); setEditCategoriaOn(false);
                          }

                          setId(Number(id))
                          setDescripcion(String(descripcion)); setMarca(String(marca)); setCosto(String(costo)); setUnidad(unidad);
                          setSelectedType(tipo); setSelectedECategory(selectedCategory); setSelectedControl(control)
                          setContenidoPaquete(contenidoPaquete); 
                          setIdP(contenidoPaquete.length)
                          setEModalVisible(true)}}>
                        <Text style={styles.text}>
                          {control != "Ninguno" ? <Ionicons name="layers-outline" size={15} color={colors.text} />
                          : <Text style={styles.text}></Text>}
                          {descripcion}</Text>
                        </TouchableHighlight>
                        </View> 
                        <View style={styles.cell}><Text style={styles.text}>{marca}</Text></View>
                        <View style={[styles.cell, {flex: 0.8}]}><Text style={styles.text}>{tipo === "gasto" ? "" : Number(costo).toFixed(2)}</Text></View>
                        <View style={[styles.cell, {flex: 0.8}]}><Text style={styles.text}>{unidad}</Text></View>
                        <View style={[styles.cell, {flex: 0.2}]}>
                          {tipo === "producto" ? <Ionicons name="pricetag-outline" size={18} color={colors.text} />
                          : tipo == "servicio" ? <Ionicons name="construct-outline" size={18} color={colors.text} />
                          : tipo == "paquete" ? <Ionicons name="cube-outline" size={18} color={colors.text} /> 
                          :<Text style={styles.text}></Text> }
                        </View>
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
  //Tabla estilos
  table: {paddingVertical: 20, marginHorizontal: -9},
  row: {flexDirection: 'row',},
  headerCell: {
    flex: 1, padding: 6,
    backgroundColor: colors.headerCell
  },
  cell: {
    flex: 1, padding: 6,
    backgroundColor: colors.background,
  },
  headerText: {color: colors.text},
  //Modal estilos
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalView: {
    marginHorizontal: 18, marginVertical: 120,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.modalBackground,
    borderRadius: 20,
    padding: 18,
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
    padding: 10, borderRadius: 20,
    justifyContent: 'center', alignItems: 'center',
  },
  modalRegret: {
    backgroundColor: colors.regret,
    padding: 10, borderRadius: 20,
    justifyContent: 'center', alignItems: 'center',
  },
  modalEdit: {
    backgroundColor: colors.edit,
    padding: 10, borderRadius: 20,
    justifyContent: 'center', alignItems: 'center',
  },
  modalDelete: {
    backgroundColor: colors.delete,
    padding: 10, borderRadius: 20,
    justifyContent: 'center', alignItems: 'center',
  },
  buttonRegister: {
    backgroundColor: colors.option,
    padding: 10,borderRadius: 20,
  },
  //---------------
  picker: {
    marginLeft: 10, flex: 1,
    backgroundColor: colors.input,
    color: colors.text,
  },
  pickerItem: {
    fontSize: 16,
  },

});
