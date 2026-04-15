import { IsInt, IsOptional, IsString } from "class-validator";

export class KewajibanDto {
    @IsOptional()
    @IsString()
    Bank?: string;

    @IsOptional()
    @IsString()
    Merk?: string;
  
    @IsOptional()
    @IsInt()
    BesarAngsuran?: number;
  
    @IsOptional()
    @IsInt()
    AngsuranKe?: number;

    @IsOptional()
    @IsString()
    Keterangan?: string;
  
  }
  