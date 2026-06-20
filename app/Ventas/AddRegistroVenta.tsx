import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, Image, Modal, TextInput, Alert } from 'react-native';
import Constants from 'expo-constants';
import type { AddRegistroVentaScreenProps, RegistroVenta } from './types';
import { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import { NumeroValido, totalVenta, AddElemento, QuitarElemento } from './backend';
import datosC from './datos.json'; import datos from '../datos.json'; import datosA from '../Almacenes/datos.json';

export default function AddRegistroVenta({ navigation }: AddRegistroVentaScreenProps) {

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

  //Constantes de pickers
  const [selectedCustomer, setSelectedCustomer] = useState(clientes[Object.keys(clientes)[0]]?.[0] || '');
  const [selectedBranch, setSelectedBranch] = useState(sucursales[Object.keys(sucursales)[0]]?.[0] || '');
  const [selectedStore, setSelectedStore] = useState(almacenes[Object.keys(almacenes)[0]]?.[0] || '');
  //Valores del picker producto
    const [selectedProduct, setSelectedProduct] = useState(productos[Object.keys(productos)[0]]?.[0] || '');
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

  //Desabilitar
  const [Off, setOff] = useState(false)

  //ID
  const [idP, setIdP] = useState(1);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

    <View style={styles.navigation}>
            <TouchableHighlight
            underlayColor={"#ddd"} style={styles.navIcons}
            onPress={() => {
              if (Object.values(processVenta).length > 0 || Object.values(processAVenta).length > 0){
                setConfirm(true)
              }
              else navigation.navigate("ControlVentas")
              }}
          >
            <Image source={getImage('B')} style={styles.navIconImage}/>
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
                    underlayColor={'#eee'}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Image source={getImage('x')} style={styles.lupaImage}/>
                    </TouchableHighlight>
                  </View>
      
                  <View>
                    <Text style={styles.modalTitle}>Agregar elementos</Text>
                  </View>
      
                  <View style={styles.hr}/>
                    <View style={styles.modalRow}>
                      <Text style={styles.modalLabel}>Elemento:</Text>
                      <View style={{width:180, height:55}}>
                        <Picker
                        style={styles.picker}
                        selectedValue={selectedProduct}
                        onValueChange={(itemValue) => {
                          setSelectedProduct(itemValue);
                        const productoEncontrado = Object.values(productos).find(
                        (producto: any) => producto[0] === itemValue
                        );
                         if (productoEncontrado) {
                        setProductMarca(productoEncontrado[1]);
                        setProductCosto(productoEncontrado[2]);
                         }
                       }}
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
                    underlayColor={'#82ff92'} style={styles.modalConfirm}
                      onPress={() => {
                          const validation = NumeroValido(cantidad);
                            if (!validation.isValid) {
                            Alert.alert('Error', validation.message);
                              return; 
                            }
                            setProcessVenta(AddElemento(processVenta,idP,String(selectedProduct),String(productMarca),Number(productCosto),Number(cantidad)))
                            setIdP(idP + 1); setCantidad('')
                            setModalVisible(!modalVisible)}}>
                      <Text>Agregar</Text>
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
                                        underlayColor={'#ddd'} style={[styles.modalRegret, {width: 50}]}
                                          onPress={() => setReceive(!Receive)}>
                                          <Text>NO</Text>
                                        </TouchableHighlight>
                                        <TouchableHighlight
                                        underlayColor={'#82ff92'} style={[styles.modalConfirm, {width: 50}]}
                                          onPress={() => {
                                            setConfirm(!Receive);
                                            navigation.navigate("ControlVentas")
                                          }}>
                                          <Text>SÍ</Text>
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
                                        underlayColor={'#ddd'} style={[styles.modalRegret, {width: 50}]}
                                          onPress={() => setConfirm(!Confirm)}>
                                          <Text>NO</Text>
                                        </TouchableHighlight>
                                        <TouchableHighlight
                                        underlayColor={'#ff9797'} style={[styles.modalDelete, {width: 50}]}
                                          onPress={() => {
                                            setConfirm(!Confirm);
                                            navigation.navigate("ControlVentas")
                                          }}>
                                          <Text>SÍ</Text>
                                        </TouchableHighlight>
                                      </View>
                          
                                    </View>
                                    </View>
                                  </Modal>

      {/*ScrollView*/}
      <ScrollView>
        <View style={styles.scroll}>
        <Text style={{  fontSize: 25, fontWeight: 'bold' }}>
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
            {Object.values(clientes || {}).length > 0 ? (
                Object.values(clientes).map((cliente: any, index) => (
                <Picker.Item 
                style={styles.pickerItem} 
                key={index} 
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
                    <View style={[styles.cell, {backgroundColor: '#e3e5ff'}]}>
                    <Text>{descripcion}</Text>
                    </View>
                    <View style={[styles.cell, {backgroundColor: '#e3e5ff'}]}>
                    <Text>{marca}</Text>
                    </View>
                    <View style={[styles.cell, {backgroundColor: '#e3e5ff', flex: 0.8}]}>
                    <Text>{Number(costo).toFixed(2)}$</Text>
                      </View>
                      <View style={[styles.cell, {backgroundColor: '#e3e5ff', flex: 0.8}]}>
                      <Text>{cantidad}</Text>
                      </View>
                      <View style={[styles.cell, {backgroundColor: '#e3e5ff', flex: 0.2}]}>
                          <TouchableHighlight
                          style={{height:20, width:20}}
                          onPress={()=> {
                            setProcessVenta(QuitarElemento(processVenta,Number(id)))}}
                        underlayColor={"#ffa6a6"}
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
                underlayColor={'#5460ff'}
                  disabled={Off}
                  onPress={() => setModalVisible(true)}
                  style={[styles.button, Off && styles.buttonOff]}>
                  <Text style={styles.buttonText}>Agregar</Text>
              </TouchableHighlight>
          <TouchableHighlight
                underlayColor={'#5460ff'}
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
        <Text style={{  fontSize: 25, fontWeight: 'bold', marginVertical:10 }}>
        Total: {total}$
        </Text>

        <View style={[styles.hr, {marginTop: 15}]}></View>

        <Text style={{  fontSize: 25, fontWeight: 'bold' }}>
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
                    <View style={[styles.cell, {backgroundColor: '#e3e5ff'}]}>
                    <Text>{descripcion}</Text>
                    </View>
                    <View style={[styles.cell, {backgroundColor: '#e3e5ff'}]}>
                    <Text>{marca}</Text>
                    </View>
                    <View style={[styles.cell, {backgroundColor: '#e3e5ff', flex: 0.8}]}>
                    <Text>{Number(costo).toFixed(2)}$</Text>
                      </View>
                      <View style={[styles.cell, {backgroundColor: '#e3e5ff', flex: 0.8}]}>
                      <Text>{cantidad}</Text>
                      </View>
                      </View>
                    ))}  
                  </ScrollView>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'center',
            marginTop: 10,}}>
          <TouchableHighlight
                underlayColor={'#5460ff'}
                  onPress={() => {
                    if(Object.values(processAVenta).length > 0){
                      setReceive(true)
                    }
                    else Alert.alert("Error", "El almacén no tiene productos que enviar")}}
                  style={styles.button}>
                  <Text style={styles.buttonText}>Aplicar cambios</Text>
              </TouchableHighlight>
              </View>
              <Text style={{  fontSize: 25, fontWeight: 'bold', marginTop:10, marginBottom: 50 }}>
        Total: {totalA}$
        </Text>
        
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  navigation: {
    backgroundColor: "white",
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
    backgroundColor: 'white',
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
  },
  button: {
    backgroundColor: '#656fff',
    width: 150,
    padding: 10,
    borderRadius: 20,
    elevation: 5,
    shadowColor: "#000", shadowOffset: {height: 2, width: 0,}
  },
  buttonOff: {
    opacity: 0.8, shadowOpacity: 0.8,
    backgroundColor: '#656fff',
    width: 150,
    padding: 10,
    borderRadius: 20,
    elevation: 5,
    shadowColor: "#000", shadowOffset: {height: 2, width: 0,}
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  //Tabla estilos
  table: {
    paddingTop: 20,
  },
  tableRow: {flexDirection: 'row',},
  headerCell: {
    flex: 1, padding: 6,
    backgroundColor: '#c2c6ff', 
    borderWidth: 1,
    borderColor: 'black',
  },
  showcase: {
    backgroundColor: '#e3e5ff',
    maxHeight: 200, minHeight: 200,
  },
  cell: {
    flex: 1, padding: 6,
    borderWidth: 1,
    backgroundColor: 'white',
  },
  headerText: {
    fontWeight: 'bold',
  },
  //------------------
  picker: {
    height: 55,
    marginLeft: 10,
    flex: 1,
    backgroundColor: '#eee', color: 'black',
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
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 30, fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
   hr:{
    height: 2, 
    backgroundColor: '#bbb', 
    marginBottom: 15,
  },
  input: {
    backgroundColor: 'white', color: 'black',
    borderWidth: 1, borderColor: 'black', 
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
    fontSize: 20, fontWeight: 'bold',
  },
  modalConfirm: {
    backgroundColor: '#62ff77',
    padding: 10,
    borderRadius: 20,
    width: 130,
    justifyContent: 'center', alignItems: 'center',
     elevation: 5,
    shadowColor: "#000", shadowOffset: {height: 2, width: 0,}
  },
  modalRegret: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 20,
    width: 130,
    justifyContent: 'center', alignItems: 'center',
     elevation: 5,
    shadowColor: "#000", shadowOffset: {height: 2, width: 0,}
  },
  modalDelete: {
    backgroundColor: '#ff8787',
    padding: 10,
    borderRadius: 20,
    width: 135,
    justifyContent: 'center', alignItems: 'center',
     elevation: 5,
    shadowColor: "#000", shadowOffset: {height: 2, width: 0,}
  }
  
});
