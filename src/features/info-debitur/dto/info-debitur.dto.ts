import { IsString, IsOptional, IsNumber, IsInt, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { RadioDto } from '../../../common/dto/radio.dto';

export class CreateInfoDebiturDto {
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

  // Konfirmasi Latar Belakang Debitur - Badan Usaha (Radio fields)
  @IsOptional()
  @ValidateNested()
  @Type(() => RadioDto)
  nama_jelas_sesuai_akte?: RadioDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => RadioDto)
  alamat_kantor_sesuai_akte?: RadioDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => RadioDto)
  status_kepemilikan_kantor?: RadioDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => RadioDto)
  lama_menempati?: RadioDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => RadioDto)
  usia_pemegang_saham?: RadioDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => RadioDto)
  jumlah_karyawan?: RadioDto;

  // Susunan Pengurus
  @IsOptional()
  @IsString()
  nama_pengurus?: string;

  @IsOptional()
  @IsString()
  jabatan_pengurus?: string;

  @IsOptional()
  @IsNumber()
  besar_saham?: number;

  @IsOptional()
  @IsString()
  hubungan_pengurus?: string;

  @IsOptional()
  @IsString()
  keterangan_pengurus?: string;
}

export class UpdateInfoDebiturDto extends CreateInfoDebiturDto {}