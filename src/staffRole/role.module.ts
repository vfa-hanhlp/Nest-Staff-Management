import { Roles } from './roles.entity';
import { User } from '../user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RoleResolver } from './role.resolver';
import { RoleService } from './role.service';
import { UsersService } from '../user/user.service'; // becasue adminGuard using this and this module using adminGuard
@Module({
  imports: [TypeOrmModule.forFeature([Roles, User])],
  providers: [RoleResolver, RoleService, UsersService ],
})
export class RoleModule {}
