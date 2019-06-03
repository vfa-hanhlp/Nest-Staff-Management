import {Resolver, Query, Args} from '@nestjs/graphql';
import {UsersService} from './user.service';

@Resolver('Auth')
export class UserResolver {

    /**
     * Creates an instance of UserResolver.
     * @author NamTS
     * @date 2019-06-03
     * @param {UsersService} userService
     * @memberof UserResolver
     */
    constructor(private readonly userService: UsersService) {}

    /**
     * @description call getAllUsers Service
     * @author NamTS
     * @date 2019-06-03
     * @returns {Promise<object[]>}
     * @memberof UserResolver
     */
    @Query('getAllUsers')
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
}
