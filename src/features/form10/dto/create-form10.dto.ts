import {
  IsArray,
  ValidateNested,
  IsOptional,
  IsInt,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PembayaranDto } from './pembayaran.dto';

// ─────────────────────────────────────────────
// FORM 10 
// ─────────────────────────────────────────────

export class CreateForm10Dto {

  @IsOptional()
  @IsInt()
  formRefId: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PembayaranDto)
  Form10_0?: PembayaranDto[];

}
