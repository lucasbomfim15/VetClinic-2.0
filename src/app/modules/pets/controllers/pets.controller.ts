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
import CreatePetDTO from "src/app/modules/pets/dtos/create-pet.dto";
import UpdatePetDTO from "src/app/modules/pets/dtos/update-pet.dto";
import { Pet } from "src/app/modules/pets/interfaces/pet.interface";
import PetsService from "src/app/modules/pets/services/pets.service";
import { PrismaService } from "src/app/shared/prisma/prisma.service";
import JwtAuthGuard from "src/app/modules/auth/jwt/jwt-auth.guard";
import { IPetController } from "../interfaces/pet-controller-interface";

@Controller("api/v1/pets")
export default class PetsController implements IPetController {
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async delete(@Param("id") id: string): Promise<void | any> {
    await this.petsService.deleteById(id);
    return { statusCode: 204, message: "Pet deleted successfully" };
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
