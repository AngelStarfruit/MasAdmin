import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, Image, TextInput, Modal, Alert} from 'react-native';
import Constants from 'expo-constants';
import { useState } from 'react';
import { NoEmojis, Validar, QuitarElemento, AddSucursal } from './backend';
import type { SucursalesScreenProps, FormerJSON } from './types';
import { useTheme } from '../context/ThemeContext';
import datos from './datos.json';

export default function Sucursales({navigation}: SucursalesScreenProps) {

   const { theme, colors } = useTheme();
    const styles = getStyles(colors);
  
  const getImage = (nombre: any) => {
  switch(nombre) {
    case 'C': return require('../assets/C.png');
    case 'V': return require('../assets/V.png');
    case 'S': return require('../assets/S.png');
    case 'D': return require('../assets/D.png');
    case 'A': return require('../assets/A.png');
    case '$': return require('../assets/$.png');
    case 'x': return require('../assets/x.png');
    default: return require('../assets/lupa.png');
    }
  }

  //Inputs
  const [sucursal, setSucursal] = useState('');
  const [telefono, setTelefono] = useState('');
  const [query, setQuery] = useState('');

   //JSON
  const [sucursales, setSucursales] = useState<FormerJSON>(datos.SUCURSALES || {});

  //Modales
  const [modalVisible, setModalVisible] = useState(false);
  const [EmodalVisible, setEModalVisible] = useState(false);
  const [Confirm, setConfirm] = useState(false);

  //Otras constantes
  const [id, setId] = useState(1);

  return (
    <View style={styles.container}>
      <StatusBar style={theme === 'oscuro' ? 'light' : 'dark'}  />

      <View style={styles.navigation}>

      <TouchableHighlight
        underlayColor={colors.navIconUnderlay} style={styles.navIcons}
        onPress={() => navigation.navigate("Dashboard")}
      >
        <Image source={getImage('D')} style={styles.navIconImage}/></TouchableHighlight>

      <TouchableHighlight
        underlayColor={colors.navIconUnderlay} style={styles.navIcons}
        onPress={() => navigation.navigate("Compras")}
      >
        <Image source={getImage('C')} style={styles.navIconImage}/></TouchableHighlight>

        <TouchableHighlight
        underlayColor={colors.navIconUnderlay} style={styles.navIcons}
        onPress={() => navigation.navigate("Ventas")}
      >
        <Image source={getImage('V')} style={styles.navIconImage}/></TouchableHighlight>

      <TouchableHighlight
        style={styles.navIconsS}
      >
        <Image source={getImage('S')} style={styles.navIconImage}/></TouchableHighlight>

        <TouchableHighlight
        underlayColor={colors.navIconUnderlay} style={styles.navIcons}
        onPress={() => navigation.navigate("Almacenes")} 
      >
        <Image source={getImage('A')} style={styles.navIconImage}/></TouchableHighlight>

        <TouchableHighlight
        underlayColor={colors.navIconUnderlay} style={styles.navIcons}
        onPress={() => navigation.navigate("ListaDePrecios")} 
      >
        <Image source={getImage('$')} style={styles.navIconImage}/></TouchableHighlight>

    </View>

    {/* Modal para añadir sucursales */}
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
                      underlayColor={colors.input}
                      onPress={() => setModalVisible(!modalVisible)}>
                      <Image source={getImage('x')} style={styles.lupaImage}/>
                      </TouchableHighlight>
                    </View>
        
                    <View>
                      <Text style={styles.modalTitle}>Añadir sucursal</Text>
                    </View>
        
                    <View style={styles.hr}/>
        
                    <View style={styles.modalRow}>
                      <Text style={styles.modalLabel}>Sucursal:</Text>
                      <TextInput style={{...styles.input, width: 150}}
                      value={sucursal} onChangeText={(text) => setSucursal(NoEmojis(text))}/>
                    </View>
                    <View style={styles.modalRow}>
                      <Text style={styles.modalLabel}>Teléfono:</Text>
                      <TextInput style={{...styles.input, width: 150}}
                      value={telefono} onChangeText={(text) => setTelefono(NoEmojis(text))}/>
                    </View>
        
                    <View style={styles.hr}/>
        
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                      <TouchableHighlight
                      underlayColor={colors.confirmUnderlay} style={styles.modalConfirm}
                        onPress={() => {
                          const validation = Validar(2,sucursal,telefono,'','');
                              if (!validation.isValid) {
                              Alert.alert('Error', validation.message);
                              return; 
                              }
                        setSucursales(AddSucursal(sucursales,id,sucursal,telefono))
                        setModalVisible(!modalVisible)
                      }}>
                        <Text style={styles.text}>Añadir registro</Text>
                      </TouchableHighlight>
                    </View>
        
                  </View>
                  </View>
                </Modal>
        
              {/* Modal para editar sucursales */}
            <Modal
                  animationType="slide"
                  transparent={true}
                  visible={EmodalVisible}
                  onRequestClose={() => {
                    setEModalVisible(!EmodalVisible);
                  }}>
                  <View style={styles.modalOverlay}>
                  <View style={styles.modalView}>
        
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                      <TouchableHighlight
                      style={{height: 30, width: 30, alignItems: "flex-end"}}
                      underlayColor={colors.input}
                      onPress={() => setEModalVisible(!EmodalVisible)}>
                      <Image source={getImage('x')} style={styles.lupaImage}/>
                      </TouchableHighlight>
                    </View>
        
                    <View>
                      <Text style={styles.modalTitle}>Editar sucursal</Text>
                    </View>
        
                    <View style={styles.hr}/>
        
                    <View style={styles.modalRow}>
                      <Text style={styles.modalLabel}>Sucursal:</Text>
                      <TextInput style={{...styles.input, width: 150}}
                      value={sucursal} onChangeText={(text) => setSucursal(NoEmojis(text))}/>
                    </View>
                    <View style={styles.modalRow}>
                      <Text style={styles.modalLabel}>Teléfono:</Text>
                      <TextInput style={{...styles.input, width: 150}}
                      value={telefono} onChangeText={(text) => setTelefono(NoEmojis(text))}/>
                    </View>
        
                    <View style={styles.hr}/>
        
                    <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                      <TouchableHighlight
                      underlayColor={colors.editUnderlay} style={[styles.modalEdit, {width: 150}]}
                        onPress={() => {
                          const validation = Validar(2,sucursal,telefono,'','');
                              if (!validation.isValid) {
                              Alert.alert('Error', validation.message);
                              return; 
                              }
                        setSucursales(AddSucursal(sucursales,id,sucursal,telefono))
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
                  </View>
                </Modal>
              
            {/* Modal para confirmar borrado */}
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
                                  <Text style={styles.modalTitle}>¿Eliminar registro?</Text>
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
                                      setSucursales(QuitarElemento(sucursales, id));
                                      setConfirm(!Confirm);
                                      setEModalVisible(!EmodalVisible);
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
        <Text style={{  fontSize: 25, fontWeight: 'bold' ,color: colors.text}}>
        Sucursales
        </Text>

        <Text style={{ 
          fontSize: 15, 
          paddingVertical: 10, color: colors.text}}>
          Seleccione el nombre de una sucursal en la tabla para modificar sus datos.
          </Text>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TouchableHighlight
        underlayColor={colors.cellUnderlay}
        onPress={() => {
          setId(Object.keys(sucursales).length + 1)
          setSucursal(''); setTelefono('');
          setModalVisible(true)}}
        style={styles.add}>
            <Text style={{fontWeight: 'bold', color: colors.text}}>Añadir sucursal</Text>
          </TouchableHighlight>

            <View style={styles.row}>
                    <TextInput style={[styles.query,{borderWidth: 1 }]}
                    placeholder="Buscar sucursal" placeholderTextColor="#777"
                    value={query} onChangeText={setQuery}></TextInput>
                    <TouchableHighlight
                    underlayColor={colors.cellUnderlay}
                   onPress={() => {
                    if (query.trim() == ''){
                      setSucursales(datos.SUCURSALES || {})
                    }
                    else {
                      const filtrado = Object.fromEntries(
                      Object.entries(datos.SUCURSALES || {}).filter(
                      ([id, data]) => data[0].toLowerCase().includes(query.toLowerCase())
                      ));
                      setSucursales(filtrado)
                    }
                   }}
                    style={{...styles.add, width: 40, padding: 10}}>
                    <Image source={getImage('lupa')} style={styles.lupaImage}/>
                   </TouchableHighlight>
                    </View>

          </View>
          
        <View style={styles.table}>
              <View style={styles.row}>
                  <View style={styles.headerCell}>
                      <Text style={styles.headerText}>Sucursal</Text>
                      </View>
                  <View style={styles.headerCell}>
                      <Text style={styles.headerText}>Teléfono</Text>
                      </View>
                  </View>

                {/* Body - cada registro es una fila */}
                {Object.values(sucursales || {}).length > 0 ? (
                Object.entries(sucursales).map(([id, data]: [string, any]) => {
                const [sucursal, telefono] = data;
                return (
                <View key={id} style={styles.row}>
                <View style={styles.cellF}>
                <TouchableHighlight
                underlayColor={colors.cellUnderlay}
                  onPress={() => {
                    setId(Number(id))
                    setSucursal(sucursal); setTelefono(telefono);
                    setEModalVisible(true)
                  }}>
                  <Text style={styles.text}>{sucursal}</Text>
                  </TouchableHighlight>
                  </View>
                  <View style={styles.cell}>
                  <Text style={styles.text}>{telefono}</Text>
                  </View>
                </View>
                );
                })
              ) : (
            <Text style={{opacity: 0.8, marginVertical: 20, textAlign: 'center', color: colors.text}}>
              No hay sucursales registradas</Text>
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
    backgroundColor: colors.background
  },
  text:{
    color: colors.text
  },
  navigation: {
    backgroundColor: colors.navBackground,
    flexDirection: 'row', justifyContent: 'space-around',
    padding: 5,
     elevation: 5,
    shadowColor: "#000", shadowOffset: {height: 2, width: 0,}
  },
  navIcons:{
    padding: 10, borderRadius: 50 ,
  },
  navIconsS:{
    padding: 10, borderRadius: 50 , backgroundColor: colors.navIconUnderlay,
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
  add: {
    backgroundColor: colors.input,
    height: 40, width: 150,
    marginTop: 10,
    padding: 10,
    borderRadius: 15,
     elevation: 5,
    shadowColor: "#000", shadowOffset: {height: 2, width: 0,}
  },
  query: {
    backgroundColor: colors.input, color: colors.text,  
    height: 40, width: 120,
    marginTop: 10,
  },
  //Tabla estilos
  table: {
    paddingVertical: 20,
    elevation: 5,
    shadowColor: "#000", shadowOffset: {height: 2, width: 0,},
    marginBottom: 80
  },
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
  headerText: {fontWeight: 'bold', color: 'white'},
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
  modalEdit: {
    backgroundColor: colors.edit,
    padding: 10,
    borderRadius: 20,
    width: 135,
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
});
