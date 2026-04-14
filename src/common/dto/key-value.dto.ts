import {
    IsString,
    IsOptional,
    IsInt,
  } from 'class-validator';

// ─────────────────────────────────────────────
// SHARED KEY-VALUE INPUT
// Used for all checkbox/selection inputs across all forms
// key         = group name  e.g. "StatusCaDeb", "NamaJelasSesuaiKtp"
// Value       = selected preset KeyValue id (as string)
// CustomValue = optional free text  e.g. "34 THN", "SEJAK KECIL"
// ─────────────────────────────────────────────
export class KeyValueInputDto {
  @IsString()
  key: string;

  @IsOptional()
  @IsString()
  Value: string;

  @IsOptional()
  @IsString()
  label: string;

  @IsOptional()
  @IsString()
  CustomValue?: string;

}

// Alias for Form0_2 to keep frontend naming convention
export { KeyValueInputDto as Form0_2ItemDto };

// ─────────────────────────────────────────────
// SHARED KEY-LIST INPUT
// ─────────────────────────────────────────────
export class KeyListItemDto {
  @IsString()
  key: string;

  @IsOptional()
  @IsString()
  data1?: string;

  @IsOptional()
  @IsString()
  data2?: string;

  @IsOptional()
  @IsString()
  data3?: string;

  @IsOptional()
  @IsString()
  data4?: string;
}

// ─────────────────────────────────────────────
// SHARED KEY-INCOME INPUT
// ─────────────────────────────────────────────
export class KeyIncomeDto {
  @IsString()
  key: string;

  @IsOptional()
  @IsInt()
  income1?: number;

  @IsOptional()
  @IsInt()
  income2?: number;

  @IsOptional()
  @IsInt()
  income3?: number;

  @IsOptional()
  @IsInt()
  total?: number;
}

export class KeyValueDto {
  @IsString()
  key: string;

  @IsOptional()
  @IsInt()
  value?: number;

}