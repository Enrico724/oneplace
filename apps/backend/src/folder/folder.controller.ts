import { Controller, Get, Post, Param, Delete, Body, UseGuards, Req, Logger } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
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
  @ApiResponse({ status: 200, description: 'Get root folder', type: Folder })
  @Get('/home')
  getRootFolder(@Req() req): Promise<Folder> {
    return this.folderService.findRootFolder(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: 200, description: 'Get Folder', type: Folder })
  @Get(':id')
  getFolder(
    @Req() req,
    @Param('id') id: string,
  ): Promise<Folder> {
    return this.folderService.findFolder(req.user, id);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBody({ type: CreateFolderDto })
  @ApiResponse({ status: 201, description: 'Create folder', type: Folder })
  @Post()
  createFolder(@Req() req, @Body() createFolderDto: CreateFolderDto) {
    return this.folderService.create(req.user, createFolderDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: 200, description: 'Delete folder' })
  @Delete(':id')
  deleteFolder(@Req() req, @Param('id') id: string) {
    return this.folderService.remove(req.user, id);
  }
}
