import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Exclude } from 'class-transformer';
import { TeamEntity } from 'src/team/team.entity';

@Entity()
export class User {
  // @ObjectIdColumn()
  @PrimaryGeneratedColumn()
  // tslint:disable-next-line:variable-name
  public _id: number;

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

  @ManyToOne(type => TeamEntity, team => team.teamMember)
  team: TeamEntity;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
