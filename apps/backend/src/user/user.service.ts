import { Injectable } from '@nestjs/common';
import { Not, Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FolderService } from 'src/folder/folder.service';
import axios from 'axios';

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

  async getUsers(user: User): Promise<User[]> {

    var options = {
      method: 'GET',
      url: 'https://one-place.eu.auth0.com/api/v2/users',
      params: {q: 'email:"jane@exampleco.com"', search_engine: 'v3'},
      headers: {authorization: 'Bearer {yourMgmtApiAccessToken}'}
    };
    
    const reponse = await axios.request(options);
    console.log(reponse.data);
    
    return await this.repository.findBy({
      id: Not(user.id),
    });
  }

  async getProfile(user: any) {
    return user;
  }
}
