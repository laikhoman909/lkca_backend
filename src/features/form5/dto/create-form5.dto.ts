import {
    IsArray,
    ValidateNested,
    IsOptional,
    IsInt,
  } from 'class-validator';
import { Type } from 'class-transformer';
import { KeyValueInputDto } from 'src/common/dto/key-value.dto';
import { FormSec5DTO } from './form-sec5.dto';
  
export class CreateForm5Dto {
  @IsInt()
  formRefId: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => KeyValueInputDto)
  Form5_0?: KeyValueInputDto[];

  @ValidateNested()
  @Type(() => FormSec5DTO)
  FormSec5DTO?: FormSec5DTO;
}
  
  