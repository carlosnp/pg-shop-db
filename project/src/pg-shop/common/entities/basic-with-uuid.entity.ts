import { PrimaryGeneratedColumn } from 'typeorm';
import { BasicEntity } from './basic.entity';

export class BasicWithUuidEntity extends BasicEntity {
  /**
   * Identificador
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
