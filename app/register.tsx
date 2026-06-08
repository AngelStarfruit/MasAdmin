import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, TextInput, Image, Alert, KeyboardAvoidingView, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Constants from 'expo-constants';
import { useState } from 'react';
import { NoEmojis, Validar } from './backend';
import type { registerScreenProps } from './types';

export default function Dashboard({navigation}: registerScreenProps ) {

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
   return require('../assets/BL.png');
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.navigation}>
        <TouchableHighlight
        underlayColor={"#414ff1"} style={styles.navButton}
        onPress={() => navigation.navigate("home")} 
      >
        <Image source={getImage('BL')} style={{ width: 20, height: 20 }} />
        </TouchableHighlight>
    </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
         style={{ flex: 1 }}
      >
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.scroll}>
        
            <View style={styles.box}>
                <Text style={{fontSize: 30, 
                    fontWeight: 'bold', color: '#2435f0', 
                    textAlign: 'center',}}>
                    Regístrese
                </Text>
                <View style={styles.Card}>
                  <Text style={styles.CardText}>
                    Nombre completo:
                </Text>
                <TextInput style={styles.input} 
                  value={nombre} onChangeText={(text) => setNombre(NoEmojis(text))}/>
                <Text style={styles.CardText}>
                    Teléfono:
                </Text>
                <TextInput style={styles.input} 
                  value={telefono} onChangeText={(text) => setTelefono(NoEmojis(text))}/>
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
                  value={email} onChangeText={(text) => setEmail(NoEmojis(text))}/>
                <Text style={styles.CardText}>
                    Contraseña:
                </Text>
                <TextInput style={styles.input} 
                  value={contrasena} onChangeText={setContrasena}
                  secureTextEntry />
            </View>
            <View style={styles.Card}>
                <TouchableHighlight
                underlayColor={"#ff9f9f"} style={styles.Button}
                onPress={() => {
                          const validation = Validar(4,nombre,telefono,email,contrasena);
                            if (!validation.isValid) {
                            Alert.alert('Error', validation.message);
                                return; 
                            }
                            setNombre(''); setTelefono(''); setEmail(''); setContrasena('')
                  navigation.navigate("signup");
                Alert.alert("Éxito", "Usuario registrado con exito")
              }}
                >
                    <Text style={styles.ButtonText}>Registrarse</Text>
                </TouchableHighlight>
                <Text style={{textAlign: 'center', marginTop: 30}}>
                  Ya tiene una cuenta? 
                    <Text style={styles.LinkText} onPress={() => navigation.navigate("signup")}>
                      Iniciar sesión</Text>
                    </Text>
            </View>
            </View>
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
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
    width: '50%',
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
  },
  box:{
    marginVertical: 20,
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
    borderRadius: 5,
     marginBottom: 15,
     color: 'black'
  },
  LinkText:{
    color: '#2435f0',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
