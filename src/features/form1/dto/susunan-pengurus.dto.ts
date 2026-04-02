import {
    IsString,
    IsOptional,
  } from 'class-validator';
  
  // ─────────────────────────────────────────────
  // FORM 1 - KONFIRMASI LATAR BELAKANG DEBITUR
  // ─────────────────────────────────────────────
  
  export class Form1SusunanPengurusDto {
    @IsOptional()
    @IsString()
    NamaJabatan?: string;
  
    @IsOptional()
    @IsString()
    BesarSaham?: string;
  
    @IsOptional()
    @IsString()
    Persen?: string;
  
    @IsOptional()
    @IsString()
    Hubungan?: string;
  
    @IsOptional()
    @IsString()
    Keterangan?: string;
  }