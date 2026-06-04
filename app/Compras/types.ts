import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';  // ✅ Importa desde App raíz

export type ComprasScreenProps = NativeStackScreenProps<RootStackParamList, 'Compras'>;
export type ControlComprasScreenProps = NativeStackScreenProps<RootStackParamList, 'ControlCompras'>;
export type AddRegistroCompraScreenProps = NativeStackScreenProps<RootStackParamList, 'AddRegistroCompra'>;
export type ProveedoresScreenProps = NativeStackScreenProps<RootStackParamList, 'Proveedores'>;

export type RegistroCompra = {[key: number]: [string, string, number, number];};