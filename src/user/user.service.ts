import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}
  isAdmin(permissions: string[]): boolean {
    return permissions.includes('admin');
  }

  /**
   * @description get all users
   * @author NamTS
   * @date 2019-05-31
   * @returns {Promise<User[]>}
   * @memberof UsersService
   */
  public async getAllUsers(): Promise<User[]> {
    let usersReturn: User[] | undefined;
    try {
      usersReturn = await this.userRepository.find();
    } catch (error) {
      throw error;
    }
    return usersReturn;
  }

  /**
   * @description get one user by userId
   * @author NamTS
   * @date 2019-06-03
   * @param {string} userId
   * @returns {Promise<User>}
   * @memberof UsersService
   */
  public async getOneUser(userId: string): Promise<User> {
    return await this.userRepository.findOne(userId);
  }
}
