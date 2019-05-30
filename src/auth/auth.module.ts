import { JwtAuthGuard } from '../shared/guards/auth.guard';
import { AuthStrategy } from './auth.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { User } from '../user/user.entity';
import { UsersService } from '../user/user.service'; // becasue adminGuard using this and this module using adminGuard

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: '3.1415926',
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  providers: [AuthService, AuthStrategy, JwtAuthGuard, AuthResolver, UsersService],
})
export class AuthModule {}
