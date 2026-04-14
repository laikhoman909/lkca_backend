import { IsInt, IsOptional, IsString } from "class-validator";

export class PembiayaanDto {
    @IsOptional()
    @IsString()
    Key?: string;
  
    @IsOptional()
    @IsInt()
    JumlahUnit?: number;
  
    @IsOptional()
    @IsString()
    CollRendah?: string;

    @IsOptional()
    @IsString()
    Keterangan?: string;
  
  }
  