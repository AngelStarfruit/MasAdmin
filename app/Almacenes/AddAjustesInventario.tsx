import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, Image, Modal, TextInput, Alert } from 'react-native';
import Constants from 'expo-constants';
import type { AddAjustesInventarioScreenProps, AjusteInventario } from './types';
import { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import { NumeroValido, AddElemento, QuitarElemento, registrar } from './backend';
import { useTheme } from '../../context/ThemeContext';
import datos from '../datos.json'; import datosA from './datos.json';

export default function AddRegistroCompra({ navigation }: AddAjustesInventarioScreenProps) {

  const { theme, colors } = useTheme();
    const styles = getStyles(colors);

  const getImage = (nombre: any) => {
    switch (nombre){
      case 'B': return require('../../assets/B.png');
      case 'xr': return require('../../assets/xred.png');
      default: return require('../../assets/x.png');
   }
  }

  //Constantes de modales
  const [modalVisible, setModalVisible] = useState(false);
  const [Confirm, setConfirm] = useState(false);
  const [Receive, setReceive] = useState(false);

  //Constantes de inputs
  const [cantidad, setCantidad] = useState('');

   //JSON para efectuar ajustes de inventario
  const [processAjusteInventario, setProcessAjusteInventario] = useState<AjusteInventario>({});
  //JSONs de datos
  const sucursales: Record<string, any> = (datos.SUCURSALES || {})
  const almacenes: Record<string, any> = (datosA.ALMACENES || {})
  const [almacenesMostrados, setAlmacenesMostrados] = useState(almacenes);
  const productos = Object.fromEntries(
  Object.entries(datos.LISTA_PRECIOS || {}).filter(
      ([id, data]) => data[4] === "producto"));
  const [controlAjusteInventario, setControlAjusteInventario] = useState(datosA.AJUSTES_INVENTARIO);

    //Constantes de pickers
  const [selectedStore, setSelectedStore] = useState(almacenes[Object.keys(almacenes)[0]]?.[0] || '');
  const [selectedBranch, setSelectedBranch] = useState(sucursales[Object.keys(sucursales)[0]]?.[0] || '');
  const [selectedOperation, setSelectedOperation] = useState('entrada');
  const [selectedProduct, setSelectedProduct] = useState(productos[Object.keys(productos)[0]]?.[0] || '');

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
  const hoy = new Date();
  const hoyStr = `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, '0')}-${String(hoy.getDate()).padStart(2, '0')}`;

   //ID
  const [idP, setIdP] = useState(1);

  return (
    <View style={styles.container}>
      <StatusBar style={theme === 'oscuro' ? 'light' : 'dark'}  />

    <View style={styles.navigation}>
            <TouchableHighlight
            underlayColor={colors.navIconUnderlay} style={styles.navIcons}
            onPress={() => {
              if (Object.values(processAjusteInventario).length > 0){
              setConfirm(true)
              }
              else navigation.navigate("AjustesInventario")
            }}
          >
            <Image source={getImage('B')} style={styles.navIconImage}/>
          </TouchableHighlight>
        </View>

      {/* Modal para agregar elementos a la compra */}
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
                    <Image source={getImage('x')} style={styles.lupaImage}/>
                    </TouchableHighlight>
                  </View>
      
                  <View>
                    <Text style={styles.modalTitle}>Agregar productos</Text>
                  </View>
      
                  <View style={styles.hr}/>
                    <View style={styles.modalRow}>
                      <Text style={styles.modalLabel}>Producto:</Text>
                      <View style={{width:150, height:55}}>
                        <Picker
                        style={[styles.picker, {backgroundColor: colors.scrollBackground}]}
                        selectedValue={selectedProduct}
                        onValueChange={(itemValue) => setSelectedProduct(itemValue)}
                        >                
                        {Object.values(productos || {}).length > 0 ? (
                              Object.values(productos).map((producto: any, index) => (
                             <Picker.Item 
                              style={styles.pickerItem} 
                              key={index} 
                              label={String(producto[0])} 
                              value={String(producto[0])} 
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
                      setProcessAjusteInventario(AddElemento(processAjusteInventario, idP, String(selectedProduct), Number(cantidad)))
                      setIdP(idP + 1); setCantidad('')
                      setModalVisible(!modalVisible)}}>
                      <Text style={styles.text}>Agregar</Text>
                    </TouchableHighlight>
                  </View>
      
                </View>
                </View>
              </Modal>

      {/* Modal para recibir productos */}
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
                                        <Text style={styles.modalTitle}>¿Confirmar cambio en el almacén?</Text>
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
                                            setIdP(Object.keys(controlAjusteInventario).length + 1)
                                            setControlAjusteInventario(registrar(controlAjusteInventario,idP,selectedStore,selectedOperation,hoyStr))
                                            navigation.navigate("AjustesInventario")
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
                                            navigation.navigate("AjustesInventario")
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
        <Text style={{  fontSize: 25, fontWeight: 'bold', color: colors.text}}>
        Realizar ajuste
        </Text>

        <View style={[styles.row, {marginBottom:12}]}>
          <Text style={styles.textRow}>Sucursal:</Text>
          <View style={{width:180}}>
          <Picker
            style={styles.picker}
            selectedValue={selectedBranch}
            onValueChange={(itemValue) => setSelectedBranch(itemValue)}
          >
            {Object.values(sucursales || {}).length > 0 ? (
                Object.values(sucursales).map((sucursal: any, index) => (
                <Picker.Item 
                style={styles.pickerItem} 
                key={index} 
                label={String(sucursal[0])} 
                value={String(sucursal[0])} 
                  />
                  ))
                  ) : (
                  <Picker.Item label="-" value="" />
                )}
          </Picker></View>
        </View>
        <View style={[styles.row, {marginBottom:12}]}>
          <Text style={styles.textRow}>Almacén:</Text>
          <View style={{width:180}}>
          <Picker
            style={styles.picker}
            selectedValue={selectedStore}
            onValueChange={(itemValue) => setSelectedStore(itemValue)}
          >
            {Object.values(almacenesMostrados || {}).length > 0 ? (
                Object.values(almacenesMostrados).map((almacen: any, index) => (
                <Picker.Item 
                style={styles.pickerItem} 
                key={index} 
                label={String(almacen[0])} 
                value={String(almacen[0])} 
                  />
                  ))
                  ) : (
                  <Picker.Item label="-" value="" />
                )}
          </Picker></View>
        </View>
        <View style={styles.row}>
          <Text style={styles.textRow}>Tipo de ajuste:</Text>
          <View style={{width:150}}>
          <Picker
            style={styles.picker}
            selectedValue={selectedOperation}
            onValueChange={(itemValue) => setSelectedOperation(itemValue)}
          >
            <Picker.Item style={styles.pickerItem} label="ENTRADA" value="entrada" />
            <Picker.Item style={styles.pickerItem} label="SALIDA" value="salida" />
          </Picker></View>
        </View>

        <View style={styles.table}>
              <View style={styles.tableRow}>
                  <View style={styles.headerCell}>
                      <Text style={styles.headerText}>Descripción</Text>
                      </View>
                  <View style={styles.headerCell}>
                      <Text style={styles.headerText}>Cantidad</Text>
                      </View>
                  <View style={[styles.headerCell, {flex: 0.15}]}>
                      </View>
                  </View>
                  <ScrollView style={styles.showcase} showsVerticalScrollIndicator={true}>

                  
                  {Object.entries(processAjusteInventario).map(([id, [descripcion, cantidad]], index) => (
                    <View key={index} style={styles.row}>
                    <View style={styles.cell}>
                        <Text style={styles.text}>{descripcion}</Text>
                        </View>
                        <View style={styles.cell}>
                        <Text style={styles.text}>{cantidad}</Text>
                        </View>
                          <View style={[styles.cell, {flex: 0.15}]}>
                            <TouchableHighlight
                            style={{height:25, width:25}}
                             onPress={()=> {
                              setProcessAjusteInventario(QuitarElemento(processAjusteInventario, Number(id)))
                            }}
                             underlayColor={colors.deleteUnderlay}
                            >
                            <Image source={getImage('xr')} style={styles.navIconImage} />
                            </TouchableHighlight>
                            </View>
                        </View>
                      ))} 

                  </ScrollView>
          </View>

          <View style={styles.row}>
          <TouchableHighlight
                underlayColor={colors.primaryUnderlay}
                  onPress={() => setModalVisible(true)}
                  style={styles.button}>
                  <Text style={styles.buttonText}>Agregar</Text>
              </TouchableHighlight>
          <TouchableHighlight
                underlayColor={colors.primaryUnderlay}
                  onPress={() => {
                    if(Object.keys(processAjusteInventario).length > 0){
                      setReceive(true);
                    }
                    else Alert.alert("Error","Por favor, seleccione al menos un producto")}}
                  style={styles.button}>
                  <Text style={styles.buttonText}>Afectar inventario</Text>
              </TouchableHighlight>
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
  text: {
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
  navIconImage: {
    width: 20, height: 20,
  },
  lupaImage: {
    width: 15, height: 15,
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
    backgroundColor: colors.primary,
    width: 150,
    padding: 10,
    borderRadius: 20,
    elevation: 5,
    shadowColor: "#000", shadowOffset: {height: 2, width: 0,}
  },
  buttonText: {
    fontWeight: 'bold',
    color: colors.background,
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
    borderColor: colors.border
  },
  headerText: {
    fontWeight: 'bold', color: colors.text
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
     elevation: 5,
    shadowColor: "#000", shadowOffset: {height: 2, width: 0,}
  },
  modalRegret: {
    backgroundColor: colors.regret,
    padding: 10,
    borderRadius: 20,
    width: 130,
    justifyContent: 'center', alignItems: 'center',
     elevation: 5,
    shadowColor: "#000", shadowOffset: {height: 2, width: 0,}
  },
  modalDelete: {
    backgroundColor: colors.delete,
    padding: 10,
    borderRadius: 20,
    width: 135,
    justifyContent: 'center', alignItems: 'center',
     elevation: 5,
    shadowColor: "#000", shadowOffset: {height: 2, width: 0,}
  }
  
});
