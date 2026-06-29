import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, TouchableOpacity, TextInput, Image,Alert} from 'react-native';
import Constants from 'expo-constants';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NoEmojis, Validar } from './backend';
import type { signupScreenProps } from './types';
import datos from './datos.json'

export default function Dashboard({navigation}: signupScreenProps ) {

  // Cuando el usuario inicia sesión:
  const guardarUsuario = async (usuario: any) => {
    try {
      await AsyncStorage.setItem('usuarioSesion', JSON.stringify(usuario));
    } catch (error) {
      console.log('Error guardando usuario', error);
    }
};

  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');

  const [usuarios, setUsuarios] = useState(datos.USUARIOS)

  const [textVisible, setTextVisible] = useState(0);
  const [hidePassword, setHidePassword] = useState(true)

  const getImage = (nombre: any) => {
    switch(nombre) {
      case 'B': return require('../assets/BL.png');
      default: return require('../assets/ojo.png');
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.navigation}>
        <TouchableHighlight
        underlayColor={"#414ff1"} style={styles.navButton}
        onPress={() => navigation.navigate("home")} 
      >
        <Image source={getImage('B')} style={{ width: 20, height: 20 }} />
      </TouchableHighlight>
    </View>

      <ScrollView>
        <View style={styles.scroll}>
        
            <View style={styles.box}>
                <Text style={{fontSize: 30, 
                    fontWeight: 'bold', color: '#2435f0', 
                    textAlign: 'center',}}>
                    Inicie sesión
                </Text>
                <View style={styles.Card}>
                <Text style={styles.CardText}>
                    Email:
                </Text>
                <TextInput style={styles.input}
                  value={email} onChangeText={(text) => setEmail(NoEmojis(text))}
                />
                <Text style={styles.CardText}>
                    Contraseña:
                </Text>
                <View style={styles.row}>
                <TextInput style={[styles.input, {width: 280}]}
                  value={contrasena} onChangeText={setContrasena}
                 secureTextEntry={hidePassword} />
                 <TouchableOpacity 
                  onPress={() => setHidePassword(!hidePassword)}>
                  <Image source={getImage('ojo')} style={{ width: 20, height: 20, opacity: 0.5 }} />
                </TouchableOpacity>
                </View>
            </View>
            <View style={styles.Card}>
                <TouchableHighlight
                underlayColor={"#ff9f9f"} style={styles.Button}
                // En el onPress del botón "Iniciar sesión"
                onPress={() => {
                const validation = Validar(2, email, contrasena, '', '');
                  if (!validation.isValid) {
                  Alert.alert('Error', validation.message);
                  return;
                  } else {
                    const usuarioEncontrado = Object.values(usuarios).find(
                    (usuario: any) => usuario[4] === email.trim() && usuario[5] === contrasena
                    );
    
                    if (usuarioEncontrado) {
                    guardarUsuario(usuarioEncontrado);
                    navigation.navigate("Dashboard");
                    setEmail('');
                    setContrasena('');
                    } else {
                    setTextVisible(1);
                    }
                    }
                    }}>
                    <Text style={styles.ButtonText}>Iniciar sesión</Text>
                </TouchableHighlight>
                <Text style={{textAlign: 'center', marginTop: 30, color: 'red', opacity: textVisible}}>
                  Correo o contraseña incorrectos
                </Text>
                <Text style={{textAlign: 'center'}}
                >¿Es nuevo?
                    <Text style={styles.LinkText} onPress={() => navigation.navigate("register")}>
                      Registrese</Text>
                    </Text>
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
    backgroundColor: "#2435f0",
  },
  navigation: {
    
    flexDirection: 'row', 
    paddingHorizontal: 5, paddingVertical: 10,
  },
  navButton:{
    padding: 10, 
    borderRadius: 25 ,
  },
  Button:{
    backgroundColor: "#fc8a8a",
    padding: 15, 
    borderRadius: 25 ,
    width: '70%',
    alignSelf: 'center',
    elevation: 5,
    shadowColor: "#000", shadowOffset: {height: 2, width: 0,}
  },
  ButtonText:{
    color: 'black', 
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingVertical: 120,
  },
  box:{
    flex: 1,
    borderRadius: 20,
    backgroundColor: 'white',
    fontWeight: 'bold', 
    paddingVertical: 30, paddingHorizontal: 5,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      height: 2, width: 0,
    }
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  Card:{
    flex: 1,
    paddingHorizontal: 20, paddingVertical: 10,
  },
  CardText:{
    fontSize: 20,  color: 'black',
  },
  input:{
    backgroundColor: '#eee',
    padding: 10,
     marginBottom: 15,
     color: 'black',
  },
  LinkText:{
    color: '#2435f0',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
