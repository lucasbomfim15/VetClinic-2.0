import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import CreateTutorDTO from "src/application/dtos/create-tutor.dto";
import UpdateTutorDTO from "src/application/dtos/update-tutor.dto";
import { Tutor } from "src/application/interfaces/tutor.interface";
import TutorsService from "src/application/services/tutor/tutors.service";

@Controller("api/v1/tutors")
export class TutorsController {
  constructor(private readonly tutorService: TutorsService) {}

  @Post()
  @HttpCode(201)
  async createTutor(@Body() createTutorDTO: CreateTutorDTO) {
    return this.tutorService.createTutor(createTutorDTO);
  }

  @Get()
  async index() {
    return this.tutorService.findAll();
  }

  @Get(":id")
  async show(@Param("id") id: string): Promise<Omit<Tutor, "password">> {
    return this.tutorService.findById(id);
  }

  @Delete(":id")
  async delete(@Param("id") id: string): Promise<void> {
    return this.tutorService.deleteTutor(id);
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() updateTutorDto: UpdateTutorDTO,
  ): Promise<Omit<Tutor, "password">> {
    return this.tutorService.updateTutor(id, updateTutorDto);
  }
}
