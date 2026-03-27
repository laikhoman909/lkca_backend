import { IsString, IsOptional, IsNumber, IsInt } from 'class-validator';

export class CreateRecordPaymentDto {
  @IsInt()
  pengajuan_kredit_id: number;

  @IsOptional()
  @IsString()
  nomor_pinjaman?: string;

  @IsOptional()
  @IsString()
  atas_nama?: string;

  @IsOptional()
  @IsNumber()
  besar_angsuran?: number;

  @IsOptional()
  @IsNumber()
  os_pokok?: number;

  @IsOptional()
  @IsInt()
  angsuran_ke?: number;

  @IsOptional()
  @IsString()
  tenor?: string;

  @IsOptional()
  @IsInt()
  overdue?: number;

  @IsOptional()
  @IsString()
  keterangan?: string;
}

export class UpdateRecordPaymentDto extends CreateRecordPaymentDto {}