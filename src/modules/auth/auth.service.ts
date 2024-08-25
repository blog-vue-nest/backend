import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from '../users/dto';
import { UsersService } from '../users/users.service';
import { UserLoginDTO } from './dto';
import * as bcrypt from 'bcrypt';
import { AppError } from 'src/common/constants/errors';
import { TokenService } from '../token/token.service';
import { RequestOptions } from 'https';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly tokenService: TokenService,
    private readonly usersService: UsersService,
  ) {}

  async register(
    dto: CreateUserDTO,
  ): Promise<{ status: number; message?: string }> {
    return this.userService.createUser(dto);
  }

  async loginUser(dto: UserLoginDTO) {
    const existUser = await this.userService.findUserByEmail(dto.email);

    if (!existUser) {
      return { status: 0, message: AppError.userNotFound };
    }

    const validatePassword = await bcrypt.compare(
      dto.password,
      existUser.dataValues.password,
    );

    if (!validatePassword) {
      return { status: -1, message: AppError.wrongData };
    }

    const token = await this.tokenService.generateJwtToken(existUser);

    return { status: 1, token };
  }

  async getUser(request: RequestOptions) {
    try {
      const decoded = await this.tokenService.decodeJwtToken(request);
      const user = await this.usersService.findUserById(decoded.user.id);

      return user;
    } catch (error) {
      throw new Error(AppError.invalidToken);
    }
  }
}
