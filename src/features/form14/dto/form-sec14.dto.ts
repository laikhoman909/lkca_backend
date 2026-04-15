import {
  IsOptional,
  IsInt,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

// ─────────────────────────────────────────────
// FORM 14 
// ─────────────────────────────────────────────

export class FormSec14DTO {

  @IsOptional()
  @IsInt()
  formRefId: number;

  @IsOptional()
  @IsString()
  NegatifPoin?: string;

  @IsOptional()
  @IsString()
  PositifPoin?: string;

}
