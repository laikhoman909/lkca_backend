import {
  IsArray,
  ValidateNested,
  IsOptional,
  IsInt,
} from 'class-validator';
import { Type } from 'class-transformer';
import { DataTableSec8Dto } from './data-table-sec8.dto';
import { LaporanKeuanganDto } from './laporan-keuangan-dto';
import { DataTableSec8_1Dto } from './data-table-sec81.dto';

// ─────────────────────────────────────────────
// FORM 8 - 
// ─────────────────────────────────────────────

export class CreateForm8Dto {

  @IsOptional()
  @IsInt()
  formRefId: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DataTableSec8Dto)
  DataTableSec8DTO: DataTableSec8Dto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => DataTableSec8_1Dto)
  DataTableSec8_1DTO?: DataTableSec8_1Dto;
}
