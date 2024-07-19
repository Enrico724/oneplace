import { Folder } from 'src/folder/folder.entity';
import { User } from 'src/user/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, OneToMany } from 'typeorm';

@Entity()
export class SharedFolder {
    @OneToOne(() => Folder)
    folder: Folder;

    @OneToMany(() => UserPermission, userPermission => userPermission.user)
    permissions: UserPermission[];
}

@Entity()
export class SharedFile {
    @OneToOne(() => Folder)
    folder: Folder;

    @OneToMany(() => UserPermission, userPermission => userPermission.user)
    permissions: UserPermission[];
}

export enum Permission {
    Read = 'read',
    Write = 'write',
}

@Entity()
export class UserPermission {
    @ManyToOne(() => User)
    user: User;

    @Column()
    permission: Permission;
}