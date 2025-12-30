import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { User } from '@prisma/client';
import { CreateuserDTO } from './domain/dto/createUser.dto.js';
import { UpdateUserDto } from './domain/dto/updateUser.dto.js';
import * as bcrypt from 'bcrypt';
import { UserSelectFields } from '../prisma/utils/userSelectFields.js';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(body: CreateuserDTO): Promise<User> {
    body.password = await this.hashPassword(body.password);
    return await this.prisma.user.create({
      data: body,
      select: UserSelectFields,
    });
  }
  async list() {
    return await this.prisma.user.findMany({
      select: UserSelectFields,
    });
  }

  async show(id: number) {
    const user = await this.isIdExists(id);
    return user;
  }

  async updateUser(id: number, body: UpdateUserDto) {
    await this.isIdExists(id);

    if (body.password) {
      body.password = await this.hashPassword(body.password);
    }
    return await this.prisma.user.update({
      where: { id },
      data: body,
      select: UserSelectFields,
    });
  }

  async deleteUser(id: number) {
    await this.isIdExists(id);
    return await this.prisma.user.delete({ where: { id } });
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
      select: UserSelectFields,
    });
  }

  private async isIdExists(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: UserSelectFields,
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 8);
  }
}
