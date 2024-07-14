import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  async getProfile(user: any) {
    
    return user;
  }
}
