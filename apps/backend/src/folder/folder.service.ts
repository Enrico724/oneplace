import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, TreeRepository } from 'typeorm';
import { Folder } from './folder.entity';
import { CreateFolderDto } from './dto/create-folder.dto';
import { User } from '../user/user.entity';

@Injectable()
export class FolderService {
  constructor(
    @InjectRepository(Folder)
    public readonly repository: TreeRepository<Folder>
  ) {}

  findRootFolder(user: User): Promise<Folder> {
    return this.repository.findOneOrFail({
      where: { owner: user, parent: null },
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
    const folder = this.repository.create({ ...createFolderDto, owner: user });
    return await this.repository.save(folder);
  }

  async remove(user: User, id: string): Promise<void> {
    const folder = await this.repository.findOne({ where: { id, owner: user } });
    if (folder == null) throw new Error('Folder not found or access denied');
    if (folder.parent === null) throw new Error('Cannot delete root folder');
    await this.repository.delete(folder);
  }
}
