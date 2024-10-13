import { BasicWithUuidEntity, generateSlug } from 'src/pg-shop';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import { UserModel, UserRoles } from '../models';

@Entity({ name: 'users' })
export class User extends BasicWithUuidEntity implements UserModel {
  @Column({ type: 'text' })
  firstName: string;

  @Column({ type: 'text' })
  lastName: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'text', nullable: true })
  phone?: string;

  @Column({ type: 'text', select: false })
  password: string;

  @Column({ type: 'bool', default: true })
  isActive: boolean;

  @Column({ type: 'text', array: true })
  roles: string[];
  /**
   * Nombre completo
   */
  fullName: string;
  /**
   * Token
   */
  token?: string;
  /**
   * Normaliza los campos antes de crear
   */
  @BeforeInsert()
  normalizeFieldsBeforeInsert() {
    /** Normaliza campos de texto */
    this.email = this.email.toLowerCase().trim();
    this.firstName = this.firstName.toLowerCase().trim();
    this.lastName = this.lastName.toLowerCase().trim();
    /** Normaliza los roles */
    const roles =
      this.roles && this.roles.length > 0
        ? this.roles.map((role) => generateSlug(role))
        : [UserRoles.USER];
    this.roles = [...new Set(roles)];
    /** Crea el campo fullName */
    this.fullName = `${this.firstName} ${this.lastName}`;
  }
  /**
   * Normaliza los campos antes de actualizar
   */
  @BeforeUpdate()
  normalizeFieldsBeforeUpdate() {
    this.normalizeFieldsBeforeInsert();
  }
}
