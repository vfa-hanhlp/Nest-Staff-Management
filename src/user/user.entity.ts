import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  ManyToMany,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Exclude } from 'class-transformer';
import { TeamEntity } from 'src/team/team.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  // tslint:disable-next-line:variable-name
  public _id: string;

  @IsNotEmpty({ message: 'Can not null' })
  @Column({length: 32 })
  @Index({ unique: true })
  public name: string;

  @Exclude()
  @IsNotEmpty({ message: 'Can not null' })
  @Column({ nullable: true, length: 60})
  public password?: string;

  @Column({ nullable: true })
  public permissions?: string;

  @Column({ length: 200})
  public email?: string;

  @Column({ nullable: true, length: 200, comment: 'url' })
  public url?: string;

  @Column({ nullable: true, length: 200 })
  public avatar?: string;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt: Date;

  @VersionColumn({ name: 'data_version' })
  public dataVersion: number;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
