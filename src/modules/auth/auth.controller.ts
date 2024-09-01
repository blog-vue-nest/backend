import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from '../users/dto';
import { UserLoginDTO } from './dto';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { RequestOptions } from 'https';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiTags('auth')
  @Post('register')
  register(@Body() dto: CreateUserDTO) {
    return this.authService.register(dto);
  }

  @ApiTags('auth')
  @Post('login')
  login(@Body() dto: UserLoginDTO) {
    return this.authService.loginUser(dto);
  }

  @ApiTags('auth')
  @UseGuards(JwtAuthGuard)
  @Get('check-user')
  async getUser(@Req() req: RequestOptions) {
    return this.authService.getUser(req);
  }
}
