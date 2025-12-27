import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service.js';
import { CreateuserDTO } from './domain/dto/createUser.dto.js';
import { UpdateUserDto } from './domain/dto/updateUser.dto.js';
import { LoggingInterceptor } from '../../shared/inteceptors/logging.interceptors.js';
import { ParamId } from '../../shared/decorators/paramId.decorator.js';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(LoggingInterceptor)
  @Get()
  list() {
    return this.userService.list();
  }

  @Get(':id')
  show(@ParamId() id: number) {
    return this.userService.show(id);
  }

  @Post()
  createUser(@Body() body: CreateuserDTO) {
    return this.userService.createUser(body);
  }

  @Patch(':id')
  updateUser(@ParamId() id: number, @Body() body: UpdateUserDto) {
    return this.userService.updateUser(id, body);
  }

  @Delete(':id')
  deleteUser(@ParamId() id: number) {
    return this.userService.deleteUser(id);
  }
}
