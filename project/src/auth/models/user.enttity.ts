/**
 * Usuario base
 */
export interface UserBase {
  /**
   * Nombre
   */
  firstName: string;
  /**
   * Apellido
   */
  lastName: string;
  /**
   * Correo electronico
   */
  email: string;
  /**
   * Telefono
   */
  phone?: string;
  /**
   * Constraseña
   */
  password: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface UserModelCreate extends UserBase {}

export interface UserModelBase extends UserBase {
  /**
   * Esta activo
   */
  isActive: boolean;
  /**
   * Roles
   */
  roles: string[];
}

/**
 * Modelo del Usuario
 */
export interface UserModel extends UserModelBase {
  id: string;
}
