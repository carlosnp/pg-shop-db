import { BasicWithUuidEntity } from 'src/pg-shop';
import { AfterLoad, Column, Entity } from 'typeorm';
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

  fullName: string;

  @AfterLoad()
  getFullName() {
    this.fullName = `${this.firstName} ${this.lastName}`;
  }
}
