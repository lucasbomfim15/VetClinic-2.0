import { Pet } from "@prisma/client";
import { IsArray, IsEmail, IsOptional, IsString } from "class-validator";

export default class UpdateTutorDTO {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  zip_code?: string;

  @IsOptional()
  @IsArray()
  pets?: Pet[];
}
