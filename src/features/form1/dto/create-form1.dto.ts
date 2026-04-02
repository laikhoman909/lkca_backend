import {
    IsString,
    IsArray,
    ValidateNested,
    IsOptional,
    IsInt,
  } from 'class-validator';
  import { Type } from 'class-transformer';
import { KeyValueInputDto } from 'src/common/dto/key-value.dto';
import { Form1SusunanPengurusDto } from './susunan-pengurus.dto';
  
  export class CreateForm1Dto {
    @IsInt()
    formRefId: number;
  
    // All checkbox fields sent as shared KeyValueInputDto list
    // e.g. [
    //   { key: "NamaJelasSesuaiKtp", Value: "8",  CustomValue: "" },
    //   { key: "LamaTinggal",        Value: "21", CustomValue: "SEJAK KECIL" }
    // ]
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => KeyValueInputDto)
    keyValues?: KeyValueInputDto[];
  
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Form1SusunanPengurusDto)
    SusunanPengurus?: Form1SusunanPengurusDto[];
  }
  