import { IsString, IsOptional, IsInt, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { RadioDto } from '../../../common/dto/radio.dto';

export class StatusDokumenDto {

  @IsOptional()
  @IsString()
  id: string;
  
  @IsOptional()
  @IsString()
  jenis_dokumen?: string;

  // Radio fields
  @IsOptional()
  @IsString()
  status_ada?: string;

  @IsOptional()
  @IsString()
  tipe_dokumen?: string;

  @IsOptional()
  @IsString()
  keterangan?: string;

}

export class UpdateForm2Dto extends StatusDokumenDto {}