import { IsString, IsOptional, IsNumber, IsDateString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { RadioDto } from '../../../common/dto/radio.dto';

export class CreatePembelianRefinancingDto {
  @IsNumber()
  pengajuan_kredit_id: number;

  // Pembelian Details
  @IsOptional()
  @IsNumber()
  harga_otr?: number;

  @IsOptional()
  @IsNumber()
  besar_down_payment?: number;

  @IsOptional()
  @IsString()
  keterangan_dp?: string;

  @IsOptional()
  @IsString()
  nama_penjual?: string;

  @IsOptional()
  @IsString()
  telepon_penjual?: string;

  @IsOptional()
  @IsString()
  hasil_konfirmasi_penjual?: string;

  // Refinancing Details
  @IsOptional()
  @IsDateString()
  kapas_memiliki_mobil?: string;

  @IsOptional()
  @IsNumber()
  harga_beli_saat_itu?: number;

  @IsOptional()
  @IsNumber()
  kebutuhan_dana?: number;

  @IsOptional()
  @IsString()
  tujuan_kebutuhan_dana?: string;

  @IsOptional()
  @IsString()
  posisi_bpkb?: string;
}

export class UpdatePembelianRefinancingDto extends CreatePembelianRefinancingDto {}