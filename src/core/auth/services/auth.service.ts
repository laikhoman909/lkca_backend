/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/core/db/prisma.service';
import { UserRole } from 'generated/prisma/enums';
import { ConfigService } from '@nestjs/config';
import { Role } from 'src/common/types/enums/role.enum';
import { tokenUser } from '../dto/tokenUser.dto';
import { RegisterResponseDto } from '../dto/register-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async register(registerDto: tokenUser): Promise<RegisterResponseDto> {
    // Check if user already exists
    var nip = registerDto.username;
    const existingUser = await this.prisma.user.findUnique({
      where: { nip },
    });
    if (existingUser) {
      throw new ConflictException('User with this nip already exists');
    }

    // Create user
    const user = await this.prisma.user.create({
      data: {
        nip: registerDto.username,
        fullName: registerDto.nama,
        role: 'USER',
      },
    });

    return {
      nip: user.nip,
      fullname: user.fullName,
      role: user.role as Role,
    };
  }

  async validateUser(userId: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { nip: userId },
    });
    return user;
  }

  /**
   * Generate JWT token for authenticated user
   */
  private async generateToken(user: any) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };
    const token = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.configService.get('JWT_EXPIRATION'),
    });

    return {
      access_token: token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role as UserRole,
      },
    };
  }

  verifyToken(token: string) {
    try {
      return this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }

}
