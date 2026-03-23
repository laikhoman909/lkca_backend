
import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class EncryptedLoginDto {
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Encrypted password is required' })
  encryptedPassword: string;
}
