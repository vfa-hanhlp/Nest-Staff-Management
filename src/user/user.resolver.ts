import {Resolver, Query, Args} from '@nestjs/graphql';
import {UsersService} from './user.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/shared/guards/auth.guard';

@Resolver('Auth')
export class UserResolver {
    constructor(private readonly userService: UsersService) {}

    @Query('getAllUsers')
    public async getAllUsers(): Promise<object[]> {
        return await this.userService.getAllUsers();
    }

    @Query('getUserById')
    public async getOneUser(@Args('userId') userId: string): Promise<object> {
        return await this.userService.getOneUser(userId);
    }
}