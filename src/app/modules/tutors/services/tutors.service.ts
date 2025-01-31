/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import CreateTutorDTO from "src/app/modules/tutors/dtos/create-tutor.dto";
import UpdateTutorDTO from "src/app/modules/tutors/dtos/update-tutor.dto";
import { Tutor } from "src/app/modules/tutors/interfaces/tutor.interface";
import { PrismaService } from "src/app/shared/prisma/prisma.service";
import TutorsRepository from "../repository/tutors.repository";
import { ITutorService } from "../interfaces/itutor-service-interface";

@Injectable()
export default class TutorsService implements ITutorService {
  constructor(
    private prismaService: PrismaService,
    private readonly tutorsRepository: TutorsRepository,
  ) {}

  async createTutor(createTutorDTO: CreateTutorDTO): Promise<Tutor> {
    const tutorExists = await this.tutorsRepository.findTutorByEmail(
      createTutorDTO.email,
    );

    if (tutorExists) {
      throw new BadRequestException("Email já está em uso.");
    }

    const hashedPassword = await bcrypt.hash(createTutorDTO.password, 8);

    return this.tutorsRepository.createTutor(createTutorDTO, hashedPassword);
  }

  async findAll(): Promise<Tutor[]> {
    return await this.tutorsRepository.findAllTutors();
  }

  async findById(id: string): Promise<Omit<Tutor, "password">> {
    if (!id) {
      throw new BadRequestException("ID é obrigatório.");
    }

    const tutor = await this.tutorsRepository.findTutorById(id);

    if (!tutor) {
      throw new NotFoundException("Tutor not found");
    }

    const { password, ...result } = tutor;
    return result;
  }

  async deleteTutor(id: string): Promise<void> {
    if (!id) {
      throw new BadRequestException("ID é obrigatório.");
    }

    const tutor = await this.tutorsRepository.findTutorById(id);

    if (!tutor) {
      throw new NotFoundException("Tutor not found");
    }

    await this.tutorsRepository.deleteTutorById(id);
  }

  async updateTutor(
    id: string,
    updateTutorDTO: UpdateTutorDTO,
  ): Promise<Omit<Tutor, "password">> {
    const tutor = await this.tutorsRepository.findTutorById(id);

    if (!tutor) {
      throw new NotFoundException("Tutor não encontrado.");
    }

    const updatedTutor = await this.tutorsRepository.updateTutor(
      id,
      updateTutorDTO,
    );

    return {
      ...updatedTutor,
      pets: updateTutorDTO.pets,
    };
  }
}
