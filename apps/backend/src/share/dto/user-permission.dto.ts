import { ApiProperty } from "@nestjs/swagger";
import { Permission } from "../share.entity";

export class UserPermissionDto {
    @ApiProperty()
    userId: string;

    @ApiProperty({ type: Permission })
    permission: Permission
}