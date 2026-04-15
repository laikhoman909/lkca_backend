import {
  IsOptional,
  IsInt,
  IsString,
} from 'class-validator';

// ─────────────────────────────────────────────
// FORM 13 
// ─────────────────────────────────────────────

export class FormSec13DTO {

  @IsOptional()
  @IsInt()
  formRefId: number;

  @IsOptional()
  @IsInt()
  DPGross?: number;

  @IsOptional()
  @IsInt()
  HargaPasar?: number;

  @IsOptional()
  @IsInt()
  HargaRataRata?: number;

  @IsOptional()
  @IsInt()
  HargaReal?: number;

  @IsOptional()
  @IsInt()
  HargaTerendah?: number;

  @IsOptional()
  @IsInt()
  HargaTertinggi?: number;

  @IsOptional()
  @IsString()
  Referensi?: string;

  @IsOptional()
  @IsInt()
  ltv?: number;

  @IsOptional()
  @IsInt()
  sph?: number;

}
