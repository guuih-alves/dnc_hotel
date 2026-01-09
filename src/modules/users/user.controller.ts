import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service.js';
import { CreateuserDTO } from './domain/dto/createUser.dto.js';
import { UpdateUserDto } from './domain/dto/updateUser.dto.js';
import { LoggingInterceptor } from '../../shared/inteceptors/logging.interceptors.js';
import { ParamId } from '../../shared/decorators/paramId.decorator.js';
import { AuthGuard } from '../../shared/guards/auth.guard.js';
import { User } from '../../shared/decorators/user.decorators.js';
import { Role, type User as UserType } from '@prisma/client';
import { Roles } from '../../shared/decorators/roles.decorators.js';
import { RoleGuard } from '../../shared/guards/role.guard.js';
import { UserMatchGuard } from '../../shared/guards/user.match.guard.js';
import { ThrottlerGuard } from '@nestjs/throttler';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(LoggingInterceptor)
  @UseGuards(AuthGuard, RoleGuard, ThrottlerGuard)
  @Get()
  list(@User() user: UserType) {
    console.log(user);
    return this.userService.list();
  }

  @Get(':id')
  show(@ParamId() id: number) {
    return this.userService.show(id);
  }

  @Roles(Role.ADMIN)
  @Post()
  createUser(@Body() body: CreateuserDTO) {
    return this.userService.createUser(body);
  }

  @UseGuards(AuthGuard, UserMatchGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Patch(':id')
  updateUser(@ParamId() id: number, @Body() body: UpdateUserDto) {
    return this.userService.updateUser(id, body);
  }

  @UseGuards(AuthGuard, UserMatchGuard)
  @Delete(':id')
  deleteUser(@ParamId() id: number) {
    return this.userService.deleteUser(id);
  }

  @UseInterceptors(FileInterceptor('avatar'))
  @Post('avatar')
  uploadAvatar(@UploadedFile() avatar: Express.Multer.File) {
    console.log(avatar);
    return true;
  }
}
