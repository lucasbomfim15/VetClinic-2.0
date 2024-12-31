import { IsNumber, IsOptional, IsString } from "class-validator";

export default class UpdatePetDTO {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  species?: string;

  @IsString()
  @IsOptional()
  carry?: string;

  @IsNumber()
  @IsOptional()
  weigth?: number;

  @IsString()
  @IsOptional()
  tutorId?: string;
}
