import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as CacheManager from 'cache-manager';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: CacheManager.Cache,
    configService: ConfigService,
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: (req) => {
        const key = configService.get<string>('auth.refreshCookieName');
        return req?.cookies?.[key];
      },
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('auth.jwtSecret'),
    });
  }

  async validate(payload: any) {
    if (
      (await this.cacheManager.get(`refresh_${payload.nonce}`)) !== payload.sub
    ) {
      // Could not validate that the token was actually created by us (or the TTL was expired)
      throw new UnauthorizedException('Invalid refresh token');
    }

    if (!(await this.userRepository.user({ email: payload.email }))) {
      throw new UnauthorizedException('User has been deleted');
    }

    // Refresh token should only be used once
    await this.cacheManager.del(`refresh_${payload.nonce}`);

    return { id: payload.sub, email: payload.email };
  }
}
