import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Compras from './app/Compras/Compras';
import ControlCompras from './app/Compras/ControlCompras';
import Proveedores from './app/Compras/Proveedores';

import Ventas from './app/Ventas/Ventas';
import Clientes from './app/Ventas/Clientes';
import ControlVentas from './app/Ventas/ControlVentas';

import Almacenes from './app/Almacenes/Almacenes';
import AjustesInventario from './app/Almacenes/AjustesInventario';
import AlmacenesInfo from './app/Almacenes/AlmacenesInfo';
import ExistenciasAlmacen from './app/Almacenes/ExistenciasAlmacen';

import Dashboard from './app/Dashboard';

import ListaDePrecios from './app/ListaDePrecios';

import Sucursales from './app/Sucursales';

import home from './app/home';
import register from './app/register';
import signup from './app/signup';

export type RootStackParamList = {
  Compras: undefined;
  ControlCompras: undefined;
  Proveedores: undefined;

  Ventas: undefined;
  Clientes: undefined;
  ControlVentas: undefined;

  Almacenes: undefined;
  AjustesInventario: undefined;
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

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard">

        <Stack.Screen 
          name="Dashboard" 
          component={Dashboard} 
          options={{ headerShown: false }}
        />

        <Stack.Screen 
          name="Compras" 
          component={Compras} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="ControlCompras" 
          component={ControlCompras} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Proveedores" 
          component={Proveedores} 
          options={{ headerShown: false }}
        />

        <Stack.Screen 
          name="Ventas" 
          component={Ventas} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="ControlVentas" 
          component={ControlVentas} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Clientes" 
          component={Clientes} 
          options={{ headerShown: false }}
        />

        <Stack.Screen 
          name="Sucursales" 
          component={Sucursales} 
          options={{ headerShown: false }}
        />

        <Stack.Screen 
          name="Almacenes" 
          component={Almacenes} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="AjustesInventario" 
          component={AjustesInventario} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="AlmacenesInfo" 
          component={AlmacenesInfo} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="ExistenciasAlmacen" 
          component={ExistenciasAlmacen} 
          options={{ headerShown: false }}
        />

        <Stack.Screen 
          name="ListaDePrecios" 
          component={ListaDePrecios} 
          options={{ headerShown: false }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}