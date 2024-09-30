export const REGEX_PASSWORD =
  /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
export const REGEX_PASSWORD_MESSAGE =
  'The password must have a Uppercase, lowercase letter and a number';

/**
 * Regex para telefonos de venezuela
 */
export const REGEX_PHONE_VE = /^(\+58[-| ]?)?(0?[1-9]\d{2})[-| ]?(\d{7})$/;
/**
 * Regex para telefonos global
 */
export const REGEX_PHONE_GLOBAL =
  /^(\+\d{1,3}[-| ]?)?(0?[1-9]\d{2})[-| ]?(\d{7})$/;
export const REGEX_PHONE_MESSAGE = 'Invalid phone number';
