import { Body, Controller, Post } from "@nestjs/common";
import CreateTutorDTO from "src/application/dtos/create-tutor.dto";
import { TutorsService } from "src/application/services/tutor/tutors.service";

@Controller("api/v1/tutors")
export class TutorsController {
  constructor(private readonly tutorService: TutorsService) {}

  @Post()
  async createTutor(@Body() createTutorDTO: CreateTutorDTO) {
    return this.tutorService.createTutor(createTutorDTO);
  }
}
