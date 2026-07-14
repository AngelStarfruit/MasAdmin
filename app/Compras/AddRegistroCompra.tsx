import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, Modal, TextInput, Alert } from 'react-native';
import Constants from 'expo-constants';
import type { AddRegistroCompraScreenProps, RegistroCompra } from './types';
import { useState, useEffect, useCallback } from 'react';
import { Picker } from '@react-native-picker/picker';
import { Validar, NumeroValido, totalCompra, AddElemento, QuitarElemento } from './backend'
//import { obtenerProveedores } from './backend'; import { obtenerAlmacenes } from '../Almacenes/backend';
//import { obtenerSucursales, obtenerPrecios } from '../backend';
//import { agregarCompra } from './backend';
import { registrar, afectarAlmacen } from './backend';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

import datosP from './datos.json'; import datos from '../datos.json'; import datosA from '../Almacenes/datos.json';

export default function AddRegistroCompra({ navigation }: AddRegistroCompraScreenProps) {

  const { theme, colors } = useTheme();
      const styles = getStyles(colors);

  //Constantes de modales
  const [modalVisible, setModalVisible] = useState(false);
  const [Confirm, setConfirm] = useState(false);
  const [Receive, setReceive] = useState(false);

  //Constante de input
  const [cantidad, setCantidad] = useState('');
  const [nlote, setNlote] = useState('');

  //Constantes de JSON
  const [processCompra, setProcessCompra] = useState<RegistroCompra>({})
  const [processACompra, setProcessACompra] = useState<RegistroCompra>({})

  //JSONs de datos
  //const [proveedores, setProveedores] = useState<Record<string, any>>({});
  const proveedores: Record<string, any> = datosP.PROVEEDORES || {};
  //const [sucursales, setSucursales] = useState<Record<string, any>>({});
  const sucursales: Record<string, any> = datos.SUCURSALES || {}
  //const [listaPrecios, setListaPrecios] = useState<Record<string, any>>({});
  const productos = Object.fromEntries(
  Object.entries(datos.LISTA_PRECIOS || {}).filter(
      ([id, data]) => data[4] === "producto"));
  //const [proveedores, setProveedores] = useState<Record<string, any>>({});
  const almacenes: Record<string, any> = datosA.ALMACENES || {};
  const [almacenesMostrados, setAlmacenesMostrados] = useState(almacenes)
  //const [Compras, setCompras] = useState<Record<string, any>>({});
  const [Compras, setCompras] = useState(datosP.CONTROL_COMPRAS);
  const [ComprasOG, setComprasOG] = useState<Record<string, any>>({});
  const [existencias, setExistencias] = useState(datosA.EXISTENCIAS_ALMACEN);

  //Constantes de pickers
  const [selectedProvider, setSelectedProvider] = useState(proveedores[Object.keys(proveedores)[0]]?.[0] || '');
  const [selectedBranch, setSelectedBranch] = useState(sucursales[Object.keys(sucursales)[0]]?.[0] || '');
  const [selectedStore, setSelectedStore] = useState(almacenes[Object.keys(almacenes)[0]]?.[0] || '');
    //Valores del picker producto
    const [selectedProduct, setSelectedProduct] = useState(Object.keys(productos)[0] || '');
    const [productMarca, setProductMarca] = useState(productos[Object.keys(productos)[0]]?.[1] || '');
    const [productCosto, setProductCosto] = useState(productos[Object.keys(productos)[0]]?.[2] || '');

  useEffect(() => {
  let almacenesFiltrados
  
   almacenesFiltrados = Object.fromEntries(
      Object.entries(datosA.ALMACENES || {}).filter(
        ([id, data]) => data[1] === selectedBranch
      )
    );

  setAlmacenesMostrados(almacenesFiltrados);
}, [selectedBranch]);

  //Constantes extras
  const total = totalCompra(processCompra)
  const totalA = totalCompra(processACompra)
  const hoy = new Date();
  const hoyStr = `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, '0')}-${String(hoy.getDate()).padStart(2, '0')}`;

  //Desabilitar botones
  const [Off, setOff] = useState(false)

  //ID
  const [idP, setIdP] = useState(1);

  const [fieldOn, setFieldON] = useState(true)

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
        } catch (error: any) {
          Alert.alert('Error', error.message || 'No se pudieron cargar los proveedores');
        } finally {
          setIsLoading(false);
        }
      };
      
      cargarProveedores();
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
      const response = await agregarCompra();
      if (response.success) {
        // Recargar compras
        const totalANum = Number(totalA)
        const data = await obtenerCompras(hoyStr, totalANum, selectedProvider);
        const comprasObj: Record<string, any> = {};
        if (Array.isArray(data)) {
          data.forEach((item: any, index: number) => {
            comprasObj[index + 1] = [item.hoyStr, item.totalANum, item.selectedProvider];
          });
        }
        setCompras(comprasObj);
        setComprasOG(comprasObj);
        setReceive(false);
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'No se pudo registrar la compra');
    }
  };*/

  return (
    <View style={styles.container}>
      <StatusBar style={theme === 'oscuro' ? 'light' : 'dark'}  />

    <View style={styles.navigation}>
            <TouchableHighlight
            underlayColor={colors.navIconUnderlay} style={styles.navIcons}
            onPress={() => {
              if (Object.values(processCompra).length > 0 || Object.values(processACompra).length > 0){
              setConfirm(true)
              }
              else navigation.navigate("ControlCompras")
            }}
          >
            <Ionicons name="arrow-back" size={25} color={colors.text} />
          </TouchableHighlight>
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
                    <TouchableHighlight
                    style={{height: 30, width: 30, alignItems: "flex-end"}}
                    underlayColor={colors.scrollBackground}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Ionicons name="close" size={20} color={colors.text} />
                    </TouchableHighlight>
                  </View>
      
                  <View>
                    <Text style={styles.modalTitle}>Agregar productos</Text>
                  </View>
      
                  <View style={styles.hr}/>
                    <View style={styles.modalRow}>
                      <Text style={styles.modalLabel}>Elemento:</Text>
                      <View style={{width:200, height:55}}>
                        <Picker
                        style={[styles.picker, {backgroundColor: colors.scrollBackground}]}
                        selectedValue={selectedProduct}
                        onValueChange={(itemValue) => {
                        setSelectedProduct(itemValue);
                        const productoEncontrado = (productos as any)[itemValue];
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
                        value={id}  // ← ID como value
                        />
                        ))
                        ) : (
                        <Picker.Item label="-" value="" />
                        )}
                      </Picker>
                      </View>
                    </View>
                    <View style={styles.modalRow}>
                      <Text style={styles.modalLabel}>Cantidad:</Text>
                      <TextInput style={styles.input}
                                value={cantidad} onChangeText={setCantidad}
                                keyboardType='numeric'></TextInput>
                    </View>
                    <View style={styles.modalRow}>
                      <Text style={[styles.modalLabel, !fieldOn && styles.disabled]}>N° de lote:</Text>
                      <TextInput style={[styles.input, !fieldOn && styles.disabled]} 
                      editable={fieldOn}
                                value={nlote} onChangeText={setNlote}
                                keyboardType='numeric'></TextInput>
                    </View>
                  <View style={styles.hr}/>
      
                  <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <TouchableHighlight
                    underlayColor={colors.confirmUnderlay} style={styles.modalConfirm}
                      onPress={() => {
                       const validation = Validar(2,cantidad,nlote,'','');
                          if (!validation.isValid) {
                          Alert.alert('Error', validation.message);
                          return; 
                            }
                          const validationNum1 = NumeroValido(cantidad); const validationNum2 = NumeroValido(nlote);
                          if (!validationNum1.isValid) {
                          Alert.alert('Error', validationNum1.message);
                          return;
                          }
                          if (!validationNum2.isValid) {
                         Alert.alert('Error', validationNum2.message);
                         return;
                         }
                      const productoSeleccionado = (productos as any)[selectedProduct];
                      if (productoSeleccionado) {
                      setProcessCompra(AddElemento(
                      processCompra,
                      idP,
                      String(productoSeleccionado[0]),  // descripción
                      String(productMarca),  // marca
                      Number(productCosto),  // costo
                      Number(cantidad),
                      String(nlote)
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
                                    <View style={[styles.modalView, {marginVertical: 360}]}>
                          
                                      <View>
                                        <Text style={styles.modalTitle}>¿Recibir los artículos en el almacén?</Text>
                                      </View>
                          
                                      <View style={styles.hr}/>
                          
                                      <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                                        <TouchableHighlight
                                        underlayColor={colors.regretUnderlay} style={[styles.modalRegret, {width: 50}]}
                                          onPress={() => setReceive(!Receive)}>
                                          <Text style={styles.text}>NO</Text>
                                        </TouchableHighlight>
                                        <TouchableHighlight
                                        underlayColor={colors.confirmUnderlay} style={[styles.modalConfirm, {width: 50}]}
                                          onPress={() => {
                                            setConfirm(!Receive);
                                            setIdP(Object.keys(Compras).length + 1)
                                            setCompras(registrar(Compras,idP,hoyStr,Number(totalA),selectedProvider))
                                            afectarAlmacen(existencias, processACompra, selectedStore, selectedBranch)
                                            navigation.navigate("ControlCompras")
                                          }}>
                                          <Text style={styles.text}>SÍ</Text>
                                        </TouchableHighlight>
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
                                    <View style={[styles.modalView, {marginVertical: 375}]}>
                          
                                      <View>
                                        <Text style={styles.modalTitle}>¿Salir sin guardar?</Text>
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
                                            setConfirm(!Confirm);
                                            navigation.navigate("ControlCompras")
                                          }}>
                                          <Text style={styles.text}>SÍ</Text>
                                        </TouchableHighlight>
                                      </View>
                          
                                    </View>
                                    </View>
                                  </Modal>

      {/*ScrollView*/}
      <ScrollView>
        <View style={styles.scroll}>
        <Text style={{  fontSize: 25, fontWeight: 'bold', color: colors.text }}>
        Realizar compra
        </Text>

        <View style={[styles.row, {marginBottom: 12}]}>
          <Text style={styles.textRow}>Proveedor:</Text>
          <View style={{width:150}}>
          <Picker
            style={styles.picker}
            selectedValue={selectedProvider}
            onValueChange={(itemValue) => setSelectedProvider(itemValue)}
          >
             {Object.entries(proveedores || {}).length > 0 ? (
               Object.entries(proveedores)
               .sort((a, b) => {
                        const nombreA = String(a[1][0]).toLowerCase();
                        const nombreB = String(b[1][0]).toLowerCase();
                        return nombreA.localeCompare(nombreB);
                        })
               .map(([id, proveedor]: [string, any]) => (
              <Picker.Item 
                  style={styles.pickerItem} 
                  key={id} 
                  label={String(proveedor[0])} 
                  value={String(proveedor[0])} 
                  />
                  ))
                  ) : (
                  <Picker.Item label="-" value="" />
                )}
          </Picker></View>
        </View>
        <View style={styles.row}>
          <Text style={styles.textRow}>Sucursal afectada:</Text>
          <View style={{width:150}}>
          <Picker
            style={styles.picker}
            selectedValue={selectedBranch}
            onValueChange={(itemValue) => setSelectedBranch(itemValue)}
          >
            {Object.entries(sucursales || {}).length > 0 ? (
            Object.entries(sucursales)
            .sort((a, b) => {
                        const nombreA = String(a[1][0]).toLowerCase();
                        const nombreB = String(b[1][0]).toLowerCase();
                        return nombreA.localeCompare(nombreB);
                        })
            .map(([id, sucursal]: [string, any]) => (
            <Picker.Item 
              style={styles.pickerItem} 
              key={id} 
              label={String(sucursal[0])} 
              value={String(sucursal[0])} 
              />
            ))
            ) : (
            <Picker.Item label="-" value="" />
          )}
          </Picker></View>
        </View>

        <View style={styles.table}>
              <View style={styles.tableRow}>
                  <View style={styles.headerCell}>
                      <Text style={styles.headerText}>Descripción</Text>
                      </View>
                  <View style={styles.headerCell}>
                      <Text style={styles.headerText}>Marca</Text>
                      </View>
                  <View style={[styles.headerCell, {flex: 0.65}]}>
                      <Text style={styles.headerText}>Costo</Text>
                      </View>
                  <View style={[styles.headerCell, {flex: 0.8}]}>
                      <Text style={styles.headerText}>Cantidad</Text>
                      </View>
                  <View style={[styles.headerCell, {flex: 0.65}]}>
                      <Text style={styles.headerText}>N° Lote</Text>
                      </View>
                  <View style={[styles.headerCell, {flex: 0.15}]}>
                      </View>
                  </View>
                  <ScrollView style={styles.showcase} showsVerticalScrollIndicator={true}>

                    {Object.entries(processCompra).map(([id, [descripcion, marca, costo, cantidad, nlote]], index) => (
                    <View key={index} style={styles.row}>
                    <View style={styles.cell}>
                    <Text style={styles.text}>{descripcion}</Text>
                    </View>
                    <View style={styles.cell}>
                    <Text style={styles.text}>{marca}</Text>
                    </View>
                    <View style={[styles.cell, {flex: 0.65}]}>
                    <Text style={styles.text}>{Number(costo).toFixed(2)}$</Text>
                    </View>
                    <View style={[styles.cell, {flex: 0.8}]}>
                    <Text style={styles.text}>{cantidad}</Text>
                    </View>
                    <View style={[styles.cell, {flex: 0.65}]}>
                    <Text style={styles.text}>{nlote}</Text>
                    </View>
                    <View style={[styles.cell, {flex: 0.15}]}>
                        <TouchableHighlight
                        style={{height:20, width:20}}
                        onPress={()=> {
                          setProcessCompra(QuitarElemento(processCompra,Number(id)))}}
                        underlayColor={colors.deleteUnderlay}
                        >
                        <Ionicons name="close" size={20} color='red' />
                        </TouchableHighlight>
                        </View>
                      </View>
                    ))}  
                    
                  </ScrollView>
          </View>

          <View style={styles.row}>
          <TouchableHighlight
                underlayColor={colors.optionUnderlay} 
                disabled={Off}
                  onPress={() => setModalVisible(true)}
                  style={[styles.button, Off && styles.buttonOff]}>
                  <Text style={styles.buttonText}>Agregar</Text>
              </TouchableHighlight>
          <TouchableHighlight
                underlayColor={colors.optionUnderlay}
                disabled={Off}
                  onPress={() => {
                    if (Object.keys(processCompra).length > 0){
                    setOff(true)
                    setProcessACompra(processCompra), setProcessCompra({})
                    }
                    else Alert.alert("Error", "Por favor, agregue los elementos que va a comprar.")
                  }}
                  style={[styles.button, Off && styles.buttonOff]}>
                  <Text style={styles.buttonText}>Enviar</Text>
              </TouchableHighlight>
              </View>
        <Text style={{  fontSize: 25, fontWeight: 'bold', marginVertical: 10 , color: colors.text}}>
        Total a gastar: {total}$
        </Text>

        <View style={[styles.hr, {marginTop: 15}]}></View>

        <Text style={{  fontSize: 25, fontWeight: 'bold', color: colors.text }}>
        Recepciones al almacén
        </Text>

        <View style={styles.row}>
          <Text style={styles.textRow}>Almacen afectado:</Text>
          <View style={{width:180}}>
          <Picker
            style={styles.picker}
            selectedValue={selectedStore}
            onValueChange={(itemValue) => setSelectedStore(itemValue)}
          >
        {Object.entries(almacenesMostrados || {}).length > 0 ? (
          Object.entries(almacenesMostrados)
          .sort((a, b) => {
             const nombreA = String(a[1][0]).toLowerCase();
            const nombreB = String(b[1][0]).toLowerCase();
            return nombreA.localeCompare(nombreB);
          })
          .map(([id, almacen]: [string, any]) => (
            <Picker.Item 
              style={styles.pickerItem} 
              key={id} 
              label={String(almacen[0])} 
              value={String(almacen[0])} 
            />
            ))
            ) : (
            <Picker.Item label="-" value="" />
            )}
          </Picker></View>
        </View>

        <View style={styles.table}>
              <View style={styles.tableRow}>
                  <View style={styles.headerCell}>
                      <Text style={styles.headerText}>Descripción</Text>
                      </View>
                  <View style={styles.headerCell}>
                      <Text style={styles.headerText}>Marca</Text>
                      </View>
                  <View style={[styles.headerCell, {flex: 0.7}]}>
                      <Text style={styles.headerText}>Costo</Text>
                      </View>
                  <View style={[styles.headerCell, {flex: 0.7}]}>
                      <Text style={styles.headerText}>A recibir</Text>
                      </View>
                      <View style={[styles.headerCell, {flex: 0.7}]}>
                      <Text style={styles.headerText}>N° Lote</Text>
                      </View>
                  </View>
                  <ScrollView style={styles.showcase} showsVerticalScrollIndicator={true}>

                    {Object.entries(processACompra).map(([id, [descripcion, marca, costo, cantidad, nlote]], index) => (
                    <View key={index} style={styles.row}>
                    <View style={styles.cell}>
                    <Text style={styles.text}>{descripcion}</Text>
                    </View>
                    <View style={styles.cell}>
                    <Text style={styles.text}>{marca}</Text>
                    </View>
                    <View style={[styles.cell, {flex: 0.7}]}>
                    <Text style={styles.text}>{Number(costo).toFixed(2)}$</Text>
                    </View>
                    <View style={[styles.cell, {flex: 0.7}]}>
                    <Text style={styles.text}>{cantidad}</Text>
                    </View>
                    <View style={[styles.cell, {flex: 0.7}]}>
                    <Text style={styles.text}>{nlote}</Text>
                    </View>
                      </View>
                    ))}
                    
                  </ScrollView>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'center',
            marginTop: 10}}>
          <TouchableHighlight
                underlayColor={colors.optionUnderlay}
                  onPress={() => {
                    if (Object.keys(processACompra).length > 0){
                      setReceive(true)
                    }
                    else Alert.alert("Error", "El almacén no tiene productos que recibir")}}
                  style={styles.button}>
                  <Text style={styles.buttonText}>Aplicar cambios</Text>
              </TouchableHighlight>
              </View>
              <Text style={{  fontSize: 25, fontWeight: 'bold', marginTop: 10 , marginBottom: 50, color: colors.text}}>
        Total a gastar: {totalA}$
        </Text>

        
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textRow:{
    fontSize: 20, 
    paddingVertical: 5, 
    fontWeight: 'bold',
    color: colors.text
  },
  button: {
    backgroundColor: colors.option,
    borderRadius: 20,
    width: 150,
    padding: 10,
  },
  buttonOff: {
    opacity: 0.8, 
  },
  buttonText: {
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
  },
  //Tabla estilos
  table: {
    paddingTop: 20,
    marginHorizontal: -18
  },
  tableRow: {flexDirection: 'row',},
  headerCell: {
    flex: 1, padding: 6,
    backgroundColor: colors.headerCell, 
    borderWidth: 1,
    borderColor: colors.border,
  },
  showcase: {
    backgroundColor: colors.secondary,
    maxHeight: 200, minHeight: 200
  },
  cell: {
    flex: 1, padding: 6,
    borderWidth: 1,
     borderColor: colors.border,
  },
  headerText: {
    fontWeight: 'bold',
    color: colors.text
  },
  //------------------
  picker: {
    height: 55,
    marginLeft: 10,
    flex: 1,
    backgroundColor: colors.input, color: colors.text,
  },
  pickerItem: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  //Modal estilos
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalView: {
    marginHorizontal: 18, marginVertical: 260,
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
  disabled: {
    opacity: 0.6
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
  }
  
});
