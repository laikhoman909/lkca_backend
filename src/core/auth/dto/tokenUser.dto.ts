import { IsOptional, IsString } from "class-validator";

export class tokenUser {
    @IsString()
    username: string;

    @IsString()
    nama: string;

    @IsOptional()
    @IsString()
    cabang: string;

    @IsOptional()
    @IsString()
    roles: string;

    @IsOptional()
    @IsString()
    dept: string;
  }  