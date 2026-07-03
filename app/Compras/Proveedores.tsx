import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, Image, TextInput, Modal, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import Constants from 'expo-constants';
import type { ProveedoresScreenProps, FormerJSON } from './types';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { NoEmojis, Validar, QuitarElemento, AddProveedor } from './backend';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import datos from './datos.json';

export default function Proveedores({ navigation }: ProveedoresScreenProps) {

  const { theme, colors } = useTheme();
  const styles = getStyles(colors);

  //Constantes de inputs
  const [empresa, setEmpresa] = useState('');
  const [telefono, setTelefono] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [estado, setEstado] = useState('');
  const [query, setQuery] = useState('');

  //JSON
  const [proveedores, setProveedores] = useState<FormerJSON>(datos.PROVEEDORES || {});

  //Modales
  const [modalVisible, setModalVisible] = useState(false);
  const [EmodalVisible, setEModalVisible] = useState(false);
  const [Confirm, setConfirm] = useState(false);
  const [Busqueda, setBusqueda] = useState(false);

  //Constante de picker
  const [selectedCriteria, setSelectedCriteria] = useState('Empresa');

  //Otras constantes:
  const [id, setId] = useState(1)

  return (
    <View style={styles.container}>
      <StatusBar style={theme === 'oscuro' ? 'light' : 'dark'}  />

      <View style={styles.navigation}>
        <TouchableHighlight
        underlayColor={colors.navIconUnderlay} style={styles.navIcons}
        onPress={() => navigation.navigate("Compras")} 
      >
        <Ionicons name="arrow-back" size={25} color={colors.text} />
      </TouchableHighlight>
    </View>

    {/* Modal para añadir proveedores */}
    <Modal
          animationType="slide"
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
              <Text style={styles.modalTitle}>Añadir proveedor</Text>
            </View>

            <View style={styles.hr}/>

            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Empresa:</Text>
              <TextInput style={{...styles.query, width: 150}}
              value={empresa} onChangeText={(text) => setEmpresa(NoEmojis(text))}/>
            </View>
            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Teléfono:</Text>
              <TextInput style={{...styles.query, width: 150}}
              value={telefono} onChangeText={(text) => setTelefono(NoEmojis(text))}/>
            </View>
            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Ciudad:</Text>
              <TextInput style={{...styles.query, width: 150}}
              value={ciudad} onChangeText={(text) => setCiudad(NoEmojis(text))}/>
            </View>
            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Estado:</Text>
              <TextInput style={{...styles.query, width: 150}}
              value={estado} onChangeText={(text) => setEstado(NoEmojis(text))}/>
            </View>

            <View style={styles.hr}/>

            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <TouchableHighlight
              underlayColor={colors.confirmUnderlay} style={styles.modalConfirm}
                onPress={() => {
                  const validation = Validar(4,empresa,telefono,ciudad,estado);
                        if (!validation.isValid) {
                        Alert.alert('Error', validation.message);
                        return; 
                        }
                  setProveedores(AddProveedor(proveedores,id,empresa,telefono,ciudad,estado))
                  setModalVisible(!modalVisible)
                  }}>
                <Text style={styles.text}>Añadir registro</Text>
              </TouchableHighlight>
            </View>

          </View>
          </ScrollView>
          </KeyboardAvoidingView>
          </View>
        </Modal>

      {/* Modal para editar proveedores */}
    <Modal
          animationType="slide"
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
          <View style={styles.modalView}>

            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
              <TouchableHighlight
              style={{height: 30, width: 30, alignItems: "flex-end"}}
              underlayColor={colors.scrollBackground}
              onPress={() => setEModalVisible(!EmodalVisible)}>
              <Ionicons name="close" size={20} color={colors.text} />
              </TouchableHighlight>
            </View>

            <View>
              <Text style={styles.modalTitle}>Editar proveedor</Text>
            </View>

            <View style={styles.hr}/>

            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Empresa:</Text>
              <TextInput style={{...styles.query, width: 150}}
              value={empresa} onChangeText={(text) => setEmpresa(NoEmojis(text))}/>
            </View>
            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Teléfono:</Text>
              <TextInput style={{...styles.query, width: 150}}
              value={telefono} onChangeText={(text) => setTelefono(NoEmojis(text))}/>
            </View>
            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Ciudad:</Text>
              <TextInput style={{...styles.query, width: 150}}
              value={ciudad} onChangeText={(text) => setCiudad(NoEmojis(text))}/>
            </View>
            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Estado:</Text>
              <TextInput style={{...styles.query, width: 150}}
              value={estado} onChangeText={(text) => setEstado(NoEmojis(text))}/>
            </View>

            <View style={styles.hr}/>

            <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <TouchableHighlight
              underlayColor={'#f3fe53'} style={styles.modalEdit}
                onPress={() => {
                  const validation = Validar(4,empresa,telefono,ciudad,estado);
                        if (!validation.isValid) {
                        Alert.alert('Error', validation.message);
                        return; 
                        }
                  setProveedores(AddProveedor(proveedores,id,empresa,telefono,ciudad,estado))
                  setEModalVisible(!EmodalVisible)}}>
                <Text style={styles.text}>Editar registro</Text>
              </TouchableHighlight>
              <TouchableHighlight
              underlayColor={'#ff9797'} style={styles.modalDelete}
                onPress={() => setConfirm(true)}>
                <Text style={styles.text}>Borrar registro</Text>
              </TouchableHighlight>
            </View>

          </View>
          </ScrollView>
          </KeyboardAvoidingView>
          </View>
        </Modal>

        {/* Modal para realizar una búsqueda */}
            <Modal
                  animationType="slide"
                  transparent={true}
                  visible={Busqueda}
                  onRequestClose={() => {
                    setBusqueda(!Busqueda);
                  }}>
                  <View style={styles.modalOverlay}>
                  <View style={[styles.modalView, {marginVertical: 290}]}>
        
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                      <TouchableHighlight
                      style={{height: 30, width: 30, alignItems: "flex-end"}}
                      underlayColor={colors.scrollBackground}
                      onPress={() => setBusqueda(!Busqueda)}>
                     <Ionicons name="close" size={20} color={colors.text} />
                      </TouchableHighlight>
                    </View>
        
                    <View>
                      <Text style={styles.modalTitle}>Buscar proveedor</Text>
                    </View>
        
                    <View style={styles.hr}/>
        
                    <View style={styles.modalRow}>
                      <Text style={styles.modalLabel}>Campo:</Text>
                      <View style={{width: 160, height: 55}}>
                            <Picker
                            selectedValue={selectedCriteria}
                            onValueChange={(itemValue) => setSelectedCriteria(itemValue)}
                            style={styles.picker} itemStyle={styles.pickerItem}
                            >
                            <Picker.Item label="Empresa" value="Empresa" />
                            <Picker.Item label="Ciudad" value="Ciudad" />
                            <Picker.Item label="Estado" value="Estado" />
                            </Picker></View>
                    </View>
                    <View style={styles.modalRow}>
                      <Text style={styles.modalLabel}>Criterio:</Text>
                      <TextInput style={{...styles.query, width: 150}}
                      value={query} onChangeText={(text) => setQuery(NoEmojis(text))}/>
                    </View>
        
                    <View style={styles.hr}/>
        
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                      <TouchableHighlight
                      underlayColor={colors.confirmUnderlay} style={[styles.modalConfirm, {width: 90}]}
                        onPress={() => {
                          if(query.trim() == ''){
                            setProveedores(datos.PROVEEDORES)
                          }
                          else {
                            let index = 0
                            switch(selectedCriteria){
                            case "Empresa": {index = 0; break}
                            case "Ciudad": {index = 2; break}
                            default: {index = 3; break}
                          }
                          const filtrado = Object.fromEntries(
                            Object.entries(datos.PROVEEDORES || {}).filter(
                            ([id, data]) => data[index].toLowerCase().includes(query.toLowerCase())
                            ));
                            setProveedores(filtrado)
                          }
                        setBusqueda(!Busqueda)}}>
                        <Text style={styles.text}>Buscar</Text>
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
                                      setProveedores(QuitarElemento(proveedores, id));
                                      setConfirm(!Confirm);
                                      setEModalVisible(!EmodalVisible);
                                    }}>
                                    <Text style={styles.text}>SÍ</Text>
                                  </TouchableHighlight>
                                </View>
                    
                              </View>
                              </View>
                            </Modal>

      {/*ScrollView: */}
      <ScrollView>
        <View style={styles.scroll}>

        <Text style={{  fontSize: 25, fontWeight: 'bold', color: colors.text }}>
        Proveedores
        </Text>

        <Text style={{ 
          fontSize: 15, 
          paddingVertical: 10, color: colors.text}}>
          Seleccione la empresa de un proveedor en la tabla para modificar sus datos.
          </Text>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableHighlight
                underlayColor={colors.input}
                onPress={() => {
                  setId(Object.keys(proveedores).length + 1)
                  setEmpresa(''); setTelefono(''); setCiudad(''); setEstado(''); 
                  setModalVisible(true)}}
                style={styles.add}>
                    <Text style={{fontWeight: 'bold', color: colors.text}}>Añadir proveedor</Text>
                  </TouchableHighlight>

                  <TouchableHighlight
                  underlayColor={colors.input}
                  onPress={() => {
                    setBusqueda(true)
                  }}
                  style={{...styles.add, width: 40, padding: 10}}>
                  <Ionicons name="search" size={20} color={colors.text} />
                  </TouchableHighlight>

                  </View>

        <View style={styles.table}>
              <View style={styles.row}>
                  <View style={styles.headerCell}>
                      <Text style={styles.headerText}>Empresa</Text>
                      </View>
                  <View style={styles.headerCell}>
                      <Text style={styles.headerText}>Teléfono</Text>
                      </View>
                  <View style={[styles.headerCell, {flex: 0.8}]}>
                      <Text style={styles.headerText}>Ciudad</Text>
                      </View>
                  <View style={styles.headerCell}>
                      <Text style={styles.headerText}>Estado</Text>
                      </View>
                  </View>

                  {/* Body - cada registro es una fila */}
                  {Object.values(proveedores || {}).length > 0 ? (
                  Object.entries(proveedores).map(([id, data]: [string, any]) => {
                  const [empresa, telefono, ciudad, estado] = data;
                  return(
                      <View key={id} style={styles.row}>
                        <View style={styles.cellF}>
                        <TouchableHighlight
                        underlayColor={colors.cellUnderlay}
                        onPress={() => {
                          setId(Number(id))
                          setEmpresa(empresa); setTelefono(telefono); setCiudad(ciudad); setEstado(estado);
                          setEModalVisible(true)}}>
                        <Text style={styles.text}>{empresa}</Text>
                        </TouchableHighlight>
                        </View> 
                      <View style={styles.cell}><Text style={styles.text}>{telefono}</Text></View>
                      <View style={[styles.cell, {flex: 0.8}]}><Text style={styles.text}>{ciudad}</Text></View>
                      <View style={styles.cell}><Text style={styles.text}>{estado}</Text></View>
                </View>
                  )
                  })
              ) : (
            <Text style={{opacity: 0.8, marginVertical: 20, textAlign: 'center', color: colors.text}}>
              No hay proveedores registrados</Text>
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
  add: {
    backgroundColor: colors.background,
    width: 150,
    marginTop: 10,
    padding: 10,
    elevation: 5,
    borderRadius: 15,
    shadowColor: "#000", shadowOffset: {height: 2, width: 0,}
  },
  query: {
    backgroundColor: colors.scrollBackground, color: colors.text,
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
    marginHorizontal: 30, marginVertical: 220,
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
  },
  //---------------
  picker: {
    height: 60,
    marginLeft: 10,
    flex: 1,
    backgroundColor: colors.scrollBackground, color: colors.text,
  
  },
  pickerItem: {
    fontSize: 16,
    fontWeight: 'bold',
  }
});
