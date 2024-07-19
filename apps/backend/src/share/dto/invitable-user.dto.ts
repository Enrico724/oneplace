import { PickType } from '@nestjs/swagger';
import { Auth0User } from 'src/auth/dto/auth0-user.dto';

export class InvitableUser extends PickType(Auth0User, ['user_id', 'given_name', 'name', 'picture'] as const) {};
