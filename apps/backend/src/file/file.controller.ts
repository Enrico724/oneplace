import { Controller, Get, Post, Param, Delete, Body, UseGuards, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';

@ApiBearerAuth()
@ApiTags('files')
@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @UseGuards(AuthGuard)
  @Get()
  getAllFiles(@Req() req) {
    return this.fileService.findAll(req.user);
  }

  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@Req() req, @UploadedFile() file: Express.Multer.File, @Body() createFileDto: CreateFileDto) {
    return this.fileService.upload(req.user, file, createFileDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteFile(@Req() req, @Param('id') id: string) {
    return this.fileService.remove(req.user, id);
  }
}
