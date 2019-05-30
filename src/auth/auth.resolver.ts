import { User } from './../user/user.entity';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UseGuards, Logger } from '@nestjs/common';
import { AdminGuard } from './../shared/guards/admin.guard';
import { JwtAuthGuard } from '../shared/guards/auth.guard';
@Resolver('Auth')
export class AuthResolver {
  /**
   * Creates an instance of AuthResolver.
   * @author lee
   * @date 2019-03-26
   * @param {AuthService} authService
   * @memberof AuthResolver
   */
  constructor(private readonly authService: AuthService) {}

  /**
   * @description login and return  token
   * @author lee
   * @date 2019-03-26
   * @returns {Promise<object>}
   * @memberof AuthResolver
   */
  @Query()
  public async login(@Args() login: User): Promise<object> {
     return await this.authService.login(login);
  }
  @Mutation('registered')
  public async registered(@Args('login') data: any): Promise<any> {
    try {
    return await this.authService.registered(data);
    } catch ( error) {
      throw error;
    }
  }
  @Mutation('addAdminPermission')
  public async regisaddAdminPermissiontered(@Args('') data: any): Promise<any> {
    try {
    return await this.authService.addPermission('admin', data.username);
    } catch ( error) {
      throw error;
    }
  }
}
