import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class AdminStrategy extends PassportStrategy(Strategy, 'admin') {
  constructor(
    private configService: ConfigService,
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('auth.jwtSecret'),
    });
  }
  async validate(payload: any) {
    const user = await this.userRepository.user({ email: payload.email });

    if (!user) {
      throw new UnauthorizedException('User has been deleted');
    }

    if (!user.admin) {
      throw new UnauthorizedException('User not on admin whitelist');
    }

    return { id: payload.sub, email: payload.email };
  }
}
