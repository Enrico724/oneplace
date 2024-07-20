import { User } from "src/user/user.entity";
import { Entity, PrimaryColumn, JoinColumn, OneToOne, ManyToOne, Column } from "typeorm";
import { SharedFolder, SharedFile } from "./share.entity";
import { ApiProperty } from "@nestjs/swagger";

export enum Permission {
    Read = 'read',
    Write = 'write',
}

@Entity()
export class FolderUserPermission {
    @ApiProperty()
    @PrimaryColumn()
    userId: string;
    
    @PrimaryColumn()
    sharedFolderId: string;
    
    @ApiProperty({ type: () => User })
    @JoinColumn({ name: 'userId' })
    @OneToOne(() => User)
    user: User;
    
    @JoinColumn({ name: 'sharedFolderId' })
    @ManyToOne(() => SharedFolder)
    sharedFolder: SharedFolder;
    
    @ApiProperty({ enum: Permission })
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

