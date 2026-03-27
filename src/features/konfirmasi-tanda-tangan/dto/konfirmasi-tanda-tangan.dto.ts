import { IsString, IsOptional, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { RadioDto } from '../../../common/dto/radio.dto';

export class CreateKonfirmasiTandaTanganDto {
  @IsNumber()
  pengajuan_kredit_id: number;

  // Konfirmasi Tanda Tangan (Radio fields)
  @IsOptional()
  @ValidateNested()
  @Type(() => RadioDto)
  penandatanganan_kontrak?: RadioDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => RadioDto)
  penjelasan_pasal_penting?: RadioDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => RadioDto)
  nama_cmo_sesuai_survey?: RadioDto;

  @IsOptional()
  @IsString()
  cmo_id?: string;
}

export class UpdateKonfirmasiTandaTanganDto extends CreateKonfirmasiTandaTanganDto {}