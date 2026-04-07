import {
    IsArray,
    ValidateNested,
    IsOptional,
    IsInt,
  } from 'class-validator';
  import { Type } from 'class-transformer';
import { KeyValueInputDto } from 'src/common/dto/key-value.dto';
  
  export class CreateForm4Dto {
    @IsInt()
    formRefId: number;
  
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => KeyValueInputDto)
    Form4_0?: KeyValueInputDto[];
  
  }
  