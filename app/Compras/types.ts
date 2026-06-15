import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';  // ✅ Importa desde App raíz

export type ComprasScreenProps = NativeStackScreenProps<RootStackParamList, 'Compras'>;
export type ControlComprasScreenProps = NativeStackScreenProps<RootStackParamList, 'ControlCompras'>;
export type ControlGastosScreenProps = NativeStackScreenProps<RootStackParamList, 'ControlGastos'>;
export type AddRegistroCompraScreenProps = NativeStackScreenProps<RootStackParamList, 'AddRegistroCompra'>;
export type AddRegistroGastoScreenProps = NativeStackScreenProps<RootStackParamList, 'AddRegistroGasto'>;
export type ProveedoresScreenProps = NativeStackScreenProps<RootStackParamList, 'Proveedores'>;

export type RegistroCompra = {[key: number]: [string, string, number, number];};
export type RegistroGasto = {[key: number]: [string, number];};
export type FormerJSON = Record<string, string[]>;