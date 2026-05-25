import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, ScrollView, TouchableHighlight, Modal} from 'react-native';
import Constants from 'expo-constants';
import type { homeScreenProps } from './types';
import { useState } from 'react';

export default function Dashboard({navigation}: homeScreenProps ) {

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

    {/* Modal para añadir proveedores */}
            <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                  }}>
                  <View style={styles.modalOverlay}>
                  <View style={styles.modalView}>
        
                    <View>
                      <Text style={styles.modalTitle}>Acerca de MasAdmin</Text>
                    </View>
        
                    <View style={styles.hr}/>
        
                    <View>
                      <Text style={styles.modalParagraph}>
                        MasAdmin ERP Web es un poderoso sistema de gestión comercial por Internet, 
                        que le permite consolidar en tiempo real las operaciones de ventas, compras,
                         almacenes, contabilidad, bancos y toda la información de las sucursales, 
                        departamentos y recursos humanos de su Empresa.
                        </Text>
                         <Text style={styles.modalParagraph}>
                        Esta aplicación le permite tener acceso desde su dispositivo a los datos más
                        importantes de su empresa, como ventas, compras, stock, etc. Junto con otras 
                        funcionalidades.
                        </Text>
                    </View>
        
                    <View style={styles.hr}/>
        
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                      <TouchableHighlight
                      underlayColor={'#ddd'} style={styles.modalOK}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Text>OK</Text>
                      </TouchableHighlight>
                      </View>
        
                  </View>
                  </View>
                </Modal>

      {/* Pantalla */ }
      <View style={styles.navigation}>
        <TouchableHighlight
        underlayColor={"#414ff1"} style={styles.navButton}
        onPress={() => setModalVisible(true)} 
      >
        <Text style={{color: 'white', fontWeight: 'bold'}}>Acerca de</Text></TouchableHighlight>
    </View>

      <ScrollView>
        <View style={styles.scroll}>
        <Text style={{ fontSize: 40, fontWeight: 'bold', 
          color: '#2435f0', paddingBottom: 10, textAlign: 'center',}}>
        ¡Bienvenido a MasAdmin!
        </Text>
        <View style={styles.ButtonRow}>
            <TouchableHighlight
            underlayColor={"#414ff1"} style={styles.Button}
            onPress={() => navigation.navigate("signup")}
            >
                <Text style={styles.ButtonText}>Acceder</Text>
            </TouchableHighlight>
            <TouchableHighlight
            underlayColor={"#414ff1"} style={styles.Button}
            onPress={() => navigation.navigate("register")}
            >
                <Text style={styles.ButtonText}>Registrarse</Text>
            </TouchableHighlight>
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
    backgroundColor: "#2435f0",
    flexDirection: 'row', 
    paddingHorizontal: 5, paddingVertical: 10,
  },
  navButton:{
    padding: 10, 
    borderRadius: 25 ,
  },
  ButtonRow:{
    flexDirection: 'row', 
    justifyContent: 'space-evenly', 
    alignItems: 'center',
    paddingVertical: 20,
  },
  Button:{
    backgroundColor: "#2435f0",
    padding: 15, 
    borderRadius: 25 ,
    
  },
  ButtonText:{
    color: 'white', 
    fontWeight: 'bold',
    fontSize: 20,
  },
  scroll: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20, paddingVertical: 50,
    justifyContent: 'center',
    textAlignVertical: 'center',
  },
  //Modal estilos
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  modalView: {
    marginHorizontal: 30, marginVertical: 140,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
  },
  modalTitle: {
    color: '#2435f0',
    fontSize: 30, fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalParagraph:{
    fontSize: 20,
    paddingBottom: 20,
    textAlign: 'justify',
  },
   hr:{
    height: 2, 
    backgroundColor: '#bbb', 
    marginBottom: 15,
  },
  modalLabel:{
    fontSize: 20, fontWeight: 'bold',
  },
  modalOK: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 15,
    width: 50,
    justifyContent: 'center', alignItems: 'center',
  },
});
