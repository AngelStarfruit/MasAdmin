import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, Image, Modal, Alert, TextInput, KeyboardAvoidingView, Platform} from 'react-native';
import Constants from 'expo-constants';
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from '@react-native-picker/picker';
import { useState, useEffect } from 'react';
import { Validar, NoEmojis } from './backend';
import type { DashboardScreenProps, FormerJSON } from './types';
import datos from './datos.json';

export default function Dashboard({navigation}: DashboardScreenProps ) {

  //Constantes de inputs
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fecha, setFecha] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const DOnChange = (event: any, selectedDate: any) => {
    setShowPicker(false);
    if (selectedDate) {
      setFecha(selectedDate);
    }
  };
  const [evento, setEvento] = useState('')
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [fechaHora, setFechaHora] = useState(new Date());
  const [lugar, setLugar] = useState('')
  const [contacto, setContacto] = useState('')
  const showDatePicker = () => {
  setDatePickerVisibility(true);
};
const hideDatePicker = () => {
  setDatePickerVisibility(false);
};
const handleConfirm = (date: any) => {
  setFechaHora(date);
  hideDatePicker();
};

    //Constantes de picker
  const [selectedValue, setSelectedValue] = useState('hoy');
  const [selectedAValue, setSelectedAValue] = useState('hoyA');

  //JSON
  const eventos: Record<string, any> = datos.EVENTOS
  const [eventosMostrados, setEventosMostrados] = useState(eventos);

   useEffect(() => {
  let filtrados;
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  
  // Fin del día (23:59:59)
  const finDia = new Date(hoy);
  finDia.setHours(23, 59, 59, 999);
  
  // Fin de semana (domingo)
  const finSemana = new Date(hoy);
  finSemana.setDate(hoy.getDate() + (6 - hoy.getDay()));
  finSemana.setHours(23, 59, 59, 999);
  
  // Fin de mes
  const finMes = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0);
  finMes.setHours(23, 59, 59, 999);
  
  // Fin de año
  const finAnio = new Date(hoy.getFullYear(), 11, 31);
  finAnio.setHours(23, 59, 59, 999);
  
  if (selectedAValue === 'hoyA') {
    filtrados = Object.fromEntries(
      Object.entries(eventos || {}).filter(([id, data]) => {
        const fechaEvento = new Date(data[1]);
        return fechaEvento >= hoy && fechaEvento <= finDia;
      })
    );
  } else if (selectedAValue === 'semanaA') {
    filtrados = Object.fromEntries(
      Object.entries(eventos || {}).filter(([id, data]) => {
        const fechaEvento = new Date(data[1]);
        return fechaEvento >= hoy && fechaEvento <= finSemana;
      })
    );
  } else if (selectedAValue === 'mesA') {
    filtrados = Object.fromEntries(
      Object.entries(eventos || {}).filter(([id, data]) => {
        const fechaEvento = new Date(data[1]);
        return fechaEvento >= hoy && fechaEvento <= finMes;
      })
    );
  } else if (selectedAValue === 'añoA') {
    filtrados = Object.fromEntries(
      Object.entries(eventos || {}).filter(([id, data]) => {
        const fechaEvento = new Date(data[1]);
        return fechaEvento >= hoy && fechaEvento <= finAnio;
      })
    );
  } else {
    filtrados = eventos || {};
  }
  
  setEventosMostrados(filtrados);
}, [selectedAValue]);
  //Modales
  const [modalVisible, setModalVisible] = useState(false);
  const [userModalVisible, setUserModalVisible] = useState(false);
  const [Confirm, setConfirm] = useState(false);
  const [modalEvento, setModalEvento] = useState(false);
  const [modalEditEvento, setModalEditEvento] = useState(false);

  //Constantes de totales
  const [ventas, setVentas] = useState(1000);
  const [compras, setCompras] = useState(500);
  const [gastos, setGastos] = useState(200);

  const getImage = (nombre: any) => {
  switch(nombre) {
    case 'C': return require('../assets/C.png');
    case 'V': return require('../assets/V.png');
    case 'S': return require('../assets/S.png');
    case 'D': return require('../assets/D.png');
    case 'A': return require('../assets/A.png');
    case '$': return require('../assets/$.png');
    case 'x': return require('../assets/x.png');
    default: return require('../assets/config.png');
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

    {/* Modal configuración */}
                <Modal
                      animationType="slide"
                      transparent={true}
                      visible={modalVisible}
                      onRequestClose={() => {
                        setModalVisible(!modalVisible);
                      }}>
                      <View style={styles.modalOverlay}>
                      <View style={[styles.modalView, {marginVertical: 340}]}>
            
                        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                          <TouchableHighlight
                          style={{height: 30, width: 30, alignItems: "flex-end"}}
                          underlayColor={'#ddd'}
                          onPress={() => setModalVisible(!modalVisible)}>
                          <Image source={getImage('x')} style={styles.lupaImage}/>
                          </TouchableHighlight>
                        </View>
            
                        <View>
                          <Text style={styles.modalTitle}>Configuración</Text>
                        </View>
            
                        <View style={styles.modalhr}/>
            
                        <View style={styles.modalRow}>
                          <TouchableHighlight
                          underlayColor={'#cbcffe'} style={styles.modalOption}
                          onPress={() => setUserModalVisible(true)}>
                            <Text>Mi cuenta</Text>
                          </TouchableHighlight>
                        </View>
                        <View style={styles.modalRow}>
                          <TouchableHighlight
                          underlayColor={'#cbcffe'} style={styles.modalOption}
                          onPress={() => setConfirm(true)}
                          >
                            <Text>Cerrar sesión</Text>
                          </TouchableHighlight>
                        </View>
            
                      </View>
                      </View>
                    </Modal>
    
    {/* Modal Mi cuenta */}
                <Modal
                      animationType="slide"
                      transparent={true}
                      visible={userModalVisible}
                      onRequestClose={() => {
                        setUserModalVisible(!userModalVisible);
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
                      <View style={[styles.modalView, { marginVertical: 150 }]}>
            
                        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                          <TouchableHighlight
                          style={{height: 30, width: 30, alignItems: "flex-end"}}
                          underlayColor={'#ddd'}
                          onPress={() => setUserModalVisible(!userModalVisible)}>
                          <Image source={getImage('x')} style={styles.lupaImage}/>
                          </TouchableHighlight>
                        </View>
            
                        <View>
                          <Text style={styles.modalTitle}>Ajustes de cuenta</Text>
                        </View>
            
                        <View style={styles.modalhr}/>
            
                          <Text style={styles.CardText}>
                                              Nombre completo:
                                          </Text>
                                          <TextInput style={styles.input} 
                                          value = {nombre} onChangeText={(text) => setNombre(NoEmojis(text))}/>
                                          <Text style={styles.CardText}>
                                              Teléfono:
                                          </Text>
                                          <TextInput style={styles.input} 
                                          value = {telefono} onChangeText = {(text) => setTelefono(NoEmojis(text))}/>
                                          <Text style={styles.CardText}>
                                              Fecha de nacimiento:
                                          </Text>
                                          <TextInput 
                                            style={styles.input}
                                            value={fecha.toLocaleDateString()}
                                            onFocus={() => {
                                            setShowPicker(true);
                                            }}
                                            onPressIn={() => {
                                            setShowPicker(true);
                                            }}
                                            caretHidden={true}  // Oculta el cursor
                                            showSoftInputOnFocus={false}  // Evita que el teclado se abra
                                          />
                                          {showPicker && (
                                          <DateTimePicker
                                          value={fecha}
                                            mode="date"
                                            onChange={(event, selectedDate) => {
                                            setShowPicker(false);
                                            if (selectedDate) {
                                          setFecha(selectedDate);
                                          }
                                          }}
                                            />
                                          )}
                                          <Text style={styles.CardText}>
                                              Email:
                                          </Text>
                                          <TextInput style={styles.input} 
                                          value = {email} onChangeText = {(text) => setEmail(NoEmojis(text))}/>
                                          <Text style={styles.CardText}>
                                              Contraseña:
                                          </Text>
                                          <TextInput style={styles.input} 
                                          value = {contrasena} onChangeText = {(text) => setContrasena(NoEmojis(text))} secureTextEntry />

                        <View style={styles.modalhr}/>
                        
                                    <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                                      <TouchableHighlight
                                      underlayColor={'#90ff9f'} style={[styles.modalConfirm, {width: 160}]}
                                        onPress={() => {
                                          const validation = Validar(4,nombre,telefono,email,contrasena);
                                          if (!validation.isValid) {
                                            Alert.alert('Error', validation.message);
                                            return; 
                                          }
                                          setModalVisible(!modalVisible)
                                          setUserModalVisible(!userModalVisible)
                                          Alert.alert('Éxito', 'Los cambios han sido guardados');}}>
                                        <Text>Confirmar cambios</Text>
                                      </TouchableHighlight>
                                    </View>
            
                      </View>
                      </ScrollView></KeyboardAvoidingView>
                      </View>
                    </Modal>

    {/* Modal para confirmar cerrado de sesión */}
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
                                      <Text style={styles.modalTitle}>¿Cerrar sesión?</Text>
                                    </View>
                        
                                    <View style={styles.modalhr}/>
                        
                                    <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                                      <TouchableHighlight
                                      underlayColor={'#ddd'} style={[styles.modalRegret, {width: 50}]}
                                        onPress={() => setConfirm(!Confirm)}>
                                        <Text>NO</Text>
                                      </TouchableHighlight>
                                      <TouchableHighlight
                                      underlayColor={'#ff9797'} style={[styles.modalDelete, {width: 50}]}
                                        onPress={() => {
                                          setModalVisible(!modalVisible);
                                          setConfirm(!Confirm);
                                          navigation.navigate("home");
                                        }}>
                                        <Text>SÍ</Text>
                                      </TouchableHighlight>
                                    </View>
                        
                                  </View>
                                  </View>
                                </Modal>
    
    {/* Modal para añadir eventos */}
        <Modal
              animationType="slide"
              transparent={true}
              visible={modalEvento}
              onRequestClose={() => {
                setModalEvento(!modalEvento);
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
                  underlayColor={'#eee'}
                  onPress={() => setModalEvento(!modalEvento)}>
                  <Image source={getImage('x')} style={styles.lupaImage}/>
                  </TouchableHighlight>
                </View>
    
                <View>
                  <Text style={styles.modalTitle}>Registrar evento</Text>
                </View>
    
                <View style={styles.hr}/>
    
                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Evento:</Text>
                  <TextInput style={{...styles.input, width: 150}}
                  value={evento} onChangeText={(text) => setEvento(NoEmojis(text))}/>
                </View>
                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Fecha y hora:</Text>
                  <View style={styles.modalRow}>
  
                <TouchableHighlight underlayColor={'white'} onPress={showDatePicker}>
                <TextInput 
                style={styles.input}
                 value={fechaHora.toLocaleString()}
                editable={false}
                pointerEvents="none"
                />
                </TouchableHighlight>
              <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="datetime"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
              date={fechaHora}
              />
              </View>
                </View>
                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Lugar:</Text>
                  <TextInput style={{...styles.input, width: 150}}
                  value={lugar} onChangeText={(text) => setLugar(NoEmojis(text))}/>
                </View>
                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Contacto:</Text>
                  <TextInput style={{...styles.input, width: 150}}
                  value={contacto} onChangeText={(text) => setContacto(NoEmojis(text))}/>
                </View>
    
                <View style={styles.hr}/>
    
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                  <TouchableHighlight
                  underlayColor={'#82ff92'} style={styles.modalConfirm}
                    onPress={() => {
                      const validation = Validar(3,evento,lugar,contacto,'');
                            if (!validation.isValid) {
                            Alert.alert('Error', validation.message);
                            return; 
                            }
                      setModalEvento(!modalEvento)}}>
                    <Text>Añadir registro</Text>
                  </TouchableHighlight>
                </View>
    
              </View>
              </ScrollView>
              </KeyboardAvoidingView>
              </View>
            </Modal>
    
    {/* Modal para editar eventos */}
        <Modal
              animationType="slide"
              transparent={true}
              visible={modalEditEvento}
              onRequestClose={() => {
                setModalEvento(!modalEditEvento);
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
                  underlayColor={'#eee'}
                  onPress={() => setModalEditEvento(!modalEditEvento)}>
                  <Image source={getImage('x')} style={styles.lupaImage}/>
                  </TouchableHighlight>
                </View>
    
                <View>
                  <Text style={styles.modalTitle}>Editar evento</Text>
                </View>
    
                <View style={styles.hr}/>
    
                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Evento:</Text>
                  <TextInput style={{...styles.input, width: 150}}
                  value={evento} onChangeText={(text) => setEvento(NoEmojis(text))}/>
                </View>
                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Fecha y Hora:</Text>
                  <TouchableHighlight underlayColor={'white'} onPress={showDatePicker}>
                <TextInput 
                style={styles.input}
                 value={fechaHora.toLocaleString()}
                editable={false}
                pointerEvents="none"
                />
                </TouchableHighlight>
              <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="datetime"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
              date={fechaHora}
              />   
                </View>
                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Lugar:</Text>
                  <TextInput style={{...styles.input, width: 150}}
                  value={lugar} onChangeText={(text) => setLugar(NoEmojis(text))}/>
                </View>
                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Contacto:</Text>
                  <TextInput style={{...styles.input, width: 150}}
                  value={contacto} onChangeText={(text) => setContacto(NoEmojis(text))}/>
                </View>
    
                <View style={styles.hr}/>
    
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                              <TouchableHighlight
                              underlayColor={'#f3fe53'} style={styles.modalEdit}
                                onPress={() => {
                                  const validation = Validar(3,evento,lugar,contacto,'');
                                        if (!validation.isValid) {
                                        Alert.alert('Error', validation.message);
                                        return; 
                                        }
                                  setModalEditEvento(!modalEditEvento)}}>
                                <Text>Editar registro</Text>
                              </TouchableHighlight>
                              <TouchableHighlight
                              underlayColor={'#ff9797'} style={styles.modalDelete}
                                onPress={() => setConfirm(true)}>
                                <Text>Borrar registro</Text>
                              </TouchableHighlight>
                            </View>
    
              </View>
              </ScrollView>
              </KeyboardAvoidingView>
              </View>
            </Modal>

    {/* Pantalla */}
    <View style={styles.head}>
    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
    <View style={{paddingLeft: 10}}>
      <Text style={{
        fontSize:40,
        fontWeight: 'bold',
        color: '#2435f0',
      }}>MasAdmin</Text>
    </View>
    <TouchableHighlight
    underlayColor={"#ddf"}
      onPress={() => setModalVisible(true)}
      style={[styles.navIcons, {height: 50, width: 50, marginRight: 20}]}
    >
      <Image source={getImage('config')} style={{width: 30, height: 30, marginLeft: 'auto', marginRight: 20}}/>
    </TouchableHighlight>
    </View>

      <View style={styles.navigation}>
      <TouchableHighlight
        style={styles.navIconsS}
      >
        <Image source={getImage('D')} style={styles.navIconImage}/></TouchableHighlight>

      <TouchableHighlight
        underlayColor={"#ddf"} style={styles.navIcons}
        onPress={() => navigation.navigate("Compras")}
      >
        <Image source={getImage('C')} style={styles.navIconImage}/></TouchableHighlight>

        <TouchableHighlight
        underlayColor={"#ddf"} style={styles.navIcons}
        onPress={() => navigation.navigate("Ventas")}
      >
        <Image source={getImage('V')} style={styles.navIconImage}/></TouchableHighlight>

      <TouchableHighlight
        underlayColor={"#ddf"} style={styles.navIcons}
        onPress={() => navigation.navigate("Sucursales")} 
      >
        <Image source={getImage('S')} style={styles.navIconImage}/></TouchableHighlight>

        <TouchableHighlight
        underlayColor={"#ddf"} style={styles.navIcons}
        onPress={() => navigation.navigate("Almacenes")} 
      >
        <Image source={getImage('A')} style={styles.navIconImage}/></TouchableHighlight>

        <TouchableHighlight
        underlayColor={"#ddf"} style={styles.navIcons}
        onPress={() => navigation.navigate("ListaDePrecios")} 
      >
        <Image source={getImage('$')} style={styles.navIconImage}/></TouchableHighlight>

    </View></View>

      
      <ScrollView
      keyboardShouldPersistTaps="handled"
      >
        <View style={styles.scroll}>
        <Text style={{ fontSize: 30, fontWeight: 'bold', 
          color: '#2435f0', paddingBottom: 10}}>
        Bienvenido, Ángel
        </Text>
        <Text style={{ fontSize: 25, fontWeight: 'bold' }}>
          Dashboard
          </Text>
          <View style={{flexDirection:'row'}}>
          <Text style={{ 
          fontSize: 20, 
          paddingTop: 10,}}>
          Mostrar información de:
          </Text>
          <Picker
            selectedValue={selectedValue}
            onValueChange={(itemValue) => setSelectedValue(itemValue)}
            style={styles.picker} itemStyle={styles.pickerItem}
            >
              <Picker.Item label="Hoy" value="hoy" />
              <Picker.Item label="Esta semana" value="semana" />
              <Picker.Item label="Este mes" value="mes" />
              <Picker.Item label="Este año" value="año" />
          </Picker>
          </View>
          <Text style={styles.box}>
            Ventas: ${ventas.toFixed(2)}
            </Text>
          <Text style={styles.box}>
            Compras: ${compras.toFixed(2)}
            </Text>
          <Text style={styles.box}>
            Gastos: ${gastos.toFixed(2)}
            </Text>
            <View style={styles.hr}/>
            
          <Text style={{ fontSize: 25, fontWeight: 'bold', 
            paddingBottom: 10}}>
          Agenda
          </Text>
           <Text style={{ 
          fontSize: 15, 
          paddingVertical: 10,}}>
          Seleccione un evento para modificarlo.
          </Text>
          <View style={[styles.row, {justifyContent: 'space-between'}]}>
          <View style={{width: 180}}>
          <Picker
            selectedValue={selectedAValue}
            onValueChange={(itemValue) => setSelectedAValue(itemValue)}
            style={[styles.picker]} itemStyle={styles.pickerItem}
            >
              <Picker.Item label="Hoy" value="hoyA" />
              <Picker.Item label="Esta semana" value="semanaA" />
              <Picker.Item label="Este mes" value="mesA" />
              <Picker.Item label="Este año" value="añoA" />
          </Picker></View>
          <TouchableHighlight
                  underlayColor={'#f0f1ff'}
                  onPress={() => {
                    setEvento(''); setFechaHora(new Date()); setLugar(''); setContacto('');
                    setModalEvento(true)}}
                  style={styles.add}>
                      <Text style={{fontWeight: 'bold'}}>Registrar evento</Text>
                    </TouchableHighlight>
         
          </View>
          <View style={styles.table}>
          {/* Header */}
          <View style={styles.row}>
            <View style={styles.headerCell}><Text style={styles.headerText}>Evento</Text></View>
            <View style={styles.headerCell}><Text style={styles.headerText}>Fecha y Hora</Text></View>
            <View style={styles.headerCell}><Text style={styles.headerText}>Lugar</Text></View>
             <View style={styles.headerCell}><Text style={styles.headerText}>Contacto</Text></View>
          </View>
  
        {/* Body - cada registro es una fila */}
                        {Object.values(eventosMostrados || {}).length > 0 ? (
                        Object.entries(eventosMostrados).map(([id, data]: [string, any]) => {
                        const [evento, fechaHora, lugar, contacto] = data;
                        return (
                        <View key={id} style={styles.row}>
                        <View style={styles.cellF}>
                        <TouchableHighlight
                        underlayColor={'#ddd'}
                          onPress={() => {
                            setEvento(evento); setFechaHora(new Date(fechaHora));
                            setLugar(lugar); setContacto(contacto);
                            setModalEditEvento(true);
                          }}>
                          <Text>{evento}</Text>
                          </TouchableHighlight>
                          </View>
                          <View style={styles.cell}>
                          <Text>{fechaHora.replace('T', ' ')}</Text>
                          </View>
                          <View style={styles.cell}>
                          <Text>{lugar}</Text>
                          </View>
                          <View style={styles.cell}>
                          <Text>{contacto}</Text>
                          </View>
                        </View>
                        );
                        })
                      ) : (
                    <Text style={{opacity: 0.8, marginVertical: 20, textAlign: 'center'}}>No hay eventos</Text>
                    )}
        </View>

        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "white",
  },
  head:{
    elevation: 10,
    shadowColor: "#000", shadowOffset: {height: 2, width: 0,}
  },
  navigation: {
    backgroundColor: "white",
    flexDirection: 'row', justifyContent: 'space-around',
    padding: 5,
  },
  navIcons:{
    padding: 10, borderRadius: 50 ,
  },
  navIconsS:{
    padding: 10, borderRadius: 50 , backgroundColor: '#ddf',
  },
  navIconImage: {
    width: 20, height: 20,
  },
  lupaImage: {
    width: 15, height: 15,
  },
  scroll: {
    flex: 1,
    backgroundColor: '#eee',
    padding: 18,
  },
  input:{
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 5,
     marginBottom: 15,
     color: 'black',
  },
  box: {
    flex: 1,
    textAlign: 'center',
    backgroundColor: '#e3e5ff',
    fontWeight: 'bold', fontSize: 30, color: '#2435f0',
    paddingVertical: 40, marginVertical: 10,
    borderRadius: 20,
    elevation: 5,
    shadowColor: "#000", shadowOffset: {height: 2, width: 0,}
  },
  hr:{
    height: 2, 
    backgroundColor: '#777', 
    marginVertical: 8,
  },
  add: {
    backgroundColor: 'white',
    height: 40, width: 150,
    marginTop: 10,
    padding: 10,
    borderRadius: 15,
     elevation: 5,
    shadowColor: "#000", shadowOffset: {height: 2, width: 0,}
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
    backgroundColor: '#e3e5ff',
    borderWidth: 1,
    borderColor: 'black',
  },
  cell: {
    flex: 1, padding: 6,
    borderWidth: 1,
    backgroundColor: 'white',
  },
  cellF: {
    flex: 1, padding: 6,
    borderWidth: 1,
    backgroundColor: '#eee',
  },
  headerText: {fontWeight: 'bold',},
  //---------------
  picker: {
    height: 50,
    marginLeft: 10,
    flex: 1,
    backgroundColor: 'white', color: 'black',
  
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
    marginHorizontal: 30, marginVertical: 200,
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
  CardText:{
    fontSize: 20,  color: 'black',
  },
  modalhr:{
    height: 2, 
    backgroundColor: '#bbb', 
    marginBottom: 15,
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
  modalOption: {
    backgroundColor: '#bdc2ff',
    padding: 10,
    borderRadius: 15,
    width: 200,
    justifyContent: 'center', alignItems: 'center',
    elevation: 5,
    shadowColor: "#000", shadowOffset: {height: 2, width: 0,}
  },
  modalConfirm: {
    backgroundColor: '#62ff77',
    padding: 10,
    borderRadius: 15,
    width: 135,
    justifyContent: 'center', alignItems: 'center',
    elevation: 5,
    shadowColor: "#000", shadowOffset: {height: 2, width: 0,}
  },
  modalEdit: {
    backgroundColor: '#f3fe53',
    padding: 10,
    borderRadius: 20,
    width: 135,
    justifyContent: 'center', alignItems: 'center',
    elevation: 5,
    shadowColor: "#000", shadowOffset: {height: 2, width: 0,}
  },
  modalDelete: {
    backgroundColor: '#ff8787',
    padding: 10,
    borderRadius: 15,
    width: 135,
    justifyContent: 'center', alignItems: 'center',
    elevation: 5,
    shadowColor: "#000", shadowOffset: {height: 2, width: 0,}
  },
  modalRegret: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 15,
    width: 130,
    justifyContent: 'center', alignItems: 'center',
    elevation: 5,
    shadowColor: "#000", shadowOffset: {height: 2, width: 0,}
  },
});
