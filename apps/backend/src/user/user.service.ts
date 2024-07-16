import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FolderService } from 'src/folder/folder.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    public repository: Repository<User>,
    private folders: FolderService,
  ) {}

  async create(auth0Id: string): Promise<User> {
    try {
      await this.repository.insert({ auth0Id });
      const user = await this.repository.findOneByOrFail({ auth0Id });
      const folder = this.folders.repository.create({ name: 'root', owner: user });
      await this.folders.repository.save(folder);
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async getProfile(user: any) {
    
    return user;
  }
}
