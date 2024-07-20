import { ApiProperty, OmitType } from "@nestjs/swagger";
import { SharedFolderInfoDTO } from "src/dto/shared-folder-info.dto";
import { Folder } from "src/entities";

export class FolderInfoDTO extends OmitType(Folder, ['share']) {
    @ApiProperty({ type: SharedFolderInfoDTO })
    share: SharedFolderInfoDTO;
}