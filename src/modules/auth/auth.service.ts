import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role, User } from '@prisma/client';
import { AuthLoginDTO } from './domain/dto/authLogin.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import * as bcrypt from 'bcrypt';
import { UserService } from '../users/user.service.js';
import { AuthRegisterDTO } from './domain/dto/authRegister.dto.js';
import { CreateuserDTO } from '../users/domain/dto/createUser.dto.js';
import { AuthResetPasswordDTO } from './domain/dto/authResetPassword.dto.js';
import { ValidateTokenDTO } from './domain/dto/validateToken.dto.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  generateJwtToken(user: User, expiresIn: string = '1d') {
    const payload = { sub: user.id, name: user.name };
    const options = {
      expiresIn: 60 * 60,
      issuer: 'dnc_hotel',
      audience: 'users',
    };

    return { access_token: this.jwtService.sign(payload, options) };
  }

  async login({ email, password }: AuthLoginDTO) {
    const user = await this.userService.findByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Email or password invalid');
    }
    return this.generateJwtToken(user);
  }

  async register(body: AuthRegisterDTO) {
    const newUser: CreateuserDTO = {
      email: body.email ?? '',
      name: body.name ?? '',
      password: body.password ?? '',
      role: body.role ?? Role.USER,
    };
    const user = await this.userService.createUser(newUser);
    return this.generateJwtToken(user);
  }

  async resetPassword({ token, password }: AuthResetPasswordDTO) {
    const { valid, decoded } = await this.validateToken(token);

    if (!valid || !decoded) throw new UnauthorizedException('Invalid token');

    const user = await this.userService.updateUser(Number(decoded.sub), {
      password,
    });

    return this.generateJwtToken(user);
  }

  private async validateToken(token: string): Promise<ValidateTokenDTO> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const decoded = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
        audience: 'users',
        issuer: 'dnc_hotel',
      });
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      return { valid: true, decoded };
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      return { valid: false, message: error.message };
    }
  }

  async forgot(email: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Email not found');
    }

    const token = this.generateJwtToken(user, '30m');
    return token;
  }
}
