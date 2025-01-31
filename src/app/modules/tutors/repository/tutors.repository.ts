import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/app/shared/prisma/prisma.service";
import CreateTutorDTO from "../dtos/create-tutor.dto";
import { Tutor } from "@prisma/client";
import UpdateTutorDTO from "../dtos/update-tutor.dto";

@Injectable()
export default class TutorsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllTutors() {
    return await this.prismaService.tutor.findMany({
      include: {
        pets: true,
      },
    });
  }

  async findTutorByEmail(email: string): Promise<Tutor | null> {
    return this.prismaService.tutor.findUnique({
      where: { email },
    });
  }

  async findTutorById(id: string): Promise<Tutor> {
    return this.prismaService.tutor.findUnique({
      where: {
        id,
      },
      include: {
        pets: true,
      },
    });
  }

  async deleteTutorById(id: string): Promise<void> {
    await this.prismaService.tutor.delete({
      where: {
        id,
      },
    });
  }

  async createTutor(
    createTutorDto: CreateTutorDTO,
    hashedPassword: string,
  ): Promise<Tutor> {
    return this.prismaService.tutor.create({
      data: {
        name: createTutorDto.name,
        email: createTutorDto.email,
        password: hashedPassword,
        zip_code: createTutorDto.zip_code,
        pets: {
          create: createTutorDto.pets,
        },
      },
      include: {
        pets: true,
      },
    });
  }

  async updateTutor(
    id: string,
    updateTutorDto: UpdateTutorDTO,
  ): Promise<Tutor> {
    return this.prismaService.tutor.update({
      where: { id },
      data: {
        name: updateTutorDto.name,
        email: updateTutorDto.email,
        password: updateTutorDto.password,
        zip_code: updateTutorDto.zip_code,
        pets: {
          create: updateTutorDto.pets,
        },
      },
    });
  }
}
