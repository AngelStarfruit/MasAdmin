export const NoEmojis = (texto: string) => {
  // Elimina cualquier carácter que NO sea letra, número, espacio o signos comunes
  return texto.replace(/[^a-zA-ZáéíóúñÑüÜ0-9\s\.\,\-\_]/g, '');
};

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