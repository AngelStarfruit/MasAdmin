import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, TouchableOpacity, TextInput, Image,Alert} from 'react-native';
import Constants from 'expo-constants';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NoEmojis, Validar } from './backend';
import type { signupScreenProps } from './types';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import datos from './datos.json'

export default function Dashboard({navigation}: signupScreenProps ) {

  const {theme, colors} = useTheme()
  const styles = getStyles(colors);
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
      <StatusBar style={theme === 'oscuro' ? 'dark' : 'light'}  />

      <View style={styles.navigation}>
        <TouchableHighlight
        underlayColor={colors.primaryUnderlay} style={styles.navButton}
        onPress={() => navigation.navigate("home")} 
      >
        <Image source={getImage('B')} style={{ width: 20, height: 20 }} />
      </TouchableHighlight>
    </View>

      <ScrollView>
        <View style={styles.scroll}>
        
            <View style={styles.box}>
                <Text style={{fontSize: 30, 
                    fontWeight: 'bold', color: colors.primary, 
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
                underlayColor={colors.enterUnderlay} style={styles.Button}
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
                <Text style={{textAlign: 'center', color: colors.text}}
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

const getStyles = (colors: any) => StyleSheet.create({
  container:{
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: colors.primary,
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
    backgroundColor: colors.enter,
    padding: 15, 
    borderRadius: 25 ,
    width: '70%',
    alignSelf: 'center',
    elevation: 5,
    shadowColor: "#000", shadowOffset: {height: 2, width: 0,}
  },
  ButtonText:{
    color: colors.text, 
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
    backgroundColor: colors.background,
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
    fontSize: 20,  color: colors.text,
  },
  input:{
    backgroundColor: colors.input,
    padding: 10,
     marginBottom: 15,
     color: colors.text,
  },
  LinkText:{
    color: colors.primary,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
