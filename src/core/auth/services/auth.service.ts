/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/core/db/prisma.service';
import { RegisterDto } from 'src/features/users/dto/register.dto';
import { EncryptionService } from '../encryption.service';
import { EncryptedRegisterDto } from '../dto/encrypted-register.dto';
import { EncryptedLoginDto } from '../dto/encrypted-login.dto';
import { UsersService } from 'src/features/users/services/users.service';
import { UserRole } from 'generated/prisma/enums';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly usersService: UsersService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly encryptionService: EncryptionService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password, role } = registerDto;

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role,
      },
    });
    const { password: _, ...result } = user;
    return result;
  }

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return new UnauthorizedException('Invalid email or password');
    }

    const { password: _, ...result } = user;
    return result;
  }

  login(user: { id: string; email: string; role: string }) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '14d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  /**
   * Register with encrypted password
   * Password should be encrypted with the public key
   */
  async registerEncrypted(encryptedRegisterDto: EncryptedRegisterDto) {
    const { email, encryptedPassword, role } = encryptedRegisterDto;

    // Decrypt the password using private key
    let password: string;
    try {
      password = this.encryptionService.decryptPassword(encryptedPassword);
    } catch (error) {
      throw new BadRequestException('Invalid encrypted password');
    }

    // Create new user with hashed password
    const user = await this.usersService.create(email, password, role);

    // Generate JWT token
    return await this.generateToken(user);
  }

  async loginEncrypted(encryptedLoginDto: EncryptedLoginDto) {
    const { email, encryptedPassword } = encryptedLoginDto;

    // Decrypt the password using private key
    let password: string;
    try {
      password = this.encryptionService.decryptPassword(encryptedPassword);
    } catch (error) {
      throw new BadRequestException('Invalid encrypted password');
    }

    // Validate user credentials
    const user = await this.usersService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Generate JWT token
    return await this.generateToken(user);
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
