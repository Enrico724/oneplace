import { Repository, FindOneOptions, TreeRepository, Not, In } from "typeorm";
import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { InvitableUser, SharedFolderInput } from "src/dto";
import { SharedFolder, SharedFile, FolderUserPermission, User, Folder } from "src/entities";
import { AuthService } from "./auth.service";
import { Permission } from "src/enum";


@Injectable()
export class ShareService {
    constructor(
        @Inject(AuthService)
        private readonly authService: AuthService,
        @InjectRepository(Folder)
        private readonly folders: TreeRepository<Folder>,
        @InjectRepository(User)
        private readonly users: Repository<User>,
        @InjectRepository(SharedFolder)
        private readonly sharedFoldersRepo: Repository<SharedFolder>,
        @InjectRepository(SharedFile)
        private readonly shareFilesRepo: Repository<SharedFile>,
        @InjectRepository(FolderUserPermission)
        private readonly permission: Repository<FolderUserPermission>,
    ) {}

    
    getInvitedUsers(owner: User, folderId: string): Promise<FolderUserPermission[]> {
        return this.permission.find(({
            where: { sharedFolder: { folder: { owner, id: folderId } } },
            relations: { user: true, sharedFolder: { folder: { owner: true } } }
        }))
    }

    async createSharedFolder(owner: User, folderId: string): Promise<SharedFolder> {
        const folder = await this.folders.findOneOrFail({ where: { owner, id: folderId } });
        const createdSharedFolder = this.sharedFoldersRepo.create({ folder });
        return await this.sharedFoldersRepo.save(createdSharedFolder);
    }

    createPermission(sharedFolder: SharedFolder, userId: string, permission: Permission): Promise<FolderUserPermission> {
        const input = { permission: permission, sharedFolder, userId: userId };
        const created = this.permission.create(input);
        return this.permission.save(created);
    }

    async inviteUser(owner: User, folderId: string, userId: string): Promise<FolderUserPermission> {
        const sharedFolder = await this.sharedFoldersRepo.findOne({
            where: { folder: { owner, id: folderId } },
            relations: { folder: true, permissions: { user: true } }
        });
        if (sharedFolder == null) {
            const sharedFolder = await this.createSharedFolder(owner, folderId);
            return await this.createPermission(sharedFolder, userId, Permission.Read);
        } else {
            const permission = await this.permission.findOneBy({ userId, sharedFolderId: sharedFolder.id });
            if (permission == null) return await this.createPermission(sharedFolder, userId, Permission.Read);
            return permission;
        }
    }

    async getUsersForSharing(owner: User, folderId): Promise<User[]> {
        const sharedFolder = await this.sharedFoldersRepo.findOne({ 
            where: { folder: { owner, id: folderId } },
            relations: { folder: true, permissions: { user: true } }
        });
        const excludedIDs = sharedFolder.permissions.map(({ user }) => user.id).concat(owner.id);
        return this.users.findBy({ id: Not(In(excludedIDs)) });
    }

    async sharedFolder(owner: User, input: SharedFolderInput) {
        // const folder = await this.folders.findFolder(owner, folderId);
    }
}