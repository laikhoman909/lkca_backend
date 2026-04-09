import {
  IsArray,
  ValidateNested,
  IsOptional,
  IsInt,
} from 'class-validator';
import { Type } from 'class-transformer';
import { KeyValueInputDto } from 'src/common/dto/key-value.dto';
import { FormSec6DTO } from './form-sec6.dto';

export class CreateForm6Dto {
@IsInt()
formRefId: number;

@IsOptional()
@IsArray()
@ValidateNested({ each: true })
@Type(() => KeyValueInputDto)
Form6_0?: KeyValueInputDto[];

@ValidateNested()
@Type(() => FormSec6DTO)
FormSec6DTO?: FormSec6DTO;
}