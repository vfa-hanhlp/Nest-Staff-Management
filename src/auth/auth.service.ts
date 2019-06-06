import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { MongoError } from 'mongodb';
import evaluateMongoError from '../common/mongoError/evaluateMongoError';
@Injectable()
export class AuthService {
  /**
   * @description salt.
   * @private
   * @memberof AuthService
   */
  private saltRounds = 10;

  /**
   * Creates an instance of AuthService.
   * @author lee
   * @date 2019-03-26
   * @param {Repository<User>} userRepository
   * @param {JwtService} jwtService
   * @memberof AuthService
   */
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * @description Login
   * @author lee
   * @date 2019-03-26
   * @param {User} data
   * @returns {(Promise<object | void>)}
   * @memberof AuthService
   */
  public async login(data: any): Promise<object | null> {
    let userToAttempt: User | undefined;
    if (data.User.name) {
     userToAttempt = await this.userRepository.findOne({ name: data.User.name });
    } else if (data.User.email) {
      userToAttempt = await this.userRepository.findOne({ email: data.User.email });
    }
    if (!userToAttempt) {
      throw new HttpException('User not exist!', 400);
    }
    if (await this.verification(data.User.password, userToAttempt.password)) {
    return await {
        user : userToAttempt,
        token: this.jwtService.sign(
          { _id: userToAttempt._id, nick_name: userToAttempt.name, email: userToAttempt.email },
          {
            issuer: 'vfa',
            jwtid: await this.uuid(),
          },
        ),
        token_type: 'bearer',
        expires_in: 3600,
      };
    }
    throw new HttpException('system error!', 400);
  }

  /**
   * @description create user
   * @author lee
   * @date 2019-03-26
   * @param {CreateUserDto} data
   * @returns {Promise<User>}
   * @memberof AuthService
   */
  public async registered(data: User): Promise<User> {
    data.password = await this.getHash(data.password);
    let userReturn: User | undefined;
    data.permissions = 'member'; // default user permission
    try {
    userReturn = await this.userRepository.save(this.userRepository.create(data));
    } catch (error) {
      throw evaluateMongoError(error, [ { id: 'user name', name: data.name }, { id: 'email', name: data.email },
    ] );
    }
    return userReturn;
  }

  public  async addPermission(
    permission: string,
    username: string,
  ): Promise<User| undefined> {
    const user = await this.userRepository.findOne({name: username});
    if (!user) { return undefined; }
    user.permissions = permission;
    return await this.userRepository.save(user);
  }
  /**
   * @description validateUser
   * @author lee
   * @date 2019-03-26
   * @param {*} payload
   * @returns {Promise<User>}
   * @memberof AuthService
   */
  public async validateUser(payload: any): Promise<User> {
    return await this.userRepository.findOne({ name: payload.nick_name });
  }

  /**
   * @description hash.
   * @author lee
   * @date 2019-03-26
   * @private
   * @param {(string | undefined)} password
   * @returns {Promise<string>}
   * @memberof AuthService
   */
  private async getHash(password: string | undefined): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds);
  }
  /**
   * @private
   * @param {MongoError} error
   * @param {user} createUserInput
   * @returns {Error}
   * @memberof AuthService
   */
  private evaluateMongoError(
    error: MongoError,
    createUserInput: User,
  ): Error {
    if (error.code === 11000) {
      if (
        error.message
          .toLowerCase()
          .includes(createUserInput.email.toLowerCase())
      ) {
        throw new Error(
          `e-mail ${createUserInput.email} is already registered`,
        );
      } else if (
        error.message
          .toLowerCase()
          .includes(createUserInput.name.toLowerCase())
      ) {
        throw new Error(
          `Username ${createUserInput.name} is already registered`,
        );
      }
    }
    throw new Error(error.message);
  }
  /**
   * Returns if the user has 'admin' set on the permissions array
   *
   * @param {string[]} permissions permissions property on a User
   * @returns {boolean}
   * @memberof UsersService
   */
  isAdmin(permissions: string[]): boolean {
    return permissions.includes('admin');
  }
  /**
   * @description verification.
   * @author lee
   * @date 2019-03-26
   * @private
   * @param {(string | undefined)} password
   * @param {(string | undefined)} hash
   * @returns {Promise<boolean>}
   * @memberof AuthService
   */
  private async verification(
    password: string | undefined,
    hash: string | undefined,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  /**
   * @description create uuid
   * @author lee
   * @date 2019-03-26
   * @private
   * @returns
   * @memberof AuthService
   */
  private async uuid() {
    let d: any = await new Date().getTime();
    return await 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r: any = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : (r & 0x7) | 0x8).toString(16);
    });
  }
}
