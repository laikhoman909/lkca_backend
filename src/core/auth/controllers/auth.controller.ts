import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from 'src/features/users/dto/login.dto';
import { RegisterDto } from 'src/features/users/dto/register.dto';
import { EncryptedRegisterDto } from '../dto/encrypted-register.dto';
import { EncryptedLoginDto } from '../dto/encrypted-login.dto';
import { EncryptionService } from '../encryption.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly encryptionService: EncryptionService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDTO: LoginDto) {
    const user = await this.authService.validateUser(loginDTO.email, loginDTO.password);
    if (user instanceof UnauthorizedException) {
      throw user;
    }

    console.log(user.id);
    return this.authService.login({ id: user.id, email: user.email, role: user.role });
  }

  /**
   * Get public key for password encryption
   * Client should encrypt password with this key before sending to login/register
   */
  @Get('public-key')
  getPublicKey() {
    return {
      publicKey: this.encryptionService.getPublicKey(),
      algorithm: 'RSA-OAEP-256',
      keySize: 2048,
      usage: 'Use this public key to encrypt password before sending to /auth/login-encrypted or /auth/register-encrypted',
    };
  }
  
  @Post('register-encrypted')
  @HttpCode(HttpStatus.CREATED)
  async registerEncrypted(@Body() encryptedRegisterDto: EncryptedRegisterDto) {
    return await this.authService.registerEncrypted(encryptedRegisterDto);
  }

  @Post('login-encrypted')
  @HttpCode(HttpStatus.OK)
  async loginEncrypted(@Body() encryptedLoginDto: EncryptedLoginDto) {
    return await this.authService.loginEncrypted(encryptedLoginDto);
  }

  @Post('refresh')
  async refresh(@Body('refreshToken') refreshToken: string) {
    const payload = this.authService.verifyToken(refreshToken);

    if (payload instanceof UnauthorizedException) {
      throw payload;
    }

    const user = await this.authService.findUserById(payload.sub);

    if (user instanceof UnauthorizedException) {
      throw user;
    }
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return this.authService.login({ id: user.id, email: user.email, role: user.role });
  }
}
