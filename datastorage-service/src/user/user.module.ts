import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UserRepository } from './user.repository';

@Module({
  exports: [UserRepository],
  imports: [DatabaseModule],
  providers: [UserRepository],
})
export class UserModule {}
