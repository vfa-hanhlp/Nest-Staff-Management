import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UsersService } from './user.service';
import { User } from './user.entity';
import { JwtAuthGuard } from '../shared/guards/auth.guard';

@Resolver('Auth')
export class UserResolver {
  /**
   * Creates an instance of UserResolver.
   * @author TrongVN
   * @date 2019-05-31
   * @param {UsersService} userService
   * @memberof UserResolver
   */
  constructor(private readonly userService: UsersService ) {}

  /**
   * @description get all user
   * @author TrongVN
   * @date 2019-05-31
   * @returns {Promise<object[]>}
   * @memberof UserResolver
   */
  @Query('getAllUsers')
  @UseGuards(JwtAuthGuard)
  public async getAllUsers(): Promise<object[]> {
    return await this.userService.getAllUsers();
  }

  /**
   * @description call getOneUser Service and pass param
   * @author NamTS
   * @date 2019-06-03
   * @param {string} userId
   * @returns {Promise<object>}
   * @memberof UserResolver
   */
  @Query('getUserById')
  public async getOneUser(@Args('userId') userId: string): Promise<object> {
      return await this.userService.getOneUser(userId);
  }

  /**
   * @description update user
   * @author TrongVN
   * @date 2019-05-31
   * @returns {Promise<object>}
   * @memberof UserResolver
   */
  @Mutation('updateUser')
  public async updateUser(@Args() data: any): Promise<User> {
    return await this.userService.updateUser(data);
  }
}
