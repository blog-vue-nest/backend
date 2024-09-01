import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { UsersService } from './users.service';
import { CreateUserDTO, UpdateUserDTO } from './dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiTags('users')
  @UseGuards(JwtAuthGuard)
  @Delete('delete-user/:id')
  deleteUser(@Param('id') userId: number) {
    return this.userService.deleteUser(userId);
  }

  @ApiTags('users')
  @UseGuards(JwtAuthGuard)
  @Get('get-user/:id')
  getUser(@Param('id') userId: number) {
    return this.userService.findUserById(userId);
  }

  @ApiTags('users')
  @UseGuards(JwtAuthGuard)
  @Post('update-user/:id')
  updateUser(@Param('id') id: number, @Body() createUserDto: UpdateUserDTO) {
    return this.userService.updateUser(id, createUserDto);
  }

  @ApiTags('users')
  @UseGuards(JwtAuthGuard)
  @Post('create-user')
  createUser(@Body() createUserDto: CreateUserDTO) {
    return this.userService.createUser(createUserDto);
  }

  @ApiTags('users')
  @UseGuards(JwtAuthGuard)
  @Get('get-all')
  getUsers(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return this.userService.getUsers({ page, limit });
  }
}
