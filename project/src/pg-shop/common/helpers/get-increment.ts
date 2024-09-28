export const DEFAULT_MARGIN = 0.3;

interface Vimf {
  vi: number;
  m: number;
  vf: number;
}

/**
 * Normaliza el valor
 * @param {number} value Valor
 * @param {number} decimalPlaces Cantidad de decimales
 * @returns {number}
 */
const normalizer = (value: number, decimalPlaces = 2) =>
  Number(value.toFixed(decimalPlaces));
/**
 * Calcula el valor inicial
 * @param {number} m margen
 * @param {number} vf Valor final
 * @returns {Increment}
 */
export const getVi = (m: number, vf: number): Vimf => {
  const vi = vf / (1 + m);
  return { vi: normalizer(vi), m, vf };
};
/**
 * Calcula el valor final
 * @param {number} vi Valor inicial
 * @param {number} m margen
 * @returns {VfM}
 */
export const getVf = (vi: number, m: number): Vimf => {
  const vf = vi * (1 + m);
  return { vi, m, vf: normalizer(vf) };
};
/**
 * Calcula el margen
 * @param {number} vi Valor inicial
 * @param {number} vf Valor finael
 * @returns {VfM}
 */
export const getMargin = (vi: number, vf: number): Vimf => {
  const m = (vf - vi) / vi;
  return { vi, m: normalizer(m, 6), vf };
};

/**
 * Obtiene el incremento
 * @param {number} vi Valor final
 * @param {number} m Margen
 * @param {number} vf Valor final
 * @returns {Vimf}
 */
export const getIncrement = (vi?: number, m?: number, vf?: number): Vimf => {
  if (!m && typeof vf === 'number' && typeof vi === 'number') {
    return getMargin(vi, vf);
  }
  if (!vi && typeof m === 'number' && typeof vf === 'number') {
    return getVi(m, vf);
  }
  if (!vf && typeof m === 'number' && typeof vi === 'number') {
    return getVf(vi, m);
  }
  if (!m && !vi && typeof vf === 'number') {
    const m = DEFAULT_MARGIN;
    return getVi(m, vf);
  }
  if (!m && !vf && typeof vi === 'number') {
    const m = DEFAULT_MARGIN;
    return getVf(vi, m);
  }
  return getVf(1, DEFAULT_MARGIN);
};
