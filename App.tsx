
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
import Sucursales from './app/Sucursales';

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
  Sucursales: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Compras">
        <Stack.Screen 
          name="Compras" 
          component={Compras} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="ControlCompras" 
          component={ControlCompras} 
          options={{ 
            title: 'Control de Compras',
            headerStyle: { backgroundColor: '#2435f0' },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen 
          name="Proveedores" 
          component={Proveedores} 
          options={{ 
            title: 'Proveedores',
            headerStyle: { backgroundColor: '#2435f0' },
            headerTintColor: '#fff',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}