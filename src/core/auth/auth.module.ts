
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { DbModule } from '../db/db.module';
import { EncryptionService } from './encryption.service';
import { UsersService } from 'src/features/users/services/users.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule, // Required for JWT authentication
    JwtModule.register({
      secret: 'JWTSECRE',
      signOptions: { expiresIn: '1h' },
    }),
    DbModule
  ],
  providers: [AuthService, UsersService, EncryptionService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService, UsersService, EncryptionService],
})
export class AuthModule {}
