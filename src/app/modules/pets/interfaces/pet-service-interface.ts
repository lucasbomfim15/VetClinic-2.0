import { Pet } from "@prisma/client";
import CreatePetDTO from "../dtos/create-pet.dto";
import UpdatePetDTO from "../dtos/update-pet.dto";

export interface IPetService {
  createPet(createPetDTO: CreatePetDTO): Promise<Pet>;
  findAll(): Promise<Pet[]>;
  findById(id: string): Promise<Pet>;
  deleteById(id: string): Promise<void>;
  updatePet(id: string, updatePetDTO: UpdatePetDTO): Promise<Pet>;
}
