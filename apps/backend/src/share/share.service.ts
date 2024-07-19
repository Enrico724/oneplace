import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileService } from 'src/file/file.service';
import { FolderService } from 'src/folder/folder.service';
import { User } from 'src/user/user.entity';
import { FindOneOptions, In, Not, Repository } from 'typeorm';
import { SharedFolderInput } from './dto/shared-folder.input';
import { AuthService } from 'src/auth/auth.service';
import { SharedFile, SharedFolder, UserPermission } from './share.entity';
import { InvitableUser } from './dto/invitable-user.dto';

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
    
    async getUsersForSharing(owner: User, folderId): Promise<InvitableUser[]> {
        const folder = await this.folders.findByUUID(owner, folderId);
        const options: FindOneOptions<SharedFolder> = { where: { folder }, relations: { folder: true, permissions: true } };
        const sharedFolder = await this.sharedFoldersRepo.findOne(options);
        const allUsers = await this.authService.getUsers();
        const hasBeenShared = !(sharedFolder == null);

        let toBeExcluded: string[] = [ owner.auth0Id ];
        
        if (hasBeenShared) {
            const extractAuth0IdFromPermission = (permission: UserPermission): string => permission.user.auth0Id;
            const alreadySharingUserIDs = sharedFolder.permissions.map(extractAuth0IdFromPermission);
            toBeExcluded = [ ...alreadySharingUserIDs, owner.auth0Id ];
        }
        
        return allUsers.filter(user => !toBeExcluded.includes(user.user_id));
    }

    async sharedFolder(owner: User, input: SharedFolderInput) {
        // const folder = await this.folders.findFolder(owner, folderId);
    }
}