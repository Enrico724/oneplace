import { Controller, Get, Post, Body, Req, UseGuards, Param } from '@nestjs/common';
import { ShareService } from './share.service';
import { InvitableUser } from './dto/invitable-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('share')
@Controller('share')
export class ShareController {
    constructor(private readonly shareService: ShareService) {}

    @UseGuards(AuthGuard('jwt'))
    @ApiParam({ name: 'id', required: true })
    @ApiResponse({ status: 200, description: 'Get users or sharing', type: InvitableUser, isArray: true })
    @Get('/folders/:id/users/invitable')
    getUsersForSharing(
        @Req() req,
        @Param('id') folderId: string,
    ): Promise<InvitableUser[]> {
        return this.shareService.getUsersForSharing(req.user, folderId);
    }

    
}
