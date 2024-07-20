import { ApiProperty } from '@nestjs/swagger';

export class InvitableUser {
    @ApiProperty()
    userId: string;

    @ApiProperty()
    givenName: string;
    
    @ApiProperty()
    name: string;
    
    @ApiProperty()
    picture;
}