import { File } from 'src/file/file.entity';
import { Folder } from 'src/folder/folder.entity';
import { User } from 'src/user/user.entity';
import { Entity, Column, ManyToOne, OneToOne, OneToMany, PrimaryColumn, JoinColumn } from 'typeorm';

@Entity()
export class SharedFolder {
    @PrimaryColumn()
    id: string;

    @OneToOne(() => Folder)
    @JoinColumn({ name: 'id' })
    folder: Folder;

    @OneToMany(() => UserPermission, userPermission => userPermission.user)
    permissions: UserPermission[];
}

@Entity()
export class SharedFile {
    @PrimaryColumn()
    fileId: string;

    @OneToOne(() => File)
    @JoinColumn({ name: 'fileId' })
    file: File;

    @OneToMany(() => UserPermission, userPermission => userPermission.user)
    permissions: UserPermission[];
}

export enum Permission {
    Read = 'read',
    Write = 'write',
}

@Entity()
export class UserPermission {
    @PrimaryColumn()
    userId: string;

    @JoinColumn({ name: 'userId' })
    @ManyToOne(() => User)
    user: User;

    @Column()
    permission: Permission;
}