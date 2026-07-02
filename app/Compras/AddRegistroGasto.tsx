import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, Image, Modal, TextInput, Alert } from 'react-native';
import Constants from 'expo-constants';
import type { AddRegistroGastoScreenProps, RegistroGasto } from './types';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { totalGasto, AddGasto, QuitarElemento, registrar } from './backend';
import { useTheme } from '../../context/ThemeContext';
import datosP from './datos.json'; import datos from '../datos.json';

export default function AddRegistroGasto({ navigation }: AddRegistroGastoScreenProps) {

  const { theme, colors } = useTheme();
      const styles = getStyles(colors);

  const getImage = (nombre: any) => {
    switch (nombre){
      case 'B': return require('../../assets/B.png');
      case 'xr': return require('../../assets/xred.png');
      default: return require('../../assets/x.png');
   }
  }

  //Constantes de inputs
  const [costo, setCosto] = useState('');

  //Constantes de modales
  const [modalVisible, setModalVisible] = useState(false);
  const [Confirm, setConfirm] = useState(false);
  const [Receive, setReceive] = useState(false);

  //Constantes de JSON
  const [processGasto, setProcessGasto] = useState<RegistroGasto>({})
  //JSONs de datos
  const proveedores: Record<string, any> = (datosP.PROVEEDORES || {});
  const gastos = Object.fromEntries(
  Object.entries(datos.LISTA_PRECIOS || {}).filter(
      ([id, data]) => data[4] === "gasto"));
  const [controlGasto, setControlGasto] = useState(datosP.CONTROL_GASTOS);

  //Constantes de pickers
  const [selectedProvider, setSelectedProvider] = useState(proveedores[Object.keys(proveedores)[0]]?.[0] || '');
  const [selectedGasto, setSelectedGasto] = useState(gastos[Object.keys(gastos)[0]]?.[0] || '');

  //Constantes extras
  const total = totalGasto(processGasto)
  
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
              if (Object.values(processGasto).length > 0){
              setConfirm(true)
              }
              else navigation.navigate("ControlGastos")
            }}
          >
            <Image source={getImage('B')} style={styles.navIconImage}/>
          </TouchableHighlight>
        </View>

      {/* Modal para agregar gastos */}
          <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  setModalVisible(!modalVisible);
                }}>
                <View style={styles.modalOverlay}>
                <View style={[styles.modalView, {marginVertical: 290}]}>
      
                  <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <TouchableHighlight
                    style={{height: 30, width: 30, alignItems: "flex-end"}}
                    underlayColor={colors.scrollBackground}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Image source={getImage('x')} style={styles.lupaImage}/>
                    </TouchableHighlight>
                  </View>
      
                  <View>
                    <Text style={styles.modalTitle}>Agregar gastos</Text>
                  </View>
      
                  <View style={styles.hr}/>
                    <View style={styles.modalRow}>
                      <Text style={styles.modalLabel}>Gasto:</Text>
                      <View style={{width:180, height:55}}>
                        <Picker
                        style={[styles.picker, {backgroundColor: colors.scrollBackground}]}
                        selectedValue={selectedGasto}
                        onValueChange={(itemValue) => setSelectedGasto(itemValue)}
                        >
                        {Object.entries(gastos || {}).length > 0 ? (
                              Object.entries(gastos)
                              .sort((a, b) => {
                                const nombreA = String(a[1]).toLowerCase();
                                const nombreB = String(b[1]).toLowerCase();
                                 return nombreA.localeCompare(nombreB);
                              })
                              .map(([id, gasto]: [string, any]) => (
                              <Picker.Item 
                              style={styles.pickerItem} 
                              key={id} 
                              label={String(gasto[0])} 
                              value={String(gasto[0])} 
                              />
                              ))
                              ) : (
                              <Picker.Item label="-" value="" />
                              )}
                        </Picker></View>
                    </View>
                    <View style={styles.modalRow}>
                                          <Text style={styles.modalLabel}>Costo:</Text>
                                          <TextInput style={styles.input}
                                                    value={costo} onChangeText={setCosto}
                                                    keyboardType='numeric'></TextInput>
                                        </View>
                                      <View style={styles.hr}/>
      
                  <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <TouchableHighlight
                    underlayColor={colors.confirmUnderlay} style={styles.modalConfirm}
                      onPress={() => {
                            setProcessGasto(AddGasto(processGasto,idP,String(selectedGasto),Number(costo)))
                            setIdP(idP + 1); 
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
                                    <View style={[styles.modalView, {marginVertical: 380}]}>
                          
                                      <View>
                                        <Text style={styles.modalTitle}>¿Confirmar gasto?</Text>
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
                                            setIdP(Object.keys(controlGasto).length + 1)
                                            setControlGasto(registrar(controlGasto,idP,hoyStr,Number(total),selectedProvider))
                                            navigation.navigate("ControlGastos")
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
                                            navigation.navigate("ControlGastos")
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
        Registrar gasto
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
        

        <View style={styles.table}>
              <View style={styles.tableRow}>
                  <View style={styles.headerCell}>
                      <Text style={styles.headerText}>Descripción</Text>
                      </View>
                  <View style={styles.headerCell}>
                      <Text style={styles.headerText}>Costo</Text>
                      </View>
                  <View style={[styles.headerCell, {flex: 0.15}]}>
                      </View>
                  </View>
                  <ScrollView style={styles.showcase} showsVerticalScrollIndicator={true}>

                    {Object.entries(processGasto).map(([id, [descripcion, costo]], index) => (
                    <View key={index} style={styles.row}>
                    <View style={styles.cell}>
                    <Text style={styles.text}>{descripcion}</Text>
                    </View>
                    <View style={styles.cell}>
                    <Text style={styles.text}>{Number(costo).toFixed(2)}$</Text>
                    </View>
                    <View style={[styles.cell, { flex: 0.15}]}>
                        <TouchableHighlight
                        style={{height:20, width:20}}
                        onPress={()=> {
                          setProcessGasto(QuitarElemento(processGasto,Number(id)))}}
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
                underlayColor={colors.optionUnderlay} 
                  onPress={() => setModalVisible(true)}
                  style={styles.button}>
                  <Text style={styles.buttonText}>Agregar</Text>
              </TouchableHighlight>
          <TouchableHighlight
                underlayColor={colors.optionUnderlay}
                  onPress={() => {
                    if (Object.keys(processGasto).length > 0){
                      setReceive(true)
                    }
                    else Alert.alert("Error","Por favor, inserte los gastos que va a efectuar.")
                  }}
                  style={styles.button}>
                  <Text style={styles.buttonText}>Confirmar</Text>
              </TouchableHighlight>
              </View>
        <Text style={{  fontSize: 25, fontWeight: 'bold', marginVertical: 10, color: colors.text }}>
        Total a gastar: {total}$
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
    backgroundColor: colors.option,
    borderRadius: 20,
    width: 150,
    padding: 10,
    elevation: 5,
    shadowColor: "#000", shadowOffset: {height: 2, width: 0,}
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
    maxHeight: 200, minHeight: 200
  },
  cell: {
    flex: 1, padding: 6,
    borderWidth: 1,
    backgroundColor: colors.secondary,
    borderColor: colors.border
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
    fontSize: 20, fontWeight: 'bold',
    color: colors.text
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
