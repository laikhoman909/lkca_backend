import {
    IsArray,
    ValidateNested,
    IsOptional,
    IsInt,
  } from 'class-validator';
  import { Type } from 'class-transformer';
import { KeyValueInputDto } from 'src/common/dto/key-value.dto';
  
  export class CreateForm3Dto {
    @IsInt()
    formRefId: number;
  
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => KeyValueInputDto)
    Form3_0?: KeyValueInputDto[];
  
  }
  