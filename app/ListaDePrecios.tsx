import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, Image, Modal, TextInput} from 'react-native';
import Constants from 'expo-constants';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import type { ListaDePreciosScreenProps } from './types';

import C from '../assets/C.png'; import V from '../assets/V.png'; import S from '../assets/S.png';
import D from '../assets/D.png'; import A from '../assets/A.png'; import $ from '../assets/$.png';
import x from '../assets/x.png';

export default function ListaDePrecios({ navigation }: ListaDePreciosScreenProps) {

  const [selectedValue, setSelectedValue] = useState('A');

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
        <Image source={D} style={styles.navIconImage} />
      </TouchableHighlight>

      <TouchableHighlight
        underlayColor={"#ddf"} style={styles.navIcons}
        onPress={() => navigation.navigate("Compras")}
      >
        <Image source={C} style={styles.navIconImage} />
      </TouchableHighlight>

        <TouchableHighlight
        underlayColor={"#ddf"} style={styles.navIcons}
        onPress={() => navigation.navigate("Ventas")}
      >
        <Image source={V} style={styles.navIconImage} />
      </TouchableHighlight>

      <TouchableHighlight
        underlayColor={"#ddf"} style={styles.navIcons}
        onPress={() => navigation.navigate("Sucursales")} 
      >
        <Image source={S} style={styles.navIconImage} />
      </TouchableHighlight>

        <TouchableHighlight
        underlayColor={"#ddf"} style={styles.navIcons}
        onPress={() => navigation.navigate("Almacenes")} 
      >
        <Image source={A} style={styles.navIconImage} />
      </TouchableHighlight>

        <TouchableHighlight
        style={styles.navIconsS} 
      >
        <Image source={$} style={styles.navIconImage} />
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
                      <Image source={x} style={styles.lupaImage}/>
                      </TouchableHighlight>
                    </View>
        
                    <View>
                      <Text style={styles.modalTitle}>Añadir producto</Text>
                    </View>
        
                    <View style={styles.hr}/>
        
                    <View style={styles.modalRow}>
                      <Text style={styles.modalLabel}>Descripción:</Text>
                      <TextInput style={{...styles.query, width: 150}}/>
                    </View>
                    <View style={styles.modalRow}>
                      <Text style={styles.modalLabel}>Marca:</Text>
                      <TextInput style={{...styles.query, width: 150}}/>
                    </View>
                    <View style={styles.modalRow}>
                      <Text style={styles.modalLabel}>Costo:</Text>
                      <TextInput style={{...styles.query, width: 150}}/>
                    </View>
        
                    <View style={styles.hr}/>
        
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                      <TouchableHighlight
                      underlayColor={'#82ff92'} style={styles.modalConfirm}
                        onPress={() => setModalVisible(!modalVisible)}>
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
                  <View style={styles.modalView}>
        
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                      <TouchableHighlight
                      underlayColor={'#ccc'}
                      onPress={() => setEModalVisible(!EmodalVisible)}>
                      <Image source={x} style={styles.lupaImage}/>
                      </TouchableHighlight>
                    </View>
        
                    <View>
                      <Text style={styles.modalTitle}>Editar producto</Text>
                    </View>
        
                    <View style={styles.hr}/>
        
                    <View style={styles.modalRow}>
                      <Text style={styles.modalLabel}>Descripción:</Text>
                      <TextInput style={{...styles.query, width: 150}}/>
                    </View>
                    <View style={styles.modalRow}>
                      <Text style={styles.modalLabel}>Marca:</Text>
                      <TextInput style={{...styles.query, width: 150}}/>
                    </View>
                    <View style={styles.modalRow}>
                      <Text style={styles.modalLabel}>Costo:</Text>
                      <TextInput style={{...styles.query, width: 150}}/>
                    </View>
        
                    <View style={styles.hr}/>
        
                    <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                      <TouchableHighlight
                      underlayColor={'#f3fe53'} style={styles.modalEdit}
                        onPress={() => setEModalVisible(!EmodalVisible)}>
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
                      underlayColor={'#ddd'} style={styles.modalRegret}
                        onPress={() => setConfirm(!Confirm)}>
                        <Text>NO</Text>
                      </TouchableHighlight>
                      <TouchableHighlight
                      underlayColor={'#ff9797'} style={styles.modalDelete}
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

      <ScrollView>
        <View style={styles.scroll}>
        <Text style={{  fontSize: 25, fontWeight: 'bold' }}>
          Lista de precios
        </Text>
        <Text style={{ 
          fontSize: 15, 
          paddingVertical: 10,}}>
          Inserte un grupo de productos. 
          Seleccione la descripción de un producto en la tabla para modificar sus datos.
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
                onPress={() => setModalVisible(true)}
                style={styles.add}>
                    <Text style={{fontWeight: 'bold'}}>Añadir producto</Text>
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
    marginHorizontal: 30, marginVertical: 265,
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
    width: 135,
    justifyContent: 'center', alignItems: 'center',
  },
  modalDelete: {
    backgroundColor: '#ff8787',
    padding: 10,
    borderRadius: 15,
    width: 135,
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
