import AsyncStorage from '@react-native-async-storage/async-storage';

//const API_URL = 'https://tu-servidor-masadmin.com/api';
//-----------------------FUNCIONES GENERALES-----------------------------------------
  // Elimina cualquier carácter que NO sea letra, número, espacio o signos comunes.
export const NoEmojis = (texto: string) => {
  // Solo elimina emojis, permite todo lo demás
  const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}]/gu;
  return texto.replace(emojiRegex, '');
};
// Valida que ningún campo esté vacio.
export const Validar = (datos: number, A: string, B: string, C: string, D: string) 
: { isValid: boolean; message?: string } => {

    if (datos == 1){
        if (!A.trim()){
        return { isValid: false, message: 'Por favor, llene los campos solicitados.'};
        }

        return { isValid: true };
    }
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
//-----------------------FUNCIONES register----------------------------------------------
 //Función para agregar un usuario
export const AddUsuario = (data: any, id: number, nombre: string, genero: string, telefono: string, fecha: string, email: string, contrasena: string, empresa: string) => {
  return {
    ...data,
    [id]: [nombre, genero, telefono, fecha, email, contrasena, empresa]
  };
};
//-----------------------FUNCIONES Dashboard----------------------------------------------
// Función para filtrar por rango de fechas
export const filtrarPorRango = (data: any, fechaInicio: string, fechaFin: string) => {
    return Object.values(data || {})
      .filter((item: any) => item[0] >= fechaInicio && item[0] <= fechaFin)
      .reduce((sum: number, item: any) => sum + item[1], 0);
  };
 //Función para agregar un evento
export const AddEvento = (data: any, id: number, evento: string, fechaHora: string, lugar: string, contacto: string) => {
  return {
    ...data,
    [id]: [evento, fechaHora, lugar, contacto]
  };
};
/*export const obtenerEventos = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const idEmpresa = await AsyncStorage.getItem('idEmpresa');
    
    if (!token) {
      throw new Error('No hay sesión activa');
    }

    const response = await fetch(`${API_URL}/recordatorios`, {
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
    console.log('Error obteniendo proveedores:', error);
    throw error;
  }
};

export const agregarEvento = async (evento: string, fechaHora: string, lugar: string, contacto: string) => {
  try {
    const token = await AsyncStorage.getItem('token');

    const response = await fetch(`${API_URL}/recordatorios`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ evento, fechaHora, lugar, contacto }),
    });

    return await response.json();
  } catch (error) {
    console.log('Error agregando evento:', error);
    throw error;
  }
};

export const editarEvento = async (id: number, evento: string, fechaHora: string, lugar: string, contacto: string) => {
  try {
    const token = await AsyncStorage.getItem('token');

    const response = await fetch(`${API_URL}/eventos/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ evento, fechaHora, lugar, contacto }),
    });

    return await response.json();
  } catch (error) {
    console.log('Error editando evento:', error);
    throw error;
  }
};

export const eliminarEvento = async (id: number) => {
  try {
    const token = await AsyncStorage.getItem('token');
    
    const response = await fetch(`${API_URL}/recordatorios/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return await response.json();
  } catch (error) {
    console.log('Error eliminando eventos:', error);
    throw error;
  }
};*/
  //-----------------------FUNCIONES Sucursales----------------------------------------------
//Función para agregar una sucursal 
export const AddSucursal = (data: any, id: number, sucursal: string, telefono: string) => {
  return {
    ...data,
    [id]: [sucursal, telefono]
  };
};
/*export const obtenerSucursales = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const idEmpresa = await AsyncStorage.getItem('idEmpresa');
    
    if (!token) {
      throw new Error('No hay sesión activa');
    }

    const response = await fetch(`${API_URL}/sucursales`, {
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
    console.log('Error obteniendo sucursales:', error);
    throw error;
  }
};

export const agregarSucursal = async (sucursal: string, telefono: string) => {
  try {
    const token = await AsyncStorage.getItem('token');
    
    const response = await fetch(`${API_URL}/sucursales`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sucursal, telefono }),
    });

    return await response.json();
  } catch (error) {
    console.log('Error agregando sucursal:', error);
    throw error;
  }
};

export const editarSucursal = async (id: number, sucursal: string, telefono: string) => {
  try {
    const token = await AsyncStorage.getItem('token');
    
    const response = await fetch(`${API_URL}/sucursales/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sucursal, telefono }),
    });

    return await response.json();
  } catch (error) {
    console.log('Error editando sucursal:', error);
    throw error;
  }
};

export const eliminarSucursal = async (id: number) => {
  try {
    const token = await AsyncStorage.getItem('token');
    
    const response = await fetch(`${API_URL}/sucursales/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return await response.json();
  } catch (error) {
    console.log('Error eliminando sucursal:', error);
    throw error;
  }
};*/
  //-----------------------FUNCIONES Categorías----------------------------------------------
//Función para agregar una sucursal 
export const AddCategoria = (data: any, id: number, categoria: string) => {
  return {
    ...data,
    [id]: categoria
  };
};
/*export const obtenerCategorias = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    
    if (!token) {
      throw new Error('No hay sesión activa');
    }

    const response = await fetch(`${API_URL}/categorias`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 401) {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('usuario');
      throw new Error('Sesión expirada');
    }

    const data = await response.json();
    
    // Convertir array a objeto con índices
    // Si el servidor devuelve: ["Lácteos", "Carnes frías", ...]
    if (Array.isArray(data)) {
      const categoriasObj: Record<string, string> = {};
      data.forEach((item: string, index: number) => {
        categoriasObj[index + 1] = item;
      });
      return categoriasObj;
    }
    
    return data;
  } catch (error) {
    console.log('Error obteniendo categorías:', error);
    throw error;
  }
};

export const agregarCategoria = async (categoria: string) => {
  try {
    const token = await AsyncStorage.getItem('token');
    
    const response = await fetch(`${API_URL}/categorias`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ categoria }),
    });

    return await response.json();
  } catch (error) {
    console.log('Error agregando categoría:', error);
    throw error;
  }
};

export const editarCategoria = async (id: number, categoria: string) => {
  try {
    const token = await AsyncStorage.getItem('token');
    
    const response = await fetch(`${API_URL}/categorias/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ categoria }),
    });

    return await response.json();
  } catch (error) {
    console.log('Error editando categoría:', error);
    throw error;
  }
};

export const eliminarCategoria = async (id: number) => {
  try {
    const token = await AsyncStorage.getItem('token');
    
    const response = await fetch(`${API_URL}/categorias/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return await response.json();
  } catch (error) {
    console.log('Error eliminando categoría:', error);
    throw error;
  }
};*/ 
//-----------------------FUNCIONES ListaDePrecios--------------------------------------------
//Función para agregar un elemento en la lista de precios
export const AddElemento = (data: any, id: number, elemento: string, cantidad: number) => {
  return {
    ...data,
    [id]: [elemento, cantidad]
  };
};
//Función para quitar un elemento del ajuste
export const QuitarElemento = (data: any, id: number) => {
  const newData = { ...data }; delete newData[id];
  return newData;
};
//Función para agregar un elemento al ajuste
export const AddPrecio = (data: any, id: number, descripcion: string, marca: string, costo: number, unidad: string, tipo: string, contenido: any, categoría: string,) => {
  return {
    ...data,
    [id]: [descripcion, marca, costo, unidad, tipo, contenido, categoría]
  };
};
/*export const obtenerPrecios = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const idEmpresa = await AsyncStorage.getItem('idEmpresa');
    
    if (!token) {
      throw new Error('No hay sesión activa');
    }

    const response = await fetch(`${API_URL}/productos`, {
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

export const agregarPrecio = async (descripcion: string, marca: string, costo: number, unidad: string, tipo: string, contenido: any, categoría: string) => {
  try {
    const token = await AsyncStorage.getItem('token');
    
    const response = await fetch(`${API_URL}/productos`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ descripcion, marca, costo, unidad, tipo, contenido, categoría }),
    });

    return await response.json();
  } catch (error) {
    console.log('Error:', error);
    throw error;
  }
};

export const editarPrecio = async (id: number, descripcion: string, marca: string, costo: number, unidad: string, tipo: string, contenido: any, categoría: string) => {
  try {
    const token = await AsyncStorage.getItem('token');
    
    const response = await fetch(`${API_URL}/productos/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ descripcion, marca, costo, unidad, tipo, contenido, categoría }),
    });

    return await response.json();
  } catch (error) {
    console.log('Error:', error);
    throw error;
  }
};

export const eliminarPrecio = async (id: number) => {
  try {
    const token = await AsyncStorage.getItem('token');
    
    const response = await fetch(`${API_URL}/productos/${id}`, {
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
