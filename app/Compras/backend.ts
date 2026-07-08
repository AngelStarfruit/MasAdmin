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
//Valida que en los inputs numéricos haya un número positivo válido.
export const CostoValido = (costo: string): { isValid: boolean; message?: string } => {

    if (!costo.trim()) {
    return { isValid: false, message: 'Por favor, ingrese un costo.'};
    }
    
    const num = Number(costo);
    if (isNaN(num) || num <= 0){
        return { isValid: false, message: 'Entrada no válida.'};
    }

    return { isValid: true };
}
//-----------------------FUNCIONES AddRegistroCompra y AddRegistroGasto-----------------------
//Función para obtener el total de la compra
export const totalCompra = (data: any) => {
  let total = 0
  const claves = Object.keys(data)

    claves.forEach((id) => {
        total += (data[id][2] * data[id][3]);
    });

  return total.toFixed(2);
};
//Función para obtener el total del gasto
export const totalGasto = (data: any) => {
  let total = 0
  const claves = Object.keys(data)

    claves.forEach((id) => {
        total += data[id][1]
    });

  return total.toFixed(2);
};
//Función para agregar un producto al ajuste
export const AddElemento = (data: any, id: number, elemento: string, marca: string, costo: number, cantidad: number) => {
  return {
    ...data,
    [id]: [elemento, marca, costo, cantidad]
  };
};
//Función para agregar un gasto al ajuste
export const AddGasto = (data: any, id: number, elemento: string, costo: number) => {
  return {
    ...data,
    [id]: [elemento, costo]
  };
};
//Función para quitar un elemento del ajuste
export const QuitarElemento = (data: any, id: number) => {
  const newData = { ...data }; delete newData[id];
  return newData;
};
//Función para realizar un registro
export const registrar = (data: any, id: number, fecha: string, total: number, proveedor: string) => {
  return {
    ...data,
    [id]: [fecha, total, proveedor]
  };
};
//Función para afectar el almacen luego de hacer una compra
export const afectarAlmacen = (dataAlmacen: any, dataCompra: any, almacen: string, sucursal: string) => {
  // Filtrar existencias del almacén
  const existenciasAlmacen = Object.values(dataAlmacen || {})
    .filter((item: any) => item[4] === almacen && item[5] === sucursal);
  
  // Crear mapa de productos existentes
  const mapa = new Map();
  existenciasAlmacen.forEach((item: any) => {
    const key = `${item[0]}|${item[1]}`; // descripción|marca
    mapa.set(key, item);
  });
  
  // Procesar compra
  Object.values(dataCompra).forEach((producto: any) => {
    const [descripcion, marca, costo, cantidad] = producto;
    const key = `${descripcion}|${marca}`;
    
    if (mapa.has(key)) {
      const existente = mapa.get(key);
      mapa.set(key, [descripcion, marca, existente[2] + cantidad, costo, almacen, sucursal]);
    } else {
      mapa.set(key, [descripcion, marca, cantidad, costo, almacen, sucursal]);
    }
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
//-----------------------FUNCIONES Proveedores----------------------------------------------
//Función para agregar un proveedor
export const AddProveedor = (data: any, id: number, empresa: string, telefono: string, ciudad: string, estado: string) => {
  return {
    ...data,
    [id]: [empresa, telefono, ciudad, estado]
  };
};
/*export const obtenerProveedores = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const idEmpresa = await AsyncStorage.getItem('idEmpresa');
    
    if (!token) {
      throw new Error('No hay sesión activa');
    }

    const response = await fetch(`${API_URL}/proveedores`, {
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

export const agregarProveedor = async (empresa: string, telefono: string, ciudad: string, estado: string,) => {
  try {
    const token = await AsyncStorage.getItem('token');
    
    const response = await fetch(`${API_URL}/proveedores`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ empresa, telefono, ciudad, estado }),
    });

    return await response.json();
  } catch (error) {
    console.log('Error:', error);
    throw error;
  }
};

export const editarProveedor = async (id: number, empresa: string, telefono: string, ciudad: string, estado: string,) => {
  try {
    const token = await AsyncStorage.getItem('token');
    
    const response = await fetch(`${API_URL}/proveedor/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ empresa, telefono, ciudad, estado  }),
    });

    return await response.json();
  } catch (error) {
    console.log('Error:', error);
    throw error;
  }
};

export const eliminarProveedor = async (id: number) => {
  try {
    const token = await AsyncStorage.getItem('token');
    
    const response = await fetch(`${API_URL}/proveedores/${id}`, {
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
//-----------------------FUNCIONES Control Compras----------------------------------------------
//Función para mostrar las compras realizadas
/*export const obtenerCompras = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const idEmpresa = await AsyncStorage.getItem('idEmpresa');
    
    if (!token) {
      throw new Error('No hay sesión activa');
    }

    const response = await fetch(`${API_URL}/compras`, {
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
/*export const agregarCompra = async (fecha: string, total: number, proveedor: string) => {
  try {
    const token = await AsyncStorage.getItem('token');
    
    const response = await fetch(`${API_URL}/compras`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fecha, total, proveedor }),
    });

    return await response.json();
  } catch (error) {
    console.log('Error:', error);
    throw error;
  }
};*/
//-----------------------FUNCIONES Control Gastos----------------------------------------------
//Función para mostrar los gastos realizadas
/*export const obtenerGastos = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const idEmpresa = await AsyncStorage.getItem('idEmpresa');
    
    if (!token) {
      throw new Error('No hay sesión activa');
    }

    const response = await fetch(`${API_URL}/gastos`, {
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
export const agregarGasto = async (fecha: string, total: number, gasto: string) => {
  try {
    const token = await AsyncStorage.getItem('token');
    
    const response = await fetch(`${API_URL}/gastos`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fecha, total, gasto }),
    });

    return await response.json();
  } catch (error) {
    console.log('Error:', error);
    throw error;
  }
};*/