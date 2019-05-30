import { Roles } from './roles.entity';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { RoleService } from './role.service';
import { UseGuards, Logger } from '@nestjs/common';
import { AdminGuard } from '../shared/guards/admin.guard';
import { JwtAuthGuard } from '../shared/guards/auth.guard';
@Resolver('Auth')
export class RoleResolver {
  /**
   * Creates an instance of RoleResolver.
   * @author Trungbb
   * @date 2019-05-29
   * @param {RoleService} autRoleServicehService
   * @memberof RoleResolver
   */
  constructor(private readonly roleService: RoleService) {}
  /**
   * @description add role
   * @author TRungbb
   * @date 2019-05-29
   * @returns {Promise<object>}
   * @memberof RoleService
   */
  @Mutation('addRole')
  @UseGuards(JwtAuthGuard)
  public async addRole(@Args() data: Roles): Promise<object> {
     return await this.roleService.addRole(data);
  }
  /**
   * @description get all role
   * @author TRungbb
   * @date 2019-05-29
   * @returns {Promise<object>}
   * @memberof RoleService
   */
  @Query('getAllRoles')
  @UseGuards(JwtAuthGuard, AdminGuard)
  public async getAllRoles(): Promise<object[]> {
     return await this.roleService.getAllRoles();
  }
}
