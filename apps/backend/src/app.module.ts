import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user/user.controller';
import { FolderController } from './folder/folder.controller';
import { FileController } from './file/file.controller';
import { UserService } from './user/user.service';
import { FolderService } from './folder/folder.service';
import { FileService } from './file/file.service';
import { User } from './user/user.entity';
import { Folder } from './folder/folder.entity';
import { File } from './file/file.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'test',
      password: 'test',
      database: 'oneplacedb',
      entities: [User, Folder, File],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Folder, File]),
    AuthModule,
  ],
  controllers: [UserController, FolderController, FileController],
  providers: [UserService, FolderService, FileService],
})
export class AppModule {}
