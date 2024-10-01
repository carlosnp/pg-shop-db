import { BasicWithUuidEntity } from 'src/pg-shop';
import { AfterLoad, BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import { UserModel } from '../models';

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

  @Column({ type: 'text', array: true, default: ['user'] })
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
   * Construye el nombre completo
   */
  @AfterLoad()
  getFullName() {
    this.fullName = `${this.firstName} ${this.lastName}`;
  }

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
    this.firstName = this.firstName.toLowerCase().trim();
    this.lastName = this.lastName.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert();
  }
}
