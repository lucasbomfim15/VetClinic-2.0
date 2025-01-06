import { Injectable } from "@nestjs/common";
import { Pet } from "@prisma/client";
import { PrismaService } from "src/app/shared/prisma/prisma.service";
import CreatePetDTO from "../dtos/create-pet.dto";
import UpdatePetDTO from "../dtos/update-pet.dto";

@Injectable()
export default class PetsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createPet(createPetDto: CreatePetDTO): Promise<Pet> {
    return this.prismaService.pet.create({
      data: {
        name: createPetDto.name,
        species: createPetDto.species,
        carry: createPetDto.carry,
        weigth: createPetDto.weigth,
        tutor: {
          connect: {
            id: createPetDto.tutorId,
          },
        },
      },
    });
  }

  async updatePet(id: string, updatePetDto: UpdatePetDTO): Promise<Pet> {
    return this.prismaService.pet.update({
      where: { id },
      data: {
        name: updatePetDto.name,
        species: updatePetDto.species,
        carry: updatePetDto.carry,
        weigth: updatePetDto.weigth,
      },
    });
  }

  async listAllPets(): Promise<Pet[]> {
    return await this.prismaService.pet.findMany();
  }

  async findById(id: string): Promise<Pet> {
    return await this.prismaService.pet.findUnique({
      where: {
        id,
      },
    });
  }

  async deletePetById(id: string): Promise<void> {
    await this.prismaService.pet.delete({
      where: {
        id,
      },
    });
  }
}
