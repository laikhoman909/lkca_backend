import {
    IsString,
    IsOptional,
    IsInt,
  } from 'class-validator';

export class MutasiDto {
    @IsOptional()
    @IsString()
    Keterangan: string;

    @IsOptional()
    @IsInt()
    Debit?: number;

    @IsOptional()
    @IsInt()
    Kredit?: number;

    @IsOptional()
    @IsInt()
    Saldo?: number;

  }