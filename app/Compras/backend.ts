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
//-----------------------FUNCIONES Proveedores----------------------------------------------
//Función para agregar un proveedor
export const AddProveedor = (data: any, id: number, empresa: string, telefono: string, ciudad: string, estado: string) => {
  return {
    ...data,
    [id]: [empresa, telefono, ciudad, estado]
  };
};