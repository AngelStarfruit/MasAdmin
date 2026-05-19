import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, ScrollView, TouchableHighlight, TextInput} from 'react-native';
import Constants from 'expo-constants';

export default function Dashboard() {


  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.navigation}>
        <TouchableHighlight
        underlayColor={"#414ff1"} style={styles.navButton}
        onPress={() => alert("back")} 
      >
        <Text style={{color: 'white', fontWeight: 'bold'}}>B</Text></TouchableHighlight>
    </View>

      <ScrollView>
        <View style={styles.scroll}>
        
            <View style={styles.box}>
                <Text style={{fontSize: 30, 
                    fontWeight: 'bold', color: '#2435f0', 
                    textAlign: 'center',}}>
                    Regístrese
                </Text>
                <View style={styles.Card}>
                <Text style={styles.CardText}>
                    Email:
                </Text>
                <TextInput style={styles.input} placeholder="Ingrese su email" />
                <Text style={styles.CardText}>
                    Contraseña:
                </Text>
                <TextInput style={styles.input} placeholder="Ingrese su contraseña" secureTextEntry />
                <Text style={styles.CardText}>
                    Nombre completo:
                </Text>
                <TextInput style={styles.input} placeholder="Ingrese su nombre completo" />
            </View>
            <View style={styles.Card}>
                <TouchableHighlight
                underlayColor={"#ff9f9f"} style={styles.Button}
                onPress={() => alert("Registrarse")}
                >
                    <Text style={styles.ButtonText}>Registrarse</Text>
                </TouchableHighlight>
                <Text style={{textAlign: 'center', marginTop: 30}}
                >Ya tiene una cuenta? 
                    <Text style={styles.LinkText} onPress={() => alert("Iniciar sesión")}>Iniciar sesión</Text>
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
    width: '50%',
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
    paddingVertical: 90,
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
  },
  LinkText:{
    color: '#2435f0',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
