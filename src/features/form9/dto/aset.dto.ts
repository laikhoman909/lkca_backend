import { IsInt, IsOptional, IsString } from "class-validator";

export class AssetDto {
  
    @IsString()
    Nama: string;
  
    @IsOptional()
    @IsString()
    Merk?: string;
  
    @IsOptional()
    @IsString()
    NoPol?: string;
  
    @IsOptional()
    @IsString()
    Status?: string;
  
    @IsString()
    NamaBank: string;
  
  }
  