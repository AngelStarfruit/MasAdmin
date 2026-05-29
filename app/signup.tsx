import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, TextInput, Image} from 'react-native';
import Constants from 'expo-constants';
import { useState } from 'react';
import { NoEmojis } from './backend';
import type { signupScreenProps } from './types';

export default function Dashboard({navigation}: signupScreenProps ) {

  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');

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
                <TextInput style={styles.input}
                  value={contrasena} onChangeText={setContrasena}
                 secureTextEntry />
            </View>
            <View style={styles.Card}>
                <TouchableHighlight
                underlayColor={"#ff9f9f"} style={styles.Button}
                onPress={() => navigation.navigate("Dashboard")}
                >
                    <Text style={styles.ButtonText}>Iniciar sesión</Text>
                </TouchableHighlight>
                <Text style={{textAlign: 'center', marginTop: 30}}
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
     color: 'black',
  },
  LinkText:{
    color: '#2435f0',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
