import {
    IsString,
    IsArray,
    ValidateNested,
    IsOptional,
    IsInt,
  } from 'class-validator';
  import { Type } from 'class-transformer';
  import { KeyValueInputDto } from 'src/common/dto/key-value.dto';

  // ─────────────────────────────────────────────
  // FORM 6 - KONFIRMASI USAHA / PENDAPATAN
  // ─────────────────────────────────────────────
  
  export class FormSec6DTO {
  
    @IsOptional()
    @IsString()
    NamaPerusahaan?: string;
  
    @IsOptional()
    @IsString()
    JenisUsaha?: string;
  
    @IsOptional()
    @IsString()
    AlamatUsahaKantor?: string;
  
    @IsOptional()
    @IsString()
    AlamatPool?: string;
  
    @IsOptional()
    @IsString()
    TeleponHpEmail?: string;
  
    @IsOptional()
    @IsString()
    UsahaPekerjaanSebelumnya?: string;
  
    @IsOptional()
    @IsString()
    UraianUsaha1?: string;
  
    @IsOptional()
    @IsString()
    UraianUsaha2?: string;
  
    @IsOptional()
    @IsString()
    UraianUsaha3?: string;
  
    @IsOptional()
    @IsString()
    ECallRekanan?: string;
  
    @IsOptional()
    @IsString()
    ECallLainnya?: string;
  }