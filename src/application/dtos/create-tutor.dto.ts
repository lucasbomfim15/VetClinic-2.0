import { Pet } from "@prisma/client";

export default class CreateTutorDTO {
  name: string;
  email: string;
  password: string;
  zip_code: string;
  pets: Pet[];
}
