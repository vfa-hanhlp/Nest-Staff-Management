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

@Entity()
export class Roles {
@PrimaryGeneratedColumn('uuid')
// tslint:disable-next-line:variable-name
public _id: string;

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
