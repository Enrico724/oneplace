import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, TreeRepository } from 'typeorm';
import { Folder } from './folder.entity';
import { CreateFolderDto } from './dto/create-folder.dto';
import { User } from '../user/user.entity';
import * as JSZip from 'jszip';
import { FolderUtils } from './folder.utils';
import { write, writeFileSync } from 'fs';

@Injectable()
export class FolderService {
  constructor(
    @InjectRepository(Folder)
    public readonly repository: TreeRepository<Folder>
  ) {}
  
  async download(user: User, id: string): Promise<{ filename: string, buffer: Buffer}> {
    const folder = await this.findFolder(user, id);
    const content = await this.repository.findDescendantsTree(folder, { relations: ['files'] });
    const zip = new JSZip()
    FolderUtils.createZipFolder(zip, content);
    const buffer = await zip.generateAsync({ type: 'nodebuffer' });
    const filename = `${folder.name}.zip`;
    return { filename, buffer };
  }

  findFolder(user: User, id: string): Promise<Folder> {
    return this.repository.findOneOrFail({
      where: { owner: user, id },
      relations: { files: true, subfolders: true },
    });
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
