import { Controller, Get, Post, Body, Req, UseGuards, Param } from '@nestjs/common';
import { ShareService } from './share.service';
import { InvitableUser } from './dto/invitable-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InvitedUser } from './dto/invited-user.dto';

@ApiBearerAuth()
@ApiTags('share')
@Controller('share')
export class ShareController {
    constructor(private readonly shareService: ShareService) {}

    @UseGuards(AuthGuard('jwt'))
    @ApiParam({ name: 'id', required: true })
    @ApiResponse({ status: 200, description: 'Get users or sharing', type: InvitableUser, isArray: true })
    @Get('/folders/:id/users/invitable')
    getInvitableUsersForSharing(
        @Req() req,
        @Param('id') folderId: string,
    ): Promise<InvitableUser[]> {
        return this.shareService.getUsersForSharing(req.user, folderId);
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiParam({ name: 'id', required: true })
    @ApiResponse({ status: 200, description: 'Get invited users', type: InvitedUser, isArray: true })
    @Post('/folders/:id/users/invited')
    getInvitedUsers(
        @Req() req,
        @Param('id') folderId: string,
    ): Promise<InvitedUser[]> {
        return this.shareService.getInvitedUsers(req.user, folderId);
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiResponse({ type: InvitedUser })
    @ApiParam({ name: 'folderId', required: true })
    @ApiParam({ name: 'userId', required: true })
    @Post('/folders/:folderId/invite/:userId')
    inviteUser(
        @Req() req,
        @Param('folderId') folderId: string,
        @Param('userId') userId: string,
    ): Promise<InvitedUser> {
        return this.shareService.inviteUser(req.user, folderId, userId);
    }
}
