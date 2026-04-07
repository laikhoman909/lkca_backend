import {
    IsString,
    IsArray,
    ValidateNested,
    IsOptional,
    IsInt,
  } from 'class-validator';
  import { Type } from 'class-transformer';
import { KeyValueInputDto } from 'src/common/dto/key-value.dto';
import { SusunanPengurusDto } from './susunan-pengurus.dto';
  
  export class FormSec1DTO {
    @IsOptional()
    @IsString()
    Keterangan: string;
  
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => SusunanPengurusDto)
    Tabel: SusunanPengurusDto[];
  }
  