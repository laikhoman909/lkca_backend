import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class PublicKeyResponseDto {
  @IsString()
  @IsNotEmpty()
  publicKey: string;

  @IsString()
  algorithm: string;

  @IsNumber()
  keySize: number;

  @IsString()
  usage: string;
}