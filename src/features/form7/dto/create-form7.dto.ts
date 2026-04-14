import {
  IsArray,
  ValidateNested,
  IsOptional,
  IsInt,
} from 'class-validator';
import { Type } from 'class-transformer';
import { KeyIncomeDto, KeyValueDto } from 'src/common/dto/key-value.dto';

// ─────────────────────────────────────────────
// FORM 7 - 
// ─────────────────────────────────────────────


export class CreateForm7Dto {

  @IsOptional()
  @IsInt()
  formRefId: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => KeyIncomeDto)
  Form7_0?: KeyIncomeDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => KeyValueDto)
  Form7_1: KeyValueDto[];
}
