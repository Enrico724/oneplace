import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Folder } from './folder.entity';
import { CreateFolderDto } from './dto/create-folder.dto';
import { User } from '../user/user.entity';

@Injectable()
export class FolderService {
  constructor(
    @InjectRepository(Folder)
    private readonly folderRepository: Repository<Folder>
  ) {}

  async findAll(user: User) {
    return this.folderRepository.find({ where: { user } });
  }

  async create(user: User, createFolderDto: CreateFolderDto) {
    const folder = this.folderRepository.create({ ...createFolderDto, user });
    return this.folderRepository.save(folder);
  }

  async remove(user: User, id: string) {
    const folder = await this.folderRepository.findOne({ where: { id, user } });
    if (folder) {
      return this.folderRepository.remove(folder);
    }
    throw new Error('Folder not found or access denied');
  }
}
