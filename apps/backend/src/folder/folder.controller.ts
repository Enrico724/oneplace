import { Controller, Get, Post, Param, Delete, Body, UseGuards, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { FolderService } from './folder.service';
import { CreateFolderDto } from './dto/create-folder.dto';

@ApiBearerAuth()
@ApiTags('folders')
@Controller('folders')
export class FolderController {
  constructor(private readonly folderService: FolderService) {}

  @UseGuards(AuthGuard)
  @Get()
  getAllFolders(@Req() req) {
    return this.folderService.findAll(req.user);
  }

  @UseGuards(AuthGuard)
  @Post()
  createFolder(@Req() req, @Body() createFolderDto: CreateFolderDto) {
    return this.folderService.create(req.user, createFolderDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteFolder(@Req() req, @Param('id') id: string) {
    return this.folderService.remove(req.user, id);
  }
}
