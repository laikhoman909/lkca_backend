import { IsString, IsOptional, IsNumber, IsInt, IsEmail, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { RadioDto } from '../../../common/dto/radio.dto';

export class CreateInfoUsahaDto {
  @IsInt()
  pengajuan_kredit_id: number;

  @IsOptional()
  @IsString()
  nama_perusahaan?: string;

  @IsOptional()
  @IsString()
  jenis_usaha?: string;

  // Radio fields
  @IsOptional()
  @ValidateNested()
  @Type(() => RadioDto)
  status_debitur?: RadioDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => RadioDto)
  lama_usaha?: RadioDto;

  @IsOptional()
  @IsInt()
  lama_usaha_tahun?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => RadioDto)
  status_kepemilikan_tempat?: RadioDto;

  @IsOptional()
  @IsNumber()
  biaya_sewa?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => RadioDto)
  jarak_tempat_usaha?: RadioDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => RadioDto)
  pembayaran_gaji?: RadioDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => RadioDto)
  status_karyawan?: RadioDto;

  @IsOptional()
  @IsString()
  alamat_usaha?: string;

  @IsOptional()
  @IsString()
  alamat_pool?: string;

  @IsOptional()
  @IsString()
  telepon?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  usaha_sebelumnya?: string;

  @IsOptional()
  @IsString()
  uraian_usaha_1?: string;

  @IsOptional()
  @IsString()
  uraian_usaha_2?: string;

  @IsOptional()
  @IsString()
  uraian_usaha_3?: string;

  // Rekanan
  @IsOptional()
  @IsString()
  nama_rekanan?: string;

  @IsOptional()
  @IsString()
  telepon_rekanan?: string;

  @IsOptional()
  @IsString()
  keterangan_rekanan?: string;

  // Emergency Contact
  @IsOptional()
  @IsString()
  ec_nama?: string;

  @IsOptional()
  @IsString()
  ec_hubungan?: string;

  @IsOptional()
  @IsString()
  ec_telepon?: string;

  @IsOptional()
  @IsString()
  ec_keterangan?: string;
}

export class UpdateInfoUsahaDto extends CreateInfoUsahaDto {}