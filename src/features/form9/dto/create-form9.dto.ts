import {
  IsArray,
  ValidateNested,
  IsOptional,
  IsInt,
} from 'class-validator';
import { Type } from 'class-transformer';
import { KeyIncomeDto, KeyValueDto } from 'src/common/dto/key-value.dto';
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
