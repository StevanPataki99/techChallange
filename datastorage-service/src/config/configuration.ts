import { registerAs } from '@nestjs/config';
import appConfig from './app.config';

export const load = [registerAs('app', () => appConfig)];
