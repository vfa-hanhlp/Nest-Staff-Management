import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamEntity } from './team.entity';
import { TeamResolver } from './team.resolver';
import { TeamService } from './team.service';
import { User } from 'src/user/user.entity';
import { UsersService } from 'src/user/user.service';

@Module({
    imports: [TypeOrmModule.forFeature([TeamEntity, User])],
    providers: [TeamResolver, TeamService, UsersService],
})
export class TeamModule {}
