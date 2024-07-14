import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    public repository: Repository<User>,
  ) {}

  async getProfile(user: any) {
    
    return user;
  }
}
