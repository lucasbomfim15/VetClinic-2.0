import { Pet } from "@prisma/client";
import CreatePetDTO from "../dtos/create-pet.dto";
import UpdatePetDTO from "../dtos/update-pet.dto";

export interface IPetController {
  create(createPetDTO: CreatePetDTO): Promise<Pet>;
  list(): Promise<Pet[]>;
  show(id: string): Promise<Pet>;
  delete(id: string): Promise<void>;
  update(id: string, updatePetDto: UpdatePetDTO): Promise<Pet>;
}
