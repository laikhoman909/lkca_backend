import { IsString, IsOptional, IsInt, ValidateNested, IsBoolean } from 'class-validator';

export class StatusDokumenDto {

  @IsOptional()
  @IsString()
  id: string;

  @IsString()
  key: string;

  // Radio fields
  @IsOptional()
  @IsBoolean()
  model1?: boolean;

  @IsOptional()
  @IsInt()
  model2?: number;

  @IsOptional()
  @IsString()
  model3?: string;

}

export class UpdateForm2Dto extends StatusDokumenDto {}