import { Controller, Get, Post, Delete, Req, Param, Body, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FileService } from './file.service';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { CreateFileDto } from './dto/create-file.dto';


@ApiBearerAuth()
@ApiTags('files')
@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @UseGuards(JwtStrategy)
  @Get()
  getAllFiles(@Req() req) {
    return this.fileService.findAll(req.user);
  }

  @UseGuards(JwtStrategy)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@Req() req, @UploadedFile() file: Express.Multer.File, @Body() createFileDto: CreateFileDto) {
    return this.fileService.upload(req.user, file, createFileDto);
  }

  @UseGuards(JwtStrategy)
  @Delete(':id')
  deleteFile(@Req() req, @Param('id') id: string) {
    return this.fileService.remove(req.user, id);
  }
}
