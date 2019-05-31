import { Module } from '@nestjs/common';
import { UsersService } from '../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserResolver } from './user.resolver';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UsersService, UserResolver],
})
export class UserModule {}
