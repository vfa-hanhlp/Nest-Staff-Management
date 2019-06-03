import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

  ) {}

  isAdmin(permissions: string[]): boolean {
    return permissions.includes('admin');
  }
  /**
   * @description get all user
   * @author TrongVN
   * @date 2019-05-31
   * @returns {Promise<User[]>}
   * @memberof UsersService
   */
  public async getAllUsers(): Promise<User[]> {
    let userReturn: User[] | undefined;
    try {
      userReturn = await this.userRepository.find();
    } catch (error) {
      throw(error);
    }
    return userReturn;
  }

  public async updateUser(data: any): Promise<User> {
    let userReturn: User | undefined;
    const { _id, email, name }: any = data.input;
    const newData: any = {
      email,
      name,
    };
    try {
      await this.userRepository.update(_id, newData);
      userReturn = await this.userRepository.findOne(_id);
    } catch (error) {
      throw(error);
    }
    return userReturn;
  }
}
