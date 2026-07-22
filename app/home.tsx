import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, TouchableOpacity, Modal, Image} from 'react-native';
import Constants from 'expo-constants';
import type { homeScreenProps } from './types';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function Dashboard({navigation}: homeScreenProps ) {
  
  const {colors} = useTheme()
  const styles = getStyles(colors);
  const [modalVisible, setModalVisible] = useState(false);

  const getImage = (nombre: any) => {
   return require('../assets/homeImage.webp');
  }

  return (
    <View style={styles.container}>
      <StatusBar style='light'  />

    {/* Modal para añadir proveedores */}
            <Modal
                  animationType="fade"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    setModalVisible(!modalVisible);
                  }}>
                  <View style={styles.modalOverlay}>
                  <View style={styles.modalView}>
        
                    <View>
                      <Text style={styles.modalTitle}>Acerca de MasAdmin</Text>
                    </View>
        
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
        
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                      <TouchableOpacity style={styles.modalOK}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={{color: colors.text, fontSize: 20}}>OK</Text>
                      </TouchableOpacity>
                      </View>
        
                  </View>
                  </View>
                </Modal>

      {/* Pantalla */ }
      <View style={styles.navigation}>
        <TouchableOpacity style={styles.navButton}
        onPress={() => setModalVisible(true)} 
      >
        <Text style={{color: colors.background, fontWeight: 'bold'}}>Acerca de</Text></TouchableOpacity>
    </View>

      <ScrollView>
        <View style={styles.scroll}>
        <Text style={{ fontSize: 40, fontWeight: 'bold', 
          color: colors.primary, paddingBottom: 10, textAlign: 'center',}}>
        ¡Bienvenido a MasAdmin!
        </Text>

        <Image source={getImage('homeImage')} style={{height: 300, width: 300, alignSelf: 'center'}}/>

        <View style={styles.ButtonRow}>
            <TouchableHighlight
            underlayColor={colors.primaryUnderlay} style={styles.Button}
            onPress={() => navigation.navigate("signup")}
            >
                <Text style={styles.ButtonText}>Acceder</Text>
            </TouchableHighlight>
            <TouchableHighlight
            underlayColor={colors.primaryUnderlay} style={styles.Button}
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

const getStyles = (colors: any) => StyleSheet.create({
  container:{
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: colors.background
  },
  navigation: {
    backgroundColor: colors.primary,
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
    paddingVertical: 20,
  },
  Button:{
    backgroundColor: colors.primary,
    padding: 15, 
    borderRadius: 25,
  },
  ButtonText:{
    color: colors.background, 
    fontSize: 20,
  },
  scroll: {
    flex: 1,
    backgroundColor: colors.scrollBackground,
    paddingHorizontal: 20, paddingVertical: 50,
    justifyContent: 'center',
  },
  //Modal estilos
   modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  justifyContent: 'center', alignItems: 'center',
},
modalView: {
  maxWidth: 350,
  padding: 12,
  backgroundColor: colors.modalBackground,
  borderRadius: 20,
},
  modalTitle: {
    color: colors.primary,
    fontSize: 30, fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalParagraph:{
    fontSize: 20, 
    paddingBottom: 20,
    textAlign: 'justify',
    color: colors.text
  },
  modalOK: {
    backgroundColor: colors.regret,
    padding: 10, borderRadius: 20,
  },
});
