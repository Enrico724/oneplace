import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FileModule } from "src/file/file.module";
import { FolderModule } from "src/folder/folder.module";
import { SharedFile, SharedFolder, UserPermission } from "./share.entity";
import { ShareController } from "./share.controller";
import { ShareService } from "./share.service";

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
    providers: [ShareService],
    controllers: [ShareController],
    exports: []
})
export class ShareModule { }