import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, Image} from 'react-native';
import Constants from 'expo-constants';
import { useState } from 'react';
import type { AjustesInventarioScreenProps } from './types';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import datos from './datos.json'

export default function AjustesInventario({ navigation }: AjustesInventarioScreenProps ) {

  const { theme, colors } = useTheme();
    const styles = getStyles(colors);

  const [ajustesInventario, setAjustesInventario] = useState(datos.AJUSTES_INVENTARIO || {});

  return (
    <View style={styles.container}>
      <StatusBar style={theme === 'oscuro' ? 'light' : 'dark'}  />

      <View style={styles.navigation}>
        <TouchableHighlight
        underlayColor={colors.navIconUnderlay} style={styles.navIcons}
        onPress={() => navigation.navigate("Almacenes")} 
      >
        <Ionicons name="arrow-back" size={25} color={colors.text} /></TouchableHighlight>
    </View>

      <ScrollView>
        <View style={styles.scroll}>
        <Text style={{  fontSize: 25, fontWeight: 'bold', color: colors.text }}>
        Ajustes de inventario
        </Text>
        <TouchableHighlight 
                underlayColor={colors.cellUnderlay}
                onPress={() => navigation.navigate("AddAjustesInventario")}
                style={styles.add}>
                    <Text style={{fontWeight: 'bold', color: colors.text}}>Realizar ajuste</Text>
                  </TouchableHighlight>
        <View style={styles.table}>
              <View style={styles.row}>
                  <View style={styles.cell}>
                      <Text style={styles.headerText}>Almacen afectado</Text>
                      </View>
                  <View style={[styles.cell, {flex: 0.6}]}>
                      <Text style={styles.headerText}>Operación</Text>
                      </View>
                  <View style={styles.cell}>
                      <Text style={styles.headerText}>Fecha de ajuste</Text>
                      </View>
                  </View>

                  {Object.values(ajustesInventario || {}).length > 0 ? (
                   Object.entries(ajustesInventario).map(([id, data]: [string, any]) => {
                    const [almacenAfectado, operacion, fechaAjuste] = data;
                    return(
                      <View key={id} style={styles.row}>
                      <View style={styles.cell}><Text style={styles.text}>{almacenAfectado}</Text></View>
                      <View style={[styles.cell, {flex: 0.6}]}><Text style={styles.text}>{operacion}</Text></View>
                      <View style={styles.cell}><Text style={styles.text}>{fechaAjuste.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3/$2/$1')}</Text></View>
                </View>
                    )
                })
              ) : (
            <Text style={{opacity: 0.8, marginVertical: 20, textAlign: 'center'}}>Esperando a que efectúe un ajuste...</Text>
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
    width: 150,
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