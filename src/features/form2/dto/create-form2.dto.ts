import { IsString, IsOptional, IsInt, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { StatusDokumenDto } from './status-dokumen.dto';
import { KeyListItemDto } from 'src/common/dto/key-value.dto';

export class CreateForm2Dto {

  @IsInt()
    formRefId: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StatusDokumenDto)
  Form2_0?: StatusDokumenDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => KeyListItemDto)
  Form2_1: KeyListItemDto[];
}

export class UpdateForm2Dto extends CreateForm2Dto {}