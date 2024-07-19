import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileService } from 'src/file/file.service';
import { FolderService } from 'src/folder/folder.service';
import { User } from 'src/user/user.entity';
import { In, Not, Repository } from 'typeorm';
import { SharedFolderInput } from './dto/shared-folder.input';
import { AuthService } from 'src/auth/auth.service';
import { SharedFile, SharedFolder, UserPermission } from './share.entity';

@Injectable()
export class ShareService {
    constructor(
        @Inject()
        private readonly authService: AuthService,
        @Inject()
        private readonly folders: FolderService,
        @Inject()
        private readonly files: FileService,
        @InjectRepository(SharedFolder)
        private readonly sharedFoldersRepo: Repository<SharedFolder>,
        @InjectRepository(SharedFile)
        private readonly shareFilesRepo: Repository<SharedFile>,
    ) {}

    async getInvitableUsers(owner: User, folderId: string) {
        const extractAuth0IdFromPermission = (permission: UserPermission): string => permission.user.auth0Id;
        
        const folder = await this.folders.findByUUID(owner, folderId);
        const options = { where: { folder }, relations: { permissions: true } };
        const sharedFolder = await this.sharedFoldersRepo.findOne(options);
        const allUsers = await this.authService.getUsers();

        const toBeExcluded = sharedFolder.permissions.map(extractAuth0IdFromPermission).concat(owner.auth0Id);
        const invitableUsers = allUsers.filter(user => !toBeExcluded.includes(user.user_id));
        console.log(invitableUsers);
        return invitableUsers;
    }

    async sharedFolder(owner: User, input: SharedFolderInput) {
        // const folder = await this.folders.findFolder(owner, folderId);
    }
}