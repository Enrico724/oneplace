import { Controller, Get, Post, Param, Delete, Body, UseGuards, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FolderService } from './folder.service';
import { CreateFolderDto } from './dto/create-folder.dto';
import { AuthGuard } from '@nestjs/passport';
import { Folder } from './folder.entity';

@ApiBearerAuth()
@ApiTags('folders')
@Controller('folders')
export class FolderController {
  constructor(private readonly folderService: FolderService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: 200, description: 'Get all folders', type: Folder, isArray: true })
  @Get()
  getAllFolders(@Req() req): Promise<Folder[]> {
    return this.folderService.findAll(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  createFolder(@Req() req, @Body() createFolderDto: CreateFolderDto) {
    return this.folderService.create(req.user, createFolderDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  deleteFolder(@Req() req, @Param('id') id: string) {
    return this.folderService.remove(req.user, id);
  }
}
