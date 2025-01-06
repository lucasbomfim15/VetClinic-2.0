import { Pet } from "@prisma/client";
import {
  IsEmail,
  IsOptional,
  IsString,
  IsArray,
  IsNotEmpty,
} from "class-validator";

export default class CreateTutorDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  zip_code: string;

  @IsOptional()
  @IsArray()
  pets: Pet[];
}
