import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto';
import { User } from './models/user.model';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { AppError } from 'src/common/constants/errors';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
  ) {}

  async findUserByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email: email },
    });
  }

  async findUserById(id: number) {
    return this.userRepository.findByPk(id);
  }

  async createUser(
    dto: CreateUserDTO,
  ): Promise<{ status: number; message?: string }> {
    const validationEmail = await this.findUserByEmail(dto.email);
    if (validationEmail) {
      return { status: -1, message: AppError.emailUsed };
    }
    dto.password = await bcrypt.hash(dto.password, 10);

    try {
      await this.userRepository.create({
        name: dto.name,
        password: dto.password,
        email: dto.email,
      });
      return { status: 1 };
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
