import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth-guards';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { tokenUser } from '../dto/tokenUser.dto';
import { RegisterResponseDto } from '../dto/register-response.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: tokenUser): Promise<RegisterResponseDto> {
    return this.authService.register(registerDto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getProfile(@CurrentUser() user: any) {
    return user;
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
