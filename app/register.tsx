import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, TouchableOpacity, TextInput, Image, Alert, KeyboardAvoidingView, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Constants from 'expo-constants';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { NoEmojis, Validar, AddUsuario } from './backend';
import type { registerScreenProps } from './types';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import datos from './datos.json'

export default function Dashboard({navigation}: registerScreenProps ) {

  const {theme, colors} = useTheme()
  const styles = getStyles(colors);

  const [nombre, setNombre] = useState('');
  const [genero, setGenero] = useState('hombre');
  const [telefono, setTelefono] = useState('');
  const [fecha, setFecha] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const DOnChange = (event: any, selectedDate: any) => {
    setShowPicker(false);
    if (selectedDate) {
      setFecha(selectedDate);
    }
  };

  const [usuarios, setUsuarios] = useState(datos.USUARIOS)

  const [id, setId] = useState(Object.keys(usuarios).length + 1)

  const [hidePassword, setHidePassword] = useState(true)

  return (
    <View style={styles.container}>
      <StatusBar style={theme === 'oscuro' ? 'light' : 'dark'} />

      <View style={styles.navigation}>
        <TouchableHighlight
        underlayColor={colors.primaryUnderlay} style={styles.navButton}
        onPress={() => navigation.navigate("home")} 
      >
        <Ionicons name="arrow-back" size={25} color={colors.text} />
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
                    fontWeight: 'bold', color: colors.primary, 
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
                    Género:
                </Text>
                <Picker
                  selectedValue={genero}
                  onValueChange={(itemValue) => setGenero(itemValue)}
                  style={styles.picker} itemStyle={styles.pickerItem}
                >
                  <Picker.Item label="Hombre" value="hombre" />
                  <Picker.Item label="Mujer" value="mujer" />
                </Picker>
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
                    Nombre de usuario:
                </Text>
                <TextInput style={styles.input} 
                  value={nombreUsuario} onChangeText={(text) => setNombreUsuario(NoEmojis(text))}/>
                <Text style={styles.CardText}>
                    Contraseña:
                </Text>
                <View style={styles.row}>
                  <TextInput style={[styles.input, {width: 280}]}
                   value={contrasena} onChangeText={setContrasena}
                  secureTextEntry={hidePassword} />
                  <TouchableOpacity 
                  onPress={() => setHidePassword(!hidePassword)}>
                  <Ionicons name={hidePassword ? "eye-outline" : "eye-off-outline"} size={20} color="#777" />  
                  </TouchableOpacity>
                  </View>
            </View>
            <View style={styles.Card}>
                <TouchableHighlight
                underlayColor={colors.enterUnderlay} style={styles.Button}
                onPress={() => {
                          const validation = Validar(4,nombre,telefono,nombreUsuario,contrasena);
                            if (!validation.isValid) {
                            Alert.alert('Error', validation.message);
                                return; 
                            }
                            setNombre(''); setTelefono(''); setNombreUsuario(''); setContrasena('')
                            setUsuarios(AddUsuario(usuarios,id,nombre,genero,telefono,String(fecha),nombreUsuario,contrasena,''))
                  navigation.navigate("signup");
                Alert.alert("Éxito", "Usuario registrado con exito. Contactenos para obtener una ID de empresa.")
              }}
                >
                    <Text style={styles.ButtonText}>Registrarse</Text>
                </TouchableHighlight>
                <Text style={{textAlign: 'center', marginTop: 30, color: colors.text}}>
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

const getStyles = (colors: any) => StyleSheet.create({
  container:{
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: colors.headerCell,
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
    width: '50%',
    alignSelf: 'center',
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
  },
  row: {flexDirection: 'row',},
  box:{
    marginVertical: 0,
    flex: 1,
    borderRadius: 20,
    backgroundColor: colors.background,
    fontWeight: 'bold', 
    paddingVertical: 30, paddingHorizontal: 5,
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
     color: colors.text
  },
  LinkText:{
    color: colors.primary,
    fontWeight: 'bold',
    textAlign: 'center',
  },
   picker: {
    height: 50,
    marginBottom: 15,
    flex: 1,
    backgroundColor: colors.input, color: colors.text,
  },
  pickerItem: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
