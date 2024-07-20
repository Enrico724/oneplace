import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';
import * as JSZip from 'jszip';

import { FolderInfoDTO, CreateFolderDto } from 'src/dto';
import { ShareService } from './share.service';
import { Folder, User } from 'src/entities';
import { FolderUtils } from 'src/utils';


@Injectable()
export class FolderService {
  constructor(
    @InjectRepository(Folder)
    public readonly repository: TreeRepository<Folder>,
    @Inject(ShareService)
    private readonly shareService: ShareService,
  ) {}
  
  async download(user: User, id: string): Promise<{ filename: string, buffer: Buffer}> {
    const folder = await this.repository.findOneOrFail({ where: { owner: user, id } });
    const content = await this.repository.findDescendantsTree(folder, { relations: ['files'] });
    const zip = new JSZip()
    FolderUtils.createZipFolder(zip, content);
    const buffer = await zip.generateAsync({ type: 'nodebuffer' });
    const filename = `${folder.name}.zip`;
    return { filename, buffer };
  }

  async findFolder(user: User, id: string): Promise<FolderInfoDTO> {
    const folder = await this.repository.findOneOrFail({
      where: { owner: user, id },
      relations: {
        files: true, 
        subfolders: { share: { permissions: { user: true } } },
        parent: { share: true }
      },
    });

    const share = await this.shareService.getShareInfo(user, folder.id);
    return { ...folder, share };
  }

  findRootFolder(user: User): Promise<Folder> {
    return this.repository.findOneOrFail({
      where: { owner: user, name: 'root' },
      relations: { files: true, subfolders: true },
    });
  }

  findByUUID(user: User, id: string): Promise<Folder> {
    return this.repository.findOneOrFail({
      where: { owner: user, id },
      relations: { files: true, subfolders: true },
    });
  }

  async create(user: User, createFolderDto: CreateFolderDto): Promise<Folder> {
    const { parentFolderId, name } = createFolderDto;
    const folder = this.repository.create({ owner: user, name, parent: { id: parentFolderId } });
    return await this.repository.save(folder);
  }

  async remove(user: User, id: string): Promise<void> {
    const folder = await this.repository.findOne({ where: { id, owner: user } });
    if (folder == null) throw new Error('Folder not found or access denied');
    if (folder.parent === null) throw new Error('Cannot delete root folder');
    await this.repository.delete(folder);
  }
}
