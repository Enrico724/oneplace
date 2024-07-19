import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FolderController } from './folder/folder.controller';
import { FileController } from './file/file.controller';
import { UserService } from './user/user.service';
import { FolderService } from './folder/folder.service';
import { FileService } from './file/file.service';
import { User } from './user/user.entity';
import { Folder } from './folder/folder.entity';
import { File } from './file/file.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SharedFile, SharedFolder, UserPermission } from './share/share.entity';
import { AuthModule } from './auth/auth.module';
import { UserController } from './user/user.controller';
import { ShareController } from './share/share.controller';
import { ShareService } from './share/share.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.getOrThrow('DB_HOST'),
        port: configService.getOrThrow('DB_PORT'),
        username: configService.getOrThrow('DB_USERNAME'),
        password: configService.getOrThrow('DB_PASSWORD'),
        database: configService.getOrThrow('DB_DATABASE'),
        entities: [User, Folder, File, UserPermission, SharedFolder, SharedFile],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User, Folder, File, UserPermission, SharedFolder, SharedFile]),
    AuthModule,
  ],
  controllers: [UserController, FolderController, FileController, ShareController],
  providers: [UserService, FolderService, FileService, ShareService],
})
export class AppModule {}
