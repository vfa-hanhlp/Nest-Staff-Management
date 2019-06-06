import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { User } from 'src/user/user.entity';

export interface TeamInput {
  teamName: string;
  customer?: string;
  project?: string;
  description?: string;
}

@Entity('team')
export class TeamEntity {
  @PrimaryGeneratedColumn('uuid')
  // tslint:disable-next-line:variable-name
  public _id: string;

  @IsNotEmpty({ message: 'Can not null' })
  @Column({length: 200 })
  @Index({ unique: true })
  public teamName: string;

  @Column({ nullable: true, length: 200 })
  public customer: string;

  @Column({ nullable: true, length: 200 })
  public project: string;

  @Column({ nullable: true, length: 200 })
  public description: string;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt: Date;

  @ManyToMany(type => User, {eager: true})
  @JoinTable()
  public teamMember: [User];

  constructor(partial: Partial<TeamEntity>) {
    Object.assign(this, partial);
  }
}
