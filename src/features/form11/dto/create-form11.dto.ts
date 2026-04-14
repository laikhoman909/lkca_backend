import {
  IsArray,
  ValidateNested,
  IsOptional,
  IsInt,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PembiayaanDto } from './pembiayaan.dto';

// ─────────────────────────────────────────────
// FORM 11 
// ─────────────────────────────────────────────

export class FormSec11DTO {

  @IsOptional()
  @IsInt()
  formRefId: number;

  @IsOptional()
  @IsString()
  Catatan?: string;

  @IsOptional()
  @IsString()
  Keterangan?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PembiayaanDto)
  DataTable?: PembiayaanDto[];

}
