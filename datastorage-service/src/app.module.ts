import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { load } from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
