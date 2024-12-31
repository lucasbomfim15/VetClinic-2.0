/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import CreateTutorDTO from "src/application/dtos/tutors/create-tutor.dto";
import UpdateTutorDTO from "src/application/dtos/tutors/update-tutor.dto";
import { Tutor } from "src/application/interfaces/tutor.interface";
import { PrismaService } from "src/infra/prisma/prisma.service";

@Injectable()
export default class TutorsService {
  constructor(private prismaService: PrismaService) {}

  async createTutor(createTutorDTO: CreateTutorDTO): Promise<Tutor> {
    const tutorExists = await this.prismaService.tutor.findUnique({
      where: {
        email: createTutorDTO.email,
      },
    });

    if (tutorExists) {
      throw new BadRequestException("Email já está em uso.");
    }

    const hashedPassword = await bcrypt.hash(createTutorDTO.password, 8);

    const tutor = await this.prismaService.tutor.create({
      data: {
        name: createTutorDTO.name,
        email: createTutorDTO.email,
        password: hashedPassword,
        zip_code: createTutorDTO.zip_code,
        pets: {
          create: createTutorDTO.pets,
        },
      },
    });

    return {
      ...tutor,
      pets: createTutorDTO.pets,
    };
  }

  async findAll(): Promise<Tutor[]> {
    return await this.prismaService.tutor.findMany({
      include: {
        pets: true,
      },
    });
  }

  async findById(id: string): Promise<Omit<Tutor, "password">> {
    if (!id) {
      throw new BadRequestException("ID é obrigatório.");
    }

    const tutor = await this.prismaService.tutor.findUnique({
      where: { id },
      include: { pets: true },
    });

    if (!tutor) {
      throw new NotFoundException("Tutor não encontrado.");
    }

    const { password, ...result } = tutor;
    return result;
  }

  async deleteTutor(id: string): Promise<void> {
    if (!id) {
      throw new BadRequestException("Tutor não encontrado.");
    }

    await this.prismaService.tutor.delete({
      where: {
        id,
      },
    });
  }

  async updateTutor(
    id: string,
    updateTutorDTO: UpdateTutorDTO,
  ): Promise<Omit<Tutor, "password">> {
    const tutor = await this.prismaService.tutor.findUnique({
      where: {
        id,
      },
    });

    if (!tutor) {
      throw new NotFoundException("Tutor não encontrado.");
    }

    const updatedTutor = await this.prismaService.tutor.update({
      where: {
        id,
      },
      data: {
        name: updateTutorDTO.name,
        email: updateTutorDTO.email,
        password: updateTutorDTO.password,
        zip_code: updateTutorDTO.zip_code,
        pets: {
          create: updateTutorDTO.pets,
        },
      },
    });

    return {
      ...updatedTutor,
      pets: updateTutorDTO.pets,
    };
  }
}
