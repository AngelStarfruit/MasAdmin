import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, Image, Modal} from 'react-native';
import Constants from 'expo-constants';
import { useState } from 'react';
import type { ControlVentasScreenProps } from './types';
import { useTheme } from '../../context/ThemeContext';
import datos from './datos.json'

export default function ControlVentas({ navigation }: ControlVentasScreenProps ) {

  const { theme, colors } = useTheme();
  const styles = getStyles(colors);

  const getImage = (nombre: any) => {
   return require('../../assets/B.png');
  }

  const [registrosVenta, setRegistrosVenta] = useState(datos.CONTROL_VENTAS || {})

  return (
    <View style={styles.container}>
      <StatusBar style={theme === 'oscuro' ? 'light' : 'dark'}  />

      <View style={styles.navigation}>
        <TouchableHighlight
        underlayColor={colors.navIconUnderlay} style={styles.navIcons}
        onPress={() => navigation.navigate("Ventas")} 
      >
        <Image source={getImage('B')} style={styles.navIconImage}/>
      </TouchableHighlight>
    </View>

      {/*ScrollView*/}
      <ScrollView>
        <View style={styles.scroll}>
        <Text style={{  fontSize: 25, fontWeight: 'bold', color: colors.text }}>
        Control de ventas
        </Text>
        <TouchableHighlight 
        underlayColor={colors.cellUnderlay}
        onPress={() => navigation.navigate("AddRegistroVenta")}
        style={styles.add}>
            <Text style={{fontWeight: 'bold', color: colors.text}}>Añadir registro de venta</Text>
          </TouchableHighlight>
        <View style={styles.table}>
              <View style={styles.row}>
                  <View style={styles.cell}>
                      <Text style={styles.headerText}>Fecha</Text>
                      </View>
                  <View style={styles.cell}>
                      <Text style={styles.headerText}>Total ganado</Text>
                      </View>
                  <View style={styles.cell}>
                      <Text style={styles.headerText}>Cliente</Text>
                      </View>
                  </View>

                {Object.values(registrosVenta || {}).length > 0 ? (
                Object.entries(registrosVenta).map(([id, data]: [string, any]) => {
                  const [fecha, total, cliente] = data;
                  return(
                      <View key={id} style={styles.row}>
                      <View style={styles.cell}><Text style={styles.text}>{fecha.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3/$2/$1')}</Text></View>
                      <View style={styles.cell}><Text style={styles.text}>{Number(total).toFixed(2)}</Text></View>
                      <View style={styles.cell}><Text style={styles.text}>{cliente}</Text></View>
                </View>
                )
                 })
              ) : (
            <Text style={{opacity: 0.8, marginVertical: 20, textAlign: 'center'}}>Esperando a que efectúe una venta...</Text>
            )}

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
    backgroundColor: colors.background
  },
  text: {
    color: colors.text
  },
  navigation: {
    backgroundColor: colors.navBackground,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  navIcons:{
    padding: 10, 
    borderRadius: 50 ,
    marginTop: 20,
  },
  navIconImage: {
    width: 20, height: 20,
  },
  lupaImage: {
    width: 15, height: 15,
  },
  scroll: {
    flex: 1,
    backgroundColor: colors.scrollBackground,
    padding: 18,
  },
  add: {
    backgroundColor: colors.input,
    width: 200,
    marginTop: 10,
    padding: 10,
    borderRadius: 15,
    elevation: 5,
    shadowColor: "#000", shadowOffset: {height: 2, width: 0,}
  },
  //Tabla estilos
  table: {
    paddingVertical: 20,
    marginBottom: 80,
    elevation: 5,
    shadowColor: "#000", shadowOffset: {height: 2, width: 0,}
  },
  row: {flexDirection: 'row',},
  cell: {
    flex: 1, padding: 6,
    borderWidth: 1,
    backgroundColor: colors.background,
    borderColor: colors.border,
  },
  headerText: {fontWeight: 'bold',color: colors.primary,},
});
