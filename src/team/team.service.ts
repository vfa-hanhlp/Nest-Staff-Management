import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeamEntity, TeamInput } from './team.entity';
import { User } from 'src/user/user.entity';

@Injectable()
export class TeamService {
    constructor(
        @InjectRepository(TeamEntity) private readonly teamRepository: Repository<TeamEntity>,
        @InjectRepository(User) private readonly userRepository: Repository<User>) {}

    /**
     * @description return all teams
     * @author NamTS
     * @date 2019-06-04
     * @returns {Promise<TeamEntity[]>}
     * @memberof TeamService
     */
    public async getAllTeams(): Promise<TeamEntity[]> {
        let teamList: TeamEntity[] | undefined;
        try {
            teamList = await this.teamRepository.find();
        } catch (error) {
            throw (error);
        }
        return teamList;
    }

    /**
     * @description create new team
     * @author NamTS
     * @date 2019-06-04
     * @param {TeamInput} data
     * @returns {Promise<TeamEntity>}
     * @memberof TeamService
     */
    public async createNewTeam(data: TeamInput): Promise<TeamEntity> {
        let teamReturn: TeamEntity| undefined;
        try {
            teamReturn = await this.teamRepository.save(this.teamRepository.create(data));
        } catch (error) {
            throw(error);
        }
        return teamReturn;
    }

    /**
     * @description update team data by id
     * @author NamTS
     * @date 2019-06-04
     * @param {string} teamId
     * @param {TeamInput} data
     * @returns {Promise<TeamEntity>}
     * @memberof TeamService
     */
    public async updateTeam(input: any): Promise<TeamEntity> {
        const { teamId, data } = input;
        let teamReturn: TeamEntity | undefined;
        try {
            teamReturn = await this.teamRepository.findOne(teamId);
            teamReturn.teamName = data.teamName;
            teamReturn.customer = data.customer;
            teamReturn.project = data.project;
            teamReturn.description = data.description;
            await this.teamRepository.update(teamId, teamReturn);
        } catch (error) {
            throw (error);
        }
        return teamReturn;
    }

    /**
     * @description delete team by teamId
     * @author NamTS
     * @date 2019-06-04
     * @param {string} teamId
     * @returns {Promise<object>}
     * @memberof TeamService
     */
    public async deleteTeamById(teamId: string): Promise<object> {
        try {
            await this.teamRepository.delete(teamId);
        } catch (error) {
            const {message} = error;
            return {
                requestResolved: false,
                error: message,
            };
        }
        return {
            requestResolved: true,
            error: null,
        };
    }

    public async addMemberToTeam(input: any): Promise<TeamEntity> {
        const {teamId, memberId} = input;
        let teamReturn: TeamEntity | undefined;
        try {
            const member: User | undefined = await this.userRepository.findOne(memberId);
            teamReturn = await this.teamRepository.findOne(teamId);
            if (!teamReturn.teamMember) {
                teamReturn.teamMember = [member];
            } else {
                teamReturn.teamMember.push(member);
            }
            await this.teamRepository.save(teamReturn);
        } catch (error) {
            throw (error);
        }
        return teamReturn;
    }
}
