import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, Modal, TextInput, Alert } from 'react-native';
import Constants from 'expo-constants';
import type { AddRegistroVentaScreenProps, RegistroVenta } from './types';
import { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import { NumeroValido, totalVenta, AddElemento, QuitarElemento, registrar, afectarAlmacen } from './backend';
import {useTheme} from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

import datosC from './datos.json'; import datos from '../datos.json'; import datosA from '../Almacenes/datos.json';

export default function AddRegistroVenta({ navigation }: AddRegistroVentaScreenProps) {

  const { theme, colors } = useTheme();
    const styles = getStyles(colors);

  //Constantes de modales
  const [modalVisible, setModalVisible] = useState(false);
  const [Confirm, setConfirm] = useState(false);
  const [Receive, setReceive] = useState(false);

  //Constante de input
  const [cantidad, setCantidad] = useState('');

  //Constantes de JSON
  const [processVenta, setProcessVenta] = useState<RegistroVenta>({});
  const [processAVenta, setProcessAVenta] = useState<RegistroVenta>({});
  //JSONs de datos
  const clientes: Record<string, any> = datosC.CLIENTES || {};
  const sucursales: Record<string, any> = datos.SUCURSALES || {};
  const productos = Object.fromEntries(
  Object.entries(datos.LISTA_PRECIOS || {}).filter(
      ([id, data]) => data[4] != "gasto"));
  const almacenes: Record<string, any> = datosA.ALMACENES || {};
  const [almacenesMostrados, setAlmacenesMostrados] = useState(almacenes)
  const [controlVenta, setControlVenta] = useState(datosC.CONTROL_VENTAS);
  const [existencias, setExistencias] = useState(datosA.EXISTENCIAS_ALMACEN);

  //Constantes de pickers
  const [selectedCustomer, setSelectedCustomer] = useState(clientes[Object.keys(clientes)[0]]?.[0] || '');
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

  //Constantes extra
  const total = totalVenta(processVenta)
  const totalA = totalVenta(processAVenta)
  const hoy = new Date();
  const hoyStr = `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, '0')}-${String(hoy.getDate()).padStart(2, '0')}`;

  //Desabilitar
  const [Off, setOff] = useState(false)

  //ID
  const [idP, setIdP] = useState(1);

  return (
    <View style={styles.container}>
      <StatusBar style={theme === 'oscuro' ? 'light' : 'dark'}  />

    <View style={styles.navigation}>
            <TouchableHighlight
            underlayColor={colors.navIconUnderlay} style={styles.navIcons}
            onPress={() => {
              if (Object.values(processVenta).length > 0 || Object.values(processAVenta).length > 0){
                setConfirm(true)
              }
              else navigation.navigate("ControlVentas")
              }}
          >
            <Ionicons name="arrow-back" size={25} color={colors.text} />
          </TouchableHighlight>
        </View>

      {/* Modal para agregar elementos a la venta */}
          <Modal
                animationType="slide"
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
                    <Text style={styles.modalTitle}>Agregar elementos</Text>
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
                        const productoSeleccionado = (productos as any)[selectedProduct];
                        if (productoSeleccionado) {
                        setProcessVenta(AddElemento(
                        processVenta,
                        idP,
                        String(productoSeleccionado[0]),  // descripción
                        String(productMarca),  // marca
                        Number(productCosto),  // costo
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

      {/* Modal para vender productos */}
                              <Modal
                                    animationType="slide"
                                    transparent={true}
                                    visible={Receive}
                                    onRequestClose={() => {
                                      setConfirm(!Receive);
                                    }}>
                                    <View style={styles.modalOverlay}>
                                    <View style={[styles.modalView, {marginVertical: 360}]}>
                          
                                      <View>
                                        <Text style={styles.modalTitle}>¿Enviar los artículos desde el almacén?</Text>
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
                                            setIdP(Object.keys(controlVenta).length + 1)
                                            setControlVenta(registrar(controlVenta,idP,hoyStr,Number(totalA),selectedCustomer))
                                            afectarAlmacen(existencias, processAVenta, selectedStore, selectedBranch)
                                            navigation.navigate("ControlVentas")
                                          }}>
                                          <Text style={styles.text}>SÍ</Text>
                                        </TouchableHighlight>
                                      </View>
                          
                                    </View>
                                    </View>
                                  </Modal>

      {/* Modal para confirmar salida */}
                              <Modal
                                    animationType="slide"
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
                                            navigation.navigate("ControlVentas")
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
        Realizar venta
        </Text>

        <View style={[styles.row, {marginBottom: 12}]}>
          <Text style={styles.textRow}>Cliente:</Text>
          <View style={{width:150}}>
          <Picker
            style={styles.picker}
            selectedValue={selectedCustomer}
            onValueChange={(itemValue) => setSelectedCustomer(itemValue)}
          >
            {Object.entries(clientes || {}).length > 0 ? (
                Object.entries(clientes)
                .sort((a, b) => {
                const nombreA = String(a[1][0]).toLowerCase();
                const nombreB = String(b[1][0]).toLowerCase();
                return nombreA.localeCompare(nombreB);
                })
                .map(([id, cliente]: [string, any]) => (
                <Picker.Item 
                style={styles.pickerItem} 
                key={id} 
                label={String(cliente[0])} 
                value={String(cliente[0])} 
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
                  <View style={[styles.headerCell, {flex: 0.8}]}>
                      <Text style={styles.headerText}>Costo</Text>
                      </View>
                  <View style={[styles.headerCell, {flex: 0.8}]}>
                      <Text style={styles.headerText}>Cantidad</Text>
                      </View>
                  <View style={[styles.headerCell, {flex: 0.2}]}>
                      </View>
                  </View>
                  <ScrollView style={styles.showcase} showsVerticalScrollIndicator={true}>
                    
                    {Object.entries(processVenta).map(([id, [descripcion, marca, costo, cantidad]], index) => (
                    <View key={index} style={styles.row}>
                    <View style={styles.cell}>
                    <Text style={styles.text}>{descripcion}</Text>
                    </View>
                    <View style={styles.cell}>
                    <Text style={styles.text}>{marca}</Text>
                    </View>
                    <View style={[styles.cell, {flex: 0.8}]}>
                    <Text style={styles.text}>{Number(costo).toFixed(2)}$</Text>
                      </View>
                      <View style={[styles.cell, {flex: 0.8}]}>
                      <Text style={styles.text}>{cantidad}</Text>
                      </View>
                      <View style={[styles.cell, {flex: 0.2}]}>
                          <TouchableHighlight
                          style={{height:20, width:20}}
                          onPress={()=> {
                            setProcessVenta(QuitarElemento(processVenta,Number(id)))}}
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
                    if (Object.keys(processVenta).length > 0){
                    setOff(true)
                    setProcessAVenta(processVenta), setProcessVenta({})
                    }
                    else Alert.alert("Error", "Por favor, agregue los elementos que va a vender.")
                  }}
                  style={[styles.button, Off && styles.buttonOff]}>
                  <Text style={styles.buttonText}>Enviar</Text>
              </TouchableHighlight>
              </View>
        <Text style={{  fontSize: 25, fontWeight: 'bold', marginVertical:10, color: colors.text }}>
        Total a ganar: {total}$
        </Text>

        <View style={[styles.hr, {marginTop: 15}]}></View>

        <Text style={{  fontSize: 25, fontWeight: 'bold' , color: colors.text}}>
        Envios desde el almacén
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
                  <View style={[styles.headerCell , {flex: 0.8}]}>
                      <Text style={styles.headerText}>Costo</Text>
                      </View>
                  <View style={[styles.headerCell , {flex: 0.8}]}>
                      <Text style={styles.headerText}>A recibir</Text>
                      </View>
                  </View>
                  <ScrollView style={styles.showcase}>
                   {Object.entries(processAVenta).map(([id, [descripcion, marca, costo, cantidad]], index) => (
                    <View key={index} style={styles.row}>
                    <View style={styles.cell}>
                    <Text style={styles.text}>{descripcion}</Text>
                    </View>
                    <View style={styles.cell}>
                    <Text style={styles.text}>{marca}</Text>
                    </View>
                    <View style={[styles.cell, { flex: 0.8}]}>
                    <Text style={styles.text}>{Number(costo).toFixed(2)}$</Text>
                      </View>
                      <View style={[styles.cell, { flex: 0.8}]}>
                      <Text style={styles.text}>{cantidad}</Text>
                      </View>
                      </View>
                    ))}  
                  </ScrollView>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'center',
            marginTop: 10,}}>
          <TouchableHighlight
                underlayColor={colors.optionUnderlay}
                  onPress={() => {
                    if(Object.values(processAVenta).length > 0){
                      setReceive(true)
                    }
                    else Alert.alert("Error", "El almacén no tiene productos que enviar")}}
                  style={styles.button}>
                  <Text style={styles.buttonText}>Aplicar cambios</Text>
              </TouchableHighlight>
              </View>
              <Text style={{  fontSize: 25, fontWeight: 'bold', marginTop:10, marginBottom: 50, color: colors.text }}>
        Total: {totalA}$
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
    color: colors.text,
  },
  button: {
    backgroundColor: colors.primary,
    width: 150,
    padding: 10,
    borderRadius: 20,
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
    maxHeight: 200, minHeight: 200,
  },
  cell: {
    flex: 1, padding: 6,
    borderWidth: 1,
    backgroundColor: colors.secondary,
    borderColor: colors.border,
  },
  headerText: {
    fontWeight: 'bold',
    color: colors.text,
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
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  modalView: {
    marginHorizontal: 30, marginVertical: 290,
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
    color: colors.text,
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
    fontSize: 20, fontWeight: 'bold', color: colors.text, 
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
