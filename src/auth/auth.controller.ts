import { UsersService } from 'src/users/users.service';
import { Controller, Get, Post, UseGuards, Request, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req);
  }

  // @Post('logout')
  // async logout(@Res({ passthrough: true }) res: Response) {
  //   const {token, ...option} = await this.authService.logout();
  //   res.cookie("Authentication", token, option)
  // }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req) {
    // console.log('aurhController', req)
    return req.user;
  }
}
