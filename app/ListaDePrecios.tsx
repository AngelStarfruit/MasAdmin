import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, Image, Modal, TextInput, Alert} from 'react-native';
import Constants from 'expo-constants';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { NoEmojis, Validar } from './backend';
import type { ListaDePreciosScreenProps } from './types';

export default function ListaDePrecios({ navigation }: ListaDePreciosScreenProps) {

  const getImage = (nombre: any) => {
  switch(nombre) {
    case 'C': return require('../assets/C.png');
    case 'V': return require('../assets/V.png');
    case 'S': return require('../assets/S.png');
    case 'D': return require('../assets/D.png');
    case 'A': return require('../assets/A.png');
    case '$': return require('../assets/$.png');
    default: return require('../assets/x.png');
    }
  }

  const [descripcion, setDescripcion] = useState('');
  const [marca, setMarca] = useState('');
  const [costo, setCosto] = useState('');

  const [selectedValue, setSelectedValue] = useState('A');
  const [selectedUValue, setSelectedUValue] = useState('pieza');
  const [selectedTValue, setSelectedTValue] = useState('producto');

  const [modalVisible, setModalVisible] = useState(false);
  const [EmodalVisible, setEModalVisible] = useState(false);
  const [Confirm, setConfirm] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.navigation}>

      <TouchableHighlight
        underlayColor={"#ddf"} style={styles.navIcons}
        onPress={() => navigation.navigate("Dashboard")}
      >
        <Image source={getImage('D')} style={styles.navIconImage} />
      </TouchableHighlight>

      <TouchableHighlight
        underlayColor={"#ddf"} style={styles.navIcons}
        onPress={() => navigation.navigate("Compras")}
      >
        <Image source={getImage('C')} style={styles.navIconImage} />
      </TouchableHighlight>

        <TouchableHighlight
        underlayColor={"#ddf"} style={styles.navIcons}
        onPress={() => navigation.navigate("Ventas")}
      >
        <Image source={getImage('V')} style={styles.navIconImage} />
      </TouchableHighlight>

      <TouchableHighlight
        underlayColor={"#ddf"} style={styles.navIcons}
        onPress={() => navigation.navigate("Sucursales")} 
      >
        <Image source={getImage('S')} style={styles.navIconImage} />
      </TouchableHighlight>

        <TouchableHighlight
        underlayColor={"#ddf"} style={styles.navIcons}
        onPress={() => navigation.navigate("Almacenes")} 
      >
        <Image source={getImage('A')} style={styles.navIconImage} />
      </TouchableHighlight>

        <TouchableHighlight
        style={styles.navIconsS} 
      >
        <Image source={getImage('$')} style={styles.navIconImage} />
      </TouchableHighlight>

    </View>

    {/* Modal para añadir productos */}
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
                      <Text style={styles.modalTitle}>Añadir elemento</Text>
                    </View>
        
                    <View style={styles.hr}/>
        
                    <View style={styles.modalRow}>
                      <Text style={styles.modalLabel}>Descripción:</Text>
                      <TextInput style={{...styles.query, width: 150}}
                      value={descripcion} onChangeText={(text) => setDescripcion(NoEmojis(text))}/>
                    </View>
                    <View style={styles.modalRow}>
                      <Text style={styles.modalLabel}>Marca:</Text>
                      <TextInput style={{...styles.query, width: 150}}
                      value={marca} onChangeText={(text) => setMarca(NoEmojis(text))}/>
                    </View>
                    <View style={styles.modalRow}>
                      <Text style={styles.modalLabel}>Costo:</Text>
                      <TextInput style={{...styles.query, width: 150}}
                      value={costo} onChangeText={(text) => setCosto(NoEmojis(text))}/>
                    </View>
                    <View style={styles.modalRow}>
                      <Text style={styles.modalLabel}>Unidad:</Text>
                      <View style={{width: 150, height: 50}}>
                      <Picker
                        selectedValue={selectedUValue}
                        onValueChange={(itemValue) => setSelectedUValue(itemValue)}
                        style={[styles.picker, {backgroundColor: "#eee"}]} 
                        itemStyle={styles.pickerItem}
                        >
                      <Picker.Item label="Pieza" value="pieza" />
                      <Picker.Item label="Gramo" value="g" />
                      </Picker>
                      </View>
                    </View>
                    <View style={styles.modalRow}>
                      <Text style={styles.modalLabel}>Tipo:</Text>
                      <View style={{width: 150, height: 50}}>
                      <Picker
                        selectedValue={selectedTValue}
                        onValueChange={(itemValue) => setSelectedTValue(itemValue)}
                        style={[styles.picker, {backgroundColor: "#eee"}]} 
                        itemStyle={styles.pickerItem}
                        >
                      <Picker.Item label="Producto" value="producto" />
                      <Picker.Item label="Servicio" value="servicio" />
                      <Picker.Item label="Paquete" value="paquete" />
                      </Picker>
                      </View>
                    </View>
        
                    <View style={styles.hr}/>
        
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                      <TouchableHighlight
                      underlayColor={'#82ff92'} style={styles.modalConfirm}
                        onPress={() => {
                          const validation = Validar(3,descripcion,marca,costo,'');
                             if (!validation.isValid) {
                            Alert.alert('Error', validation.message);
                            return; 
                            }
                        setModalVisible(!modalVisible)}}>
                        <Text>Añadir registro</Text>
                      </TouchableHighlight>
                    </View>
        
                  </View>
                  </View>
                </Modal>
        
              {/* Modal para editar productos */}
            <Modal
                  animationType="slide"
                  transparent={true}
                  visible={EmodalVisible}
                  onRequestClose={() => {
                    setEModalVisible(!EmodalVisible);
                  }}>
                  <View style={styles.modalOverlay}>
                  <View style={[styles.modalView, {marginVertical: 220}]}>
        
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                      <TouchableHighlight
                      underlayColor={'#ccc'}
                      onPress={() => setEModalVisible(!EmodalVisible)}>
                      <Image source={getImage('x')} style={styles.lupaImage}/>
                      </TouchableHighlight>
                    </View>
        
                    <View>
                      <Text style={styles.modalTitle}>Editar elemento</Text>
                      <Text style={[styles.modalLabel, {textAlign: 'center', opacity: 0.5, marginBottom: 10}]}>
                        (La unidad y el tipo no se pueden modificar)</Text>
                    </View>
        
                    <View style={styles.hr}/>
        
                    <View style={styles.modalRow}>
                      <Text style={styles.modalLabel}>Descripción:</Text>
                      <TextInput style={{...styles.query, width: 150}}
                      value={descripcion} onChangeText={(text) => setDescripcion(NoEmojis(text))}/>
                    </View>
                    <View style={styles.modalRow}>
                      <Text style={styles.modalLabel}>Marca:</Text>
                      <TextInput style={{...styles.query, width: 150}}
                      value={marca} onChangeText={(text) => setMarca(NoEmojis(text))}/>
                    </View>
                    <View style={styles.modalRow}>
                      <Text style={styles.modalLabel}>Costo:</Text>
                      <TextInput style={{...styles.query, width: 150}}
                      value={costo} onChangeText={(text) => setCosto(NoEmojis(text))}/>
                    </View>
        
                    <View style={styles.hr}/>
        
                    <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                      <TouchableHighlight
                      underlayColor={'#f3fe53'} style={styles.modalEdit}
                        onPress={() => setEModalVisible(!EmodalVisible)}>
                        <Text>Editar paquete</Text>
                      </TouchableHighlight>
                      <TouchableHighlight
                      underlayColor={'#f3fe53'} style={styles.modalEdit}
                        onPress={() => {
                          const validation = Validar(3,descripcion,marca,costo,'');
                             if (!validation.isValid) {
                            Alert.alert('Error', validation.message);
                            return; 
                            }
                        setModalVisible(!modalVisible)}}>
                        <Text>Editar registro</Text>
                      </TouchableHighlight>
                      <TouchableHighlight
                      underlayColor={'#ff9797'} style={styles.modalDelete}
                        onPress={() => setConfirm(true)}>
                        <Text>Borrar registro</Text>
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
                      underlayColor={'#ddd'} style={[styles.modalRegret , {width: 50}]}
                        onPress={() => setConfirm(!Confirm)}>
                        <Text>NO</Text>
                      </TouchableHighlight>
                      <TouchableHighlight
                      underlayColor={'#ff9797'} style={[styles.modalDelete , {width: 50}]}
                        onPress={() => {
                          setConfirm(!Confirm);
                          setEModalVisible(!EmodalVisible);
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
          Lista de precios
        </Text>
        <Text style={{ 
          fontSize: 15, 
          paddingVertical: 10,}}>
          Seleccione la descripción de un elemento en la tabla para modificar sus datos.
          </Text>
          <Picker
              selectedValue={selectedValue}
              onValueChange={(itemValue) => setSelectedValue(itemValue)}
              style={styles.picker} itemStyle={styles.pickerItem}
              >
                <Picker.Item label="A" value="A" />
          </Picker>
          <TouchableHighlight 
                underlayColor={'#f0f1ff'}
                onPress={() => {
                  setDescripcion(''); setMarca(''); setCosto('');
                  setModalVisible(true)}}
                style={styles.add}>
                    <Text style={{fontWeight: 'bold'}}>Añadir elemento</Text>
                  </TouchableHighlight>
          <View style={styles.table}>
                <View style={styles.row}>
                        <View style={styles.headerCell}>
                          <Text style={styles.headerText}>Descripción</Text>
                          </View>
                        <View style={styles.headerCell}>
                          <Text style={styles.headerText}>Marca</Text>
                          </View>
                        <View style={styles.headerCell}>
                          <Text style={styles.headerText}>Costo</Text>
                          </View>
                      </View>
                      <View style={styles.row}>
                        <View style={styles.cellF}>
                        <TouchableHighlight
                        underlayColor={'#ddd'}
                        onPress={() => setEModalVisible(true)}>
                        <Text>Jabón</Text>
                        </TouchableHighlight>
                        </View> 
                        <View style={styles.cell}><Text>ZOTE</Text></View>
                        <View style={styles.cell}><Text>$29.99</Text></View>
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
  add: {
    backgroundColor: 'white',
    width: 150,
    marginTop: 10,
    padding: 10
  },
  query:{
    backgroundColor: 'white', color: 'black',
    borderWidth: 1, borderColor: 'black', 
    height: 40, width: 120,
    marginTop: 10,
  },
  //Tabla estilos
  table: {
    paddingVertical: 20
  },
  row: {flexDirection: 'row',},
  headerCell: {
    flex: 1, padding: 12,
    backgroundColor: '#e3e5ff',
    borderWidth: 1,
    borderColor: 'black',
  },
  cell: {
    flex: 1, padding: 12,
    borderWidth: 1,
    backgroundColor: 'white',
  },
  cellF: {
    flex: 1, padding: 12,
    borderWidth: 1,
    backgroundColor: '#eee',
  },
  headerText: {fontWeight: 'bold',},
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
   hr:{
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
  modalConfirm: {
    backgroundColor: '#62ff77',
    padding: 10,
    borderRadius: 15,
    width: 130,
    justifyContent: 'center', alignItems: 'center',
  },
  modalRegret: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 15,
    width: 130,
    justifyContent: 'center', alignItems: 'center',
  },
  modalEdit: {
    backgroundColor: '#f3fe53',
    padding: 10,
    borderRadius: 15,
    width: 90,
    justifyContent: 'center', alignItems: 'center',
  },
  modalDelete: {
    backgroundColor: '#ff8787',
    padding: 10,
    borderRadius: 15,
    width: 90,
    justifyContent: 'center', alignItems: 'center',
  },
  //---------------
  picker: {
    height: 50,
    marginLeft: 10,
    flex: 1,
    backgroundColor: 'white',
    color: 'black',
  },
  pickerItem: {
    fontSize: 16,
    fontWeight: 'bold',
  },

});
