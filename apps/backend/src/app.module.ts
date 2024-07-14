import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { Folder } from './folder/folder.entity';
import { File } from './file/file.entity';
import { UserController } from './user/user.controller';
import { FolderController } from './folder/folder.controller';
import { FileController } from './file/file.controller';
import { UserService } from './user/user.service';
import { FolderService } from './folder/folder.service';
import { FileService } from './file/file.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'test',
      entities: [User, Folder, File],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Folder, File]),
  ],
  controllers: [UserController, FolderController, FileController],
  providers: [UserService, FolderService, FileService],
})
export class AppModule {}
