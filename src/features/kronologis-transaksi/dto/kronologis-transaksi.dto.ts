import { IsString, IsOptional, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { RadioDto } from '../../../common/dto/radio.dto';

export class CreateKronologisTransaksiDto {
  @IsNumber()
  pengajuan_kredit_id: number;

  // Kronologis Transaksi (Radio fields)
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
}

export class UpdateKronologisTransaksiDto extends CreateKronologisTransaksiDto {}