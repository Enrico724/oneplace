import { Repository, FindOneOptions, TreeRepository } from "typeorm";
import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { SharedFolderInfoDTO, Auth0User, InvitableUser, InvitedUserData, InvitedUser, SharedFolderInput } from "src/dto";
import { SharedFolder, SharedFile, FolderUserPermission, User, Folder } from "src/entities";
import { AuthService } from "./auth.service";
import { FileService } from "./file.service";
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
        private readonly folderUserPermission: Repository<FolderUserPermission>,
    ) {}

    async getShareInfo(owner: User, folderId: string): Promise<SharedFolderInfoDTO> {
        const sharedFolder = await this.sharedFoldersRepo.findOneBy({ folder: { id: folderId } });
        const parents = await this.folders.findAncestors(sharedFolder.folder);
        const parentTree = await this.folders.findAncestorsTree(sharedFolder.folder);
        console.log(parents, parentTree);
        return {
            folder: sharedFolder,
            parents: parents.map(({ share }) => share),
        }
    }

    toInvitableUser(auth0user: Auth0User, userId: string): InvitableUser {
        return {
            userId,
            givenName: auth0user.given_name,
            name: auth0user.name,
            picture: auth0user.picture,
        }
    }

    toInvitedUserData(auth0user: Auth0User, userId: string): InvitedUserData {
        return {
            userId,
            givenName: auth0user.given_name,
            name: auth0user.name,
            picture: auth0user.picture,
        }
    }
    
    async getInvitedUsers(user: any, folderId: string): Promise<InvitedUser[]> {
        const sharedFolder = await this.sharedFoldersRepo.findOne({
            where: { folder: { id: folderId } },
            relations: { folder: true, permissions: { user: true } }
        });
        if (sharedFolder == null) return [];
        const map = sharedFolder.permissions.map(async permission => ({
            permission: permission.permission,
            user: this.toInvitedUserData(await this.authService.getUser(permission.user.auth0Id), permission.userId),
        }));
        return Promise.all(map);
    }

    async inviteUser(owner: User, folderId: string, userId: string): Promise<InvitedUser> {
        const folder = await this.folders.findOneOrFail({
            where: { owner, id: folderId },
            relations: { files: true, subfolders: true },
          });
        const invited = await this.users.findOneByOrFail({ id: userId })
        const sharedFolder = await this.sharedFoldersRepo.findOne({
            where: { folder },
            relations: { folder: true, permissions: true }
        });
        if (sharedFolder == null) {
            const createdSharedFolder = this.sharedFoldersRepo.create({ folder })
            const sharedFolder = await this.sharedFoldersRepo.save(createdSharedFolder);
            const createdPermission = this.folderUserPermission.create({ permission: Permission.Read, sharedFolder, userId: userId });
            const folderUserPermission = await this.folderUserPermission.save(createdPermission);
            return {
                permission: folderUserPermission.permission,
                user: this.toInvitedUserData(await this.authService.getUser(invited.auth0Id), folderUserPermission.userId)
            }
        } else {
            let folderUserPermission = await this.folderUserPermission.findOneBy({ userId: userId, sharedFolderId: sharedFolder.id });
            if (folderUserPermission == null) {
                const createdPermission = this.folderUserPermission.create({ permission: Permission.Read, sharedFolder, userId: userId });
                folderUserPermission = await this.folderUserPermission.save(createdPermission);
            }
            return {
                permission: folderUserPermission.permission,
                user: this.toInvitedUserData(await this.authService.getUser(invited.auth0Id), folderUserPermission.userId)
            }
        }
    }

    async getUsersForSharing(owner: User, folderId): Promise<InvitableUser[]> {
        const folder = await this.folders.findOneOrFail({
            where: { owner, id: folderId },
            relations: { files: true, subfolders: true },
          });
        const options: FindOneOptions<SharedFolder> = { where: { folder }, relations: { folder: true, permissions: { user: true } } };
        const sharedFolder = await this.sharedFoldersRepo.findOne(options);
        const allUsers = await this.authService.getUsers();
        const hasBeenShared = !(sharedFolder == null);

        let toBeExcluded: string[] = [ owner.auth0Id ];
        
        if (hasBeenShared) {
            const extractAuth0IdFromPermission = (permission: FolderUserPermission): string => permission.user.auth0Id;
            const alreadySharingUserIDs = sharedFolder.permissions.map(extractAuth0IdFromPermission);
            toBeExcluded = [ ...alreadySharingUserIDs, owner.auth0Id ];
        }
        
        const users = allUsers.filter(user => !toBeExcluded.includes(user.user_id));
        return Promise.all(users.map(async user => {
            const { id } = await this.users.findOneByOrFail({ auth0Id: user.user_id });
            return this.toInvitableUser(user, id)
        }))
    }

    async sharedFolder(owner: User, input: SharedFolderInput) {
        // const folder = await this.folders.findFolder(owner, folderId);
    }
}