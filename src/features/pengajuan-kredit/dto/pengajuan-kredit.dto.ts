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

  // Konfirmasi Tanda Tangan (Radio)
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

  // Kronologis Transaksi (Radio)
  @IsOptional()
  @ValidateNested()
  @Type(() => RadioDto)
  mengetahui_itc_dari?: RadioDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => RadioDto)
  nama_dealer_sesuai?: RadioDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => RadioDto)
  tujuan_pembelian_mobil?: RadioDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => RadioDto)
  kendaraan_dibawa_oleh?: RadioDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => RadioDto)
  pembawa_memiliki_sim?: RadioDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => RadioDto)
  cek_kondisi_mobil?: RadioDto;

  @IsOptional()
  @IsNumber()
  kondisi_mobil_persen?: number;

  // OS & BMPK
  @IsOptional()
  @IsNumber()
  os_pokok_cabang?: number;

  @IsOptional()
  @IsNumber()
  bmpk?: number;

  // Total
  @IsOptional()
  @IsNumber()
  total_pokok_hutang?: number;

  @IsOptional()
  @IsNumber()
  total_exposure?: number;
}

export class UpdatePengajuanKreditDto extends CreatePengajuanKreditDto {}