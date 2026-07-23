import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, TouchableOpacity, Modal, Alert, TextInput, KeyboardAvoidingView, Platform} from 'react-native';
import Constants from 'expo-constants';
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from '@react-native-picker/picker';
import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Validar, NoEmojis, filtrarPorRango } from './backend';
//import { obtenerCompras, obtenerGastos } from './Compras/backend'; import { obtenerVentas } from './Ventas/backend';
//import { obtenerEventos, agregarEvento, editarEvento, eliminarEvento, editarUsuario } from './backend';
import { AddEvento, QuitarElemento, AddUsuario } from './backend';
import type { DashboardScreenProps } from './types';
import { usePagination } from '../context/PaginationContext'; import { useTheme } from '../context/ThemeContext';
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
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [empresa, setEmpresa] = useState('');

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
  const {itemsPerPage, setItemsPerPage} = usePagination();
  const [selectedValue, setSelectedValue] = useState('hoy');
  const [selectedAValue, setSelectedAValue] = useState('hoyA');

  //JSON
  //const [usuarios, setUsuarios] = useState<Record<string, any>>({});
  const [usuarios, setUsuarios] = useState(datos.USUARIOS);
  const [usuariosOG, setUsuariosOG] = useState<Record<string, any>>({});
  //const [eventos, setEventos] = useState<Record<string, any>>({});
  const eventos: Record<string, any> = datos.EVENTOS
  const [eventosOG, setEventosOG] = useState<Record<string, any>>({});
  const [eventosMostrados, setEventosMostrados] = useState(eventos);
  //JSON sumatorias
  //const [Ventas, setVentas] = useState<Record<string, any>>({});
  const Ventas: Record<string, any> = datosV.CONTROL_VENTAS
  //const [Compras, setCompras] = useState<Record<string, any>>({});
  const Compras: Record<string, any> = datosC.CONTROL_COMPRAS
  //const [Gastos, setGastos] = useState<Record<string, any>>({});
  const Gastos: Record<string, any> = datosC.CONTROL_GASTOS

  //Modales
  const [modalVisible, setModalVisible] = useState(false);
  const [userModalVisible, setUserModalVisible] = useState(false);
  const [empresaModalVisible, setEmpresaModalVisible] = useState(false);
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
    const totalVHoy = Object.values(Ventas || {})
      .filter((venta: any) => venta[0] === hoyStr)
      .reduce((sum: number, venta: any) => sum + venta[1], 0);
    const totalCHoy = Object.values(Compras || {})
      .filter((compra: any) => compra[0] === hoyStr)
      .reduce((sum: number, compra: any) => sum + compra[1], 0);
    const totalGHoy = Object.values(Gastos || {})
      .filter((gasto: any) => gasto[0] === hoyStr)
      .reduce((sum: number, gasto: any) => sum + gasto[1], 0);
    
    // Calcular SEMANA
    const totalVSemana = filtrarPorRango(Ventas, inicioSemanaStr, hoyStr);
    const totalCSemana = filtrarPorRango(Compras, inicioSemanaStr, hoyStr);
    const totalGSemana = filtrarPorRango(Gastos, inicioSemanaStr, hoyStr);
    
    // Calcular MES
    const totalVMes = filtrarPorRango(Ventas, inicioMesStr, hoyStr);
    const totalCMes = filtrarPorRango(Compras, inicioMesStr, hoyStr);
    const totalGMes = filtrarPorRango(Gastos, inicioMesStr, hoyStr);
    
    // Calcular AÑO
    const totalVAnio = filtrarPorRango(Ventas, inicioAnioStr, hoyStr);
    const totalCAnio = filtrarPorRango(Compras, inicioAnioStr, hoyStr);
    const totalGAnio = filtrarPorRango(Gastos, inicioAnioStr, hoyStr);
    
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
    
  }, [selectedValue, Ventas, Compras, Gastos]);

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

  /*// Cargar ID de empresa
  useFocusEffect(
    useCallback(() => {
      const cargarEmpresa = async () => {
        try {
          const id = await AsyncStorage.getItem('idEmpresa');
          if (id) setIdEmpresa(id);
        } catch (error) {
          console.log('Error cargando empresa', error);
        }
      };
      cargarEmpresa();
    }, [])
  );

  // Cargar eventos desde el servidor
  useFocusEffect(
    useCallback(() => {
      const cargarEventos = async () => {
        try {
          setIsLoading(true);
          const data = await obtenerEventos();
          
          // Convertir el array de eventos a objeto con índices
          const eventosObj: Record<string, any> = {};
          if (Array.isArray(data)) {
            data.forEach((item: any, index: number) => {
              eventosObj[index + 1] = [item.evento, item.fechaHora, item.lugar, item.contacto];
            });
          }
          
          setEventos(eventosObj);
          setEventosOG(eventosObj);
        } catch (error: any) {
          Alert.alert('Error', error.message || 'No se pudieron cargar los eventos');
        } finally {
          setIsLoading(false);
        }
      };
      
      cargarEventos();
    }, [])
  );

  const handleAgregar = async () => {
    const validation = Validar(4, evento, fechaHora, lugar, contacto);
    if (!validation.isValid) {
      Alert.alert('Error', validation.message);
      return;
    }

    try {
      const response = await agregarEvento(evento, fechaHora, lugar, contacto);
      if (response.success) {
        // Recargar eventos
        const data = await obtenerEventos();
        const eventosObj: Record<string, any> = {};
        if (Array.isArray(data)) {
          data.forEach((item: any, index: number) => {
            eventosObj[index + 1] = [item.evento, item.fechaHora, item.lugar, item.contacto];
          });
        }
        setEventos(eventosObj);
        setEventosOG(eventosObj);
        setModalVisible(false);
        setEvento('');
        setFechaHora('');
        setLugar('');
        setContacto('');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'No se pudo agregar el evento');
    }
  };

  const handleEditar = async () => {
    const validation = Validar(4, evento, fechaHora, lugar, contacto);
    if (!validation.isValid) {
      Alert.alert('Error', validation.message);
      return;
    }

    try {
      const response = await editarEvento(id, evento, fechaHora, lugar, contacto);
      if (response.success) {
        // Actualizar localmente
        const eventosActualizados = { ...eventos };
        eventosActualizados[id] = [evento, fechaHora, lugar, contacto];
        setEventos(eventosActualizados);
        setEventosOG(eventosActualizados);
        setEModalVisible(false);
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'No se pudo editar el evento');
    }
  };

  const handleEliminar = async () => {
    try {
      const response = await eliminarEvento(id);
      if (response.success) {
        const nuevosEventos = { ...eventos };
        delete nuevosEventos[id];
        setEventos(nuevosEventos);
        setEventosOG(nuevosEventos);
        setConfirm(false);
        setEModalVisible(false);
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'No se pudo eliminar el evento');
    }
  }; 

  const handleEditarU = async () => {
    const validation = Validar(4, nombre, telefono, nombreUsuario, contrasena);
    if (!validation.isValid) {
      Alert.alert('Error', validation.message);
      return;
    }
    try {
      const response = await editarUsuario(idUsuario, nombre,genero,telefono,fecha,nombreUsuario,contrasena,empresa);
      if (response.success) {
        // Actualizar localmente
        const usuariosActualizados = { ...usuarios };
        usuariosActualizados[id] = [nombre,genero,telefono,fecha,nombreUsuario,contrasena,empresa];
        setUsuarios(usuariosActualizados);
        setUsuariosOG(usuariosActualizados);
        setEModalVisible(false);
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'No se pudo editar el usuario');
    }
  };
  const handleEditarE = async () => {
    const validation = Validar(1, empresa, '','','');
    if (!validation.isValid) {
      Alert.alert('Error', validation.message);
      return;
    }
    try {
      const response = await editarUsuario(idUsuario, nombre,genero,telefono,fecha,nombreUsuario,contrasena,empresa);
      if (response.success) {
        // Actualizar localmente
        const usuariosActualizados = { ...usuarios };
        usuariosActualizados[id] = [nombre,genero,telefono,fecha,nombreUsuario,contrasena,empresa];
        setUsuarios(usuariosActualizados);
        setUsuariosOG(usuariosActualizados);
        setEModalVisible(false);
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'No se pudo editar el usuario');
    }
  };

  useFocusEffect(
    useCallback(() => {
      const cargarVentas = async () => {
        try {
          setIsLoading(true);
          const data = await obtenerVentas();
          
          // Convertir el array de sucursales a objeto con índices
          const ventasObj: Record<string, any> = {};
          if (Array.isArray(data)) {
            data.forEach((item: any, index: number) => {
              ventasObj[index + 1] = [item.fecha, item.total, item.cliente];
            });
          }
          
          setVentas(ventasObj);
        } catch (error: any) {
          Alert.alert('Error', error.message || 'No se pudieron cargar los registros de las ventas');
        } finally {
          setIsLoading(false);
        }
      };
      
      cargarVentas();
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      const cargarCompras = async () => {
        try {
          setIsLoading(true);
          const data = await obtenerCompras();
          
          // Convertir el array de sucursales a objeto con índices
          const comprasObj: Record<string, any> = {};
          if (Array.isArray(data)) {
            data.forEach((item: any, index: number) => {
              comprasObj[index + 1] = [item.fecha, item.total, item.proveedor];
            });
          }
          
          setCompras(comprasObj);
        } catch (error: any) {
          Alert.alert('Error', error.message || 'No se pudieron cargar los registros de las compras');
        } finally {
          setIsLoading(false);
        }
      };
      
      cargarCompras();
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      const cargarGastos = async () => {
        try {
          setIsLoading(true);
          const data = await obtenerGastos();
          
          // Convertir el array de sucursales a objeto con índices
          const gastosObj: Record<string, any> = {};
          if (Array.isArray(data)) {
            data.forEach((item: any, index: number) => {
              gastosObj[index + 1] = [item.fecha, item.total, item.gasto];
            });
          }
          
          setGastos(gastosObj);
        } catch (error: any) {
          Alert.alert('Error', error.message || 'No se pudieron cargar los registros de los gastos');
        } finally {
          setIsLoading(false);
        }
      };
      cargarGastos();
    }, [])
  );
 */

  return (
    <View style={styles.container}>
      <StatusBar style={theme === 'oscuro' ? 'light' : 'dark'}  />

      {/* Modal configuración */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalView, {marginVertical: 200}]}>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
              <TouchableOpacity
                style={{height: 30, width: 30, alignItems: "flex-end"}}
                onPress={() => setModalVisible(!modalVisible)}>
                <Ionicons name="close" size={30} color={colors.text} />
              </TouchableOpacity>
            </View>
            
            <View>
              <Text style={styles.modalTitle}>Configuración</Text>
            </View>
            
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
                onPress={() => { setModalVisible(false) 
                  setUserModalVisible(true)}}>
                <Text style={styles.text}>Mi cuenta</Text>
              </TouchableHighlight>
            </View>
            <View style={styles.modalRow}>
              <TouchableHighlight
                underlayColor={colors.optionUnderlay} style={styles.modalOption}
                onPress={() => {
                  setModalVisible(false)
                  setEmpresaModalVisible(true)}}>
                <Text style={styles.text}>Mi empresa</Text>
              </TouchableHighlight>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text style={[styles.modalLabel]}>Número de datos páginados:</Text>
              <View style={{width:150, marginBottom: 24}}>
          <Picker
            style={[styles.input, {height: 50}]}
            selectedValue={itemsPerPage}
            onValueChange={(itemValue) => setItemsPerPage(itemValue)}
          >
            <Picker.Item label="25" value={25} />
            <Picker.Item label="50" value={50} />
            <Picker.Item label="100" value={100} />
            <Picker.Item label="500" value={200} />
          </Picker></View></View>
            <View style={styles.modalRow}>
              <TouchableHighlight
                underlayColor={colors.optionUnderlay} style={styles.modalOption}
                onPress={() => {
                  setModalVisible(false)
                  setConfirmCerradoSesion(true)}}>
                <Text style={styles.text}>Cerrar sesión</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
      
      {/* Modal Mi cuenta */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={userModalVisible}
        onRequestClose={() => {
          setUserModalVisible(!userModalVisible);
        }}>
        <View style={styles.modalOverlay}>
          {/*<KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}>
            <ScrollView 
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled">*/}
              <View style={[styles.modalView, { marginVertical: 150 }]}>
                <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                  <TouchableOpacity
                    style={{height: 30, width: 30, alignItems: "flex-end"}}
                    onPress={() => {
                      setModalVisible(true)
                      setUserModalVisible(!userModalVisible)}}>
                    <Ionicons name="close" size={30} color={colors.text} />
                  </TouchableOpacity>
                </View>
                
                <View>
                  <Text style={styles.modalTitle}>Ajustes de cuenta</Text>
                </View>
                
                <Text style={styles.modalLabel}>Nombre completo:</Text>
                <TextInput style={styles.input} 
                  value={nombre} onChangeText={(text) => setNombre(NoEmojis(text))}/>
                <Text style={styles.modalLabel}>Teléfono:</Text>
                <TextInput style={styles.input} 
                  value={telefono} onChangeText={(text) => setTelefono(NoEmojis(text))}/>
                <Text style={styles.modalLabel}>Fecha de nacimiento:</Text>
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
                <Text style={styles.modalLabel}>Nombre de usuario:</Text>
                <TextInput style={styles.input} 
                  value={nombreUsuario} onChangeText={(text) => setNombreUsuario(NoEmojis(text))}/>
                <Text style={styles.modalLabel}>Contraseña:</Text>
                <TextInput style={styles.input} 
                  value={contrasena} onChangeText={(text) => setContrasena(NoEmojis(text))} secureTextEntry />
                
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                  <TouchableHighlight
                 underlayColor={colors.confirmUnderlay} style={styles.modalConfirm}
                  onPress={async () => {
                  const validation = Validar(4, nombre, telefono, nombreUsuario, contrasena);
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
                    nombreUsuario,
                    contrasena,
                    empresa
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
                setUserModalVisible(!userModalVisible);
                Alert.alert('Éxito', 'Los cambios han sido guardados');
                }}>
                <Text style={styles.text}>Confirmar cambios</Text>
                </TouchableHighlight>
                </View>
              </View>
        </View>
      </Modal>

      {/* Modal mi empresa */}
<Modal
  animationType="fade"
  transparent={true}
  visible={empresaModalVisible}
  onRequestClose={() => {
    setEmpresaModalVisible(!empresaModalVisible);
  }}>
  <View style={styles.modalOverlay}>
    <View style={[styles.modalView, {marginVertical: 310}]}>
      <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
        <TouchableOpacity
          style={{height: 30, width: 30, alignItems: "flex-end"}}
          onPress={() => {
            setModalVisible(true)
            setEmpresaModalVisible(!empresaModalVisible)}}>
          <Ionicons name="close" size={30} color={colors.text} />
        </TouchableOpacity>
      </View>
      
      <View>
        <Text style={styles.modalTitle}>Mi empresa</Text>
      </View>

      <View>
        <Text style={[styles.modalLabel, {textAlign: 'center', opacity: 0.5, marginBottom: 10}]}>
          Dele un nombre a su empresa
        </Text>
      </View>
      
      <View style={styles.modalRow}>
        <TextInput 
          style={{...styles.input, width: 250}}
          value={empresa} 
          onChangeText={(text) => setEmpresa(NoEmojis(text))}
        />
      </View>
      
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <TouchableHighlight
          underlayColor={colors.confirmUnderlay} 
          style={styles.modalConfirm}
          onPress={async () => {
            const validation = Validar(1, empresa, '', '', '');
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
              nombreUsuario,
              contrasena,
              empresa  // ← Nuevo campo
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
            setEmpresaModalVisible(!empresaModalVisible);
            setModalVisible(true)
            Alert.alert('Éxito', 'Nombre de empresa guardado');
          }}>
          <Text style={styles.text}>Confirmar</Text>
        </TouchableHighlight>
      </View>
    </View>
  </View>
</Modal>

      {/* Modal para confirmar cerrado de sesión */}
      <Modal
        animationType="fade"
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
            <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <TouchableOpacity onPress={() => {
                  setModalVisible(true)
                  setConfirmCerradoSesion(!ConfirmCerradoSesion)}}>
                <Ionicons name="close" size={40} color={colors.text} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                  setConfirmCerradoSesion(!ConfirmCerradoSesion);
                  cerrarSesion();
                }}><Ionicons name="checkmark" size={40} color={colors.text} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      
      {/* Modal para añadir eventos */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalEvento}
        onRequestClose={() => {
          setModalEvento(!modalEvento);
        }}>
        <View style={styles.modalOverlay}>
              <View style={styles.modalView}>
                <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                  <TouchableOpacity
                    style={{height: 30, width: 30, alignItems: "flex-end"}}
                    onPress={() => setModalEvento(!modalEvento)}>
                    <Ionicons name="close" size={30} color={colors.text} />
                  </TouchableOpacity>
                </View>
                
                <View>
                  <Text style={styles.modalTitle}>Registrar evento</Text>
                </View>
                
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
        </View>
      </Modal>
      
      {/* Modal para editar eventos */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalEditEvento}
        onRequestClose={() => {
          setModalEvento(!modalEditEvento);
        }}>
        <View style={styles.modalOverlay}>
              <View style={styles.modalView}>
                <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                  <TouchableOpacity
                    style={{height: 30, width: 30, alignItems: "flex-end"}}
                    onPress={() => setModalEditEvento(!modalEditEvento)}>
                    <Ionicons name="close" size={30} color={colors.text} />
                  </TouchableOpacity>
                </View>
                
                <View>
                  <Text style={styles.modalTitle}>Editar evento</Text>
                </View>
                
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
                    onPress={() => {
                      setModalEditEvento(false)
                      setConfirm(true)}}>
                    <Text style={styles.text}>Borrar registro</Text>
                  </TouchableHighlight>
                </View>
              </View>
        </View>
      </Modal>

      {/* Modal para confirmar borrado */}
                  <Modal
                        animationType="fade"
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
              
                          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                            <TouchableOpacity onPress={() => {
                                setModalEditEvento(true);
                                setConfirm(!Confirm)}}>
                              <Ionicons name="close" size={40} color={colors.text} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                setEventosMostrados(QuitarElemento(eventosMostrados,id))
                                setConfirm(!Confirm);
                              }}>
                              <Ionicons name="checkmark" size={40} color={colors.text} />
                            </TouchableOpacity>
                          </View>
              
                        </View>
                        </View>
                      </Modal>

      {/* ---------------------------------Pantalla--------------------------------- */}
      <View>
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{paddingLeft: 10}}>
            <Text style={{
              fontSize:40,
              fontWeight: 'bold',
              color: colors.primary,
            }}>MasAdmin</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
            setNombre(usuarioSesion[0]);
            setTelefono(usuarioSesion[2]);
            // Crear fecha manualmente
            const fechaStr = usuarioSesion[3];
            const partes = fechaStr.split('-');
            setFecha(new Date(parseInt(partes[0]), parseInt(partes[1]) - 1, parseInt(partes[2])));
            setNombreUsuario(usuarioSesion[4]);
            setContrasena(usuarioSesion[5]);
            setEmpresa(usuarioSesion[6]);
            setModalVisible(true);
            }}
            style={[styles.navIcons, {height: 50, width: 50, marginRight: 20}]}>
            <Ionicons name="settings-outline" size={30} color={colors.text}/>
            </TouchableOpacity>
        </View>

        <View style={styles.navigation}>

          <View style={styles.navIcons}>
            <Ionicons name="grid-outline" size={20} color={colors.primary} />
          </View>

          <TouchableOpacity style={styles.navIcons}
            onPress={() => navigation.navigate("Compras")}>
            <Ionicons name="cart-outline" size={20} color={colors.text} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.navIcons}
            onPress={() => navigation.navigate("Ventas")}>
            <Ionicons name="cash-outline" size={20} color={colors.text} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.navIcons}
            onPress={() => navigation.navigate("Sucursales")}>
            <Ionicons name="business-outline" size={20} color={colors.text} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.navIcons}
            onPress={() => navigation.navigate("Almacenes")}>
            <Ionicons name="cube-outline" size={20} color={colors.text} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.navIcons}
            onPress={() => navigation.navigate("ListaDePrecios")}>
            <Ionicons name="pricetag-outline" size={20} color={colors.text} />
          </TouchableOpacity>
          
        </View>
      </View>

      <ScrollView>
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
              style={[styles.input, {height: 55}]} >
              <Picker.Item label="Hoy" value="hoy" />
              <Picker.Item label="Esta semana" value="semana" />
              <Picker.Item label="Este mes" value="mes" />
              <Picker.Item label="Este año" value="año" />
            </Picker>

          
          {arrayDashboard.map((valor, index) => (
            <View key={index} style={styles.row}>
              {index === 0 ? <Ionicons name="cash" size={30} color={colors.primary} style={{alignSelf: 'center', marginRight: 10}}/> : 
              index === 1 ? <Ionicons name="cart" size={30} color={colors.primary} style={{alignSelf: 'center', marginRight: 10}}/> : 
              <Ionicons name="receipt" size={30} color={colors.primary} style={{alignSelf: 'center', marginRight: 10}}/>} 
            <Text style={styles.box}>
              {index === 0 ? 'Ventas' : index === 1 ? 'Compras' : 'Gastos'}: ${valor.toFixed(2)}
            </Text>
            </View>
          ))}
          
          <Text style={{ fontSize: 25, fontWeight: 'bold', paddingBottom: 10, color: colors.text}}>
            <Ionicons name="calendar" size={25} color={colors.text} /> Agenda
          </Text>
          <Text style={{ fontSize: 15, paddingVertical: 10, color: colors.text}}>
            Seleccione un evento para modificarlo.
          </Text>
          
          <View style={[styles.row, {justifyContent: 'space-between', alignItems: 'center'}]}>
            <View style={{width: 180, height: 55}}>
              <Picker
                selectedValue={selectedAValue}
                onValueChange={(itemValue) => setSelectedAValue(itemValue)}
                style={styles.input} >
                <Picker.Item label="Hoy" value="hoyA" />
                <Picker.Item label="Esta semana" value="semanaA" />
                <Picker.Item label="Este mes" value="mesA" />
                <Picker.Item label="Este año" value="añoA" />
              </Picker>
            </View>
            <TouchableOpacity
              onPress={() => {
                setId(Object.keys(eventos).length + 1);
                setEvento(''); 
                setFechaHora(new Date()); 
                setLugar(''); 
                setContacto('');
                setModalEvento(true);
              }}>
              <Ionicons name="add" size={30} color={colors.text} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.table}>
            <ScrollView style={styles.showcase} showsVerticalScrollIndicator={true}>
            <View style={[styles.row,{backgroundColor: colors.headerCell}]}>
              <View style={styles.cell}><Text style={styles.text}>Evento</Text></View>
              <View style={[styles.cell, {flex: 0.9}]}><Text style={styles.text}>Fecha y Hora</Text></View>
              <View style={styles.cell}><Text style={styles.text}>Lugar</Text></View>
              <View style={[styles.cell, {flex: 0.8}]}><Text style={styles.text}>Contacto</Text></View>
            </View>

            {Object.values(eventosMostrados || {}).length > 0 ? (
              Object.entries(eventosMostrados).map(([id, data]: [string, any]) => {
                const [evento, fechaHora, lugar, contacto] = data;
                return (
                  <View key={id} style={styles.row}>
                    <View style={styles.cell}>
                      <TouchableOpacity
                        onPress={() => {
                          setId(Number(id))
                          setEvento(evento); setFechaHora(new Date(fechaHora)); setLugar(lugar); setContacto(contacto);
                          setModalEditEvento(true);
                        }}>
                        <Text style={styles.text}>{evento}</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={[styles.cell, {flex: 0.9}]}>
                      <Text style={styles.text}>{fechaHora.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3/$2/$1')}</Text>
                    </View>
                    <View style={styles.cell}>
                      <Text style={styles.text}>{lugar}</Text>
                    </View>
                    <View style={[styles.cell, {flex: 0.8}]}>
                      <Text style={styles.text}>{contacto}</Text>
                    </View>
                  </View>
                );
              })
            ) : (
              <Text style={{opacity: 0.8, textAlign: 'center', color: colors.text}}>No hay eventos</Text>
            )}
            </ScrollView>
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
  text:{color: colors.text},
  navigation: {
    backgroundColor: colors.navBackground,
    flexDirection: 'row', justifyContent: 'space-around',
  },
  navIcons:{padding: 10},
  scroll: {
    flex: 1,
    backgroundColor: colors.scrollBackground,
    padding: 18,
  },
  input:{
    backgroundColor: colors.scrollBackground, color: colors.text,
  },
  box: {
    flex: 1,
    textAlign: 'center',
    backgroundColor: colors.secondary,
    fontWeight: 'bold', fontSize: 30, color: colors.primary,
    paddingVertical: 30, marginVertical: 10,
    borderRadius: 20,
  },
  table: {
    marginTop: 20, marginBottom: 80,
    marginHorizontal: -9,
  },
  showcase: {
    maxHeight: 300, minHeight: 300
  },
  row: {flexDirection: 'row',},
  cell: {flex: 1, padding: 2,},
 modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  justifyContent: 'center', alignItems: 'center',
},
modalView: {
  maxWidth: 350,
  padding: 12,
  backgroundColor: colors.modalBackground,
  borderRadius: 20,
},
  modalTitle: {
    fontSize: 25, fontWeight: 'bold', color: colors.text,
    marginBottom: 9,
    textAlign: 'center'
  },
  modalRow:{
    flexDirection: 'row', 
    justifyContent: 'space-evenly', alignItems: 'center',
    marginBottom: 18,
  },
  modalLabel:{
    color: colors.text, fontSize: 20,
  },
  modalOption: {
    backgroundColor: colors.option,
    padding: 10, borderRadius: 20,
    width: 200, 
    alignItems: 'center',
  },
  modalConfirm: {
    backgroundColor: colors.confirm,  padding: 10, borderRadius: 20,
  },
  modalEdit: {
    backgroundColor: colors.edit, padding: 10, borderRadius: 20,
  },
  modalDelete: {
    backgroundColor: colors.delete, padding: 10, borderRadius: 20,
  },
});
