import { Injectable } from "@nestjs/common";
import CreateTutorDTO from "src/application/dtos/create-tutor.dto";
import { Tutor } from "src/application/interfaces/tutor.interface";
import { PrismaService } from "src/infra/prisma/prisma.service";

@Injectable()
export class TutorsService {
  constructor(private prismaService: PrismaService) {}

  async createTutor(createTutorDTO: CreateTutorDTO) {
    const { email, name, password, zip_code } = createTutorDTO;

    const emailAlreadyExists = await this.prismaService.tutor.findUnique({
      where: { email },
    });

    if (emailAlreadyExists) {
      throw new Error("Email already exists");
    }

    return this.prismaService.tutor.create({
      data: { email, name, password, zip_code },
    });
  }
}
