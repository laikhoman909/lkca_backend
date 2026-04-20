import { IsOptional, IsString } from "class-validator";

export class PembayaranDto {
  
    @IsString()
    NoPinjaman: string;
  
    @IsOptional()
    @IsString()
    AtasNama?: string;
  
    @IsOptional()
    @IsString()
    BesarAngsuran?: string;
  
    @IsOptional()
    @IsString()
    OSPokok?: string;

    @IsOptional()
    @IsString()
    AngsKe?: string;
  
  }
  