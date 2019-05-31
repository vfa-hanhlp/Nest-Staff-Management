import {Resolver, Query} from '@nestjs/graphql';
import {UsersService} from './user.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/shared/guards/auth.guard';

@Resolver('Auth')
export class UserResolver {
    constructor(private readonly userService: UsersService) {}

    @Query('getAllUsers')
    @UseGuards(JwtAuthGuard)
    public async getAllUsers(): Promise<object[]> {
        return await this.userService.getAllUsers();
    }
}