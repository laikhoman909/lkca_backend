/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/core/db/prisma.service';
import { EncryptionService } from '../encryption.service';
import { EncryptedRegisterDto } from '../dto/encrypted-register.dto';
import { EncryptedLoginDto } from '../dto/encrypted-login.dto';
import { UserRole } from 'generated/prisma/enums';
import { ConfigService } from '@nestjs/config';
import { EncryptionUtils } from '../encryption.utils';
import { Role } from 'src/common/types/enums/role.enum';
import { AuthResponseDto } from '../dto/auth-response.dto';
import { UserPayload } from 'src/common/types/interface/user-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async register(registerDto: EncryptedRegisterDto): Promise<AuthResponseDto> {
    // Check if user already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email: registerDto.email },
    });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Generate unique public key for this user
    const publicKey = EncryptionUtils.generatePublicKey();

    // Hash password with user's unique public key
    const hashedPassword = EncryptionUtils.hashPassword(
      registerDto.encryptedPassword,
      publicKey,
    );

    // Create user
    const user = await this.prisma.user.create({
      data: {
        email: registerDto.email,
        password: hashedPassword,
        publicKey: publicKey,
        role: 'USER',
      },
    });

    // Generate JWT token
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      role: user.role as Role,
      publicKey: user.publicKey,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      tokenType: 'Bearer',
      expiresIn: process.env.JWT_EXPIRATION || '24h',
      user: {
        id: user.id,
        email: user.email,
        role: user.role as Role,
        publicKey: user.publicKey,
      },
    };
  }

  async login(loginDto: EncryptedLoginDto): Promise<AuthResponseDto> {
    // Find user by email
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verify password using user's unique public key
    const isValidPassword = EncryptionUtils.verifyPassword(
      loginDto.encryptedPassword,
      user.password,
      user.publicKey,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT token
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      role: user.role as Role,
      publicKey: user.publicKey,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      tokenType: 'Bearer',
      expiresIn: process.env.JWT_EXPIRATION || '24h',
      user: {
        id: user.id,
        email: user.email,
        role: user.role as Role,
        publicKey: user.publicKey,
      },
    };
  }

  async validateUser(userId: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    return user;
  }

  async getPublicKey(userId: string): Promise<string> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    return user?.publicKey || '';
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

  findUserById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }
}
