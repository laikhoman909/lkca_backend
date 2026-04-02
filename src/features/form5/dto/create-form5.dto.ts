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
  // FORM 5 - KONFIRMASI PRODUK, JENIS PEMBIAYAAN
  // ─────────────────────────────────────────────
  
  export class CreateForm5Dto {
    @IsInt()
    formRefId: number;
  
    // All checkbox fields sent as shared KeyValueInputDto list
    // e.g. [
    //   { key: "JenisTransaksi",    Value: "58", CustomValue: "" },
    //   { key: "UnitSudahDiterima", Value: "65", CustomValue: "" }
    // ]
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => KeyValueInputDto)
    keyValues?: KeyValueInputDto[];
  
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
  