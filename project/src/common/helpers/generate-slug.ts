/**
 * Crea un slug
 * @param {string} text Texto
 * @returns slug
 */
export const generateSlug = (text: string): string => {
  // Convertir a minúsculas
  const lowerCase = text.toLowerCase();
  // Eliminar caracteres especiales y espacios
  const alphanumeric = lowerCase.replace(/[^a-z0-9]+/g, '_');
  // Eliminar guiones consecutivos
  const slug = alphanumeric.replace(/-+/g, '_');
  // Eliminar guiones al principio y al final
  return slug.trim().replace(/^-+|-+$/g, '');
};
