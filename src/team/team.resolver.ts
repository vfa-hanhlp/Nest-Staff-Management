import { UseGuards } from '@nestjs/common';
import { Mutation, Args, Resolver, Query } from '@nestjs/graphql';
import { TeamService } from './team.service';
import { TeamEntity, TeamInput } from './team.entity';
import { JwtAuthGuard } from 'src/shared/guards/auth.guard';
import { AdminGuard } from 'src/shared/guards/admin.guard';

@Resolver('Auth')
export class TeamResolver {

    /**
     * Creates an instance of TeamResolver.
     * @author NamTS
     * @date 2019-06-04
     * @param {TeamService} teamService
     * @memberof TeamResolver
     */
    constructor(private readonly teamService: TeamService) {}

    /**
     * @description call Service get all teams
     * @author NamTS
     * @date 2019-06-04
     * @returns {Promise<TeamEntity[]>}
     * @memberof TeamResolver
     */
    @Query('teamList')
    public async teamList(): Promise<TeamEntity[]> {
        return await this.teamService.getAllTeams();
    }

    /**
     * @description call Service create new team
     * @author NamTS
     * @date 2019-06-04
     * @param {TeamInput} data
     * @returns {Promise<TeamEntity>}
     * @memberof TeamResolver
     */
    @Mutation('registerNewTeam')
    @UseGuards(JwtAuthGuard)
    public async createNewTeam(@Args('input') data: TeamInput): Promise<TeamEntity> {
        return await this.teamService.createNewTeam(data);
    }

    /**
     * @description call Service update team
     * @author NamTS
     * @date 2019-06-04
     * @param {string} teamId
     * @param {TeamInput} teamData
     * @returns
     * @memberof TeamResolver
     */
    @Mutation('updateTeam')
    @UseGuards(JwtAuthGuard)
    public async updateTeam(@Args() input: any): Promise<TeamEntity> {
        return await this.teamService.updateTeam(input);
    }

    /**
     * @description call Service delete team
     * @author NamTS
     * @date 2019-06-04
     * @param {string} teamId
     * @returns {Promise<object>}
     * @memberof TeamResolver
     */
    @Mutation('deleteTeam')
    @UseGuards(JwtAuthGuard, AdminGuard)
    public async deleteTeam(@Args('teamId') id: string): Promise<object> {
        return this.teamService.deleteTeamById(id);
    }

    @Mutation('addMember')
    @UseGuards(JwtAuthGuard, AdminGuard)
    public async addMemberToTeam(@Args() input: any): Promise<TeamEntity> {
        return this.teamService.addMemberToTeam(input);
    }
}
