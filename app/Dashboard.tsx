import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, Image, Modal, Alert, TextInput} from 'react-native';
import Constants from 'expo-constants';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import type { DashboardScreenProps } from './types';

export default function Dashboard({navigation}: DashboardScreenProps ) {

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

  const [selectedValue, setSelectedValue] = useState('hoy');
  const [selectedAValue, setSelectedAValue] = useState('hoyA');

  const [modalVisible, setModalVisible] = useState(false);
  const [userModalVisible, setUserModalVisible] = useState(false);
  const [Confirm, setConfirm] = useState(false);

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
                      <View style={styles.modalView}>
            
                        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                          <TouchableHighlight
                          underlayColor={'#ccc'}
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
                      <View style={[styles.modalView, { marginVertical: 150 }]}>
            
                        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                          <TouchableHighlight
                          underlayColor={'#ccc'}
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
                                          value = {nombre}
                                          onChangeText = {setNombre}/>
                                          <Text style={styles.CardText}>
                                              Teléfono:
                                          </Text>
                                          <TextInput style={styles.input} 
                                          value = {telefono}
                                          onChangeText = {setTelefono}/>
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
                                          value = {email}
                                          onChangeText = {setEmail}/>
                                          <Text style={styles.CardText}>
                                              Contraseña:
                                          </Text>
                                          <TextInput style={styles.input} 
                                          value = {contrasena}
                                          onChangeText = {setContrasena}
                                          secureTextEntry />

                        <View style={styles.modalhr}/>
                        
                                    <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                                      <TouchableHighlight
                                      underlayColor={'#90ff9f'} style={[styles.modalConfirm, {width: 160}]}
                                        onPress={() => {
                                          setUserModalVisible(!userModalVisible);
                                          Alert.alert("Éxito","Cambios guardados con éxito");
                                        }}>
                                        <Text>Confirmar cambios</Text>
                                      </TouchableHighlight>
                                    </View>
            
                      </View>
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

      <ScrollView>
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
            Ventas: $1000
            </Text>
          <Text style={styles.box}>
            Compras: $500
            </Text>
          <Text style={styles.box}>
            Gastos: $200
            </Text>
            <View style={styles.hr}/>
            <View style={{width: 150}}>
          <Text style={{ fontSize: 25, fontWeight: 'bold', 
            paddingBottom: 10}}>
          Agenda
          </Text>
          <View style={{width: 150}}>
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
          </View>
          <View style={styles.table}>
            <View style={styles.row}>
              <View style={styles.headerCell}>
                <Text style={styles.headerText}>Evento</Text>
                </View>
              <View style={styles.headerCell}>
                <Text style={styles.headerText}>Fecha</Text>
                </View>
              <View style={styles.headerCell}>
                <Text style={styles.headerText}>Lugar</Text>
                </View>
              <View style={styles.headerCell}>
                <Text style={styles.headerText}>Contacto</Text>
                </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}><Text>hjsakldfhl</Text></View>
              <View style={styles.cell}><Text>2023-10-15</Text></View>
              <View style={styles.cell}><Text>Centro de Convenciones</Text></View>
              <View style={styles.cell}><Text>contacto@evento.com</Text></View>
            </View>
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
  //Tabla estilos
  table:{
    elevation: 5,
    shadowColor: "#000", shadowOffset: {height: 2, width: 0,}
  },
  row: {flexDirection: 'row',},
  headerCell: {
    flex: 1, padding: 12,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
  },
  cell: {
    flex: 1, padding: 12,
    borderWidth: 1,
    backgroundColor: 'white',
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
    marginHorizontal: 30, marginVertical: 340,
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
