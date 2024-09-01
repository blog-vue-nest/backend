import { Injectable } from '@nestjs/common';
import { CreateUserDTO, UpdateUserDTO } from './dto';
import { User } from './models/user.model';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { AppError } from 'src/common/constants/errors';
import {
  PaginationOptionsDTO,
  PaginationResultDTO,
} from 'src/common/pagination/dto';
import { PaginationService } from 'src/common/pagination/pagination.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
    private readonly paginationService: PaginationService,
  ) {}

  async findUserByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email: email },
    });
  }

  async findUserById(id: number) {
    try {
      return this.userRepository.findByPk(id);
    } catch (error: any) {
      throw new Error(error);
    }
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

  async getUsers(
    paginationOptions: PaginationOptionsDTO,
  ): Promise<PaginationResultDTO<User>> {
    try {
      const users = await this.userRepository.findAll();

      return this.paginationService.paginate<User>(users, paginationOptions);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async updateUser(
    idUser: number,
    dto: UpdateUserDTO,
  ): Promise<{ status: number; message?: string }> {
    const validationEmail = await this.findUserByEmail(dto.email);
    if (validationEmail) {
      return { status: -1, message: AppError.emailUsed };
    }
    try {
      await this.userRepository.update(dto, {
        where: { id: idUser },
      });
      return { status: 1 };
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async deleteUser(userId: number): Promise<{ status: number }> {
    try {
      await this.userRepository.destroy({
        where: { id: userId },
      });
      return { status: 1 };
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
