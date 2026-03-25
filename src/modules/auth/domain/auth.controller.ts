import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { AuthLoginDTO } from './dto/authLogin.dto';
import { AuthRegisterDTO } from './dto/authRegister.dto';
import { AuthResetPasswordDTO } from './dto/authResetPassword.dto';
import { AuthForgotPasswordDTO } from './dto/authForgotPassword.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() body: AuthLoginDTO) {
    return this.authService.login(body);
  }

  @Post('register')
  register(@Body() body: AuthRegisterDTO) {
    return this.authService.register(body);
  }

  @Patch('reset-password')
  async resetPassword(@Body() { token, password }: AuthResetPasswordDTO) {
    return this.authService.resetPassword({ token, password });
  }

  @Post('forgot-password')
  async forgotPassword(@Body() { email }: AuthForgotPasswordDTO) {
    return this.authService.forgot(email);
  }
}
