import { ApiProperty } from '@nestjs/swagger';

export class CreateFolderDto {
  @ApiProperty()
  name: string;

  @ApiProperty({ required: false })
  parentFolderId?: string;
}
