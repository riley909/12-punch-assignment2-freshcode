import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('로그인 API')
@Controller()
export class AppController { }
