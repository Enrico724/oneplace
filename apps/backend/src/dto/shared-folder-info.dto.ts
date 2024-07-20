import { ApiProperty } from "@nestjs/swagger";
import { SharedFolder } from "src/entities";

export class SharedFolderInfoDTO {
    @ApiProperty({ type: SharedFolder })
    folder: SharedFolder;

    @ApiProperty({ type: SharedFolder, isArray: true })
    parents: SharedFolder[];
}