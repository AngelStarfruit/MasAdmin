import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, ScrollView, TouchableHighlight} from 'react-native';
import Constants from 'expo-constants';

export default function Dashboard() {


  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.navigation}>
        <TouchableHighlight
        underlayColor={"#414ff1"} style={styles.navButton}
        onPress={() => alert("acerca de")} 
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
            onPress={() => alert("Log in")}
            >
                <Text style={styles.ButtonText}>Acceder</Text>
            </TouchableHighlight>
            <TouchableHighlight
            underlayColor={"#414ff1"} style={styles.Button}
            onPress={() => alert("Sign up")}
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
});
