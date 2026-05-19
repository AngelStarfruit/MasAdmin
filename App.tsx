// App.tsx (en la RAÍZ de tu proyecto)
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Compras from './app/Compras/Compras';
import ControlCompras from './app/Compras/ControlCompras';
import Proveedores from './app/Compras/Proveedores';

// Define los tipos de navegación
export type RootStackParamList = {
  Compras: undefined;
  ControlCompras: undefined;
  Proveedores: undefined;
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