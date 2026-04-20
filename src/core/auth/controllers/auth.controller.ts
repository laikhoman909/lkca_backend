import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { EncryptedRegisterDto } from '../dto/encrypted-register.dto';
import { EncryptedLoginDto } from '../dto/encrypted-login.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth-guards';
import { AuthResponseDto } from '../dto/auth-response.dto';
import { CurrentUser } from 'src/common/decorators/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService) {}

  // @Post('register')
  // async register(@Body() registerDto: RegisterDto) {
  //   return this.authService.register(registerDto);
  // }

  // @Post('login')
  // async login(@Body() loginDTO: LoginDto) {
  //   const user = await this.authService.validateUser(loginDTO.email);
  //   if (user instanceof UnauthorizedException) {
  //     throw user;
  //   }

  //   console.log(user.id);
  //   return this.authService.login({ id: user.id, email: user.email, role: user.role });
  // }

  /**
   * Get public key for password encryption
   * Client should encrypt password with this key before sending to login/register
   */
  // @Get('public-key')
  // getPublicKey() {
  //   return {
  //     publicKey: this.encryptionService.getPublicKey(),
  //     algorithm: 'RSA-OAEP-256',
  //     keySize: 2048,
  //     usage: 'Use this public key to encrypt password before sending to /auth/login-encrypted or /auth/register-encrypted',
  //   };
  // }

  @Post('register')
  async register(@Body() registerDto: EncryptedRegisterDto): Promise<AuthResponseDto> {
    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: EncryptedLoginDto): Promise<AuthResponseDto> {
    return this.authService.login(loginDto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getProfile(@CurrentUser() user: any) {
    return user;
  }

  @Get('public-key')
  @UseGuards(JwtAuthGuard)
  async getPublicKey(@CurrentUser('sub') userId: string) {
    const publicKey = await this.authService.getPublicKey(userId);
    return { publicKey };
  }

  // @Post('refresh')
  // async refresh(@Body('refreshToken') refreshToken: string) {
  //   const payload = this.authService.verifyToken(refreshToken);

  //   if (payload instanceof UnauthorizedException) {
  //     throw payload;
  //   }

  //   const user = await this.authService.findUserById(payload.sub);

  //   if (user instanceof UnauthorizedException) {
  //     throw user;
  //   }
  //   if (!user) {
  //     throw new UnauthorizedException('User not found');
  //   }

  //   return this.authService.login({ encryptedLoginDto: user.id });
  // }
}
