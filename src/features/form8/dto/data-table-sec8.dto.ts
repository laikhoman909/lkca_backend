
import { Type } from 'class-transformer';
import {
    IsString,
    IsOptional,
    IsInt,
    IsArray,
    ValidateNested,
  } from 'class-validator';
import { MutasiDto } from './mutasi.dto';

export class DataTableSec8Dto {
    @IsOptional()
    @IsString()
    Keterangan: string;
  
    @IsOptional()
    @IsString()
    AtasNama?: string;
  
    @IsOptional()
    @IsString()
    NamaBank?: string;

    @IsOptional()
    @IsString()
    Radio?: string;

    @IsOptional()
    @IsInt()
    SaldoAwal?: number;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => MutasiDto)
    Mutasi?: MutasiDto[];
  }