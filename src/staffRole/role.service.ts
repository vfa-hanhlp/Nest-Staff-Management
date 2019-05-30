import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Roles } from './roles.entity';
import evaluateMongoError from '../common/mongoError/evaluateMongoError';
@Injectable()
export class RoleService {
  /**
   * @description salt.
   * @private
   * @memberof RoleService
   */
  /**
   * Creates an instance of AuthService.
   * @author Trungbb
   * @date 2019-03-26
   * @param {Repository<Role>} RolesRepository
   * @param {JwtService} jwtService
   * @memberof AuthService
   */
  constructor(
    @InjectRepository(Roles)
    private readonly roleRepository: Repository<Roles>,

  ) {}

  /**
   * @description add role
   * @author Trungbb
   * @date 2019-03-26
   * @param {name} data
   * @returns {(Promise<Roles | void>)}
   */
  public async addRole(data: Roles): Promise<Roles> {
    let roleReturn: Roles | undefined;
    try {
        roleReturn = await this.roleRepository.save(this.roleRepository.create(data));
    } catch (error) {
      throw evaluateMongoError(error, [ { id: 'role ', name: data.name } ]);
    }
    return roleReturn;
  }
  /**
   * @description get all roles
   * @author Trungbb
   * @date 2019-03-26
   * @param {name} data
   * @returns {(Promise<Roles | void>)}
   */
  public async getAllRoles(): Promise<Roles[]> {
    let roleReturn: Roles[] | undefined;
    try {
      roleReturn = await this.roleRepository.find();
    } catch (error) {
      throw error;
    }
    return roleReturn;
  }
}
