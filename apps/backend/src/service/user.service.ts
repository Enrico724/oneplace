import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import axios from 'axios';

import { Folder, User } from 'src/entities';
import { FolderService } from './folder.service';
import { AuthService } from './auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    public users: Repository<User>,
    @InjectRepository(Folder)
    public folders: Repository<Folder>,
    @Inject(AuthService)
    private auth: AuthService
  ) {}

  async update(auth0Id: string): Promise<User> {
    try {
      const { picture, name } = await this.auth.getUser(auth0Id);
      const user = await this.users.findOneByOrFail({ auth0Id });
      user.picture = picture;
      user.name = name;
      await this.users.save(user);
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async create(auth0Id: string): Promise<User> {
    try {
      const { picture, name } = await this.auth.getUser(auth0Id);
      await this.users.insert({ auth0Id, name, picture });
      const user = await this.users.findOneByOrFail({ auth0Id, picture, name });
      const folder = this.folders.create({ name: 'root', owner: user });
      await this.folders.save(folder);
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
    
    return await this.users.findBy({ id: Not(user.id) });
  }

  async getProfile(user: any) {
    return user;
  }
}
