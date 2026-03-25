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
import { UserService } from './user.service';
import { CreateuserDTO } from './domain/dto/createUser.dto';
import { UpdateUserDto } from './domain/dto/updateUser.dto';
import { LoggingInterceptor } from '../../shared/inteceptors/logging.interceptors';
import { ParamId } from '../../shared/decorators/paramId.decorator';
import { AuthGuard } from '../../shared/guards/auth.guard';
import { User } from '../../shared/decorators/user.decorators';
import { Role, type User as UserType } from '@prisma/client';
import { Roles } from '../../shared/decorators/roles.decorators';
import { RoleGuard } from '../../shared/guards/role.guard';
import { UserMatchGuard } from '../../shared/guards/user.match.guard';
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
