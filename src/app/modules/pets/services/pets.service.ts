import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import CreatePetDTO from "src/app/modules/pets/dtos/create-pet.dto";
import UpdatePetDTO from "src/app/modules/pets/dtos/update-pet.dto";
import { Pet } from "src/app/modules/pets/interfaces/pet.interface";
import { PrismaService } from "src/app/shared/prisma/prisma.service";
import PetsRepository from "../repository/pets.repository";
import TutorsRepository from "../../tutors/repository/tutors.repository";
import { IPetService } from "../interfaces/pet-service-interface";

@Injectable()
export default class PetsService implements IPetService {
  constructor(
    private prismaService: PrismaService,
    private readonly petsRepository: PetsRepository,
    private readonly tutorsRepository: TutorsRepository,
  ) {}

  async createPet(createPetDTO: CreatePetDTO): Promise<Pet> {
    const tutorExists = await this.tutorsRepository.findTutorById(
      createPetDTO.tutorId,
    );

    if (!tutorExists) {
      throw new Error("Tutor not found");
    }

    const pet = await this.petsRepository.createPet(createPetDTO);

    return pet;
  }

  async findAll(): Promise<Pet[]> {
    return await this.petsRepository.listAllPets();
  }

  async findById(id: string): Promise<Pet> {
    if (!id) {
      throw new BadRequestException("ID é obrigatório.");
    }

    const pet = await this.petsRepository.findById(id);

    if (!pet) {
      throw new NotFoundException("Pet não encontrado.");
    }

    return pet;
  }

  async deleteById(id: string): Promise<void> {
    if (!id) {
      throw new BadRequestException("ID é obrigatório.");
    }

    const pet = await this.petsRepository.findById(id);

    if (!pet) {
      throw new NotFoundException("Pet não encontrado.");
    }

    await this.petsRepository.deletePetById(id);
  }

  async updatePet(id: string, updatePetDTO: UpdatePetDTO): Promise<Pet> {
    const pet = await this.petsRepository.findById(id);

    if (!pet) {
      throw new NotFoundException("Pet não encontrado.");
    }

    const updatedPet = await this.petsRepository.updatePet(id, updatePetDTO);

    return updatedPet;
  }
}
