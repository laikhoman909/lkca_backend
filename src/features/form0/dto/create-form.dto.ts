import {
  IsString,
  IsNumber,
  IsDate,
  IsArray,
  ValidateNested,
  IsOptional,
  IsInt,
} from 'class-validator';
import { Type } from 'class-transformer';
import { KeyListItemDto, KeyValueInputDto } from 'src/common/dto/key-value.dto';

// ─────────────────────────────────────────────
// FORM 0 - FORM REKOMENDASI CREDIT ANALYST
// ─────────────────────────────────────────────

export class Form0ItemDto {
  @IsDate()
  @Type(() => Date)
  TanggalTelepon: Date;

  @IsString()
  JamTelepon: string;

  @IsString()
  Cabang: string;

  @IsString()
  NamaCmo: string;

  @IsNumber()
  FidCmo: number;

  @IsString()
  NamaDebitur: string;

  @IsString()
  NamaDealer: string;

  @IsString()
  Msub: string;
}

export class CreateFormDto {
  @ValidateNested()
  @Type(() => Form0ItemDto)
  Form0: Form0ItemDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => KeyListItemDto)
  Form0_1: KeyListItemDto[];

  // Combined StatusCaDeb + JenisPengajuan list
  // e.g. [
  //   { key: "StatusCaDeb",    Value: "1", CustomValue: "" },
  //   { key: "JenisPengajuan", Value: "5", CustomValue: "" }
  // ]
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => KeyValueInputDto)
  Form0_2?: KeyValueInputDto[];
}
