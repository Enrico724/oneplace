import { Entity, PrimaryColumn, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { FileUserPermission } from "./file-user-permission.entity";
import { File } from "./file.entity";

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
