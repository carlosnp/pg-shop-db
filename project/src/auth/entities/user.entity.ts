import { BasicWithUuidEntity } from 'src/pg-shop';
import { Entity } from 'typeorm';

@Entity({ name: 'users' })
export class User extends BasicWithUuidEntity {}
