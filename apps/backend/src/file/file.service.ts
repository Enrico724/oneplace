import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './file.entity';
import { CreateFileDto } from './dto/create-file.dto';
import { User } from '../user/user.entity';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>
  ) {}

  async findAll(user: User) {
    return this.fileRepository.find({ where: { user } });
  }

  async upload(user: User, file: Express.Multer.File, createFileDto: CreateFileDto) {
    const fileRecord = this.fileRepository.create({
      ...createFileDto,
      user,
      path: file.path
    });
    return this.fileRepository.save(fileRecord);
  }

  async remove(user: User, id: string) {
    const file = await this.fileRepository.findOne({ where: { id, user } });
    if (file) {
      return this.fileRepository.remove(file);
    }
    throw new Error('File not found or access denied');
  }
}
