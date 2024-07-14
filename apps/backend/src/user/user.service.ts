import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  async getProfile(user: any) {
    // Implementa la logica per ottenere il profilo utente
    return user;
  }
}
