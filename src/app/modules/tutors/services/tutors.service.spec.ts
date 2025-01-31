import { PrismaService } from "src/app/shared/prisma/prisma.service";
import TutorsRepository from "../repository/tutors.repository";
import TutorsService from "./tutors.service";
import { Test, TestingModule } from "@nestjs/testing";
import CreateTutorDTO from "../dtos/create-tutor.dto";
import * as bcrypt from "bcryptjs";

describe("Tutors Service Unit Tests", () => {
  let tutorsService: TutorsService;
  let tutorsRepository: Partial<TutorsRepository>;
  let prismaService: Partial<PrismaService>;

  beforeEach(async () => {
    tutorsRepository = {
      createTutor: jest.fn(),
      findAllTutors: jest.fn(),
      findTutorById: jest.fn(),
      findTutorByEmail: jest.fn(),
      updateTutor: jest.fn(),
      deleteTutorById: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TutorsService,
        { provide: TutorsRepository, useValue: tutorsRepository },
        { provide: PrismaService, useValue: prismaService },
      ],
    }).compile();

    tutorsService = module.get<TutorsService>(TutorsService);
  });

  it("should create a tutor successfully", async () => {
    const createTutorDto: CreateTutorDTO = {
      name: "John Doe",
      email: "john@example.com",
      password: "123456",
      zip_code: "12345-678",
      pets: [],
    };

    const hashedPassword = "hashed_password";

    jest
      .spyOn(bcrypt, "hash")
      .mockImplementation(async () => "hashed_password");
    (tutorsRepository.findTutorByEmail as jest.Mock).mockResolvedValue(null);
    (tutorsRepository.createTutor as jest.Mock).mockResolvedValue({
      id: "1",
      ...createTutorDto,
      password: hashedPassword,
    });

    const result = await tutorsService.createTutor(createTutorDto);

    expect(result).toEqual({
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      password: hashedPassword,
      zip_code: "12345-678",
      pets: [],
    });
    expect(tutorsRepository.findTutorByEmail).toHaveBeenCalledWith(
      "john@example.com",
    );
    expect(tutorsRepository.createTutor).toHaveBeenCalled();
  });

  it("should find all tutors successfully", async () => {
    const tutors = [
      {
        id: 1,
        name: "John Doe",
        email: "0Qf2i@example.com",
        zip_code: "12345-678",
        pets: [],
      },
      {
        id: 2,
        name: "Jane Doe",
        email: "0Qf2i3@example.com",
        zip_code: "12345-678",
        pets: [],
      },
    ];

    (tutorsRepository.findAllTutors as jest.Mock).mockResolvedValue(tutors);
    const result = await tutorsService.findAll();
    expect(result).toEqual(tutors);
  });

  it("should find tutor by id successfully", async () => {
    const tutorId = "1";
    const tutor = {
      id: "1",
      name: "John Doe",
      email: "0Qf2i@example.com",
      zip_code: "12345-678",
      pets: [],
    };

    (tutorsRepository.findTutorById as jest.Mock).mockResolvedValue(tutor);
    const result = await tutorsService.findById(tutorId);
    expect(result).toEqual(tutor);
  });

  it("should throw an error if tutor is not found", async () => {
    const tutorId = "000";

    (tutorsRepository.findTutorById as jest.Mock).mockResolvedValue(null);

    await expect(tutorsService.findById(tutorId)).rejects.toThrow(
      "Tutor not found",
    );

    expect(tutorsRepository.findTutorById).toHaveBeenCalledWith(tutorId);
  });

  it("should delete a tutor successfully", async () => {
    const tutor = {
      id: "1",
      name: "John Doe",
      email: "0Qf2i@example.com",
      zip_code: "12345-678",
      pets: [],
    };

    (tutorsRepository.findTutorById as jest.Mock).mockResolvedValue(tutor);
    (tutorsRepository.deleteTutorById as jest.Mock).mockResolvedValue(tutor);

    await tutorsService.deleteTutor(tutor.id);

    expect(tutorsRepository.deleteTutorById).toHaveBeenCalledWith(tutor.id);
  });

  it("should throw an error if tutor is not found", async () => {
    const tutorId = "000";

    (tutorsRepository.findTutorById as jest.Mock).mockResolvedValue(null);

    await expect(tutorsService.deleteTutor(tutorId)).rejects.toThrow(
      "Tutor not found",
    );

    expect(tutorsRepository.findTutorById).toHaveBeenCalledWith(tutorId);
  });
});
