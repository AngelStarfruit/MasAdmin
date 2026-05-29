export const NoEmojis = (texto: string) => {
  // Elimina cualquier carácter que NO sea letra, número, espacio o signos comunes
  return texto.replace(/[^a-zA-ZáéíóúñÑüÜ0-9\s\.\,\-\_]/g, '');
};