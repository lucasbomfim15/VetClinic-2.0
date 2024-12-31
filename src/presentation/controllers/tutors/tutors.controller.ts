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
import CreateTutorDTO from "src/application/dtos/tutors/create-tutor.dto";
import UpdateTutorDTO from "src/application/dtos/tutors/update-tutor.dto";
import { Tutor } from "src/application/interfaces/tutor.interface";
import TutorsService from "src/application/services/tutor/tutors.service";
import JwtAuthGuard from "src/presentation/modules/auth/jwt-auth.guard";

@Controller("api/v1/tutors")
export class TutorsController {
  constructor(private readonly tutorService: TutorsService) {}

  @Post()
  @HttpCode(201)
  async createTutor(@Body() createTutorDTO: CreateTutorDTO) {
    return this.tutorService.createTutor(createTutorDTO);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async index() {
    return this.tutorService.findAll();
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  async show(@Param("id") id: string): Promise<Omit<Tutor, "password">> {
    return this.tutorService.findById(id);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  async delete(@Param("id") id: string): Promise<void> {
    return this.tutorService.deleteTutor(id);
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
