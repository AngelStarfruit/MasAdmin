  //-----------------------FUNCIONES GENERALES-----------------------------------------
  // Elimina cualquier carácter que NO sea letra, número, espacio o signos comunes
export const NoEmojis = (texto: string) => {
  return texto.replace(/[^a-zA-ZáéíóúñÑüÜ0-9\s\.\,\-\_]/g, '');
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
//-----------------------FUNCIONES AddAjustesAlmacen-----------------------------------------
//Función para agregar un elemento al ajuste
export const AddElemento = (data: any, id: number, elemento: string, marca: string, cantidad: number) => {
  return {
    ...data,
    [id]: [elemento, marca, cantidad]
  };
};
//Función para quitar un elemento del ajuste
export const QuitarElemento = (data: any, id: number) => {
  const newData = { ...data }; delete newData[id];
  return newData;
};
//Función para realizar un registro
export const registrar = (data: any, id: number, almacen: string, operacion: string, fecha: string) => {
  return {
    ...data,
    [id]: [almacen, operacion, fecha]
  };
};
//Función para afectar el almacen 
export const afectarAlmacen = (dataAlmacen: any, dataAjuste: any, almacen: string, sucursal: string, operacion: string) => {
  // Filtrar existencias del almacén
  const existenciasAlmacen = Object.values(dataAlmacen || {})
    .filter((item: any) => item[4] === almacen && item[5] === sucursal);
  
  // Crear mapa de productos existentes
  const mapa = new Map();
  existenciasAlmacen.forEach((item: any) => {
    const key = `${item[0]}|${item[1]}`; // descripción|marca
    mapa.set(key, item);
  });

  if (operacion === 'salida') {
    //SALIDA
  Object.values(dataAjuste).forEach((producto: any) => {
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
    // Si no existe en el almacén, no hacer nada 
  });
 }
 else {
  // ENTRADA
  Object.values(dataAjuste).forEach((producto: any) => {
    const [descripcion, marca, costo, cantidad] = producto;
    const key = `${descripcion}|${marca}`;
    
    if (mapa.has(key)) {
      const existente = mapa.get(key);
      mapa.set(key, [descripcion, marca, existente[2] + cantidad, costo, almacen, sucursal]);
    } else {
      mapa.set(key, [descripcion, marca, cantidad, costo, almacen, sucursal]);
    }
  });
 }
  
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
//-----------------------FUNCIONES AlmacenesInfo----------------------------------------------
//Función para agregar un almacén
export const AddAlmacen = (data: any, id: number, almacen: string, sucursal: string) => {
  return {
    ...data,
    [id]: [almacen, sucursal]
  };
};