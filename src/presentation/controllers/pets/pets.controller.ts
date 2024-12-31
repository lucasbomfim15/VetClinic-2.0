import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import CreatePetDTO from "src/application/dtos/pets/create-pet.dto";
import UpdatePetDTO from "src/application/dtos/pets/update-pet.dto";
import { Pet } from "src/application/interfaces/pet.interface";
import PetsService from "src/application/services/pet/pets.service";
import { PrismaService } from "src/infra/prisma/prisma.service";
import JwtAuthGuard from "src/presentation/modules/auth/jwt-auth.guard";

@Controller("api/v1/pets")
export default class PetsController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly petsService: PetsService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createPetDTO: CreatePetDTO): Promise<Pet> {
    return await this.petsService.createPet(createPetDTO);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async list(): Promise<Pet[]> {
    return await this.petsService.findAll();
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  async show(@Param("id") id: string): Promise<Pet> {
    return await this.petsService.findById(id);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  async delete(@Param("id") id: string): Promise<void> {
    await this.prismaService.pet.delete({
      where: { id },
    });
  }

  @Put(":id")
  @UseGuards(JwtAuthGuard)
  async update(
    @Param("id") id: string,
    @Body() updatePetDto: UpdatePetDTO,
  ): Promise<Pet> {
    return await this.petsService.updatePet(id, updatePetDto);
  }
}
