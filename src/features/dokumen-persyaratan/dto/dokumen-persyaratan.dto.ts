import { IsString, IsOptional, IsInt, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { RadioDto } from '../../../common/dto/radio.dto';

export class CreateDokumenPersyaratanDto {
  @IsInt()
  pengajuan_kredit_id: number;

  @IsOptional()
  @IsString()
  jenis_dokumen?: string;

  // Radio fields
  @IsOptional()
  @ValidateNested()
  @Type(() => RadioDto)
  status_ada?: RadioDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => RadioDto)
  tipe_dokumen?: RadioDto;

  @IsOptional()
  @IsString()
  keterangan?: string;

  @IsOptional()
  @IsInt()
  urutan?: number;
}

export class UpdateDokumenPersyaratanDto extends CreateDokumenPersyaratanDto {}