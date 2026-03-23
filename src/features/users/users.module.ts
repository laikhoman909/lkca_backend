
import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { DbModule } from 'src/core/db/db.module';

@Module({
  imports: [DbModule],
  providers: [UsersService],
  // exports: [UsersService],
})
export class UsersModule {}
