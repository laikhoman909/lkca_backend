
import { Type } from 'class-transformer';
import {
    IsString,
    IsOptional,
    IsArray,
    ValidateNested,
  } from 'class-validator';
import { LaporanKeuanganDto } from './laporan-keuangan-dto';

export class DataTableSec8_1Dto {
    @IsOptional()
    @IsString()
    Keterangan: string;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => LaporanKeuanganDto)
    LaporanKeuangan?: LaporanKeuanganDto[];
  }