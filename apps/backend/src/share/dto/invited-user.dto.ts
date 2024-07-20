import { ApiProperty, PickType } from '@nestjs/swagger';
import { Auth0User } from 'src/auth/dto/auth0-user.dto';
import { Permission } from '../share.entity';

export class InvitedUserData {
    @ApiProperty()
    userId: string;

    @ApiProperty()
    givenName: string;
    
    @ApiProperty()
    name: string;
    
    @ApiProperty()
    picture;
}

export class InvitedUser {
    @ApiProperty({ enum: Permission })
    permission: Permission;

    @ApiProperty({ type: InvitedUserData })
    user: InvitedUserData;
}