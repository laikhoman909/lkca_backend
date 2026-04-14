import {
  IsArray,
  ValidateNested,
  IsOptional,
  IsInt,
} from 'class-validator';
import { Type } from 'class-transformer';
import { AssetDto } from './aset.dto';

// ─────────────────────────────────────────────
// FORM 9 
// ─────────────────────────────────────────────

export class CreateForm9Dto {

  @IsOptional()
  @IsInt()
  formRefId: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AssetDto)
  Form9_0: AssetDto[];

}
