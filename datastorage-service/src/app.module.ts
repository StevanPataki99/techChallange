import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { RedisClientOptions } from 'redis';

import * as redisStore from 'cache-manager-redis-store';
import { load } from './config/configuration';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import cacheConfig from './config/cache.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load,
    }),
    CacheModule.register<RedisClientOptions<any, any>>({
      store: redisStore,
      isGlobal: true,
      ...cacheConfig,
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
