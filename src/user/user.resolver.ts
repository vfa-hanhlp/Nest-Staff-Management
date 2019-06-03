import { HttpException, Injectable, UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UsersService } from './user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import evaluateMongoError from '../common/mongoError/evaluateMongoError';
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
