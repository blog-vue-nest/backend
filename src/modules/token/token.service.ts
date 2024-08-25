import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RequestOptions } from 'https';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateJwtToken(user) {
    const payload = { user };
    return this.jwtService.sign(payload, {
      secret: this.configService.get('secret_jwt'),
      expiresIn: this.configService.get('expire_jwt'),
    });
  }

  async decodeJwtToken(request: RequestOptions) {
    try {
      const authHeader = request.headers.authorization;
      const token = authHeader.split(' ')[1];

      return this.jwtService.decode(token);
    } catch (error) {
      throw new Error('Token verification failed');
    }
  }
}
