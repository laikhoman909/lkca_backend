import {
    IsString,
    IsOptional,
  } from 'class-validator';
  
  // ─────────────────────────────────────────────
  // FORM 1 - KONFIRMASI LATAR BELAKANG DEBITUR
  // ─────────────────────────────────────────────
  
  export class SusunanPengurusDto {
    @IsOptional()
    @IsString()
    namaJabatan?: string;
  
    @IsOptional()
    @IsString()
    besarSaham?: string;
  
    @IsOptional()
    @IsString()
    persen?: string;
  
    @IsOptional()
    @IsString()
    hubungan?: string;
  
  }