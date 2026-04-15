import {
  IsArray,
  ValidateNested,
  IsOptional,
  IsInt,
} from 'class-validator';
import { Type } from 'class-transformer';
import { KewajibanDto } from './kewajiban.dto';

// ─────────────────────────────────────────────
// FORM 12 
// ─────────────────────────────────────────────

export class FormSec12DTO {

  @IsOptional()
  @IsInt()
  formRefId: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => KewajibanDto)
  DataTable?: KewajibanDto[];

}
