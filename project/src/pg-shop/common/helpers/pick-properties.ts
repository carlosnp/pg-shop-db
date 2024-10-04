/**
 * Selecciona propiedades de un objeto
 * @param {T} obj Objeto
 * @param {(keyof T)[]} properties Propiedades del objeto
 * @returns {Pick<T, (typeof properties)[number]>}
 */
export const pickProperties = <T>(
  obj: T,
  properties: (keyof T)[],
): Pick<T, (typeof properties)[number]> => {
  return properties.reduce(
    (acc, prop) => {
      acc[prop] = obj[prop];
      return acc;
    },
    {} as Pick<T, (typeof properties)[number]>,
  );
};
