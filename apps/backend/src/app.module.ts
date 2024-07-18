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
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow('DB_HOST'),
        port: configService.getOrThrow('DB_PORT'),
        username: configService.getOrThrow('DB_USERNAME'),
        password: configService.getOrThrow('DB_PASSWORD'),
        database: configService.getOrThrow('DB_DATABASE'),
        entities: [User, Folder, File],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User, Folder, File]),
    AuthModule,
  ],
  controllers: [UserController, FolderController, FileController],
  providers: [UserService, FolderService, FileService],
})
export class AppModule {}
