import { forwardRef, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";

import { User, File, Folder, FileUserPermission, FolderUserPermission, SharedFolder, SharedFile } from "./entities";
import { ShareService, AuthService, FileService, UserService, FolderService } from "./service";
import { FolderController, FileController, ShareController, UserController } from "./controller";
import { JwtStrategy } from "./strategy";

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
        entities: [User, Folder, File, FileUserPermission, FolderUserPermission, SharedFolder, SharedFile],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([
      User,
      Folder,
      File,
      FileUserPermission,
      FolderUserPermission,
      SharedFolder,
      SharedFile,
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),

  ],
  providers: [
    UserService,
    JwtStrategy,
    AuthService,
    FileService,
    FolderService,
    ShareService,
  ],
  controllers: [
    FolderController,
    FileController,
    ShareController,
    UserController
  ],
})
export class AppModule {}
