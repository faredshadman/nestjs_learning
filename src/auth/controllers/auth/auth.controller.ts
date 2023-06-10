import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  @UseGuards(AuthGuard('LOCAL_STRATEGY'))
  @Post('login')
  validate(@Request() req) {}
}
