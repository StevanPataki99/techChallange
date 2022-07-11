import { registerAs } from '@nestjs/config';
import appConfig from './app.config';
import authConfig from './auth.config';
import cacheConfig from './cache.config';

export const load = [
  registerAs('app', () => appConfig),
  registerAs('auth', () => authConfig),
  registerAs('cache', () => cacheConfig),
];
