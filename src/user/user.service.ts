import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
@Injectable()
export class UsersService {
   isAdmin(permissions: string[]): boolean {
        return permissions.includes('admin');
      }
    }
