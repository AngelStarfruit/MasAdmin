export const NumeroValido = (quantity: string): { isValid: boolean; message?: string } => {
    if (!quantity.trim()) {
    return { isValid: false, message: 'Por favor, ingrese una cantidad.'};
    }
    return { isValid: true };
}
