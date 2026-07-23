import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import Constants from 'expo-constants';
import type { AddAjustesInventarioScreenProps, AjusteInventario } from './types';
import { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import { Validar, NumeroValido, AddElemento, QuitarElemento } from './backend' 
//import { obtenerAlmacenes } from './backend';
//import { obtenerSucursales, obtenerPrecios } from '../backend';
//import { agregarAjuste } from './backend';
import { registrar } from './backend';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import datos from '../datos.json'; import datosA from './datos.json';

export default function AddRegistroCompra({ navigation }: AddAjustesInventarioScreenProps) {

  const { theme, colors } = useTheme();
    const styles = getStyles(colors);

  //Constantes de modales
  const [modalVisible, setModalVisible] = useState(false);
  const [Confirm, setConfirm] = useState(false);
  const [Receive, setReceive] = useState(false);

  //Constantes de inputs
  const [cantidad, setCantidad] = useState('');
  const [nlote, setNlote] = useState('');

   //JSON para efectuar ajustes de inventario
  const [processAjusteInventario, setProcessAjusteInventario] = useState<AjusteInventario>({});
  //JSONs de datos
 //const [almacenes, setAlmacenes] = useState<Record<string, any>>({});
  const almacenes: Record<string, any> = (datosA.ALMACENES || {})
  
  //const [listaPrecios, setListaPrecios] = useState<Record<string, any>>({});
  const productos = Object.fromEntries(
  Object.entries(datos.LISTA_PRECIOS || {}).filter(
      ([id, data]) => data[4] === "producto"));
  //const [Ajustes, setAjustes] = useState<Record<string, any>>({});
  const [Ajustes, setAjustes] = useState(datosA.AJUSTES_INVENTARIO);
  const [AjustesOG, setAjustesOG] = useState<Record<string, any>>({});
  const [existencias, setExistencias] = useState(datosA.EXISTENCIAS_ALMACEN);

    //Constantes de pickers
  const [selectedStore, setSelectedStore] = useState('');
  const [selectedOperation, setSelectedOperation] = useState('entrada');
  //Valores del picker producto
  const [selectedProduct, setSelectedProduct] = useState('');
  const [productMarca, setProductMarca] = useState(productos[Object.keys(productos)[0]]?.[1] || '');

  //Constantes extra
  const hoy = new Date();
  const hoyStr = `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, '0')}-${String(hoy.getDate()).padStart(2, '0')}`;

   //ID
  const [idP, setIdP] = useState(1);

  const [fieldOn, setFieldOn] = useState(true)

  /* useFocusEffect(
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
        } catch (error: any) {
          Alert.alert('Error', error.message || 'No se pudieron cargar las sucursales');
        } finally {
          setIsLoading(false);
        }
      };
      
      cargarSucursales();
    }, [])
  ); 

  // Cargar precios desde el servidor
  useFocusEffect(
    useCallback(() => {
      const cargarPrecios = async () => {
        try {
          setIsLoading(true);
          const data = await obtenerPrecios();
          
          // Convertir el array de precios a objeto con índices
          const preciosObj: Record<string, any> = {};
          if (Array.isArray(data)) {
            data.forEach((item: any, index: number) => {
              preciosObj[index + 1] = [item.descripcion, item.marca, item.costo, item.unidad, item.tipo, item.contenido, item.categoría];
            });
          }
          
          setPrecios(preciosObj);
        } catch (error: any) {
          Alert.alert('Error', error.message || 'No se pudieron cargar los precios');
        } finally {
          setIsLoading(false);
        }
      };
      
      cargarPrecios();
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
    try {
      const response = await agregarAjuste();
      if (response.success) {
        // Recargar ajustes
        const data = await obtenerAjuste(selectedStore, selectedOperation, hoyStr);
        const ajustesObj: Record<string, any> = {};
        if (Array.isArray(data)) {
          data.forEach((item: any, index: number) => {
            ventasObj[index + 1] = [item.selectedStore, item.selectedOperation, item.hoyStr];
          });
        }
        setAjustes(ajustesObj);
        setAjustesOG(ajustesObj);
        setReceive(false);
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'No se pudo registrar el ajuste de inventario');
    }
  };*/
  return (
    <View style={styles.container}>
      <StatusBar style={theme === 'oscuro' ? 'light' : 'dark'}  />

    <View style={styles.navigation}>
            <TouchableOpacity style={styles.navIcons}
            onPress={() => {
              if (Object.values(processAjusteInventario).length > 0){
              setConfirm(true)
              }
              else navigation.navigate("AjustesInventario")
            }}
          >
            <Ionicons name="arrow-back" size={30} color={colors.text} />
          </TouchableOpacity>
        </View>

      {/* Modal para agregar elementos a la compra */}
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
                    <Text style={styles.modalTitle}>Agregar productos</Text>
                  </View>
      
                    <View style={styles.modalRow}>
                      <Text style={styles.label}>Producto:</Text>
                      <View style={{width:200, height:55}}>
                        <Picker
                        style={styles.input}
                        selectedValue={selectedProduct}
                        onValueChange={(itemValue) => {
                        setSelectedProduct(itemValue);
                        const productoEncontrado = (productos as any)[itemValue];
                        if (productoEncontrado) {
                          setProductMarca(productoEncontrado[1]);

                          const control = productoEncontrado[7] || 'Ninguno';
                          const esLote = control === 'Lote';
                          setFieldOn(esLote);
      
                          // Si es lote, limpiar o mantener el campo
                          if (!esLote) {
                          setNlote(''); // Limpiar si no es lote
                          }
                        }
                        }}
                        >
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
                        key={id} 
                        label={String(producto[0]) + ' ' + String(producto[1])} 
                        value={id}  // ← ID como value
                        />
                        ))
                        ) : (
                        <Picker.Item label="-" value="" />
                        )}
                      </Picker></View>
                    </View>
                    <View style={styles.modalRow}>
                      <Text style={styles.label}>Cantidad:</Text>
                      <TextInput style={styles.input}
                                  value={cantidad} onChangeText={setCantidad}
                                  keyboardType='numeric'></TextInput>
                    </View>
                    <View style={styles.modalRow}>
                      <Text style={[styles.label, !fieldOn && styles.disabled]}>N° de lote:</Text>
                      <TextInput style={[styles.input, !fieldOn && styles.disabled]} 
                      editable={fieldOn}
                                value={nlote} onChangeText={setNlote}
                                keyboardType='numeric'></TextInput>
                    </View>
      
                  <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <TouchableHighlight
                    underlayColor={colors.confirmUnderlay} style={styles.modalConfirm}
                      onPress={() => {
                      const validation = Validar(1,selectedProduct,'','','');
                    const validationNum1 = NumeroValido(cantidad);  const validationNum2 = NumeroValido(nlote);  
                     if (!validation.isValid) {
                     Alert.alert('Error', validation.message);
                      return; 
                         }
                        if (!validationNum1.isValid) {
                         Alert.alert('Error', validationNum1.message);
                        return; 
                        }
                       if (fieldOn){
                      if (!validationNum2.isValid) {
                        Alert.alert('Error', validationNum2.message);
                       return; 
                       }}
                       const productoSeleccionado = (productos as any)[selectedProduct];
                       if (!productoSeleccionado) {
                        Alert.alert('Error', 'Producto no encontrado');
                       return;
                      }else {
                      setProcessAjusteInventario(AddElemento(
                      processAjusteInventario,
                      idP,
                      String(productoSeleccionado[0]),  // descripción
                      String(productMarca),  // marca
                      Number(cantidad)
                      ));
                      setIdP(idP + 1);
                      setCantidad('');
                      setModalVisible(!modalVisible);
                      }
                      }}>
                      <Text style={styles.text}>Agregar</Text>
                    </TouchableHighlight>
                  </View>
      
                </View>
                </View>
              </Modal>

      {/* Modal para recibir productos */}
                              <Modal
                                    animationType="fade"
                                    transparent={true}
                                    visible={Receive}
                                    onRequestClose={() => {
                                      setConfirm(!Receive);
                                    }}>
                                    <View style={styles.modalOverlay}>
                                    <View style={styles.modalView}>
                          
                                      <View>
                                        <Text style={styles.modalTitle}>¿Confirmar cambio en el almacén?</Text>
                                      </View>
                          
                                      <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                                        <TouchableOpacity  onPress={() => setReceive(!Receive)}>
                                          <Ionicons name="close" size={40} color={colors.text} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {
                                            setConfirm(!Receive);
                                            setIdP(Object.keys(Ajustes).length + 1)
                                            setAjustes(registrar(Ajustes,idP,selectedStore,selectedOperation,hoyStr))
                                            navigation.navigate("AjustesInventario")
                                          }}><Ionicons name="checkmark" size={40} color={colors.text} />
                                        </TouchableOpacity>
                                      </View>
                          
                                    </View>
                                    </View>
                                  </Modal>

      {/* Modal para confirmar salida */}
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
                                        <Text style={styles.modalTitle}>¿Salir sin guardar?</Text>
                                      </View>
                          
                                      <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                                        <TouchableOpacity onPress={() => setConfirm(!Confirm)}>
                                          <Ionicons name="close" size={40} color={colors.text} />
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                          onPress={() => {
                                            setConfirm(!Confirm);
                                            navigation.navigate("AjustesInventario")
                                          }}><Ionicons name="checkmark" size={40} color={colors.text} />
                                        </TouchableOpacity>
                                      </View>
                          
                                    </View>
                                    </View>
                                  </Modal>

      {/*ScrollView*/}
      <ScrollView>
        <View style={styles.scroll}>
        <Text style={{  fontSize: 25, fontWeight: 'bold', color: colors.text}}>
        Realizar ajuste
        </Text>

        <View style={[styles.row, {marginBottom:12}]}>
          <Text style={styles.label}>Almacén:</Text>
          <View style={{width:180}}>
          <Picker
            style={styles.input}
            selectedValue={selectedStore}
            onValueChange={(itemValue) => setSelectedStore(itemValue)}
          >
            <Picker.Item label="(Seleccione un almacén)" value="" />
        {Object.entries(almacenes || {}).length > 0 ? (
          Object.entries(almacenes)
          .sort((a, b) => {
             const nombreA = String(a[1][0]).toLowerCase();
            const nombreB = String(b[1][0]).toLowerCase();
            return nombreA.localeCompare(nombreB);
          })
          .map(([id, almacen]: [string, any]) => (
            <Picker.Item 
              key={id} 
              label={String(almacen[0]) + ' (' + String(almacen[1]) + ')'} 
              value={String(almacen[0])} 
            />
            ))
            ) : (
            <Picker.Item label="-" value="" />
            )}
          </Picker></View>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Tipo de ajuste:</Text>
          <View style={{width:150}}>
          <Picker
            style={styles.input}
            selectedValue={selectedOperation}
            onValueChange={(itemValue) => setSelectedOperation(itemValue)}
          >
            <Picker.Item label="ENTRADA" value="entrada" />
            <Picker.Item label="SALIDA" value="salida" />
          </Picker></View>
        </View>

        {/*Tabla*/}<View>
                  <ScrollView style={styles.showcase} showsVerticalScrollIndicator={true}>
              <View style={styles.tableRow}>
                  <View style={styles.cell}>
                      <Text style={styles.text}>Descripción</Text>
                      </View>
                  <View style={[styles.cell, {flex: 0.7}]}>
                      <Text style={styles.text}>Cantidad</Text>
                      </View>
                  </View>
                  {Object.entries(processAjusteInventario).map(([id, [descripcion, marca, cantidad]], index) => (
                    <View key={index} style={styles.row}>
                    <View style={styles.cell}>
                        <Text style={styles.text}>{descripcion} {marca}</Text>
                        </View>
                        <View style={[styles.cell, {flex: 0.5}]}>
                        <Text style={styles.text}>{cantidad}</Text>
                        </View>
                          <View style={[styles.cell, {flex: 0.1}]}>
                            <TouchableOpacity
                            style={{height:25, width:25}}
                             onPress={()=> {
                              setProcessAjusteInventario(QuitarElemento(processAjusteInventario, Number(id)))
                            }}>
                            <Ionicons name="close" size={25} color='red' />
                            </TouchableOpacity>
                            </View>
                        </View>
                      ))} 

                  </ScrollView>
          </View>

          <View style={styles.row}>
          <TouchableOpacity
                  onPress={() => {
                    setSelectedProduct(''), setCantidad(''); setNlote('')
                    setModalVisible(true)}}
                  style={styles.button}>
                  <Text style={styles.text}>Agregar</Text>
              </TouchableOpacity>
          <TouchableOpacity
                  onPress={() => {
                    if(Object.keys(processAjusteInventario).length > 0){
                      setReceive(true);
                    }
                    else Alert.alert("Error","Por favor, seleccione al menos un producto")}}
                  style={styles.button}>
                  <Text style={styles.text}>Afectar inventario</Text>
              </TouchableOpacity>
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
  text: {color: colors.text},
  navigation: {
    backgroundColor: colors.navBackground
  },
  navIcons:{padding: 10},
  scroll: {
    flex: 1,
    backgroundColor: colors.scrollBackground,
    padding: 18,
  },
  row: {
    flexDirection: 'row',justifyContent: 'space-between',
  },
  button: {
    backgroundColor: colors.option,
    padding: 10, borderRadius: 20,
  },
  //Tabla estilos
  tableRow: {flexDirection: 'row',},
  showcase: {
    backgroundColor: colors.secondary,
    maxHeight: 200, minHeight: 200,
  },
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
    marginBottom: 18,
    textAlign: 'center',
    color: colors.text
  },
  input: {
    backgroundColor: colors.scrollBackground, color: colors.text,
  },
  disabled: {
    opacity: 0.6
  },
    modalRow:{
    flexDirection: 'row', justifyContent: 'space-evenly', 
    marginBottom: 18,
  },
  label:{
    fontSize: 20, color: colors.text
  },
  modalConfirm: {
    backgroundColor: colors.confirm, padding: 10, borderRadius: 20
  },
  modalDelete: {
    backgroundColor: colors.delete, padding: 10, borderRadius: 20,
  }
});