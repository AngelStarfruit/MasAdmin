import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, Image, Modal, TextInput, Alert, KeyboardAvoidingView, Platform} from 'react-native';
import Constants from 'expo-constants';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { NoEmojis, Validar, NumeroValido, AddElemento, QuitarElemento } from './backend';
import type { ListaDePreciosScreenProps, ContenidoPaquete } from './types';
import datos from './datos.json'

export default function ListaDePrecios({ navigation }: ListaDePreciosScreenProps) {

  const getImage = (nombre: any) => {
  switch(nombre) {
    case 'C': return require('../assets/C.png');
    case 'V': return require('../assets/V.png');
    case 'S': return require('../assets/S.png');
    case 'D': return require('../assets/D.png');
    case 'A': return require('../assets/A.png');
    case '$': return require('../assets/$.png');
    case 'xr': return require('../assets/xred.png');
    default: return require('../assets/x.png');
    }
  }

  //Constantes de inputs
  const [descripcion, setDescripcion] = useState('');
  const [marca, setMarca] = useState('');
  const [costo, setCosto] = useState('');
  const [cantidad, setCantidad] = useState('');

  //Constantes de picker
  const [selectedValue, setSelectedValue] = useState('Servicios');
  const [selectedUValue, setSelectedUValue] = useState('pieza');
  const [selectedTValue, setSelectedTValue] = useState('producto');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  //Constantes de modales
  const [modalVisible, setModalVisible] = useState(false);
  const [EmodalVisible, setEModalVisible] = useState(false);
  const [NewPaquete, setNewPaquete] = useState(false);
  const [Paquete, setPaquete] = useState(false);
  const [AlterPaquete, setAlterPaquete] = useState(false);
  const [Confirm, setConfirm] = useState(false);

  //JSON con los datos
  const [listaPrecios, setListaPrecios] = useState(datos.LISTA_PRECIOS)
  const [listaCategorias, setListaCategorias] = useState(datos.CATEGORIAS)
  //JSON para crear paquetes
  const [contenidoPaquete, setContenidoPaquete] = useState<ContenidoPaquete>({});

  //IDs
  const [idP, setIdP] = useState(1);

  //Desabilitar características
  const [editPaqueteOff, setEditPaqueteOff] = useState(false);
  const [editMarcaOn, setEditMarcaOn] = useState(false);
  const [editCostoOn, setEditCostoOn] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.navigation}>

      <TouchableHighlight
        underlayColor={"#ddf"} style={styles.navIcons}
        onPress={() => navigation.navigate("Dashboard")}
      >
        <Image source={getImage('D')} style={styles.navIconImage} />
      </TouchableHighlight>

      <TouchableHighlight
        underlayColor={"#ddf"} style={styles.navIcons}
        onPress={() => navigation.navigate("Compras")}
      >
        <Image source={getImage('C')} style={styles.navIconImage} />
      </TouchableHighlight>

        <TouchableHighlight
        underlayColor={"#ddf"} style={styles.navIcons}
        onPress={() => navigation.navigate("Ventas")}
      >
        <Image source={getImage('V')} style={styles.navIconImage} />
      </TouchableHighlight>

      <TouchableHighlight
        underlayColor={"#ddf"} style={styles.navIcons}
        onPress={() => navigation.navigate("Sucursales")} 
      >
        <Image source={getImage('S')} style={styles.navIconImage} />
      </TouchableHighlight>

        <TouchableHighlight
        underlayColor={"#ddf"} style={styles.navIcons}
        onPress={() => navigation.navigate("Almacenes")} 
      >
        <Image source={getImage('A')} style={styles.navIconImage} />
      </TouchableHighlight>

        <TouchableHighlight
        style={styles.navIconsS} 
      >
        <Image source={getImage('$')} style={styles.navIconImage} />
      </TouchableHighlight>

    </View>

    {/* Modal para añadir elementos */}
            <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    setModalVisible(!modalVisible);
                  }}>
                  <View style={styles.modalOverlay}>
                  <View style={styles.modalView}>
        
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                      <TouchableHighlight
                      style={{height: 30, width: 30, alignItems: "flex-end"}}
                      underlayColor={'#eee'}
                      onPress={() => setModalVisible(!modalVisible)}>
                      <Image source={getImage('x')} style={styles.lupaImage}/>
                      </TouchableHighlight>
                    </View>
        
                    <View>
                      <Text style={styles.modalTitle}>Añadir elemento</Text>
                    </View>
        
                    <View style={styles.hr}/>
        
                    <View style={styles.modalRow}>
                      <Text style={styles.modalLabel}>Descripción:</Text>
                      <TextInput style={{...styles.query, width: 150}}
                      value={descripcion} onChangeText={(text) => setDescripcion(NoEmojis(text))}/>
                    </View>
                    <View style={styles.modalRow}>
                      <Text style={styles.modalLabel}>Marca:</Text>
                      <TextInput style={{...styles.query, width: 150}}
                      value={marca} onChangeText={(text) => setMarca(NoEmojis(text))}/>
                    </View>
                    <View style={styles.modalRow}>
                      <Text style={styles.modalLabel}>Costo:</Text>
                      <TextInput style={{...styles.query, width: 150}}
                      keyboardType='numeric'
                      value={costo} onChangeText={(text) => setCosto(NoEmojis(text))}/>
                    </View>
                    <View style={styles.modalRow}>
                      <Text style={styles.modalLabel}>Categoría:</Text>
                      <View style={{width: 150, height: 50}}>
                      <Picker
                        selectedValue={selectedCategory}
                        onValueChange={(itemValue) => setSelectedCategory(itemValue)}
                        style={[styles.picker, {backgroundColor: "#eee"}]} 
                        itemStyle={styles.pickerItem}
                        >
                      {Object.entries(listaCategorias).map(([id, descripcion], index) => (
                      <Picker.Item key={index} label={descripcion} value={descripcion} />
                      ))}
                      </Picker>
                      </View>
                    </View>
                    <View style={styles.modalRow}>
                      <Text style={styles.modalLabel}>Unidad:</Text>
                      <View style={{width: 150, height: 50}}>
                      <Picker
                        selectedValue={selectedUValue}
                        onValueChange={(itemValue) => setSelectedUValue(itemValue)}
                        style={[styles.picker, {backgroundColor: "#eee"}]} 
                        itemStyle={styles.pickerItem}
                        >
                      <Picker.Item label="Pieza" value="pieza" />
                      <Picker.Item label="Gramo" value="g" />
                      </Picker>
                      </View>
                    </View>
                    <View style={styles.modalRow}>
                      <Text style={styles.modalLabel}>Tipo:</Text>
                      <View style={{width: 150, height: 50}}>
                      <Picker
                        selectedValue={selectedTValue}
                        onValueChange={(itemValue) => setSelectedTValue(itemValue)}
                        style={[styles.picker, {backgroundColor: "#eee"}]} 
                        itemStyle={styles.pickerItem}
                        >
                      <Picker.Item label="Producto" value="producto" />
                      <Picker.Item label="Servicio" value="servicio" />
                      <Picker.Item label="Gasto" value="gasto" />
                      <Picker.Item label="Paquete" value="paquete" />
                      </Picker>
                      </View>
                    </View>
        
                    <View style={styles.hr}/>
        
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                      <TouchableHighlight
                      underlayColor={'#82ff92'} style={styles.modalConfirm}
                        onPress={() => {
                          const validation = Validar(3,descripcion,marca,costo,'');
                             if (!validation.isValid) {
                            Alert.alert('Error', validation.message);
                            return; 
                            }
                            if (selectedTValue != 'paquete'){
                            setModalVisible(!modalVisible)
                            }
                            else {
                              setNewPaquete(true)
                              setIdP(1); setContenidoPaquete({});
                            }
                          }}>
                        <Text>Añadir registro</Text>
                      </TouchableHighlight>
                    </View>
        
                  </View>
                  </View>
                </Modal>
        
              {/* Modal para editar elementos */}
            <Modal
                  animationType="slide"
                  transparent={true}
                  visible={EmodalVisible}
                  onRequestClose={() => {
                    setEModalVisible(!EmodalVisible);
                  }}>
                  <View style={styles.modalOverlay}>
                    <KeyboardAvoidingView 
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={{ flex: 1 }}
                        >  
                      <ScrollView 
                           showsVerticalScrollIndicator={false}
                          keyboardShouldPersistTaps="handled"
                        >
                  <View style={[styles.modalView, {marginVertical: 210}]}>
        
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                      <TouchableHighlight
                      style={{height: 30, width: 30, alignItems: "flex-end"}}
                      underlayColor={'#eee'}
                      onPress={() => setEModalVisible(!EmodalVisible)}>
                      <Image source={getImage('x')} style={styles.lupaImage}/>
                      </TouchableHighlight>
                    </View>
        
                    <View>
                      <Text style={styles.modalTitle}>Editar elemento</Text>
                      <Text style={[styles.modalLabel, {textAlign: 'center', opacity: 0.5, marginBottom: 10}]}>
                        La unidad y el tipo no se pueden modificar</Text>
                    </View>
        
                    <View style={styles.hr}/>
        
                    <View style={styles.modalRow}>
                      <Text style={styles.modalLabel}>Descripción:</Text>
                      <TextInput style={[styles.query, {width: 150}]}
                      value={descripcion} onChangeText={(text) => setDescripcion(NoEmojis(text))}/>
                    </View>
                    <View style={styles.modalRow}>
                      <Text style={styles.modalLabel}>Marca:</Text>
                      <TextInput style={[styles.query, {width: 150}]}
                       editable = {editMarcaOn}
                      value={marca} onChangeText={(text) => setMarca(NoEmojis(text))}/>
                    </View>
                    <View style={styles.modalRow}>
                      <Text style={styles.modalLabel}>Costo:</Text>
                      <TextInput style={[styles.query, {width: 150}]}
                      editable = {editCostoOn}
                      keyboardType='numeric'
                      value={costo} onChangeText={setCosto}/>
                    </View>
        
                    <View style={styles.hr}/>
        
                    <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                      <TouchableHighlight
                      disabled = {editPaqueteOff}
                      underlayColor={'#f3fe53'} style={[styles.modalEdit, editPaqueteOff && styles.modalEditOff]}
                        onPress={() => {
                          //-----
                          setPaquete(true)}}>
                        <Text>Editar paquete</Text>
                      </TouchableHighlight>
                      <TouchableHighlight
                      underlayColor={'#f3fe53'} style={styles.modalEdit}
                        onPress={() => {
                          const validation = Validar(3,descripcion,marca,costo,'');
                             if (!validation.isValid) {
                            Alert.alert('Error', validation.message);
                            return; 
                            }
                        setEModalVisible(!EmodalVisible)}}>
                        <Text>Editar registro</Text>
                      </TouchableHighlight>
                      <TouchableHighlight
                      underlayColor={'#ff9797'} style={styles.modalDelete}
                        onPress={() => setConfirm(true)}>
                        <Text>Borrar registro</Text>
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
                      underlayColor={'#ddd'} style={[styles.modalRegret , {width: 50}]}
                        onPress={() => setConfirm(!Confirm)}>
                        <Text>NO</Text>
                      </TouchableHighlight>
                      <TouchableHighlight
                      underlayColor={'#ff9797'} style={[styles.modalDelete , {width: 50}]}
                        onPress={() => {
                          setConfirm(!Confirm);
                          setEModalVisible(!EmodalVisible);
                        }}>
                        <Text>SÍ</Text>
                      </TouchableHighlight>
                    </View>
        
                  </View>
                  </View>
                </Modal>

      {/* Modal para agregar paquete */}
            <Modal
                  animationType="slide"
                  transparent={true}
                  visible={NewPaquete}
                  onRequestClose={() => {
                    setNewPaquete(!NewPaquete);
                  }}>
                  <View style={styles.modalOverlay}>
                  <View style={[styles.modalView, {marginVertical: 130}]}>

                  <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                      <TouchableHighlight
                      style={{height: 30, width: 30, alignItems: "flex-end"}}
                      underlayColor={'#eee'}
                      onPress={() => setNewPaquete(!NewPaquete)}>
                      <Image source={getImage('x')} style={styles.lupaImage}/>
                      </TouchableHighlight>
                    </View>
        
                    <View>
                      <Text style={styles.modalTitle}>Definir paquete</Text>
                    </View>
        
                    <View style={styles.hr}/>
        
                   <View>
                      <Text style={[styles.modalLabel, {textAlign: 'center'}]}>
                        Ingrese los productos que contendrá este paquete</Text>
                    </View>

                    <View style={styles.table}>
                        <View style={styles.row}>
                        <View style={[styles.headerCell, {backgroundColor: '#c2c6ff'}]}>
                            <Text style={styles.headerText}>Descripción</Text>
                            </View>
                            <View style={[styles.headerCell, {backgroundColor: '#c2c6ff'}]}>
                            <Text style={styles.headerText}>Cantidad</Text>
                              </View>
                              <View style={[styles.headerCell, {backgroundColor: '#c2c6ff', flex: 0.2}]}>
                              </View>
                              </View>
                              <ScrollView style={styles.showcase}>
                          {Object.entries(contenidoPaquete).map(([id, [descripcion, cantidad]], index) => (
                          <View key={index} style={styles.row}>
                          <View style={[styles.cell, {backgroundColor: '#e3e5ff'}]}>
                          <Text>{descripcion}</Text>
                            </View>
                            <View style={[styles.cell, {backgroundColor: '#e3e5ff'}]}>
                            <Text>{cantidad}</Text>
                            </View>
                            <View style={[styles.cell, {backgroundColor: '#e3e5ff', flex: 0.2}]}>
                            <TouchableHighlight
                            style={{height:25, width:25}}
                            onPress={() => {
                              setContenidoPaquete(QuitarElemento(contenidoPaquete, Number(id)))}}
                            underlayColor={"#ffa6a6"}
                            >
                               <Image source={getImage('xr')} style={styles.navIconImage} />
                            </TouchableHighlight>
                            </View>
                          </View>
                          ))}
                              </ScrollView>
                          </View>

                    <View style={[styles.row, {justifyContent: 'center', marginBottom: 15}]}>
                              <TouchableHighlight
                                    underlayColor={'#5460ff'}
                                      onPress={() => setAlterPaquete(true)}
                                      style={styles.buttonRegister}>
                                      <Text style={styles.buttonText}>Agregar</Text>
                                  </TouchableHighlight>
                                  </View>
                    
                    <View style={styles.hr}/>

                    <View style={[styles.row, {justifyContent: 'center'}]}>
                      <TouchableHighlight
                      underlayColor={'#82ff92'} style={[styles.modalConfirm, {width: 150}]}
                        onPress={() => {
                          if(Object.keys(contenidoPaquete).length > 0){
                            setNewPaquete(!NewPaquete)
                            setModalVisible(!modalVisible)}
                          else Alert.alert("Error","Por favor, agregue los productos que contendrá el paquete")
                          }}>
                        <Text>Añadir paquete</Text>
                      </TouchableHighlight>
                      </View>
        
                  </View>
                  </View>
                </Modal>
      
      {/* Modal para editar paquete */}
            <Modal
                  animationType="slide"
                  transparent={true}
                  visible={Paquete}
                  onRequestClose={() => {
                    setPaquete(!Paquete);
                  }}>
                  <View style={styles.modalOverlay}>
                  <View style={[styles.modalView, {marginVertical: 130}]}>

                  <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                      <TouchableHighlight
                      style={{height: 30, width: 30, alignItems: "flex-end"}}
                      underlayColor={'#eee'}
                      onPress={() => setPaquete(!Paquete)}>
                      <Image source={getImage('x')} style={styles.lupaImage}/>
                      </TouchableHighlight>
                    </View>
        
                    <View>
                      <Text style={styles.modalTitle}>Editar paquete</Text>
                    </View>
        
                    <View style={styles.hr}/>
        
                   <View>
                      <Text style={[styles.modalLabel, {textAlign: 'center'}]}>
                        Ingrese los productos que contendrá este paquete</Text>
                    </View>

                    <View style={styles.table}>
                        <View style={styles.row}>
                        <View style={[styles.headerCell, {backgroundColor: '#c2c6ff'}]}>
                            <Text style={styles.headerText}>Descripción</Text>
                            </View>
                            <View style={[styles.headerCell, {backgroundColor: '#c2c6ff'}]}>
                            <Text style={styles.headerText}>Cantidad</Text>
                              </View>
                              <View style={[styles.headerCell, {backgroundColor: '#c2c6ff', flex: 0.2}]}>
                              </View>
                              </View>
                              <ScrollView style={styles.showcase}>

                                {Object.entries(contenidoPaquete).map(([id,[descripcion, cantidad]], index) => (
                          <View key={index} style={styles.row}>
                          <View style={[styles.cell, {backgroundColor: '#e3e5ff'}]}>
                          <Text>{descripcion}</Text>
                            </View>
                            <View style={[styles.cell, {backgroundColor: '#e3e5ff'}]}>
                            <Text>{cantidad}</Text>
                            </View>
                            <View style={[styles.cell, {backgroundColor: '#e3e5ff', flex: 0.2}]}>
                            <TouchableHighlight
                            style={{height:25, width:25}}
                            onPress={() => {
                              setContenidoPaquete(QuitarElemento(contenidoPaquete, Number(id)))}}
                            underlayColor={"#ffa6a6"}
                            >
                               <Image source={getImage('xr')} style={styles.navIconImage} />
                            </TouchableHighlight>
                            </View>
                          </View>
                          ))}  
                               
                              </ScrollView>
                          </View>

                    <View style={[styles.row, {justifyContent: 'center', marginBottom: 15}]}>
                              <TouchableHighlight
                                    underlayColor={'#5460ff'}
                                      onPress={() => setAlterPaquete(true)}
                                      style={styles.buttonRegister}>
                                      <Text style={styles.buttonText}>Agregar</Text>
                                  </TouchableHighlight>
                                  </View>
                    
                    <View style={styles.hr}/>

                    <View style={[styles.row, {justifyContent: 'center'}]}>
                      <TouchableHighlight
                      underlayColor={'#f3fe53'} style={[styles.modalEdit, {width: 150}]}
                        onPress={() =>  {
                          Alert.alert('Exito', 'Cambios al paquete guardados');
                        setPaquete(!Paquete)}}>
                        <Text>Confirmar cambios</Text>
                      </TouchableHighlight>
                      </View>
        
                  </View>
                  </View>
                </Modal>
      
      {/* Modal para definir elementos para los paquetes*/}
                <Modal
                      animationType="slide"
                      transparent={true}
                      visible={AlterPaquete}
                      onRequestClose={() => {
                        setAlterPaquete(!AlterPaquete);
                      }}>
                      <View style={styles.modalOverlay}>
                      <View style={[styles.modalView, {marginVertical: 300}]}>
            
                        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                          <TouchableHighlight
                          underlayColor={'#ccc'}
                          onPress={() => setAlterPaquete(!AlterPaquete)}>
                          <Image source={getImage('x')} style={styles.lupaImage}/>
                          </TouchableHighlight>
                        </View>
            
                        <View>
                          <Text style={styles.modalTitle}>Agregar elementos</Text>
                        </View>
            
                        <View style={styles.hr}/>
                          <View style={styles.modalRow}>
                            <Text style={styles.modalLabel}>Elemento:</Text>
                            <View style={{width:130, height:50}}>
                              <Picker
                              style={[styles.picker, {backgroundColor: "#eee"}]}
                              selectedValue={selectedProduct}
                              onValueChange={(itemValue) => setSelectedProduct(itemValue)}
                              >
                              {Object.entries(listaPrecios).map(([id, [descripcion, marca, costo, unidad, tipo, contenido, categoría]], index) => (
                              <Picker.Item style={styles.pickerItem} key={index} label={String(descripcion)} value={descripcion} />
                              ))}
                              </Picker></View>
                          </View>
                          <View style={styles.modalRow}>
                            <Text style={styles.modalLabel}>Cantidad:</Text>
                            <TextInput style={styles.query}
                                        value={cantidad} onChangeText={setCantidad}
                                        keyboardType='numeric'></TextInput>
                          </View>
                        <View style={styles.hr}/>
            
                        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                          <TouchableHighlight
                          underlayColor={'#82ff92'} style={styles.modalConfirm}
                            onPress={() => {
                              const validation = NumeroValido(cantidad);
                                  if (!validation.isValid) {
                              Alert.alert('Error', validation.message);
                              return; 
                            }
                            setContenidoPaquete(AddElemento(contenidoPaquete, idP, selectedProduct, Number(cantidad)))
                            setIdP(idP + 1); setCantidad('')
                            setAlterPaquete(!AlterPaquete)}}>
                            <Text>Agregar</Text>
                          </TouchableHighlight>
                        </View>
            
                      </View>
                      </View>
                    </Modal>

      {/*ScrollView*/}
      <ScrollView>
        <View style={styles.scroll}>
        <Text style={{  fontSize: 25, fontWeight: 'bold' }}>
          Lista de precios
        </Text>
        <Text style={{ 
          fontSize: 15, 
          paddingVertical: 10,}}>
          Seleccione una categoría para veer los elementos ubicados en ella.
          </Text>
        <Text style={{ 
          fontSize: 15, 
          paddingVertical: 10,}}>
          Seleccione la descripción de un elemento en la tabla para modificar sus datos.
          </Text>   
          <Picker
              selectedValue={selectedValue}
              onValueChange={(itemValue) => setSelectedValue(itemValue)}
              style={styles.picker} itemStyle={styles.pickerItem}
              >
                <Picker.Item label="Servicios" value="Servicios" />
                <Picker.Item label="Gastos" value="Gastos" />
                <Picker.Item label="Paquetes" value="Paquetes" />
                {Object.entries(listaCategorias).map(([id, descripcion], index) => (
                  <Picker.Item key={index} label={descripcion} value={descripcion} />
                ))}
          </Picker>

          <View style={[styles.row, {justifyContent: "space-between"}]}>
          <TouchableHighlight 
                underlayColor={'#f0f1ff'}
                onPress={() => {
                  setDescripcion(''); setMarca(''); setCosto('');
                  setModalVisible(true)}}
                style={styles.add}>
                    <Text style={{fontWeight: 'bold'}}>Añadir elemento</Text>
                  </TouchableHighlight>
          <TouchableHighlight 
                underlayColor={'#f0f1ff'}
                onPress={() => navigation.navigate("Categorias")}
                style={[styles.add , {width: 180}]}>
                    <Text style={{fontWeight: 'bold'}}>Gestionar categorías</Text>
                  </TouchableHighlight>
                  </View>
                  
                  <View style={styles.hr}/>
          <View style={styles.table}>
                <View style={styles.row}>
                        <View style={styles.headerCell}>
                          <Text style={styles.headerText}>Descripción</Text>
                          </View>
                        <View style={styles.headerCell}>
                          <Text style={styles.headerText}>Marca</Text>
                          </View>
                        <View style={styles.headerCell}>
                          <Text style={styles.headerText}>Costo</Text>
                          </View>
                        <View style={[styles.headerCell, {flex: 0.5}]}>
                          <Text style={styles.headerText}>Unidad</Text>
                          </View>
                      </View>

                {Object.entries(listaPrecios).map(([id, [descripcion, marca, costo, unidad, tipo, contenido, categoría]], index) => (
                      <View key={index} style={styles.row}>
                        <View style={styles.cellF}>
                        <TouchableHighlight
                        underlayColor={'#ddd'}
                        onPress={() => {

                          if (tipo != "paquete"){
                            setEditPaqueteOff(true)
                          } else setEditPaqueteOff(false)

                          if (tipo != "producto"){
                            setEditMarcaOn(false)
                          } else setEditMarcaOn(true)

                          if (tipo == "gasto"){
                            setEditCostoOn(false)
                          } else setEditCostoOn(true)

                          setDescripcion(String(descripcion)); setMarca(String(marca)); setCosto(String(costo))
                          setEModalVisible(true)}}>
                        <Text>{descripcion}</Text>
                        </TouchableHighlight>
                        </View> 
                        <View style={styles.cell}><Text>{marca}</Text></View>
                        <View style={styles.cell}><Text>{costo}</Text></View>
                        <View style={[styles.cell, {flex: 0.5}]}><Text>{unidad}</Text></View>
                </View>
                ))}
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
    backgroundColor: "white",
    flexDirection: 'row', justifyContent: 'space-around',
    padding: 5,
    elevation: 5,
    shadowColor: "#000", shadowOffset: {height: 2, width: 0,}
  },
  navIcons:{
    padding: 10, borderRadius: 50 ,
  },
  navIconsS:{
    padding: 10, borderRadius: 50 , backgroundColor: '#ddf',
  },
  navIconImage: {
    width: 20, height: 20,
  },
  lupaImage: {
    width: 15, height: 15,
  },
  scroll: {
    flex: 1,
    backgroundColor: '#eee',
    padding: 18,
  },
  showcase: {
    backgroundColor: '#e3e5ff',
    minHeight: 250
  },
  add: {
    backgroundColor: 'white',
    width: 150,
    marginTop: 10,
    padding: 10,
    borderRadius: 15,
     elevation: 5,
    shadowColor: "#000", shadowOffset: {height: 2, width: 0,}
  },
  query:{
    backgroundColor: 'white', color: 'black',
    borderWidth: 1, borderColor: 'black', 
    height: 40, width: 120,
    marginTop: 10,
  },
   hr:{
    height: 2, 
    backgroundColor: '#777', 
    marginVertical: 8,
  },
  //Tabla estilos
  table: {
    paddingVertical: 20,
    elevation: 10,
    shadowColor: "#000", shadowOffset: {height: 4, width: 0,}
  },
  row: {flexDirection: 'row',},
  headerCell: {
    flex: 1, padding: 6,
    backgroundColor: '#e3e5ff',
    borderWidth: 1,
    borderColor: 'black',
  },
  cell: {
    flex: 1, padding: 6,
    borderWidth: 1,
    backgroundColor: 'white',
  },
  cellF: {
    flex: 1, padding: 6,
    borderWidth: 1,
    backgroundColor: '#eee',
  },
  headerText: {fontWeight: 'bold',},
  //Modal estilos
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  modalView: {
    marginHorizontal: 30, marginVertical: 150,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 30, fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalRow:{
    flexDirection: 'row', 
    justifyContent: 'space-evenly', 
    marginBottom: 15,
    alignItems: 'center',
  },
  modalLabel:{
    fontSize: 20, fontWeight: 'bold',
  },
  modalConfirm: {
    backgroundColor: '#62ff77',
    padding: 10,
    borderRadius: 20,
    width: 130,
    justifyContent: 'center', alignItems: 'center',
    paddingVertical: 20,
    elevation: 5,
    shadowColor: "#000", shadowOffset: {height: 2, width: 0,}
  },
  modalRegret: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 15,
    width: 130,
    justifyContent: 'center', alignItems: 'center',
    paddingVertical: 20,
    elevation: 5,
    shadowColor: "#000", shadowOffset: {height: 2, width: 0,}
  },
  modalEdit: {
    backgroundColor: '#f3fe53',
    padding: 10,
    borderRadius: 20,
    width: 90,
    justifyContent: 'center', alignItems: 'center',
    elevation: 5,
    shadowColor: "#000", shadowOffset: {height: 2, width: 0,}
  },
  modalEditOff: {
    opacity: 0.6, shadowOpacity: 0.6,
    backgroundColor: '#f3fe53',
    padding: 10,
    borderRadius: 20,
    width: 90,
    justifyContent: 'center', alignItems: 'center',
    elevation: 5,
    shadowColor: "#000", shadowOffset: {height: 2, width: 0,}
  },
  modalDelete: {
    backgroundColor: '#ff8787',
    padding: 10,
    borderRadius: 20,
    width: 90,
    justifyContent: 'center', alignItems: 'center',
    elevation: 5,
    shadowColor: "#000", shadowOffset: {height: 2, width: 0,}
  },
  buttonRegister: {
    backgroundColor: '#656fff',
    width: 150,
    padding: 10,
    borderRadius: 20,
    elevation: 5,
    shadowColor: "#000", shadowOffset: {height: 2, width: 0,}
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  //---------------
  picker: {
    height: 50,
    marginLeft: 10,
    flex: 1,
    backgroundColor: 'white',
    color: 'black',
  },
  pickerItem: {
    fontSize: 16,
    fontWeight: 'bold',
  },

});
