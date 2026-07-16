import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, Modal, TextInput, Alert } from 'react-native';
import Constants from 'expo-constants';
import type { AddRegistroGastoScreenProps, RegistroGasto } from './types';
import { useState } from 'react';
import { CostoValido, totalGasto, AddGasto, QuitarElemento } from './backend';
//import { agregarGasto } from './backend';
import { registrar } from './backend';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import datosP from './datos.json'; 

export default function AddRegistroGasto({ navigation }: AddRegistroGastoScreenProps) {

  const { theme, colors } = useTheme();
      const styles = getStyles(colors);

  //Constantes de inputs
  const [costo, setCosto] = useState('');
  const [gasto, setGasto] = useState('');

  //Constantes de modales
  const [modalVisible, setModalVisible] = useState(false);
  const [Confirm, setConfirm] = useState(false);
  const [Receive, setReceive] = useState(false);

  //Constantes de JSON
  const [processGasto, setProcessGasto] = useState<RegistroGasto>({})
  //JSONs de datos
  //const [Gastos, setGastos] = useState<Record<string, any>>({});
  const [Gastos, setGastos] = useState(datosP.CONTROL_GASTOS);
  const [GastosOG, setGastosOG] = useState<Record<string, any>>({});

  //Constantes extras
  const total = totalGasto(processGasto)
  
  const hoy = new Date();
  const hoyStr = `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, '0')}-${String(hoy.getDate()).padStart(2, '0')}`;

  //ID
  const [idP, setIdP] = useState(1);

  /*const handleAgregar = async () => {
    try {
      const response = await agregarGasto();
      if (response.success) {
        // Recargar compras
        const totalNum = Number(total)
        const data = await obtenerGastos(hoyStr, totalNum, gasto);
        const comprasObj: Record<string, any> = {};
        if (Array.isArray(data)) {
          data.forEach((item: any, index: number) => {
            comprasObj[index + 1] = [item.hoyStr, item.totalANum, item.gasto];
          });
        }
        setCompras(comprasObj);
        setComprasOG(comprasObj);
        setReceive(false);
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'No se pudo registrar el gasto');
    }
  };*/

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
            <Ionicons name="arrow-back" size={30} color={colors.text} />
          </TouchableHighlight>
        </View>

      {/* Modal para agregar gastos */}
          <Modal
                animationType="fade"
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
                    <Ionicons name="close" size={30} color={colors.text} />
                    </TouchableHighlight>
                  </View>
      
                  <View>
                    <Text style={styles.modalTitle}>Agregar gastos</Text>
                  </View>
                    <View style={styles.modalRow}>
                                          <Text style={styles.modalLabel}>Gasto:</Text>
                                          <TextInput style={[styles.input, {width: 200}]}
                                                    value={gasto} onChangeText={setGasto}></TextInput>
                                        </View>
                    <View style={styles.modalRow}>
                                          <Text style={styles.modalLabel}>Costo:</Text>
                                          <TextInput style={styles.input}
                                                    value={costo} onChangeText={setCosto}
                                                    keyboardType='numeric'></TextInput>
                                        </View>
      
                  <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <TouchableHighlight
                    underlayColor={colors.confirmUnderlay} style={styles.modalConfirm}
                      onPress={() => {
                        const validation = CostoValido(costo);
                      if (!validation.isValid) {
                      Alert.alert('Error', validation.message);
                      return;
                        }
                            setProcessGasto(AddGasto(processGasto,idP,String(gasto),Number(costo)))
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
                                    animationType="fade"
                                    transparent={true}
                                    visible={Receive}
                                    onRequestClose={() => {
                                      setConfirm(!Receive);
                                    }}>
                                    <View style={styles.modalOverlay}>
                                    <View style={[styles.modalView, {marginVertical: 390}]}>
                          
                                      <View>
                                        <Text style={styles.modalTitle}>¿Confirmar gastos?</Text>
                                      </View>
                          
                                      <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                                        <TouchableHighlight
                                        underlayColor={colors.regretUnderlay} style={styles.modalRegret}
                                          onPress={() => setReceive(!Receive)}>
                                          <Text style={[styles.text, {fontSize: 20}]}>NO</Text>
                                        </TouchableHighlight>
                                        <TouchableHighlight
                                        underlayColor={colors.confirmUnderlay} style={styles.modalConfirm}
                                          onPress={() => {
                                            setConfirm(!Receive);
                                            setIdP(Object.keys(Gastos).length + 1)
                                            setGastos(registrar(Gastos,idP,hoyStr,Number(total),gasto))
                                            navigation.navigate("ControlGastos")
                                          }}>
                                          <Text style={[styles.text, {fontSize: 20}]}>SÍ</Text>
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
                                    <View style={[styles.modalView, {marginVertical: 390}]}>
                          
                                      <View>
                                        <Text style={styles.modalTitle}>¿Salir sin guardar?</Text>
                                      </View>
                          
                                      <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                                        <TouchableHighlight
                                        underlayColor={colors.regretUnderlay} style={styles.modalRegret}
                                          onPress={() => setConfirm(!Confirm)}>
                                          <Text style={[styles.text, {fontSize: 20}]}>NO</Text>
                                        </TouchableHighlight>
                                        <TouchableHighlight
                                        underlayColor={colors.deleteUnderlay} style={styles.modalDelete}
                                          onPress={() => {
                                            setConfirm(!Confirm);
                                            navigation.navigate("ControlGastos")
                                          }}>
                                          <Text style={[styles.text, {fontSize: 20}]}>SÍ</Text>
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
        
        <View style={styles.table}>
          <ScrollView style={styles.showcase} showsVerticalScrollIndicator={true}>
              <View style={styles.tableRow}>
                  <View style={styles.cell}>
                      <Text style={styles.text}>Descripción</Text>
                      </View>
                  <View style={[styles.cell, {flex: 0.8}]}>
                      <Text style={styles.text}>Costo</Text>
                      </View>
                  </View>

                    {Object.entries(processGasto).map(([id, [descripcion, costo]], index) => (
                    <View key={index} style={styles.row}>
                    <View style={styles.cell}>
                    <Text style={styles.text}>{descripcion}</Text>
                    </View>
                    <View style={[styles.cell, { flex: 0.5}]}>
                    <Text style={styles.text}>{Number(costo).toFixed(2)}$</Text>
                    </View>
                    <View style={[styles.cell, { flex: 0.15}]}>
                        <TouchableHighlight
                        style={{height:20, width:20}}
                        onPress={()=> {
                          setProcessGasto(QuitarElemento(processGasto,Number(id)))}}
                        underlayColor={colors.deleteUnderlay}
                        >
                        <Ionicons name="close" size={25} color='red' />
                        </TouchableHighlight>
                        </View>
                      </View>
                    ))}  
                  </ScrollView>
          </View>

          <View style={styles.row}>
          <TouchableHighlight
                underlayColor={colors.optionUnderlay} 
                  onPress={() => {
                    setCosto(''), setGasto(''); 
                    setModalVisible(true)}}
                  style={styles.button}>
                  <Text style={styles.text}>Agregar</Text>
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
                  <Text style={styles.text}>Confirmar</Text>
              </TouchableHighlight>
              </View>
        <Text style={[styles.textRow, {marginBottom: 50}]}>
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
    fontSize: 20, 
    paddingVertical: 5, 
    color: colors.text
  },
  button: {
    backgroundColor: colors.option,
    borderRadius: 20, padding: 10,
  },
  //Tabla estilos
  table: {
    paddingTop: 20,
    marginHorizontal: 18
  },
  tableRow: {flexDirection: 'row',},
  showcase: {
    backgroundColor: colors.secondary,
    maxHeight: 200, minHeight: 200
  },
  cell: { flex: 1, padding: 6,},
  //Modal estilos
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
 modalView: {
    marginHorizontal: 18, marginVertical: 275,
    backgroundColor: colors.modalBackground,
    borderRadius: 20, padding: 20,
  },
  modalTitle: {
    fontSize: 30, fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: colors.text
  },
  input: {
    backgroundColor: colors.scrollBackground, color: colors.text,
    height: 40, width: 120,
    marginTop: 10,
  },
    modalRow:{
    flexDirection: 'row', justifyContent: 'space-evenly', 
    marginBottom: 18,
  },
 modalLabel:{
    fontSize: 20, color: colors.text
  },
  modalConfirm: {
    backgroundColor: colors.confirm,
    padding: 10, borderRadius: 20
  },
  modalRegret: {
    backgroundColor: colors.regret,
    padding: 10, borderRadius: 20,
  },
  modalDelete: {
    backgroundColor: colors.delete,
    padding: 10, borderRadius: 20,
  }
});
