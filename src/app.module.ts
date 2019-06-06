import { Module, Logger, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './staffRole/role.module';
import {AuthService} from './auth/auth.service';
import { DeviceService } from './device/device.service';
import { DeviceModule } from './device/device.module';
import { TeamModule } from './team/team.module';
import * as GraphQLJSON from 'graphql-type-json';
@Module({
  imports: [
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      typePaths: ['./**/**/*.graphql', './*.graphql'],
      path: '/graphql',
      debug: true,
      playground: true,
      context: ({ req }) => ({ req }),
      installSubscriptionHandlers: true,
      resolvers: { JSON: GraphQLJSON },
      formatError: (error: GraphQLError): any => {
        new Logger('GraphQLError').error(error);
        return error.message;
      },
      validationRules: [],
    }),
    AuthModule,
    UserModule,
    RoleModule,
    DeviceModule,
    TeamModule,
  ],
  controllers: [],
  providers: [AuthService, DeviceService],
})
export class AppModule implements OnModuleInit {
  async onModuleInit() {
    await this.init();
  }

  async init() {
    new Logger(AppModule.name).log('init');
  }
}
