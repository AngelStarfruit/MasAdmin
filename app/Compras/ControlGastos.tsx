import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, Image, Modal } from 'react-native';
import Constants from 'expo-constants';
import type { ControlGastosScreenProps } from './types';
import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import datos from './datos.json'

export default function ControlGastos({ navigation }: ControlGastosScreenProps) {

  const { theme, colors } = useTheme();
    const styles = getStyles(colors);

  const [registrosGastos, setRegistrosGastos] = useState(datos.CONTROL_GASTOS || {})

  return (
    <View style={styles.container}>
      <StatusBar style={theme === 'oscuro' ? 'light' : 'dark'}  />

    <View style={styles.navigation}>
            <TouchableHighlight
            underlayColor={colors.navIconUnderlay} style={styles.navIcons}
            onPress={() => navigation.navigate("Compras")} 
          >
            <Ionicons name="arrow-back" size={25} color={colors.text} />
          </TouchableHighlight>
        </View>

      <ScrollView>
        <View style={styles.scroll}>
        <Text style={{  fontSize: 25, fontWeight: 'bold', color: colors.text }}>
        Control de gastos
        </Text>

          <TouchableHighlight 
        underlayColor={colors.cellUnderlay}
        onPress={() => navigation.navigate("AddRegistroGasto")}
        style={styles.add}>
            <Text style={{fontWeight: 'bold', color: colors.text}}>Añadir registro de gasto</Text>
          </TouchableHighlight>

        <View style={styles.table}>
              <View style={styles.row}>
                  <View style={styles.cell}>
                      <Text style={styles.headerText}>Fecha</Text>
                      </View>
                  <View style={styles.cell}>
                      <Text style={styles.headerText}>Total gastado</Text>
                      </View>
                  <View style={styles.cell}>
                      <Text style={styles.headerText}>Proveedor</Text>
                      </View>
                  </View>

                  {Object.values(registrosGastos || {}).length > 0 ? (
                  Object.entries(registrosGastos).map(([id, data]: [string, any]) => {
                  const [fecha, total, proveedor] = data;
                    return(
                      <View key={id} style={styles.row}>
                      <View style={styles.cell}><Text style={styles.text}>{fecha.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3/$2/$1')}</Text></View>
                      <View style={styles.cell}><Text style={styles.text}>{Number(total).toFixed(2)}</Text></View>
                      <View style={styles.cell}><Text style={styles.text}>{proveedor}</Text></View>
                </View>
                    )
                })
              ) : (
            <Text style={{opacity: 0.8, marginVertical: 20, textAlign: 'center'}}>Esperando a que efectúe un gasto...</Text>
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
    backgroundColor: colors.background,
  },
  text:{
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
  headerText: {fontWeight: 'bold', color: colors.primary,},
});
