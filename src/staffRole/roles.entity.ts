import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    VersionColumn,
    Index,
    PrimaryGeneratedColumn,
  } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Exclude } from 'class-transformer';

@Entity()
export class Roles {
// @ObjectIdColumn()
@PrimaryGeneratedColumn()
// tslint:disable-next-line:variable-name
public _id: number;

@IsNotEmpty({ message: 'Can not null' })
@Column({length: 32 })
@Index({ unique: true })
public name: string;

@CreateDateColumn({ type: 'timestamp' })
public createdAt: Date;

@UpdateDateColumn({ type: 'timestamp' })
public updatedAt: Date;

@VersionColumn({ name: 'data_version' })
public dataVersion: number;

constructor(partial: Partial<Roles>) {
    Object.assign(this, partial);
}
}
