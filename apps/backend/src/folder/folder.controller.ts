import { Controller, Get, Post, Param, Delete, Body, UseGuards, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FolderService } from './folder.service';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { CreateFolderDto } from './dto/create-folder.dto';

@ApiBearerAuth()
@ApiTags('folders')
@Controller('folders')
export class FolderController {
  constructor(private readonly folderService: FolderService) {}

  @UseGuards(JwtStrategy)
  @Get()
  getAllFolders(@Req() req) {
    return this.folderService.findAll(req.user);
  }

  @UseGuards(JwtStrategy)
  @Post()
  createFolder(@Req() req, @Body() createFolderDto: CreateFolderDto) {
    return this.folderService.create(req.user, createFolderDto);
  }

  @UseGuards(JwtStrategy)
  @Delete(':id')
  deleteFolder(@Req() req, @Param('id') id: string) {
    return this.folderService.remove(req.user, id);
  }
}
