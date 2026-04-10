import {
    IsString,
    IsArray,
    ValidateNested,
    IsOptional,
    IsInt,
  } from 'class-validator';
  import { Type } from 'class-transformer';
import { KeyValueInputDto } from 'src/common/dto/key-value.dto';
import { FormSec1DTO } from './form-sec1.dto';
  
  export class CreateForm1Dto {
    @IsOptional()
    @IsInt()
    formRefId: number;
  
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => KeyValueInputDto)
    Form1_0?: KeyValueInputDto[];

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => KeyValueInputDto)
    Form1_1?: KeyValueInputDto[];
  
    @IsOptional()
    @Type(() => FormSec1DTO)
    FormSec1DTO?: FormSec1DTO;
  }
  