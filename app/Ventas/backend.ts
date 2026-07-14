 import AsyncStorage from '@react-native-async-storage/async-storage';

//const API_URL = 'https://tu-servidor-masadmin.com/api';
 //-----------------------FUNCIONES GENERALES-----------------------------------------
  // Elimina cualquier carácter que NO sea letra, número, espacio o signos comunes
export const NoEmojis = (texto: string) => {
  return texto.replace(/[^a-zA-ZáéíóúñÑüÜ0-9\s\.\,\-\_]/g, '');
};
// Valida que no haya campos vacios
export const Validar = (datos: number, A: string, B: string, C: string, D: string) 
: { isValid: boolean; message?: string } => {

    if (datos == 2){
        if (!A.trim() || !B.trim()){
        return { isValid: false, message: 'Por favor, llene los campos solicitados.'};
        }

        return { isValid: true };
    }
    if (datos == 3){
        if (!A.trim() || !B.trim() || !C.trim()){
        return { isValid: false, message: 'Por favor, llene los campos solicitados.'};
        }

        return { isValid: true };
    }
    else{
        if (!A.trim() || !B.trim() || !C.trim()  || !D.trim()){
        return { isValid: false, message: 'Por favor, llene los campos solicitados.'};
        }

        return { isValid: true };
    }
}
//Valida que en los inputs numéricos haya un número positivo válido.
export const NumeroValido = (quantity: string): { isValid: boolean; message?: string } => {

    if (!quantity.trim()) {
    return { isValid: false, message: 'Por favor, ingrese una cantidad.'};
    }
    
    const num = Number(quantity);
    if (isNaN(num) || num <= 0 || !Number.isInteger(num)){
        return { isValid: false, message: 'Entrada no válida.'};
    }

    return { isValid: true };
}
//-----------------------FUNCIONES AddRegistroVenta-----------------------------------------
//Función para obtener el total de la venta
export const totalVenta = (data: any) => {
  let total = 0
  const claves = Object.keys(data)

    claves.forEach((id) => {
        total += (data[id][2] * data[id][3]);
    });

  return total.toFixed(2);
};
//Función para agregar un elemento al ajuste
export const AddElemento = (data: any, id: number, elemento: string, marca: string, costo: number, cantidad: number, nlote?: string) => {
  return {
    ...data,
    [id]: [elemento,marca,costo, cantidad, nlote || '']
  };
};
//Función para quitar un elemento del ajuste
export const QuitarElemento = (data: any, id: number) => {
  const newData = { ...data }; delete newData[id];
  return newData;
};
//Función para realizar un registro
export const registrar = (data: any, id: number, fecha: string, total: number, cliente: string) => {
  return {
    ...data,
    [id]: [fecha, total, cliente]
  };
};
//Función para afectar el almacen luego de hacer una venta
export const afectarAlmacen = (dataAlmacen: any, dataVenta: any, almacen: string, sucursal: string) => {
  // Filtrar existencias del almacén
  const existenciasAlmacen = Object.values(dataAlmacen || {})
    .filter((item: any) => item[4] === almacen && item[5] === sucursal);
  
  // Crear mapa de productos existentes
  const mapa = new Map();
  existenciasAlmacen.forEach((item: any) => {
    const key = `${item[0]}|${item[1]}`; // descripción|marca
    mapa.set(key, item);
  });
  
  // Procesar venta
  Object.values(dataVenta).forEach((producto: any) => {
    const [descripcion, marca, costo, cantidad] = producto;
    const key = `${descripcion}|${marca}`;
    
    if (mapa.has(key)) {
      const existente = mapa.get(key);
      const nuevaCantidad = existente[2] - cantidad;
      
      if (nuevaCantidad <= 0) {
        // Si llega a cero, eliminar del mapa
        mapa.delete(key);
      } else {
        // Si queda positivo, actualizar
        mapa.set(key, [descripcion, marca, nuevaCantidad, costo, almacen, sucursal]);
      }
    }
    // Si no existe en el almacén, no hacer nada (no se puede vender lo que no hay)
  });
  
  // Reconstruir objeto
  const resultado: any = {};
  let id = 1;
  Object.values(dataAlmacen || {})
    .filter((item: any) => item[4] !== almacen || item[5] !== sucursal)
    .forEach((item) => {
      resultado[id++] = item;
    });
  
  mapa.forEach((producto) => {
    resultado[id++] = producto;
  });
  
  return resultado;
};
  //-----------------------FUNCIONES Clientes----------------------------------------------
//Función para agregar un cliente
export const AddCliente = (data: any, id: number, nombre: string, telefono: string, ciudad: string, estado: string,) => {
  return {
    ...data,
    [id]: [nombre, telefono, ciudad, estado]
  };
};
/*export const obtenerClientes = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const idEmpresa = await AsyncStorage.getItem('idEmpresa');
    
    if (!token) {
      throw new Error('No hay sesión activa');
    }

    const response = await fetch(`${API_URL}/clientes`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 401) {
      // Token expirado
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('usuario');
      throw new Error('Sesión expirada');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error:', error);
    throw error;
  }
};

export const agregarCliente = async (nombre: string, telefono: string, ciudad: string, estado: string,) => {
  try {
    const token = await AsyncStorage.getItem('token');
    
    const response = await fetch(`${API_URL}/clientes`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre, telefono, ciudad, estado }),
    });

    return await response.json();
  } catch (error) {
    console.log('Error:', error);
    throw error;
  }
};

export const editarCliente = async (id: number, nombre: string, telefono: string, ciudad: string, estado: string,) => {
  try {
    const token = await AsyncStorage.getItem('token');
    
    const response = await fetch(`${API_URL}/clientes/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre, telefono, ciudad, estado  }),
    });

    return await response.json();
  } catch (error) {
    console.log('Error:', error);
    throw error;
  }
};

export const eliminarCliente = async (id: number) => {
  try {
    const token = await AsyncStorage.getItem('token');
    
    const response = await fetch(`${API_URL}/clientes/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return await response.json();
  } catch (error) {
    console.log('Error:', error);
    throw error;
  }
};*/
//-----------------------FUNCIONES Control Ventas----------------------------------------------
//Función para mostrar las ventas realizadas
/*export const obtenerVentas = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const idEmpresa = await AsyncStorage.getItem('idEmpresa');
    
    if (!token) {
      throw new Error('No hay sesión activa');
    }

    const response = await fetch(`${API_URL}/cot1`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 401) {
      // Token expirado
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('usuario');
      throw new Error('Sesión expirada');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error:', error);
    throw error;
  }
};*/
/*export const agregarVenta = async (fecha: string, total: number, cliente: string) => {
  try {
    const token = await AsyncStorage.getItem('token');
    
    const response = await fetch(`${API_URL}/cot1`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fecha, total, cliente }),
    });

    return await response.json();
  } catch (error) {
    console.log('Error:', error);
    throw error;
  }
};*/
