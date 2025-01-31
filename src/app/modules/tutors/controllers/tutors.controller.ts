import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import CreateTutorDTO from "src/app/modules/tutors/dtos/create-tutor.dto";
import UpdateTutorDTO from "src/app/modules/tutors/dtos/update-tutor.dto";
import { Tutor } from "src/app/modules/tutors/interfaces/tutor.interface";
import TutorsService from "src/app/modules/tutors/services/tutors.service";
import JwtAuthGuard from "src/app/modules/auth/jwt/jwt-auth.guard";
import { ITutorController } from "../interfaces/itutor-controller-interface";

@Controller("api/v1/tutors")
export class TutorsController implements ITutorController {
  constructor(private readonly tutorService: TutorsService) {}

  @Post()
  @HttpCode(201)
  async createTutor(@Body() createTutorDTO: CreateTutorDTO): Promise<Tutor> {
    return this.tutorService.createTutor(createTutorDTO);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async index(): Promise<Tutor[]> {
    return this.tutorService.findAll();
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  async show(@Param("id") id: string): Promise<Omit<Tutor, "password">> {
    return this.tutorService.findById(id);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async delete(@Param("id") id: string): Promise<void | any> {
    await this.tutorService.deleteTutor(id);
    return { statusCode: 204, message: "Tutor deleted successfully" };
  }

  @Put(":id")
  @UseGuards(JwtAuthGuard)
  async update(
    @Param("id") id: string,
    @Body() updateTutorDto: UpdateTutorDTO,
  ): Promise<Omit<Tutor, "password">> {
    return this.tutorService.updateTutor(id, updateTutorDto);
  }
}
