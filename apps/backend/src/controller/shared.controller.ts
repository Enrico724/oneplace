import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { SharedFolder } from 'src/entities';
import { SharedService } from 'src/service';

/**
 * Controller for accessing shared resources
 */
@ApiTags('shared')
@Controller('shared')
export class SharedController {
    constructor(
        private readonly sharedService: SharedService,
    ) {}

    @UseGuards(AuthGuard('jwt'))
    @ApiResponse({ status: 200, description: 'Get shared folders', type: SharedFolder, isArray: true })
    @Get()
    getSharedFolder(@Req() req): Promise<SharedFolder[]> {
        return this.sharedService.getSharedFolders(req.user);
    }
}