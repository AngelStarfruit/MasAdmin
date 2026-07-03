import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, Image, Modal, Alert, TextInput, KeyboardAvoidingView, Platform} from 'react-native';
import Constants from 'expo-constants';
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from '@react-native-picker/picker';
import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Validar, NoEmojis, filtrarPorRango, AddEvento, QuitarElemento, AddUsuario } from './backend';
import type { DashboardScreenProps } from './types';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import datos from './datos.json';
import datosV from './Ventas/datos.json'; import datosC from './Compras/datos.json';

export default function Dashboard({navigation}: DashboardScreenProps ) {

  const { theme, toggleTheme, colors } = useTheme();
  const styles = getStyles(colors);

  const [usuarioSesion, setUsuarioSesion] = useState(['','','','','','','']);
  const [idUsuario, setIdUsuario] = useState(0);

  useFocusEffect(
  React.useCallback(() => {
    const cargarUsuario = async () => {
      try {
        const usuarioGuardado = await AsyncStorage.getItem('usuarioSesion');
        const idGuardado = await AsyncStorage.getItem('idUsuario');
        if (usuarioGuardado) {
          setUsuarioSesion(JSON.parse(usuarioGuardado));
        }
        if (idGuardado) {
          setIdUsuario(Number(idGuardado));
        }
      } catch (error) {
        console.log('Error cargando usuario', error);
      }
    };
    cargarUsuario();
  }, [])
);
    const cerrarSesion = async () => {
    await AsyncStorage.removeItem('usuarioSesion');
    navigation.navigate("home");
  };
  
  //Constantes de inputs
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fecha, setFecha] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');

  const bienvenida = usuarioSesion[1] === 'hombre' 
  ? `Bienvenido, ${usuarioSesion[0].split(' ')[0]}.` 
  : `Bienvenida, ${usuarioSesion[0].split(' ')[0]}.`;

  const [evento, setEvento] = useState('')
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [fechaHora, setFechaHora] = useState(new Date());
  const [lugar, setLugar] = useState('')
  const [contacto, setContacto] = useState('')

  const [id, setId] = useState(0)
  
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date: any) => {
    setFechaHora(date);
    hideDatePicker();
  };

  //Constantes de picker
  const [selectedValue, setSelectedValue] = useState('hoy');
  const [selectedAValue, setSelectedAValue] = useState('hoyA');

  //JSON
  const [usuarios, setUsuarios] = useState(datos.USUARIOS);
  const eventos: Record<string, any> = datos.EVENTOS
  const [eventosMostrados, setEventosMostrados] = useState(eventos);
  
  //JSON sumatorias
  const controlVentas: Record<string, any> = datosV.CONTROL_VENTAS
  const controlCompras: Record<string, any> = datosC.CONTROL_COMPRAS
  const controlGastos: Record<string, any> = datosC.CONTROL_GASTOS

  //Modales
  const [modalVisible, setModalVisible] = useState(false);
  const [userModalVisible, setUserModalVisible] = useState(false);
  const [ConfirmCerradoSesion, setConfirmCerradoSesion] = useState(false);
  const [modalEvento, setModalEvento] = useState(false);
  const [modalEditEvento, setModalEditEvento] = useState(false);
  const [Confirm, setConfirm] = useState(false);

  //Constantes de totales
  const [ventasHoy, setVentasHoy] = useState(0); 
  const [comprasHoy, setComprasHoy] = useState(0); 
  const [gastosHoy, setGastosHoy] = useState(0);

  const [ventasSemana, setVentasSemana] = useState(0); 
  const [comprasSemana, setComprasSemana] = useState(0); 
  const [gastosSemana, setGastosSemana] = useState(0);

  const [ventasMes, setVentasMes] = useState(0); 
  const [comprasMes, setComprasMes] = useState(0); 
  const [gastosMes, setGastosMes] = useState(0);

  const [ventasAnio, setVentasAnio] = useState(0); 
  const [comprasAnio, setComprasAnio] = useState(0); 
  const [gastosAnio, setGastosAnio] = useState(0);

  const [arrayDashboard, setArrayDashboard] = useState<number[]>([]);

  // Efecto para filtrar eventos por fecha
  useEffect(() => {
    let filtrados;
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    
    const finDia = new Date(hoy);
    finDia.setHours(23, 59, 59, 999);
    
    const finSemana = new Date(hoy);
    finSemana.setDate(hoy.getDate() + (6 - hoy.getDay()));
    finSemana.setHours(23, 59, 59, 999);
    
    const finMes = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0);
    finMes.setHours(23, 59, 59, 999);
    
    const finAnio = new Date(hoy.getFullYear(), 11, 31);
    finAnio.setHours(23, 59, 59, 999);
    
    if (selectedAValue === 'hoyA') {
      filtrados = Object.fromEntries(
        Object.entries(eventos || {}).filter(([id, data]) => {
          const fechaEvento = new Date(data[1]);
          return fechaEvento >= hoy && fechaEvento <= finDia;
        })
      );
    } else if (selectedAValue === 'semanaA') {
      filtrados = Object.fromEntries(
        Object.entries(eventos || {}).filter(([id, data]) => {
          const fechaEvento = new Date(data[1]);
          return fechaEvento >= hoy && fechaEvento <= finSemana;
        })
      );
    } else if (selectedAValue === 'mesA') {
      filtrados = Object.fromEntries(
        Object.entries(eventos || {}).filter(([id, data]) => {
          const fechaEvento = new Date(data[1]);
          return fechaEvento >= hoy && fechaEvento <= finMes;
        })
      );
    } else if (selectedAValue === 'añoA') {
      filtrados = Object.fromEntries(
        Object.entries(eventos || {}).filter(([id, data]) => {
          const fechaEvento = new Date(data[1]);
          return fechaEvento >= hoy && fechaEvento <= finAnio;
        })
      );
    } else {
      filtrados = eventos || {};
    }
    
    setEventosMostrados(filtrados);
  }, [selectedAValue]);

  // Efecto para calcular TODOS los totales
  useEffect(() => {
    const hoy = new Date();
    const hoyStr = `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, '0')}-${String(hoy.getDate()).padStart(2, '0')}`;
    
    // Calcular inicio de semana (lunes)
    const inicioSemana = new Date(hoy);
    const diaSemana = hoy.getDay();
    const diff = diaSemana === 0 ? 6 : diaSemana - 1;
    inicioSemana.setDate(hoy.getDate() - diff);
    const inicioSemanaStr = `${inicioSemana.getFullYear()}-${String(inicioSemana.getMonth() + 1).padStart(2, '0')}-${String(inicioSemana.getDate()).padStart(2, '0')}`;
    
    // Calcular inicio de mes
    const inicioMesStr = `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, '0')}-01`;
    
    // Calcular inicio de año
    const inicioAnioStr = `${hoy.getFullYear()}-01-01`;
    
    // Calcular HOY
    const totalVHoy = Object.values(controlVentas || {})
      .filter((venta: any) => venta[0] === hoyStr)
      .reduce((sum: number, venta: any) => sum + venta[1], 0);
    const totalCHoy = Object.values(controlCompras || {})
      .filter((compra: any) => compra[0] === hoyStr)
      .reduce((sum: number, compra: any) => sum + compra[1], 0);
    const totalGHoy = Object.values(controlGastos || {})
      .filter((gasto: any) => gasto[0] === hoyStr)
      .reduce((sum: number, gasto: any) => sum + gasto[1], 0);
    
    // Calcular SEMANA
    const totalVSemana = filtrarPorRango(controlVentas, inicioSemanaStr, hoyStr);
    const totalCSemana = filtrarPorRango(controlCompras, inicioSemanaStr, hoyStr);
    const totalGSemana = filtrarPorRango(controlGastos, inicioSemanaStr, hoyStr);
    
    // Calcular MES
    const totalVMes = filtrarPorRango(controlVentas, inicioMesStr, hoyStr);
    const totalCMes = filtrarPorRango(controlCompras, inicioMesStr, hoyStr);
    const totalGMes = filtrarPorRango(controlGastos, inicioMesStr, hoyStr);
    
    // Calcular AÑO
    const totalVAnio = filtrarPorRango(controlVentas, inicioAnioStr, hoyStr);
    const totalCAnio = filtrarPorRango(controlCompras, inicioAnioStr, hoyStr);
    const totalGAnio = filtrarPorRango(controlGastos, inicioAnioStr, hoyStr);
    
    // GUARDAR TODOS LOS VALORES
    setVentasHoy(totalVHoy);
    setComprasHoy(totalCHoy);
    setGastosHoy(totalGHoy);
    
    setVentasSemana(totalVSemana);
    setComprasSemana(totalCSemana);
    setGastosSemana(totalGSemana);
    
    setVentasMes(totalVMes);
    setComprasMes(totalCMes);
    setGastosMes(totalGMes);
    
    setVentasAnio(totalVAnio);
    setComprasAnio(totalCAnio);
    setGastosAnio(totalGAnio);
    
  }, [selectedValue, controlVentas, controlCompras, controlGastos]);

  // Efecto para actualizar el array del dashboard
  useEffect(() => {
    if (selectedValue === 'hoy') {
      setArrayDashboard([ventasHoy, comprasHoy, gastosHoy]);
    } else if (selectedValue === 'semana') {
      setArrayDashboard([ventasSemana, comprasSemana, gastosSemana]);
    } else if (selectedValue === 'mes') {
      setArrayDashboard([ventasMes, comprasMes, gastosMes]);
    } else if (selectedValue === 'año') {
      setArrayDashboard([ventasAnio, comprasAnio, gastosAnio]);
    }
  }, [selectedValue, ventasHoy, comprasHoy, gastosHoy, ventasSemana, comprasSemana, gastosSemana, ventasMes, comprasMes, gastosMes, ventasAnio, comprasAnio, gastosAnio]);

  return (
    <View style={styles.container}>
      <StatusBar style={theme === 'oscuro' ? 'light' : 'dark'}  />

      {/* Modal configuración */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalView, {marginVertical: 300}]}>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
              <TouchableHighlight
                style={{height: 30, width: 30, alignItems: "flex-end"}}
                underlayColor={colors.scrollBackground}
                onPress={() => setModalVisible(!modalVisible)}>
                <Ionicons name="close" size={20} color={colors.text} />
              </TouchableHighlight>
            </View>
            
            <View>
              <Text style={styles.modalTitle}>Configuración</Text>
            </View>
            
            <View style={styles.modalhr}/>
            
            <View style={styles.modalRow}>
               <TouchableHighlight
                 underlayColor={colors.optionUnderlay} style={styles.modalOption}
                  onPress={toggleTheme}>
                  <Text style={styles.text}>Cambiar a modo {theme === 'claro' ? 'oscuro' : 'claro'}{' '}
                    {theme === 'claro' ? 
                    <Ionicons name="moon" size={15} color={colors.text} /> : 
                    <Ionicons name="sunny" size={15} color={colors.text} />}
                    </Text>
                </TouchableHighlight>
            </View>
            <View style={styles.modalRow}>
              <TouchableHighlight
                underlayColor={colors.optionUnderlay} style={styles.modalOption}
                onPress={() => setUserModalVisible(true)}>
                <Text style={styles.text}>Mi cuenta</Text>
              </TouchableHighlight>
            </View>
            <View style={styles.modalRow}>
              <TouchableHighlight
                underlayColor={colors.optionUnderlay} style={styles.modalOption}
                onPress={() => setConfirmCerradoSesion(true)}>
                <Text style={styles.text}>Cerrar sesión</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
      
      {/* Modal Mi cuenta */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={userModalVisible}
        onRequestClose={() => {
          setUserModalVisible(!userModalVisible);
        }}>
        <View style={styles.modalOverlay}>
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}>
            <ScrollView 
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled">
              <View style={[styles.modalView, { marginVertical: 150 }]}>
                <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                  <TouchableHighlight
                    style={{height: 30, width: 30, alignItems: "flex-end"}}
                    underlayColor={colors.scrollBackground}
                    onPress={() => setUserModalVisible(!userModalVisible)}>
                    <Ionicons name="close" size={20} color={colors.text} />
                  </TouchableHighlight>
                </View>
                
                <View>
                  <Text style={styles.modalTitle}>Ajustes de cuenta</Text>
                </View>
                
                <View style={styles.modalhr}/>
                
                <Text style={styles.CardText}>Nombre completo:</Text>
                <TextInput style={styles.input} 
                  value={nombre} onChangeText={(text) => setNombre(NoEmojis(text))}/>
                <Text style={styles.CardText}>Teléfono:</Text>
                <TextInput style={styles.input} 
                  value={telefono} onChangeText={(text) => setTelefono(NoEmojis(text))}/>
                <Text style={styles.CardText}>Fecha de nacimiento:</Text>
                <TextInput 
                  style={styles.input}
                  value={fecha.toLocaleDateString()}
                  onFocus={() => setShowPicker(true)}
                  onPressIn={() => setShowPicker(true)}
                  caretHidden={true}
                  showSoftInputOnFocus={false}
                />
                {showPicker && (
                  <DateTimePicker
                    value={fecha}
                    mode="date"
                    onChange={(event, selectedDate) => {
                      setShowPicker(false);
                      if (selectedDate) {
                        setFecha(selectedDate);
                      }
                    }}
                  />
                )}
                <Text style={styles.CardText}>Email:</Text>
                <TextInput style={styles.input} 
                  value={email} onChangeText={(text) => setEmail(NoEmojis(text))}/>
                <Text style={styles.CardText}>Contraseña:</Text>
                <TextInput style={styles.input} 
                  value={contrasena} onChangeText={(text) => setContrasena(NoEmojis(text))} secureTextEntry />
                
                <View style={styles.modalhr}/>
                
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                  <TouchableHighlight
  underlayColor={colors.confirmUnderlay} style={[styles.modalConfirm, {width: 160}]}
  onPress={async () => {
    const validation = Validar(4, nombre, telefono, email, contrasena);
    if (!validation.isValid) {
      Alert.alert('Error', validation.message);
      return;
    }

    // 1. Actualizar el JSON de usuarios
    const usuariosActualizados = AddUsuario(
      usuarios,
      idUsuario,
      nombre,
      usuarioSesion[1], // género
      telefono,
      fecha.toLocaleDateString(),
      email,
      contrasena
    );
    setUsuarios(usuariosActualizados);

    // 2. Obtener el usuario actualizado
    const usuarioActualizado = usuariosActualizados[idUsuario];
    if (usuarioActualizado) {
      // 3. Actualizar AsyncStorage
      try {
        await AsyncStorage.setItem('usuarioSesion', JSON.stringify(usuarioActualizado));
        await AsyncStorage.setItem('idUsuario', String(idUsuario));
      } catch (error) {
        console.log('Error guardando usuario', error);
      }
      
      // 4. Actualizar el estado local
      setUsuarioSesion(usuarioActualizado);
    }

    setModalVisible(!modalVisible);
    setUserModalVisible(!userModalVisible);
    Alert.alert('Éxito', 'Los cambios han sido guardados');
  }}>
  <Text style={styles.text}>Confirmar cambios</Text>
</TouchableHighlight>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </Modal>

      {/* Modal para confirmar cerrado de sesión */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={ConfirmCerradoSesion}
        onRequestClose={() => {
          setConfirmCerradoSesion(!ConfirmCerradoSesion);
        }}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalView, {marginVertical: 375}]}>
            <View>
              <Text style={styles.modalTitle}>¿Cerrar sesión?</Text>
            </View>
            <View style={styles.modalhr}/>
            <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <TouchableHighlight
                underlayColor={colors.regretUnderlay} style={[styles.modalRegret, {width: 50}]}
                onPress={() => setConfirmCerradoSesion(!ConfirmCerradoSesion)}>
                <Text style={styles.text}>NO</Text>
              </TouchableHighlight>
              <TouchableHighlight
                underlayColor={colors.deleteUnderlay} style={[styles.modalDelete, {width: 50}]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  setConfirmCerradoSesion(!ConfirmCerradoSesion);
                  cerrarSesion();
                }}>
                <Text style={styles.text}>SÍ</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
      
      {/* Modal para añadir eventos */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalEvento}
        onRequestClose={() => {
          setModalEvento(!modalEvento);
        }}>
        <View style={styles.modalOverlay}>
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}>
            <ScrollView 
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled">
              <View style={styles.modalView}>
                <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                  <TouchableHighlight
                    style={{height: 30, width: 30, alignItems: "flex-end"}}
                    underlayColor={colors.scrollBackground}
                    onPress={() => setModalEvento(!modalEvento)}>
                    <Ionicons name="close" size={20} color={colors.text} />
                  </TouchableHighlight>
                </View>
                
                <View>
                  <Text style={styles.modalTitle}>Registrar evento</Text>
                </View>
                
                <View style={styles.hr}/>
                
                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Evento:</Text>
                  <TextInput style={{...styles.input, width: 150}}
                    value={evento} onChangeText={(text) => setEvento(NoEmojis(text))}/>
                </View>
                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Fecha y hora:</Text>
                  <View style={styles.modalRow}>
                    <TouchableHighlight underlayColor={'white'} onPress={showDatePicker}>
                      <TextInput 
                        style={styles.input}
                        value={fechaHora.toLocaleString()}
                        editable={false}
                        pointerEvents="none"
                      />
                    </TouchableHighlight>
                    <DateTimePickerModal
                      isVisible={isDatePickerVisible}
                      mode="datetime"
                      onConfirm={handleConfirm}
                      onCancel={hideDatePicker}
                      date={fechaHora}
                    />
                  </View>
                </View>
                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Lugar:</Text>
                  <TextInput style={{...styles.input, width: 150}}
                    value={lugar} onChangeText={(text) => setLugar(NoEmojis(text))}/>
                </View>
                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Contacto:</Text>
                  <TextInput style={{...styles.input, width: 150}}
                    value={contacto} onChangeText={(text) => setContacto(NoEmojis(text))}/>
                </View>
                
                <View style={styles.hr}/>
                
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                  <TouchableHighlight
                    underlayColor={colors.confirmUnderlay} style={styles.modalConfirm}
                    onPress={() => {
                      const validation = Validar(3,evento,lugar,contacto,'');
                      if (!validation.isValid) {
                        Alert.alert('Error', validation.message);
                        return; 
                      }
                      setEventosMostrados(AddEvento(eventosMostrados, id, evento, fechaHora.toLocaleString().slice(0, -3), lugar, contacto));
                      setModalEvento(!modalEvento);
                    }}>
                    <Text style={styles.text}>Añadir registro</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </Modal>
      
      {/* Modal para editar eventos */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalEditEvento}
        onRequestClose={() => {
          setModalEvento(!modalEditEvento);
        }}>
        <View style={styles.modalOverlay}>
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}>
            <ScrollView 
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled">
              <View style={styles.modalView}>
                <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                  <TouchableHighlight
                    style={{height: 30, width: 30, alignItems: "flex-end"}}
                    underlayColor={colors.scrollBackground}
                    onPress={() => setModalEditEvento(!modalEditEvento)}>
                    <Ionicons name="close" size={20} color={colors.text} />
                  </TouchableHighlight>
                </View>
                
                <View>
                  <Text style={styles.modalTitle}>Editar evento</Text>
                </View>
                
                <View style={styles.hr}/>
                
                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Evento:</Text>
                  <TextInput style={{...styles.input, width: 150}}
                    value={evento} onChangeText={(text) => setEvento(NoEmojis(text))}/>
                </View>
                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Fecha y Hora:</Text>
                  <TouchableHighlight underlayColor={'white'} onPress={showDatePicker}>
                    <TextInput 
                      style={styles.input}
                      value={fechaHora.toLocaleString()}
                      editable={false}
                      pointerEvents="none"
                    />
                  </TouchableHighlight>
                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="datetime"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    date={fechaHora}
                  />   
                </View>
                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Lugar:</Text>
                  <TextInput style={{...styles.input, width: 150}}
                    value={lugar} onChangeText={(text) => setLugar(NoEmojis(text))}/>
                </View>
                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Contacto:</Text>
                  <TextInput style={{...styles.input, width: 150}}
                    value={contacto} onChangeText={(text) => setContacto(NoEmojis(text))}/>
                </View>
                
                <View style={styles.hr}/>
                
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                  <TouchableHighlight
                    underlayColor={colors.editUnderlay} style={styles.modalEdit}
                    onPress={() => {
                      const validation = Validar(3,evento,lugar,contacto,'');
                      if (!validation.isValid) {
                        Alert.alert('Error', validation.message);
                        return; 
                      }
                      setEventosMostrados(AddEvento(eventosMostrados, id, evento, fechaHora.toLocaleString().slice(0, -3), lugar, contacto));
                      setModalEditEvento(!modalEditEvento);
                    }}>
                    <Text style={styles.text}>Confirmar cambios</Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    underlayColor={colors.deleteUnderlay} style={styles.modalDelete}
                    onPress={() => setConfirm(true)}>
                    <Text style={styles.text}>Borrar registro</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </Modal>

      {/* Modal para confirmar borrado */}
                  <Modal
                        animationType="slide"
                        transparent={true}
                        visible={Confirm}
                        onRequestClose={() => {
                          setConfirm(!Confirm);
                        }}>
                        <View style={styles.modalOverlay}>
                        <View style={[styles.modalView, {marginVertical: 375}]}>
              
                          <View>
                            <Text style={styles.modalTitle}>¿Eliminar registro?</Text>
                          </View>
              
                          <View style={styles.hr}/>
              
                          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                            <TouchableHighlight
                            underlayColor={colors.regretUnderlay} style={[styles.modalRegret , {height: 50, width: 50}]}
                              onPress={() => setConfirm(!Confirm)}>
                              <Text style={styles.text}>NO</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                            underlayColor={colors.deleteUnderlay} style={[styles.modalDelete , {height: 50, width: 50}]}
                              onPress={() => {
                                setEventosMostrados(QuitarElemento(eventosMostrados,id))
                                setConfirm(!Confirm);
                                setModalEditEvento(!modalEditEvento);
                              }}>
                              <Text style={styles.text}>SÍ</Text>
                            </TouchableHighlight>
                          </View>
              
                        </View>
                        </View>
                      </Modal>

      {/* Pantalla */}
      <View style={styles.head}>
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{paddingLeft: 10}}>
            <Text style={{
              fontSize:40,
              fontWeight: 'bold',
              color: colors.primary,
            }}>MasAdmin</Text>
          </View>
          <TouchableHighlight
            underlayColor={colors.navIconUnderlay}
            onPress={() => {
            setNombre(usuarioSesion[0]);
            setTelefono(usuarioSesion[2]);
            // Crear fecha manualmente
            const fechaStr = usuarioSesion[3];
            const partes = fechaStr.split('-');
            setFecha(new Date(parseInt(partes[0]), parseInt(partes[1]) - 1, parseInt(partes[2])));
            setEmail(usuarioSesion[4]);
            setContrasena(usuarioSesion[5]);
            setModalVisible(true);
            }}
            style={[styles.navIcons, {height: 50, width: 50, marginRight: 20}]}>
            <Ionicons name="settings-outline" size={30} color={colors.text}/>
            </TouchableHighlight>
        </View>

        <View style={styles.navigation}>
          <TouchableHighlight style={styles.navIconsS}>
            <Ionicons name="grid-outline" size={20} color={colors.text} />
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={colors.navIconUnderlay} style={styles.navIcons}
            onPress={() => navigation.navigate("Compras")}>
            <Ionicons name="cart-outline" size={20} color={colors.text} />
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={colors.navIconUnderlay} style={styles.navIcons}
            onPress={() => navigation.navigate("Ventas")}>
            <Ionicons name="cash-outline" size={20} color={colors.text} />
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={colors.navIconUnderlay} style={styles.navIcons}
            onPress={() => navigation.navigate("Sucursales")}>
            <Ionicons name="business-outline" size={20} color={colors.text} />
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={colors.navIconUnderlay} style={styles.navIcons}
            onPress={() => navigation.navigate("Almacenes")}>
            <Ionicons name="cube-outline" size={20} color={colors.text} />
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={colors.navIconUnderlay} style={styles.navIcons}
            onPress={() => navigation.navigate("ListaDePrecios")}>
            <Ionicons name="pricetag-outline" size={20} color={colors.text} />
          </TouchableHighlight>
        </View>
      </View>

      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.scroll}>
          <Text style={{ fontSize: 30, fontWeight: 'bold', color: colors.primary, paddingBottom: 10}}>
            {bienvenida}
          </Text>
          <Text style={{ fontSize: 25, fontWeight: 'bold', color: colors.text }}>
            <Ionicons name="grid" size={25} color={colors.text} /> Dashboard
          </Text>
          
            <Text style={{ fontSize: 20, paddingTop: 10, color: colors.text}}>
              Mostrar información de:
            </Text>
            <Picker
              selectedValue={selectedValue}
              onValueChange={(itemValue) => setSelectedValue(itemValue)}
              style={[styles.picker, {height: 55}]} 
              itemStyle={styles.pickerItem}>
              <Picker.Item label="Hoy" value="hoy" />
              <Picker.Item label="Esta semana" value="semana" />
              <Picker.Item label="Este mes" value="mes" />
              <Picker.Item label="Este año" value="año" />
            </Picker>

          
          {arrayDashboard.map((valor, index) => (
            <Text key={index} style={styles.box}>
              {index === 0 ? <Ionicons name="cash" size={30} color={colors.primary} /> : 
              index === 1 ? <Ionicons name="cart" size={30} color={colors.primary} /> : 
              <Ionicons name="receipt" size={30} color={colors.primary} />}  {' '}
              {index === 0 ? 'Ventas' : index === 1 ? 'Compras' : 'Gastos'}: ${valor.toFixed(2)}
            </Text>
          ))}
          
          <View style={styles.hr}/>
          
          <Text style={{ fontSize: 25, fontWeight: 'bold', paddingBottom: 10, color: colors.text}}>
            Agenda
          </Text>
          <Text style={{ fontSize: 15, paddingVertical: 10, color: colors.text}}>
            Seleccione un evento para modificarlo.
          </Text>
          
          <View style={[styles.row, {justifyContent: 'space-between'}]}>
            <View style={{width: 180, height: 55}}>
              <Picker
                selectedValue={selectedAValue}
                onValueChange={(itemValue) => setSelectedAValue(itemValue)}
                style={[styles.picker]} 
                itemStyle={styles.pickerItem}>
                <Picker.Item label="Hoy" value="hoyA" />
                <Picker.Item label="Esta semana" value="semanaA" />
                <Picker.Item label="Este mes" value="mesA" />
                <Picker.Item label="Este año" value="añoA" />
              </Picker>
            </View>
            <TouchableHighlight
              underlayColor={colors.input}
              onPress={() => {
                setId(Object.keys(eventos).length + 1);
                setEvento(''); 
                setFechaHora(new Date()); 
                setLugar(''); 
                setContacto('');
                setModalEvento(true);
              }}
              style={styles.add}>
              <Text style={{fontWeight: 'bold', color: colors.text}}>Registrar evento</Text>
            </TouchableHighlight>
          </View>
          
          <View style={styles.table}>
            <View style={styles.row}>
              <View style={styles.headerCell}><Text style={styles.headerText}>Evento</Text></View>
              <View style={styles.headerCell}><Text style={styles.headerText}>Fecha y Hora</Text></View>
              <View style={[styles.headerCell, {flex: 0.8}]}><Text style={styles.headerText}>Lugar</Text></View>
              <View style={[styles.headerCell, {flex: 0.8}]}><Text style={styles.headerText}>Contacto</Text></View>
            </View>

            {Object.values(eventosMostrados || {}).length > 0 ? (
              Object.entries(eventosMostrados).map(([id, data]: [string, any]) => {
                const [evento, fechaHora, lugar, contacto] = data;
                return (
                  <View key={id} style={styles.row}>
                    <View style={styles.cellF}>
                      <TouchableHighlight
                        underlayColor={colors.cellUnderlay}
                        onPress={() => {
                          setId(Number(id))
                          setEvento(evento); setFechaHora(new Date(fechaHora)); setLugar(lugar); setContacto(contacto);
                          setModalEditEvento(true);
                        }}>
                        <Text style={styles.text}>{evento}</Text>
                      </TouchableHighlight>
                    </View>
                    <View style={styles.cell}>
                      <Text style={styles.text}>{fechaHora.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3/$2/$1')}</Text>
                    </View>
                    <View style={[styles.cell, {flex: 0.8}]}>
                      <Text style={styles.text}>{lugar}</Text>
                    </View>
                    <View style={[styles.cell, {flex: 0.8}]}>
                      <Text style={styles.text}>{contacto}</Text>
                    </View>
                  </View>
                );
              })
            ) : (
              <Text style={{opacity: 0.8, marginVertical: 20, textAlign: 'center', color: colors.text}}>No hay eventos</Text>
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
  head:{
    elevation: 10,
    shadowColor: "#000", shadowOffset: {height: 2, width: 0,}
  },
  navigation: {
    backgroundColor: colors.navBackground,
    flexDirection: 'row', justifyContent: 'space-around',
    padding: 5,
  },
  navIcons:{
    padding: 10, borderRadius: 50 ,
  },
  navIconsS:{
    padding: 10, borderRadius: 50 , backgroundColor: colors.navIconUnderlay,
  },
  scroll: {
    flex: 1,
    backgroundColor: colors.scrollBackground,
    padding: 18,
  },
  input:{
    backgroundColor: colors.scrollBackground,
    padding: 10,
    marginBottom: 15,
    color: colors.text,
  },
  box: {
    flex: 1,
    textAlign: 'center',
    backgroundColor: colors.secondary,
    fontWeight: 'bold', fontSize: 30, color: colors.primary,
    paddingVertical: 40, marginVertical: 10,
    borderRadius: 20,
    elevation: 5,
    shadowColor: "#000", shadowOffset: {height: 2, width: 0,}
  },
  hr:{
    height: 2, 
    backgroundColor: '#777', 
    marginVertical: 8,
  },
  add: {
    backgroundColor: colors.background,
    height: 40, width: 150,
    marginTop: 10,
    padding: 10,
    borderRadius: 15,
    elevation: 5,
    shadowColor: "#000", shadowOffset: {height: 2, width: 0,}
  },
  table: {
    paddingVertical: 20,
    elevation: 5,
    shadowColor: "#000", shadowOffset: {height: 2, width: 0,},
    marginBottom: 80
  },
  row: {flexDirection: 'row',},
  headerCell: {
    flex: 1, padding: 6,
    backgroundColor: colors.headerCell,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cell: {
    flex: 1, padding: 6,
    borderWidth: 1,
    backgroundColor: colors.background,
    borderColor: colors.border,
  },
  cellF: {
    flex: 1, padding: 6,
    borderWidth: 1,
    backgroundColor: colors.input,
    borderColor: colors.border,
  },
  headerText: {fontWeight: 'bold', color: colors.text},
  picker: {
    height: 50,
    marginLeft: 10,
    flex: 1,
    backgroundColor: colors.background, color: colors.text,
  },
  pickerItem: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  modalView: {
    marginHorizontal: 30, marginVertical: 200,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.modalBackground,
    borderRadius: 20,
    padding: 20,
  },
  modalTitle: {
    color: colors.text,
    fontSize: 30, fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  CardText:{
    fontSize: 20,  color: colors.text,
  },
  modalhr:{
    height: 2, 
    backgroundColor: '#777', 
    marginBottom: 15,
  },
  modalRow:{
    flexDirection: 'row', 
    justifyContent: 'space-evenly', 
    marginBottom: 15,
    alignItems: 'center',
  },
  modalLabel:{
    color: colors.text,
    fontSize: 20, fontWeight: 'bold',
  },
  modalOption: {
    backgroundColor: colors.option,
    padding: 10,
    borderRadius: 15,
    width: 200,
    justifyContent: 'center', alignItems: 'center',
    elevation: 5,
    shadowColor: "#000", shadowOffset: {height: 2, width: 0,}
  },
  modalConfirm: {
    backgroundColor: colors.confirm,
    padding: 10,
    borderRadius: 20,
    width: 135,
    justifyContent: 'center', alignItems: 'center',
    elevation: 5,
    shadowColor: "#000", shadowOffset: {height: 2, width: 0,}
  },
  modalEdit: {
    backgroundColor: colors.edit,
    padding: 10,
    borderRadius: 20,
    width: 150,
    justifyContent: 'center', alignItems: 'center',
    elevation: 5,
    shadowColor: "#000", shadowOffset: {height: 2, width: 0,}
  },
  modalDelete: {
    backgroundColor: colors.delete,
    padding: 10,
    borderRadius: 20,
    width: 135,
    justifyContent: 'center', alignItems: 'center',
    elevation: 5,
    shadowColor: "#000", shadowOffset: {height: 2, width: 0,}
  },
  modalRegret: {
    backgroundColor: colors.regret,
    padding: 10,
    borderRadius: 15,
    width: 130,
    justifyContent: 'center', alignItems: 'center',
    elevation: 5,
    shadowColor: "#000", shadowOffset: {height: 2, width: 0,}
  },
});
