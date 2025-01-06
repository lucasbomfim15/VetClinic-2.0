import { Tutor } from "@prisma/client";
import CreateTutorDTO from "../dtos/create-tutor.dto";
import UpdateTutorDTO from "../dtos/update-tutor.dto";

export interface ITutorService {
  createTutor(createTutorDTO: CreateTutorDTO): Promise<Tutor>;
  findAll(): Promise<Tutor[]>;
  findById(id: string): Promise<Omit<Tutor, "password">>;
  deleteTutor(id: string): Promise<void>;
  updateTutor(
    id: string,
    updateTutorDTO: UpdateTutorDTO,
  ): Promise<Omit<Tutor, "password">>;
}
