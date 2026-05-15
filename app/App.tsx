import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, 
          Pressable, ScrollView, TouchableHighlight} from 'react-native';
import Constants from 'expo-constants';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

    <View style={{paddingLeft: 10}}>
      <Text style={{
        fontSize:30,
        fontWeight: 'bold',
        color: '#2435f0',
      }}>MasAdmin</Text>
    </View>
      <View style={styles.navigation}>
      <TouchableHighlight
        underlayColor={"#ddf"} style={styles.navIcons}
        onPress={() => alert("1")}
      >
        <Text>1</Text></TouchableHighlight>
      <TouchableHighlight
        underlayColor={"#ddf"} style={styles.navIcons}
        onPress={() => alert("2")}
      >
        <Text>2</Text></TouchableHighlight>
        <TouchableHighlight
        underlayColor={"#ddf"} style={styles.navIcons}
        onPress={() => alert("3")}
      >
        <Text>3</Text></TouchableHighlight>
      <TouchableHighlight
        underlayColor={"#ddf"} style={styles.navIcons}
        onPress={() => alert("4")} 
      >
        <Text>4</Text></TouchableHighlight>
        <TouchableHighlight
        underlayColor={"#ddf"} style={styles.navIcons}
        onPress={() => alert("5")} 
      >
        <Text>5</Text></TouchableHighlight>
    </View>

      <ScrollView>
        <View style={styles.scroll}>
        <Text style={{ 
          fontSize: 25, 
          fontWeight: 'bold' 
          }}>
          Dashboard
          </Text>
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
    backgroundColor: "white",
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 5,
  },
  navIcons:{
    padding: 10, 
    borderRadius: 50 ,
  },
  scroll: {
    flex: 1,
    backgroundColor: '#eee',
    padding: 20,
  }
});
