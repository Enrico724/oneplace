import { Entity, PrimaryColumn, JoinColumn, OneToOne, ManyToOne, Column } from "typeorm";

import { SharedFile } from "./shared-file.entity";
import { Permission } from "src/enum";
import { User } from "./user.entity";

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

