import { Module, Logger, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './staffRole/role.module';
import {AuthService} from './auth/auth.service';
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
  ],
  controllers: [],
  providers: [AuthService],
})
export class AppModule implements OnModuleInit {
  async onModuleInit() {
    await this.init();
  }

  async init() {
    new Logger(AppModule.name).log('init');
  }
}
