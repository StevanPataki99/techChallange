import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { UserLoginInput } from './dto/user-login.input';
import { UserRegisterInput } from './dto/user-register.input';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @HttpCode(200)
  @Post('login')
  async login(@Body() userLoginData: UserLoginInput) {
    try {
      return this.authService.login(userLoginData);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  @HttpCode(201)
  @Post('register')
  async register(
    @Body() userData: UserRegisterInput,
    @Res({ passthrough: true }) response: Response,
  ) {
    try {
      const user = await this.authService.register(userData);
      const token = this.authService.generateJwtToken(user);
      const refreshToken = await this.authService.generateRefreshToken(
        user.id,
        user.email,
      );

      this.setRefreshCookie(response, refreshToken);

      return { user, token };
    } catch (error) {
      throw new BadRequestException();
    }
  }

  private setRefreshCookie(response: Response, refreshToken: string) {
    const cookieName = this.configService.get<string>('auth.refreshCookieName');

    response.cookie(cookieName, refreshToken, {
      httpOnly: true,
      secure: true,
    });
  }
}
