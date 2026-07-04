import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, ScrollView, TouchableHighlight, Image} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Constants from 'expo-constants';
import { useState, useEffect} from 'react';
import type { ExistenciasAlmacenScreenProps } from './types';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import datosS from '../datos.json'; import datosA from './datos.json';

export default function ExistenciasAlmacen({ navigation }: ExistenciasAlmacenScreenProps ) {

  const { theme, colors } = useTheme();
    const styles = getStyles(colors);

  //JSONs para datos
  const sucursales: Record<string, any> = datosS.SUCURSALES || {}
  const almacenes: Record<string, any> = datosA.ALMACENES || {}
  const existencias: Record<string, any> = datosA.EXISTENCIAS_ALMACEN || {}
   const [almacenesMostrados, setalmacenesMostrados] = useState(almacenes);
  const [existenciasMostradas, setExistenciasMostradas] = useState(existencias);

  //Constantes de pickers
  const [selectedBranch, setSelectedBranch] = useState(sucursales[Object.keys(sucursales)[0]]?.[0] || '');
  const [selectedValue, setSelectedValue] = useState(almacenes[Object.keys(almacenes)[0]]?.[0] || '');

  useEffect(() => {
  let existenciasFiltradas; let almacenesFiltrados
  
   almacenesFiltrados = Object.fromEntries(
      Object.entries(datosA.ALMACENES || {}).filter(
        ([id, data]) => data[1] === selectedBranch
      )
    );

    existenciasFiltradas = Object.fromEntries(
      Object.entries(datosA.EXISTENCIAS_ALMACEN || {}).filter(
        ([id, data]) => data[4] === selectedValue
      )
    );
  
  setExistenciasMostradas(existenciasFiltradas);
  setalmacenesMostrados(almacenesFiltrados);
}, [selectedBranch, selectedValue]);

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
        <Text style={{  color: colors.text, fontSize: 25, fontWeight: 'bold' }}>
        Existencias por almacén
        </Text>
        <Text style={{ color: colors.text,
          fontSize: 15, 
          paddingVertical: 10,}}>
          Inserte una sucursal
          </Text>
          <Picker
              selectedValue={selectedBranch}
              onValueChange={(itemValue) => setSelectedBranch(itemValue)}
              style={styles.picker} itemStyle={styles.pickerItem}
              >
              {Object.values(sucursales || {}).length > 0 ? (
                Object.values(sucursales).map((sucursal: any, index) => (
                <Picker.Item 
                style={styles.pickerItem} 
                key={index} 
                label={String(sucursal[0])} 
                value={String(sucursal[0])} 
                />
                ))
                ) : (
                <Picker.Item label="-" value="" />
                )}
          </Picker>
        <Text style={{ color: colors.text,
          fontSize: 15, 
          paddingVertical: 10,}}>
          Inserte un almacén para ver sus existencias
          </Text>
          <Picker
              selectedValue={selectedValue}
              onValueChange={(itemValue) => setSelectedValue(itemValue)}
              style={styles.picker} itemStyle={styles.pickerItem}
              >
              {Object.values(almacenesMostrados || {}).length > 0 ? (
                    Object.values(almacenesMostrados).map((almacen: any, index) => (
                    <Picker.Item 
                    style={styles.pickerItem} 
                    key={index} 
                    label={String(almacen[0])} 
                    value={String(almacen[0])} 
                    />
                    ))
                    ) : (
                    <Picker.Item label="-" value="" />
                  )}
          </Picker>
        <View style={styles.table}>
              <View style={styles.row}>
                  <View style={styles.cell}>
                      <Text style={styles.headerText}>Poducto</Text>
                      </View>
                  <View style={styles.cell}>
                      <Text style={styles.headerText}>Marca</Text>
                      </View>
                  <View style={styles.cell}>
                      <Text style={styles.headerText}>Cantidad</Text>
                      </View>
                  <View style={styles.cell}>
                      <Text style={styles.headerText}>Precio</Text>
                      </View>
                  </View>

                  {/* Body - cada registro es una fila */}
                  {Object.values(existenciasMostradas || {}).length > 0 ? (
                  Object.entries(existenciasMostradas).map(([id, data]: [string, any]) => {
                  const [descripcion, marca, cantidad, precio] = data;
                  return(
                      <View key={id} style={styles.row}>
                      <View style={styles.cell}><Text style={styles.text}>{descripcion}</Text></View>
                      <View style={styles.cell}><Text style={styles.text}>{marca}</Text></View>
                      <View style={styles.cell}><Text style={styles.text}>{cantidad}</Text></View>
                      <View style={styles.cell}><Text style={styles.text}>{Number(precio).toFixed(2)}</Text></View>
                </View>
                )
                })
              ) : (
            <Text style={{opacity: 0.8, marginVertical: 20, textAlign: 'center'}}>Este almacén esta vacío</Text>
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
  //Tabla estilos
  table: {
    paddingVertical: 20,
    marginBottom: 80
  },
  row: {flexDirection: 'row',},
  cell: {
    flex: 1, padding: 6,
    borderWidth: 1,
    backgroundColor: colors.background,
    borderColor: colors.border,
  },
  headerText: {fontWeight: 'bold', color: colors.primary,},
  //---------------
  picker: {
    height: 55,
    marginLeft: 10,
    flex: 1,
    backgroundColor: colors.input,
    color: colors.text,
  },
  pickerItem: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
