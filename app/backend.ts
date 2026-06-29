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
export const AddUsuario = (data: any, id: number, nombre: string, genero: string, telefono: string, fecha: string, email: string, contrasena: string) => {
  return {
    ...data,
    [id]: [nombre, genero, telefono, fecha, email, contrasena]
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
  //-----------------------FUNCIONES Sucursales----------------------------------------------
//Función para agregar una sucursal 
export const AddSucursal = (data: any, id: number, sucursal: string, telefono: string) => {
  return {
    ...data,
    [id]: [sucursal, telefono]
  };
};
  //-----------------------FUNCIONES Categorías----------------------------------------------
//Función para agregar una sucursal 
export const AddCategoria = (data: any, id: number, categoria: string) => {
  return {
    ...data,
    [id]: categoria
  };
};
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
//Función para agregar un elemento gasto en la lista de precios
export const AddPrecioG = (data: any, id: number, descripcion: string, marca: string, costo: string, unidad: string, tipo: string, contenido: any, categoría: string,) => {
  return {
    ...data,
    [id]: [descripcion, marca, costo, unidad, tipo, contenido, categoría]
  };
};
