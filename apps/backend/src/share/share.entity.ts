import { File } from 'src/file/file.entity';
import { Folder } from 'src/folder/folder.entity';
import { User } from 'src/user/user.entity';
import { Entity, Column, ManyToOne, OneToOne, OneToMany, PrimaryColumn, JoinColumn, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class SharedFolder {
    @PrimaryColumn()
    id: string;

    @OneToOne(() => Folder)
    @JoinColumn({ name: 'id' })
    folder: Folder;

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

export enum Permission {
    Read = 'read',
    Write = 'write',
}

@Entity()
export class FolderUserPermission {
    @PrimaryColumn()
    userId: string;

    @PrimaryColumn()
    sharedFolderId: string;

    @JoinColumn({ name: 'userId' })
    @OneToOne(() => User)
    user: User;

    @JoinColumn({ name: 'sharedFolderId' })
    @ManyToOne(() => SharedFolder)
    sharedFolder: SharedFolder;

    @Column()
    permission: Permission;
}

@Entity()
export class FileUserPermission {
    @PrimaryColumn()
    userId: string;

    @PrimaryColumn()
    sharedFileId: string;

    @JoinColumn({ name: 'userId' })
    @OneToOne(() => User)
    user: User;

    @JoinColumn({ name: 'sharedFileId' })
    @ManyToOne(() => SharedFile)
    sharedFile: SharedFile;

    @Column()
    permission: Permission;
}