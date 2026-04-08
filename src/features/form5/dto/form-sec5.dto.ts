import {
    IsString,
    IsOptional,
  } from 'class-validator';
  
  // ─────────────────────────────────────────────
  // FORM 5 - KONFIRMASI PRODUK, JENIS PEMBIAYAAN
  // ─────────────────────────────────────────────
  
  export class FormSec5DTO {
    
    // Jika Pembelian
    @IsOptional()
    @IsString()
    HargaOtr?: string;
  
    @IsOptional()
    @IsString()
    BesarDownPayment?: string;
  
    @IsOptional()
    @IsString()
    NamaTeleponPenjual?: string;
  
    @IsOptional()
    @IsString()
    HasilKonfirmasiPenjual?: string;
  
    // Jika Refinancing
    @IsOptional()
    @IsString()
    KapanMemilikiMobil?: string;
  
    @IsOptional()
    @IsString()
    BerapaHargaBeli?: string;
  
    @IsOptional()
    @IsString()
    BesarKebutuhanDana?: string;
  
    @IsOptional()
    @IsString()
    TujuanKebutuhanDana?: string;
  
    @IsOptional()
    @IsString()
    PosisiBpkb?: string;
  }