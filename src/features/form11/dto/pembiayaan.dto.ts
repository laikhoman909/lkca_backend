import { IsInt, IsOptional, IsString } from "class-validator";

export class PembiayaanDto {
    @IsString()
    Key: string;
  
    @IsOptional()
    @IsString()
    JumlahUnit?: string;
  
    @IsOptional()
    @IsString()
    CollRendah?: string;

    @IsOptional()
    @IsString()
    Keterangan?: string;
  
  }
  