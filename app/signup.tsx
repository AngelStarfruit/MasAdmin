import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import Constants from 'expo-constants';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NoEmojis, Validar } from './backend';
//import { obtenerUsuarios } from './backend';
import type { signupScreenProps } from './types';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

import datos from './datos.json';

export default function Dashboard({ navigation }: signupScreenProps) {

  //const API_URL = 'https://tu-servidor-masadmin.com/api';

  const { theme, colors } = useTheme();
  const styles = getStyles(colors);

  // Cuando el usuario inicia sesión:
 /* const guardarUsuario = async (usuario: any, token: string, empresa: any) => {
    try {
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('usuario', JSON.stringify(usuario));
      await AsyncStorage.setItem('idUsuario', id);
      await AsyncStorage.setItem('idEmpresa', usuario[7]);
    } catch (error) {
      console.log('Error guardando usuario', error);
    }
  };*/

  // Cuando el usuario inicia sesión:
  const guardarUsuario = async (usuario: any, id: string) => {
    try {
      await AsyncStorage.setItem('usuarioSesion', JSON.stringify(usuario));
      await AsyncStorage.setItem('idUsuario', id);
    } catch (error) {
      console.log('Error guardando usuario', error);
    }
  };

  const [nombreUsuario, setNombreUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [idEmpresa, setIdEmpresa] = useState('');
  const [usuarios, setUsuarios] = useState<Record<string, any>>(datos.USUARIOS);
  const [textVisible, setTextVisible] = useState(0);
  const [hidePassword, setHidePassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  /*const iniciarSesion = async () => {
  // Validar campos
  const validation = Validar(3, nombreUsuario, contrasena, idEmpresa, '');
  if (!validation.isValid) {
    Alert.alert('Error', validation.message);
    return;
  }

  setIsLoading(true);
  setTextVisible(0);

  try {
    // Petición al backend de MasAdmin
    const response = await fetch(`${API_URL}/usuarios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        usuario: nombreUsuario.trim(),
        contrasena: contrasena,
        idEmpresa: idEmpresa.trim(),
      }),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      const usuario = data.usuario;
      const id = data.id || Object.keys(usuarios).find(key => 
        JSON.stringify(usuarios[key]) === JSON.stringify(usuario)
      ) || '1';
      
      // Guardar token, usuario, ID e ID empresa
      await guardarUsuario(usuario, data.token, id);
      
      // Navegar al Dashboard
      navigation.navigate("Dashboard");
      setNombreUsuario('');
      setContrasena('');
      setIdEmpresa('');
    } else {
      setTextVisible(1);
      Alert.alert('Error', data.message || 'Datos incorrectos.');
    }
  } catch (error) {
    console.log('Error de conexión:', error);
    Alert.alert('Error', 'No se pudo conectar con el servidor');
  } finally {
    setIsLoading(false);
  }
};*/

  return (
    <View style={styles.container}>
      <StatusBar style={theme === 'oscuro' ? 'light' : 'dark'} />

      <View style={styles.navigation}>
        <TouchableHighlight
          underlayColor={colors.primaryUnderlay}
          style={styles.navButton}
          onPress={() => navigation.navigate("home")}
        >
          <Ionicons name="arrow-back" size={30} color={colors.text} />
        </TouchableHighlight>
      </View>

      <ScrollView>
        <View style={styles.scroll}>
          <View style={styles.box}>
            <Text style={{
              fontSize: 30, fontWeight: 'bold', color: colors.primary,
              textAlign: 'center',
            }}>
              Inicie sesión
            </Text>
            <View style={styles.Card}>
              <Text style={styles.CardText}>
                ID Empresa:
              </Text>
              <TextInput
                style={styles.input}
                value={idEmpresa}
                onChangeText={(text) => setIdEmpresa(NoEmojis(text))}
              />
              <Text style={styles.CardText}>
                Nombre de usuario:
              </Text>
              <TextInput
                style={styles.input}
                value={nombreUsuario}
                onChangeText={(text) => setNombreUsuario(NoEmojis(text))}
              />
              <Text style={styles.CardText}>
                Contraseña:
              </Text>
              <View style={styles.row}>
                <TextInput
                  style={[styles.input, { width: 280 }]}
                  value={contrasena}
                  onChangeText={setContrasena}
                  secureTextEntry={hidePassword}
                />
                <TouchableOpacity
                  onPress={() => setHidePassword(!hidePassword)}
                >
                  <Ionicons name={hidePassword ? "eye-outline" : "eye-off-outline"} size={20} color="#777" />  
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.Card}>
              <TouchableHighlight
                underlayColor={colors.enterUnderlay}
                style={[styles.Button, isLoading && styles.ButtonDisabled]}
                onPress={() => { //<-----O simplemente la función iniciar sesión
                  const validation = Validar(3, nombreUsuario, contrasena, idEmpresa, '');
                  if (!validation.isValid) {
                    Alert.alert('Error', validation.message);
                    return;
                  } else {
                    // Buscar el usuario por nombre de usuario y contraseña
                    const usuarioEncontrado = Object.values(usuarios).find(
                      (usuario: any) => usuario[4] === nombreUsuario.trim() && 
                      usuario[5] === contrasena && usuario[7] === idEmpresa.trim()
                    );

                    if (usuarioEncontrado) {
                      // Encontrar el ID del usuario
                      let id = '';
                      for (const [key, value] of Object.entries(usuarios)) {
                        if (JSON.stringify(value) === JSON.stringify(usuarioEncontrado)) {
                          id = key;
                          break;
                        }
                      }
                      // Guardar usuario e ID
                      guardarUsuario(usuarioEncontrado, id);
                      navigation.navigate("Dashboard");
                      setIdEmpresa('');  setContrasena('');  setNombreUsuario('');
                    } else {
                      setTextVisible(1);
                      setIdEmpresa('');  setContrasena('');  setNombreUsuario('');
                    }
                  }
                }}
                disabled={isLoading}
              >
                <Text style={styles.ButtonText}>Iniciar sesión</Text>
              </TouchableHighlight>
              <Text style={{ textAlign: 'center', marginTop: 20, color: 'red', opacity: textVisible }}>
                Correo o contraseña incorrectos
              </Text>
              <Text style={{ textAlign: 'center', color: colors.text }}>
                ¿Es nuevo?
                <Text style={styles.LinkText} onPress={() => navigation.navigate("register")}>
                  Registrese
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const getStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: colors.headerCell,
  },
  navigation: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  navButton: {
    borderRadius: 25,
  },
  Button: {
    backgroundColor: colors.enter,
    padding: 15,
    borderRadius: 25,
    width: '70%',
    alignSelf: 'center',
  },
  ButtonDisabled: {
    opacity: 0.6,
  },
  ButtonText: {
    color: colors.text,
    textAlign: 'center',
    fontSize: 20,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingVertical: 100,
  },
  box: {
    borderRadius: 20,
    backgroundColor: colors.background,
    paddingVertical: 25,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  Card: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  CardText: {
    fontSize: 20,
    color: colors.text,
  },
  input: {
    backgroundColor: colors.input,
    padding: 10, marginBottom: 15,
    color: colors.text,
  },
  LinkText: {
    color: colors.primary, textAlign: 'center',
  },
});