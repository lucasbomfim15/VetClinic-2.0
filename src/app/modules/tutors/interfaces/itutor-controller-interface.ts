import { Tutor } from "@prisma/client";
import CreateTutorDTO from "../dtos/create-tutor.dto";
import UpdateTutorDTO from "../dtos/update-tutor.dto";

export interface ITutorController {
  createTutor(createTutorDTO: CreateTutorDTO): Promise<Tutor>;
  index(): Promise<Tutor[]>;
  show(id: string): Promise<Omit<Tutor, "password">>;
  delete(id: string): Promise<void>;
  update(
    id: string,
    updateTutorDto: UpdateTutorDTO,
  ): Promise<Omit<Tutor, "password">>;
}
