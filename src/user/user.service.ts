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
    let userReturn: User | undefined;
    try {
      userReturn =  await this.userRepository.findOne(userId);
    } catch (error) {
      throw(error);
    }
    return userReturn;
  }

  /**
   * @description update user
   * @author TrongVN
   * @date 2019-06-03
   * @param {*} data
   * @returns {Promise<User>}
   * @memberof UsersService
   */
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

  /**
   * @description delete user by userId
   * @author NamTS
   * @date 2019-06-03
   * @param {string} userId
   * @returns {Promise<object>}
   * @memberof UsersService
   */
  public async deleteUser(userId: string): Promise<object> {
    try {
      const userReturn: User | undefined = await this.userRepository.findOne(userId);
      await this.userRepository.remove(userReturn);
    } catch (error) {
      const {message} = error;
      return {
        requestResolved: false,
        error: message,
      };
    }
    return {
      requestResolved: true,
      error: null,
    };
  }
}
