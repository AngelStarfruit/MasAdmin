import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';  // ✅ Importa desde App raíz

export type AlmacenesScreenProps = NativeStackScreenProps<RootStackParamList, 'Almacenes'>;
export type AlmacenesInfoScreenProps = NativeStackScreenProps<RootStackParamList, 'AlmacenesInfo'>;
export type AjustesInventarioScreenProps = NativeStackScreenProps<RootStackParamList, 'AjustesInventario'>;
export type AddAjustesInventarioScreenProps = NativeStackScreenProps<RootStackParamList, 'AddAjustesInventario'>;
export type ExistenciasAlmacenScreenProps = NativeStackScreenProps<RootStackParamList, 'ExistenciasAlmacen'>;

export  type AjusteInventario = {[key: number]: [string, number];};