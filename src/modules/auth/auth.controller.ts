import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from '../users/dto';
import { UserLoginDTO } from './dto';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { RequestOptions } from 'https';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: CreateUserDTO) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: UserLoginDTO) {
    return this.authService.loginUser(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('check-user')
  async getUser(@Req() req: RequestOptions) {
    return this.authService.getUser(req);
  }
}
