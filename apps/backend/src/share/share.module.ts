import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FileModule } from "src/file/file.module";
import { FolderModule } from "src/folder/folder.module";
import { SharedFile, SharedFolder, UserPermission } from "./share.entity";

@Module({
    imports: [
        FileModule, 
        FolderModule,
        TypeOrmModule.forFeature([
            SharedFolder,
            SharedFile,
            UserPermission,
        ]),
    ],
    exports: []
})
export class ShareModule { }