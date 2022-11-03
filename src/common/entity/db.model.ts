import { PrimaryGeneratedColumn } from 'typeorm';

/**
 * @desc  BaseEntities are the base of identifiable entities
 */
export abstract class BaseSchema {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  constructor(id: string) {
    this.id = id;
  }
}
