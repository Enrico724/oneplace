import { ApiProperty } from '@nestjs/swagger';
import { Permission } from '../file-permission.entity';

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