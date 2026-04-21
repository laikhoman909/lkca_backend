import {
  IsOptional,
  IsInt,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

// ─────────────────────────────────────────────
// FORM 15 
// ─────────────────────────────────────────────

export class FooterDTO {

  @IsOptional()
  @IsInt()
  formRefId: number;

  @IsOptional()
  @IsString()
  Signature1?: string;

  @IsOptional()
  @IsString()
  Signature2?: string;

  @IsOptional()
  @IsString()
  RekomendasiCA?: string;

  @IsOptional()
  @IsString()
  Keterangan?: string;

}
