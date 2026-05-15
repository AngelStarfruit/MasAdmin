import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, ScrollView, TouchableHighlight} from 'react-native';
import Constants from 'expo-constants';

export default function Compras() {

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.navigation}>
      <TouchableHighlight
        underlayColor={"#ddf"} style={styles.navIcons}
        onPress={() => alert("1")}
      >
        <Text>D</Text></TouchableHighlight>
      <TouchableHighlight
        underlayColor={"#ddf"} style={styles.navIcons}
        onPress={() => alert("2")}
      >
        <Text>C</Text></TouchableHighlight>
        <TouchableHighlight
        underlayColor={"#ddf"} style={styles.navIcons}
        onPress={() => alert("3")}
      >
        <Text>V</Text></TouchableHighlight>
      <TouchableHighlight
        underlayColor={"#ddf"} style={styles.navIcons}
        onPress={() => alert("4")} 
      >
        <Text>S</Text></TouchableHighlight>
        <TouchableHighlight
        underlayColor={"#ddf"} style={styles.navIcons}
        onPress={() => alert("5")} 
      >
        <Text>A</Text></TouchableHighlight>
        <TouchableHighlight
        underlayColor={"#ddf"} style={styles.navIcons}
        onPress={() => alert("6")} 
      >
        <Text>$</Text></TouchableHighlight>
    </View>
      
        <View style={styles.space}>
        <TouchableHighlight 
        underlayColor={'#0015cd'}
        onPress={() => alert("alvin")}
        style={styles.touch}>
          <Text style={styles.touchText}>Almacenes</Text>
          </TouchableHighlight>
          <TouchableHighlight 
        underlayColor={'#0015cd'}
        onPress={() => alert("simon")}
        style={styles.touch}>
          <Text style={styles.touchText}>Existencias por almacen</Text>
          </TouchableHighlight>
          <TouchableHighlight 
        underlayColor={'#0015cd'}
        onPress={() => alert("teodoro")}
        style={styles.touch}>
          <Text style={styles.touchText}>Ajustes de inventario</Text>
          </TouchableHighlight>
        </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  navigation: {
    backgroundColor: "white",
    flexDirection: 'row', justifyContent: 'space-around',
    padding: 5,
  },
  navIcons:{
    padding: 10, 
    borderRadius: 50 ,
  },
  space: {
    flex: 1,
    backgroundColor: '#eee',
    padding: 18,
  },
  touch: {
    flex: 1,
    textAlign: 'center',
    backgroundColor: '#0012a8',
    marginVertical: 40, marginHorizontal: 80,
    padding: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchText: {
    color: 'white',
    fontWeight: 'bold', fontSize: 30,
    textAlign: 'center',
  },
});
