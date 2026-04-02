import {
    IsString,
    IsOptional,
    IsBoolean,
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

    @IsOptional()
    @IsBoolean()
    isSelected: boolean;

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