import { IsInt, IsOptional, IsString } from "class-validator";

export class AssetDto {
    @IsOptional()
    @IsString()
    merk_tipe_tahun: string;
  
    @IsOptional()
    @IsString()
    nopol?: number;
  
    @IsOptional()
    @IsString()
    status?: number;
  
    @IsOptional()
    @IsInt()
    nama_bank?: number;
  
  }
  