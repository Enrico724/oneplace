import { Repository, FindOneOptions, TreeRepository, Not, In } from "typeorm";
import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { SharedFolderInput } from "src/dto";
import { SharedFolder, SharedFile, FolderUserPermission, User, Folder } from "src/entities";
import { AuthService } from "./auth.service";
import { Permission } from "src/enum";


@Injectable()
export class SharedService {
    constructor(
        @InjectRepository(Folder)
        private readonly folders: TreeRepository<Folder>,
        @InjectRepository(SharedFolder)
        private readonly sharedFolders: Repository<SharedFolder>,
    ) {}

    async getSharedFolders(user: User): Promise<SharedFolder[]> {
        const shared = await this.sharedFolders.find({
            where: { permissions: { user } },
            relations: {
                folder: { owner: true, subfolders: true, files: true }, 
                permissions: { user: true }
            }
        });
        for (const folder of shared)
            folder.folder = await this.folders.findDescendantsTree(folder.folder, { relations: ["owner", "subfolders", "files"] });

        return shared;
    }
}