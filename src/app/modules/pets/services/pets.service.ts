import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import CreatePetDTO from "src/app/modules/pets/dtos/create-pet.dto";
import UpdatePetDTO from "src/app/modules/pets/dtos/update-pet.dto";
import { Pet } from "src/app/modules/pets/interfaces/pet.interface";
import { PrismaService } from "src/app/shared/prisma/prisma.service";

@Injectable()
export default class PetsService {
  constructor(private prismaService: PrismaService) {}

  async createPet(createPetDTO: CreatePetDTO): Promise<Pet> {
    const tutorExists = await this.prismaService.tutor.findUnique({
      where: {
        id: createPetDTO.tutorId,
      },
    });

    if (!tutorExists) {
      throw new Error("Tutor not found");
    }

    const pet = await this.prismaService.pet.create({
      data: {
        name: createPetDTO.name,
        species: createPetDTO.species,
        carry: createPetDTO.carry,
        weigth: createPetDTO.weigth,
        tutor: {
          connect: {
            id: createPetDTO.tutorId,
          },
        },
      },
    });

    return pet;
  }

  async findAll(): Promise<Pet[]> {
    return await this.prismaService.pet.findMany();
  }

  async findById(id: string): Promise<Pet> {
    if (!id) {
      throw new BadRequestException("ID é obrigatório.");
    }

    const pet = await this.prismaService.pet.findUnique({
      where: { id },
    });

    if (!pet) {
      throw new NotFoundException("Pet não encontrado.");
    }

    return pet;
  }

  async deleteById(id: string): Promise<void> {
    if (!id) {
      throw new BadRequestException("ID é obrigatório.");
    }

    const pet = await this.prismaService.pet.findUnique({
      where: { id },
    });

    if (!pet) {
      throw new NotFoundException("Pet não encontrado.");
    }

    await this.prismaService.pet.delete({
      where: { id },
    });
  }

  async updatePet(id: string, updatePetDTO: UpdatePetDTO): Promise<Pet> {
    const pet = await this.prismaService.pet.findUnique({
      where: {
        id,
      },
    });

    if (!pet) {
      throw new NotFoundException("Pet não encontrado.");
    }

    const updatedPet = await this.prismaService.pet.update({
      where: { id },
      data: {
        name: updatePetDTO.name,
        species: updatePetDTO.species,
        carry: updatePetDTO.carry,
        weigth: updatePetDTO.weigth,
      },
    });

    return updatedPet;
  }
}
