import { BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class BasicEntity extends BaseEntity {
  /**
   * Fecha de creacion
   */
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;
  /**
   * Fecha de actualizacion
   */
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;
}
