import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';  // ✅ Importa desde App raíz

export type VentasScreenProps = NativeStackScreenProps<RootStackParamList, 'Ventas'>;
export type ControlVentasScreenProps = NativeStackScreenProps<RootStackParamList, 'ControlVentas'>;
export type AddRegistroVentaScreenProps = NativeStackScreenProps<RootStackParamList, 'AddRegistroVenta'>;
export type ClientesScreenProps = NativeStackScreenProps<RootStackParamList, 'Clientes'>;

export type RegistroVenta = {[key: number]: [string, string, number, number];};