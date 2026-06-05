import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { lazy, Suspense } from 'react';
import { ActivityIndicator, View } from 'react-native';

const Compras = lazy(() => import('./app/Compras/Compras'));
const ControlCompras = lazy(() => import('./app/Compras/ControlCompras'));
const ControlGastos = lazy(() => import('./app/Compras/ControlGastos'));
const AddRegistroCompra = lazy(() => import('./app/Compras/AddRegistroCompra'));
const AddRegistroGasto = lazy(() => import('./app/Compras/AddRegistroGasto'));
const Proveedores = lazy(() => import('./app/Compras/Proveedores'));

const Ventas = lazy(() => import('./app/Ventas/Ventas'));
const Clientes = lazy(() => import('./app/Ventas/Clientes'));
const ControlVentas = lazy(() => import('./app/Ventas/ControlVentas'));
const AddRegistroVenta = lazy(() => import('./app/Ventas/AddRegistroVenta'));

const Almacenes = lazy(() => import('./app/Almacenes/Almacenes'));
const AjustesInventario = lazy(() => import('./app/Almacenes/AjustesInventario'));
const AddAjustesInventario = lazy(() => import('./app/Almacenes/AddAjustesInventario'));
const AlmacenesInfo = lazy(() => import('./app/Almacenes/AlmacenesInfo'));
const ExistenciasAlmacen = lazy(() => import('./app/Almacenes/ExistenciasAlmacen'));

const Dashboard = lazy(() => import('./app/Dashboard'));

const ListaDePrecios = lazy(() => import('./app/ListaDePrecios'));

const Sucursales = lazy(() => import('./app/Sucursales'));

const home = lazy(() => import('./app/home'));
const signup = lazy(() => import('./app/signup'));
const register = lazy(() => import('./app/register'));

export type RootStackParamList = {
  Compras: undefined;
  ControlCompras: undefined;
  ControlGastos: undefined;
  AddRegistroCompra: undefined;
  AddRegistroGasto: undefined;
  Proveedores: undefined;

  Ventas: undefined;
  Clientes: undefined;
  ControlVentas: undefined;
  AddRegistroVenta: undefined;

  Almacenes: undefined;
  AjustesInventario: undefined;
  AddAjustesInventario: undefined;
  AlmacenesInfo: undefined;
  ExistenciasAlmacen: undefined;

  Dashboard: undefined;

  ListaDePrecios: undefined;

  Sucursales: undefined;

  home: undefined;
  register: undefined;
  signup: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function LoadingScreen() {
  return (
    <View>
      <ActivityIndicator size="large" color="#2435f0" />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Suspense fallback={<LoadingScreen />}>
        <Stack.Navigator initialRouteName="home"
          screenOptions={{
            headerShown: false,
            animation: 'fade',
          }}>

         <Stack.Screen 
            name="home"
            component={home}/>

          <Stack.Screen 
            name="signup"
            component={signup}/>
          
          <Stack.Screen 
            name="register"
            component={register}/>

          <Stack.Screen 
            name="Dashboard"
            component={Dashboard}/>

          <Stack.Screen 
          name="Compras" 
          component={Compras} />
        <Stack.Screen 
          name="ControlCompras" 
          component={ControlCompras}/>
        <Stack.Screen 
          name="ControlGastos" 
          component={ControlGastos}/>
        <Stack.Screen 
          name="AddRegistroCompra" 
          component={AddRegistroCompra}/>
        <Stack.Screen 
          name="AddRegistroGasto" 
          component={AddRegistroGasto}/>
        <Stack.Screen 
          name="Proveedores" 
          component={Proveedores}/>

        <Stack.Screen 
          name="Ventas" 
          component={Ventas}/>
        <Stack.Screen 
          name="ControlVentas" 
          component={ControlVentas}/>
        <Stack.Screen 
          name="AddRegistroVenta" 
          component={AddRegistroVenta}/>
        <Stack.Screen 
          name="Clientes" 
          component={Clientes}/>

        <Stack.Screen 
          name="Sucursales" 
          component={Sucursales}/>

        <Stack.Screen 
          name="Almacenes" 
          component={Almacenes}/>
        <Stack.Screen 
          name="AjustesInventario" 
          component={AjustesInventario}/>
        <Stack.Screen 
          name="AddAjustesInventario" 
          component={AddAjustesInventario}/>
        <Stack.Screen 
          name="AlmacenesInfo" 
          component={AlmacenesInfo}/>
        <Stack.Screen 
          name="ExistenciasAlmacen" 
          component={ExistenciasAlmacen}/>

        <Stack.Screen 
          name="ListaDePrecios" 
          component={ListaDePrecios}/>

        </Stack.Navigator>
      </Suspense>
    </NavigationContainer>
  );
}
