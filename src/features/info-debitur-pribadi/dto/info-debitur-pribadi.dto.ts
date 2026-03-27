import { IsString, IsOptional, IsNumber, IsInt, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { RadioDto } from '../../../common/dto/radio.dto';

export class CreateInfoDebiturPribadiDto {
  @IsNumber()
  pengajuan_kredit_id: number;

  // Konfirmasi Latar Belakang Debitur - Pribadi (Radio fields)
  @IsOptional()
  @ValidateNested()
  @Type(() => RadioDto)
  nama_jelas_sesuai_ktp?: RadioDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => RadioDto)
  tempat_tinggal_sesuai_ktp?: RadioDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => RadioDto)
  status_tempat_tinggal?: RadioDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => RadioDto)
  status_pernikahan?: RadioDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => RadioDto)
  nama_pasangan_sesuai?: RadioDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => RadioDto)
  status_asal_usul_cadab?: RadioDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => RadioDto)
  lama_tinggal?: RadioDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => RadioDto)
  jumlah_tanggungan?: RadioDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => RadioDto)
  status_anak?: RadioDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => RadioDto)
  pendidikan_terakhir?: RadioDto;

  @IsOptional()
  @IsInt()
  usia_debitur?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => RadioDto)
  kategori_usia?: RadioDto;
}

export class UpdateInfoDebiturPribadiDto extends CreateInfoDebiturPribadiDto {}