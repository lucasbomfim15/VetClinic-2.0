import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export default class CreatePetDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  species: string;

  @IsString()
  @IsNotEmpty()
  carry: string;

  @IsNumber()
  @IsNotEmpty()
  weigth: number;

  @IsString()
  @IsNotEmpty()
  tutorId: string;
}
