import {
  Entity,
  Column,
  ObjectIdColumn,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
  Index,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @ObjectIdColumn()
  // tslint:disable-next-line:variable-name
  public _id: number;

  @IsNotEmpty({ message: 'Can not null' })
  @Column({length: 32 })
  @Index({ unique: true })
  public name: string;

  @Exclude()
  @IsNotEmpty({ message: 'Can not null' })
  @Column({ nullable: true, length: 60 })
  public password?: string;

  @Column({ nullable: true })
  public permissions?: [string];

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

  // TODO: 
  // LastloginIp: string;
  // LastLoginTime: string;

  @VersionColumn({ name: 'data_version' })
  public dataVersion: number;

  // @BeforeInsert()
  // public async hash() {
  //   this.password = bcrypt.hash(this.password, 10)
  // }

  // public async verification(attempt: string): Promise<boolean> {
  //   return bcrypt.compare(attempt, this.password);
  // }
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
