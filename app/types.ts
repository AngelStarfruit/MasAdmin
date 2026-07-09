import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App'; 

export type homeScreenProps = NativeStackScreenProps<RootStackParamList, 'home'>;
export type signupScreenProps = NativeStackScreenProps<RootStackParamList, 'signup'>;
export type registerScreenProps = NativeStackScreenProps<RootStackParamList, 'register'>;

export type DashboardScreenProps = NativeStackScreenProps<RootStackParamList, 'Dashboard'>;
export type ListaDePreciosScreenProps = NativeStackScreenProps<RootStackParamList, 'ListaDePrecios'>;
export type CategoriasScreenProps = NativeStackScreenProps<RootStackParamList, 'Categorias'>;
export type SucursalesScreenProps = NativeStackScreenProps<RootStackParamList, 'Sucursales'>;

export type ContenidoPaquete = {[key: number]: [string, string, number];};
export type FormerJSON = Record<string, string[]>;
export type single = {[key: number]: string;};