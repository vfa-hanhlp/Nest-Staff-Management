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
            await this.teamRepository.manager.transaction(async tx => {
                teamReturn = await tx.save(this.teamRepository.create(data));
            });
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
     * @param {TeamInput} updateData
     * @returns {Promise<TeamEntity>}
     * @memberof TeamService
     */
    public async updateTeam(input: any): Promise<TeamEntity> {
        const { teamId, updateData } = input;
        let teamReturn: TeamEntity | undefined;
        try {
            teamReturn = await this.teamRepository.findOne(teamId);
            teamReturn.teamName = updateData.teamName;
            teamReturn.customer = updateData.customer;
            teamReturn.project = updateData.project;
            teamReturn.description = updateData.description;
            await this.teamRepository.manager.transaction(async tx => {
                await tx.update(TeamEntity, teamId, teamReturn);
            });
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
            await this.teamRepository.manager.transaction(async tx => {
                await tx.delete(TeamEntity, teamId);
            });
            // await this.teamRepository.delete(teamId);
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

    /**
     * @description add new member to team
     * @author NamTS
     * @date 2019-06-06
     * @param {*} input
     * @returns {Promise<TeamEntity>}
     * @memberof TeamService
     */
    public async addMemberToTeam(input: any): Promise<TeamEntity> {
        const {teamId, memberId} = input;
        let teamReturn: TeamEntity | undefined;
        try {
            const member: User | undefined = await this.userRepository.findOne(memberId);
            teamReturn = await this.teamRepository.findOne(teamId);

            if (!teamReturn.teamMember) {
                teamReturn.teamMember = [member];
            } else {
                // tslint:disable-next-line: prefer-const
                let checkMemberExist = false;
                teamReturn.teamMember.map(mem => {
                // tslint:disable-next-line: no-unused-expression
                    mem._id === member._id && (checkMemberExist = true);
                });
                if (checkMemberExist) {
                    throw new Error ('This member already existed!');
                } else {
                    teamReturn.teamMember.push(member);
                }
            }
            await this.teamRepository.manager.transaction(async tx => {
                await tx.save(teamReturn);
            });
        } catch (error) {
            throw (error);
        }
        return teamReturn;
    }

    /**
     * @description remove the member out of team
     * @author NamTS
     * @date 2019-06-06
     * @param {*} input
     * @returns {Promise<TeamEntity>}
     * @memberof TeamService
     */
    public async removeMemberOutOfTeam(input: any): Promise<TeamEntity> {
        const {teamId, memberId} = input;
        let teamReturn: TeamEntity | undefined;
        try {
            teamReturn = await this.teamRepository.findOne(teamId);
            teamReturn.teamMember.map((mem: User, index: number) => {
            // tslint:disable-next-line: no-unused-expression
                mem._id === memberId && (teamReturn.teamMember.splice(index, 1));
            });
            await this.teamRepository.manager.transaction(async tx => {
                await tx.save(teamReturn);
            });
        } catch (error) {
            throw (error);
        }
        return teamReturn;
    }
}
