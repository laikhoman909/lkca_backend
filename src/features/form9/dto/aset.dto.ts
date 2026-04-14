import { IsInt, IsOptional, IsString } from "class-validator";

export class AssetDto {
    @IsOptional()
    @IsString()
    Merk?: string;
  
    @IsOptional()
    @IsString()
    NoPol?: string;
  
    @IsOptional()
    @IsString()
    Status?: string;
  
    @IsOptional()
    @IsString()
    NamaBank?: string;
  
  }
  