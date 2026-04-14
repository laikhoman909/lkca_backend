import { IsInt, IsOptional, IsString } from "class-validator";

export class PembayaranDto {
    @IsOptional()
    @IsString()
    NoPinjaman?: string;
  
    @IsOptional()
    @IsString()
    AtasNama?: string;
  
    @IsOptional()
    @IsInt()
    BesarAngsuran?: number;
  
    @IsOptional()
    @IsString()
    OSPokok?: string;

    @IsOptional()
    @IsString()
    AngsKe?: string;
  
  }
  