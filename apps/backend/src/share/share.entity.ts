import { ApiProperty } from '@nestjs/swagger';
import { File } from 'src/file/file.entity';
import { Folder } from 'src/folder/folder.entity';
import { Entity, OneToOne, OneToMany, PrimaryColumn, JoinColumn } from 'typeorm';
import { FolderUserPermission, FileUserPermission } from './file-permission.entity';

@Entity()
export class SharedFolder {
    @PrimaryColumn()
    id: string;

    @JoinColumn({ name: 'id' })
    @OneToOne(() => Folder, folder => folder.share)
    @JoinColumn({ name: 'id' })
    folder: Folder;

    @ApiProperty({ type: () => FolderUserPermission, isArray: true })
    @OneToMany(() => FolderUserPermission, userPermission => userPermission.sharedFolder)
    permissions: FolderUserPermission[];
}

@Entity()
export class SharedFile {
    @PrimaryColumn()
    fileId: string;

    @OneToOne(() => File)
    @JoinColumn({ name: 'fileId' })
    file: File;

    @OneToMany(() => FileUserPermission, userPermission => userPermission.sharedFile)
    permissions: FileUserPermission[];
}
