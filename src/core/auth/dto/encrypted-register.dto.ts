
import { IsEmail, IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { UserRole } from 'generated/prisma/enums';


export class EncryptedRegisterDto {
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Encrypted password is required' })
  encryptedPassword: string;

  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}
