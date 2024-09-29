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
  /**
   * Esta activo
   */
  isActive: boolean;
}

export interface UserModelBase extends UserBase {
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
