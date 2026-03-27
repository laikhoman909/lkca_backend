import { IsString, IsOptional, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { RadioDto } from '../../../common/dto/radio.dto';

export class CreateInfoDebiturBadanUsahaDto {
  @IsNumber()
  pengajuan_kredit_id: number;

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

export class UpdateInfoDebiturBadanUsahaDto extends CreateInfoDebiturBadanUsahaDto {}