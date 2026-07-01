import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, Image, Modal, TextInput, Alert } from 'react-native';
import Constants from 'expo-constants';
import type { CategoriasScreenProps, single } from './types';
import { useState } from 'react';
import { NoEmojis, Validar, AddCategoria, QuitarElemento } from './backend';
import { useTheme } from '../context/ThemeContext';
import datos from './datos.json'; 

export default function AddRegistroVenta({ navigation }: CategoriasScreenProps) {

   const { theme, colors } = useTheme();
  const styles = getStyles(colors);

  const getImage = (nombre: any) => {
    switch (nombre){
      case 'B': return require('../assets/B.png');
      case 'lupa': return require('../assets/lupa.png');
      default: return require('../assets/x.png');
   }
  }
  //Constantes de modales
  const [modalVisible, setModalVisible] = useState(false);
  const [modalEVisible, setModalEVisible] = useState(false);
  const [Confirm, setConfirm] = useState(false);

  //Constante de input
  const [category, setCategory] = useState('');
  const [query, setQuery] = useState('')

  //JSONs de datos
  const [categorias, setCategorias] = useState<single>(datos.CATEGORIAS || {});
  const [listaPrecios, setListaPrecios] = useState(datos.LISTA_PRECIOS || {});

  //Otras constantes
  const [id, setId] = useState(1)
 
  return (
    <View style={styles.container}>
     <StatusBar style={theme === 'oscuro' ? 'light' : 'dark'}  />

    <View style={styles.navigation}>
            <TouchableHighlight
            underlayColor={colors.navIconUnderlay} style={styles.navIcons}
            onPress={() => navigation.navigate("ListaDePrecios")}
          >
            <Image source={getImage('B')} style={styles.navIconImage}/>
          </TouchableHighlight>
        </View>

      {/* Modal para añadir categorías */}
            <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    setModalVisible(!modalVisible);
                  }}>
                  <View style={styles.modalOverlay}>
                  <View style={[styles.modalView, {marginVertical: 340}]}>
        
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                      <TouchableHighlight
                      style={{height: 30, width: 30, alignItems: "flex-end"}}
                      underlayColor={colors.scrollBackground}
                      onPress={() => setModalVisible(!modalVisible)}>
                      <Image source={getImage('x')} style={styles.lupaImage}/>
                      </TouchableHighlight>
                    </View>
        
                    <View>
                      <Text style={styles.modalTitle}>Añadir categoría</Text>
                    </View>
        
                    <View style={styles.modalRow}>
                      <Text style={styles.modalLabel}>Nombre:</Text>
                      <TextInput style={{...styles.input, width: 150}}
                      value={category} onChangeText={(text) => setCategory(NoEmojis(text))}/>
                    </View>
        
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                      <TouchableHighlight
                      underlayColor={colors.confirmUnderlay} style={styles.modalConfirm}
                        onPress={() => {
                          const validation = Validar(1,category,'','','');
                             if (!validation.isValid) {
                            Alert.alert('Error', validation.message);
                            return; 
                            }
                            setCategorias(AddCategoria(categorias,id,category))
                            setModalVisible(!modalVisible)
                          }}>
                        <Text>Añadir registro</Text>
                      </TouchableHighlight>
                    </View>
        
                  </View>
                  </View>
                </Modal>
    
    {/* Modal para editar categorías */}
            <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalEVisible}
                  onRequestClose={() => {
                    setModalEVisible(!modalEVisible);
                  }}>
                  <View style={styles.modalOverlay}>
                  <View style={[styles.modalView, {marginVertical: 340}]}>
        
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                      <TouchableHighlight
                      style={{height: 30, width: 30, alignItems: "flex-end"}}
                      underlayColor={colors.scrollBackground}
                      onPress={() => setModalEVisible(!modalEVisible)}>
                      <Image source={getImage('x')} style={styles.lupaImage}/>
                      </TouchableHighlight>
                    </View>
        
                    <View>
                      <Text style={styles.modalTitle}>Editar categoría</Text>
                    </View>
        
                    <View style={styles.modalRow}>
                      <Text style={styles.modalLabel}>Nombre:</Text>
                      <TextInput style={{...styles.input, width: 200}}
                      value={category} onChangeText={(text) => setCategory(NoEmojis(text))}/>
                    </View>
        
                    <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                                      <TouchableHighlight
                                      underlayColor={colors.editUnderlay} style={styles.modalEdit}
                                        onPress={() => {
                                          const validation = Validar(1,category,'','','');
                                              if (!validation.isValid) {
                                              Alert.alert('Error', validation.message);
                                              return; 
                                              }
                                          setCategorias(AddCategoria(categorias,id,category))
                                          setModalEVisible(!modalEVisible)}}>
                                        <Text>Confirmar cambios</Text>
                                      </TouchableHighlight>
                                      <TouchableHighlight
                                      underlayColor={colors.deleteUnderlay} style={styles.modalDelete}
                                        onPress={() => setConfirm(true)}
                                        >
                                        <Text>Borrar categoría</Text>
                                      </TouchableHighlight>
                                    </View>
        
                  </View>
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
                                   <View style={[styles.modalView, {marginVertical: 310}]}>
                         
                                     <View>
                                       <Text style={styles.modalTitle}>¿Eliminar categoría?</Text>
                                     </View>

                                     <Text style={[styles.modalLabel, {textAlign: 'center', opacity: 0.5, marginBottom: 10}]}>
                                      Esta acción borrará la categoría y todos los productos que se encuentran en ella. Tenga en cuenta que esta acción no se podrá deshacer.</Text>
                         
                                     <View style={styles.hr}/>
                         
                                     <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                                       <TouchableHighlight
                                       underlayColor={colors.regretUnderlay} style={styles.modalRegret}
                                         onPress={() => setConfirm(!Confirm)}>
                                         <Text>NO</Text>
                                       </TouchableHighlight>
                                       <TouchableHighlight
                                       underlayColor={colors.deleteUnderlay} style={[styles.modalDelete, {width: 50}]}
                                         onPress={() => {
                                           // 1. Filtrar productos que NO pertenecen a esta categoría
                                           const productosFiltrados = Object.fromEntries(
                                             Object.entries(listaPrecios || {}).filter(
                                               ([id, data]) => data[6] !== category
                                             )
                                           );
                                           
                                           // 2. Actualizar lista de precios (sin los productos de esa categoría)
                                           setListaPrecios(productosFiltrados as any);
                                           
                                           // 3. Eliminar la categoría
                                           setCategorias(QuitarElemento(categorias, id));
                                           
                                           // 4. Cerrar modales
                                           setConfirm(!Confirm);
                                           setModalEVisible(!modalEVisible);
                                         }}>
                                         <Text>SÍ</Text>
                                       </TouchableHighlight>
                                     </View>
                         
                                   </View>
                                   </View>
                                 </Modal>

      {/*ScrollView*/}
      <ScrollView>
        <View style={styles.scroll}>
        <Text style={{  fontSize: 25, fontWeight: 'bold', color: colors.text }}>
        Gestionar categorías
        </Text>
        <Text style={{ color: colors.text,
          fontSize: 15, 
          paddingVertical: 10,}}>
          Seleccione una categoría para editarla.
          </Text>

          <View style={styles.row}>
        <TouchableHighlight 
            underlayColor={colors.input}
            onPress={() => {
                setId(Object.keys(categorias).length + 1)
                setCategory('')
                setModalVisible(true)}}
            style={[styles.add , {width: 160}]}>
            <Text style={{fontWeight: 'bold', color: colors.text}}>Agregar categorías</Text>
            </TouchableHighlight>

              <View style={styles.row}>
              <TextInput style={styles.query}
              placeholder="Buscar" placeholderTextColor="#777"
              value={query} onChangeText={setQuery}></TextInput>
             <TouchableHighlight
                underlayColor={colors.input}
                 onPress={() => {
                  if(query.trim() == ''){
                    setCategorias(datos.CATEGORIAS);
                  }
                  else{
                    const filtrado = Object.fromEntries(
                      Object.entries(datos.CATEGORIAS || {}).filter(
                      ([id, data]) => data.toLowerCase().includes(query.toLowerCase())
                      ));
                      setCategorias(filtrado)
                  }
                }}
                style={{...styles.add, width: 40, padding: 10}}>
                <Image source={getImage('lupa')} style={styles.lupaImage}/>
                </TouchableHighlight>
                </View></View>
        
        <View style={{marginBottom: 80}}>
            
        {Object.values(categorias || {}).length > 0 ? (
        Object.entries(categorias).map(([id, data]: [string, any]) => {
            const categoria = data;
             return (
                              <View key={id}>
                                <View style={styles.cell}>
                                <TouchableHighlight
                                underlayColor={colors.scrollBackground}
                                onPress={() => {
                                  setId(Number(id))
                                    setCategory(categoria)
                                    setModalEVisible(true)
                                  }}>
                                <Text style={styles.text}>{categoria}</Text>
                                </TouchableHighlight>
                                </View> 
                        </View>
                        );
                })
              ) : (
            <Text style={{opacity: 0.8, marginVertical: 20, textAlign: 'center', color: colors.text}}>
              No hay categorías registradas</Text>
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textRow:{
    fontSize: 20, 
    paddingVertical: 5, 
    fontWeight: 'bold',
  },
  query: {
    backgroundColor: colors.input, color: colors.text,  
    height: 40, width: 120,
    marginTop: 10,
  },
   add: {
    backgroundColor: colors.input,
    width: 150,
    marginVertical: 10,
    padding: 10,
    borderRadius: 15,
    // elevation: 5,
    shadowColor: "#000", shadowOffset: {height: 2, width: 0,}
  },
  //Tabla estilos
  cell: {
    flex: 1, padding: 6,
    borderWidth: 1, borderColor: colors.border,
    backgroundColor: colors.background,
  },
  //Modal estilos
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  modalView: {
    marginHorizontal: 30,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.modalBackground,
    borderRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 30, fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: colors.text
  },
   hr:{
    height: 2, 
    backgroundColor: '#777', 
    marginBottom: 15,
  },
  input: {
    backgroundColor: colors.scrollBackground, color: colors.text,
    height: 40, width: 120,
    marginTop: 10,
  },
  modalRow:{
    flexDirection: 'row', 
    justifyContent: 'space-evenly', 
    marginBottom: 15,
    alignItems: 'center',
  },
  modalLabel:{
    fontSize: 20, fontWeight: 'bold', color: colors.text
  },
  modalConfirm: {
    backgroundColor: colors.confirm,
    padding: 10,
    borderRadius: 20,
    width: 130,
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
  modalRegret: {
    backgroundColor: colors.regret,
    padding: 10,
    borderRadius: 20,
    width: 50,
    justifyContent: 'center', alignItems: 'center',
     elevation: 5,
    shadowColor: "#000", shadowOffset: {height: 2, width: 0,}
  },
  modalDelete: {
    backgroundColor: colors.delete,
    padding: 10,
    borderRadius: 20,
    width: 150,
    justifyContent: 'center', alignItems: 'center',
     elevation: 5,
    shadowColor: "#000", shadowOffset: {height: 2, width: 0,}
  }
  
});
