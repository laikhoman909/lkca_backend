import {
    IsString,
    IsOptional,
    IsInt,
  } from 'class-validator';

export class LaporanKeuanganDto {
    @IsOptional()
    @IsString()
    Keterangan: string;
    Radio?: string;

    @IsOptional()
    @IsInt()
    PendapatanLaba?: number;

    @IsOptional()
    @IsInt()
    Biaya?: number;

    @IsOptional()
    @IsInt()
    Net?: number;

  }