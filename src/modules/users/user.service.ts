import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(body: any): Promise<User> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return await this.prisma.user.create({ data: body });
  }
  async list() {
    return await this.prisma.user.findMany();
  }

  async show(id: string) {
    const user = await this.isIdExists(id);
    return user;
  }

  async updateUser(id: string, body: any) {
    await this.isIdExists(id);
    return await this.prisma.user.update({
      where: { id: Number(id) },
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      data: body,
    });
  }

  async deleteUser(id: string) {
    await this.isIdExists(id);
    return await this.prisma.user.delete({ where: { id: Number(id) } });
  }

  private async isIdExists(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: Number(id) },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }
}
