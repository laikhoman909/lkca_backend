import {
    IsString,
    IsOptional,
    IsInt,
  } from 'class-validator';

  // ─────────────────────────────────────────────
  // FORM 6 - KONFIRMASI USAHA / PENDAPATAN
  // ─────────────────────────────────────────────
  
  export class FormSec61DTO {
  
    @IsOptional()
    @IsString()
    Usaha1?: string;
  
    @IsOptional()
    @IsString()
    Usaha2?: string;
  
    @IsOptional()
    @IsString()
    Usaha3?: string;
  
    @IsOptional()
    @IsString()
    ECall1?: string;
  
    @IsOptional()
    @IsString()
    ECall2?: string;
  }