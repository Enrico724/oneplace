import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtStrategy)
  @Get('profile')
  getProfile(@Req() req) {
    return this.userService.getProfile(req.user);
  }
}
