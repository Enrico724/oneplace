import { ApiProperty } from "@nestjs/swagger";
import { Permission } from "../file-permission.entity";

export class UserPermissionDto {
    @ApiProperty()
    userId: string;

    @ApiProperty({ type: Permission })
    permission: Permission
}