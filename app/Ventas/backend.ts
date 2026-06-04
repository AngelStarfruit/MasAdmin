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
        total += data[id][2]
    });

  return total.toFixed(2);
};
//Función para agregar un elemento al ajuste
export const AddElemento = (data: any, elemento: string, cantidad: number) => {
  const len = Object.keys(data).length;
  
  return {
    ...data,
    [len + 1]: [elemento,'',0, cantidad]
  };
};
//Función para quitar un elemento del ajuste
export const QuitarElemento = (data: any, id: number) => {
  const newData = { ...data }; delete newData[id];
  return newData;
};