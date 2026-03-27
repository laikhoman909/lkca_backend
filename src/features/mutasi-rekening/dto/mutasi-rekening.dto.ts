import { IsString, IsOptional, IsNumber, IsInt, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { RadioDto } from '../../../common/dto/radio.dto';

export class CreateMutasiRekeningDto {
  @IsInt()
  pengajuan_kredit_id: number;

  @IsOptional()
  @IsString()
  nama_bank?: string;

  @IsOptional()
  @IsString()
  atas_nama?: string;

  @IsOptional()
  @IsString()
  bulan?: string;

  @IsOptional()
  @IsNumber()
  saldo_awal?: number;

  @IsOptional()
  @IsNumber()
  debet?: number;

  @IsOptional()
  @IsNumber()
  kredit?: number;

  @IsOptional()
  @IsNumber()
  saldo_akhir?: number;

  @IsOptional()
  @IsNumber()
  total_debet?: number;

  @IsOptional()
  @IsNumber()
  total_kredit?: number;

  @IsOptional()
  @IsNumber()
  rata_rata_debet?: number;

  @IsOptional()
  @IsNumber()
  rata_rata_kredit?: number;

  // Radio field
  @IsOptional()
  @ValidateNested()
  @Type(() => RadioDto)
  mutasi_vs_omset?: RadioDto;

  @IsOptional()
  @IsNumber()
  persen_tercermin?: number;

  @IsOptional()
  @IsString()
  keterangan?: string;
}

export class UpdateMutasiRekeningDto extends CreateMutasiRekeningDto {}