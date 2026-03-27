import { IsString, IsOptional, IsNumber, IsDateString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { RadioDto } from '../../../common/dto/radio.dto';

export class CreatePengajuanKreditDto {
  // Header Information
  @IsOptional()
  @IsDateString()
  tanggal_telepon?: string;

  @IsOptional()
  @IsString()
  jam_telepon?: string;

  @IsOptional()
  @IsString()
  cabang?: string;

  @IsOptional()
  @IsString()
  nama_cmo?: string;

  @IsOptional()
  @IsNumber()
  fid_cmo?: number;

  @IsOptional()
  @IsString()
  nama_debitur?: string;

  @IsOptional()
  @IsString()
  nama_dealer?: string;

  @IsOptional()
  @IsString()
  msub?: string;

  @IsOptional()
  @IsNumber()
  pokok_hutang?: number;

  // Status Calon Debitur (Radio)
  @IsOptional()
  @ValidateNested()
  @Type(() => RadioDto)
  status_cadab?: RadioDto;

  // Jenis Pengajuan (Radio)
  @IsOptional()
  @ValidateNested()
  @Type(() => RadioDto)
  jenis_pengajuan?: RadioDto;

  // Data Kendaraan 1
  @IsOptional()
  @IsString()
  merk_type_1?: string;

  @IsOptional()
  @IsNumber()
  tahun_1?: number;

  @IsOptional()
  @IsString()
  nopol_1?: string;

  @IsOptional()
  @IsNumber()
  ph_pengajuan_1?: number;

  @IsOptional()
  @IsString()
  atas_nama_1?: string;

  // Data Kendaraan 2
  @IsOptional()
  @IsString()
  merk_type_2?: string;

  @IsOptional()
  @IsNumber()
  tahun_2?: number;

  @IsOptional()
  @IsString()
  nopol_2?: string;

  @IsOptional()
  @IsNumber()
  ph_pengajuan_2?: number;

  @IsOptional()
  @IsString()
  atas_nama_2?: string;

  // Data Kendaraan 3
  @IsOptional()
  @IsString()
  merk_type_3?: string;

  @IsOptional()
  @IsNumber()
  tahun_3?: number;

  @IsOptional()
  @IsString()
  nopol_3?: string;

  @IsOptional()
  @IsNumber()
  ph_pengajuan_3?: number;

  @IsOptional()
  @IsString()
  atas_nama_3?: string;

  // Data Kendaraan 4
  @IsOptional()
  @IsString()
  merk_type_4?: string;

  @IsOptional()
  @IsNumber()
  tahun_4?: number;

  @IsOptional()
  @IsString()
  nopol_4?: string;

  @IsOptional()
  @IsNumber()
  ph_pengajuan_4?: number;

  @IsOptional()
  @IsString()
  atas_nama_4?: string;
}

export class UpdatePengajuanKreditDto extends CreatePengajuanKreditDto {}