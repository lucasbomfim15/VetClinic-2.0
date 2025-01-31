import { PrismaService } from "src/app/shared/prisma/prisma.service";
import CreateTutorDTO from "../dtos/create-tutor.dto";
import TutorsService from "../services/tutors.service";
import { TutorsController } from "./tutors.controller";
import { Test, TestingModule } from "@nestjs/testing";
import UpdateTutorDTO from "../dtos/update-tutor.dto";

describe("Tutors Controller unit tests", () => {
  let tutorController: TutorsController;
  let tutorService: Partial<TutorsService>;

  beforeEach(async () => {
    tutorService = {
      createTutor: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      deleteTutor: jest.fn(),
      updateTutor: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TutorsController],
      providers: [
        { provide: TutorsService, useValue: tutorService },
        { provide: PrismaService, useValue: {} },
      ],
    }).compile();

    tutorController = module.get<TutorsController>(TutorsController);
  });

  it("should be a create tutor", () => {
    const createTutorDto: CreateTutorDTO = {
      name: "John Doe",
      email: "0Qf2i@example.com",
      password: "123456",
      zip_code: "12345-678",
      pets: [],
    };

    const createdTutor = { id: 1, ...createTutorDto };

    (tutorService.createTutor as jest.Mock).mockResolvedValue(createdTutor);

    const result = tutorController.createTutor(createTutorDto);

    expect(result).resolves.toEqual(createdTutor);
  });

  it("should not be a create tutor without a name", async () => {
    const createTutorDto: CreateTutorDTO = {
      name: "",
      email: "0Qf2i@example.com",
      password: "123456",
      zip_code: "12345-678",
      pets: [],
    };

    (tutorService.createTutor as jest.Mock).mockRejectedValue(
      new Error("Name is required"),
    );

    await expect(tutorController.createTutor(createTutorDto)).rejects.toThrow(
      new Error("Name is required"),
    );

    expect(tutorService.createTutor).toHaveBeenCalledWith(createTutorDto);
  });

  it("should not be a create tutor without a email", async () => {
    const createTutorDto: CreateTutorDTO = {
      name: "John Doe",
      email: "",
      password: "123456",
      zip_code: "12345-678",
      pets: [],
    };

    (tutorService.createTutor as jest.Mock).mockRejectedValue(
      new Error("Email is required"),
    );

    await expect(tutorController.createTutor(createTutorDto)).rejects.toThrow(
      new Error("Email is required"),
    );

    expect(tutorService.createTutor).toHaveBeenCalledWith(createTutorDto);
  });

  it("should not be a create tutor without a password", async () => {
    const createTutorDto: CreateTutorDTO = {
      name: "John Doe",
      email: "0Qf2i@example.com",
      password: "",
      zip_code: "12345-678",
      pets: [],
    };

    (tutorService.createTutor as jest.Mock).mockRejectedValue(
      new Error("Password is required"),
    );

    await expect(tutorController.createTutor(createTutorDto)).rejects.toThrow(
      new Error("Password is required"),
    );

    expect(tutorService.createTutor).toHaveBeenCalledWith(createTutorDto);
  });

  it("should not be a create tutor without a zip code", async () => {
    const createTutorDto: CreateTutorDTO = {
      name: "John Doe",
      email: "0Qf2i@example.com",
      password: "123456",
      zip_code: "",
      pets: [],
    };

    (tutorService.createTutor as jest.Mock).mockRejectedValue(
      new Error("Zip code is required"),
    );

    await expect(tutorController.createTutor(createTutorDto)).rejects.toThrow(
      new Error("Zip code is required"),
    );

    expect(tutorService.createTutor).toHaveBeenCalledWith(createTutorDto);
  });

  it("should be a find all tutors", async () => {
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

    (tutorService.findAll as jest.Mock).mockResolvedValue(tutors);

    const result = await tutorController.index();

    expect(tutorService.findAll).toHaveBeenCalled();
    expect(result).toEqual(tutors);
  });

  it("should be a find by id", async () => {
    const tutor = {
      id: "1",
      name: "John Doe",
      email: "0Qf2i@example.com",
      zip_code: "12345-678",
      pets: [],
    };

    (tutorService.findById as jest.Mock).mockResolvedValue(tutor);

    const result = await tutorController.show("1");

    expect(result).toEqual(tutor);
  });

  it("should be a delete tutor", async () => {
    const tutorId = "1";

    (tutorService.deleteTutor as jest.Mock).mockResolvedValue(undefined);

    const result = await tutorController.delete(tutorId);

    expect(tutorService.deleteTutor).toHaveBeenCalledWith(tutorId);
    expect(result).toEqual({
      statusCode: 204,
      message: "Tutor deleted successfully",
    });
  });

  it("Should be update a tutor successfully", async () => {
    const tutorId = "1";
    const updateTutorDto: UpdateTutorDTO = {
      name: "John Doe",
      email: "0Qf2i@example.com",
      password: "123456",
      zip_code: "12345-678",
      pets: [],
    };

    const updatedTutor = {
      id: tutorId,
      name: "John Updated",
      email: "updated@example.com",
      zip_code: "98765-432",
      pets: [],
    };

    (tutorService.updateTutor as jest.Mock).mockResolvedValue(updatedTutor);

    const result = await tutorController.update(tutorId, updateTutorDto);

    expect(tutorService.updateTutor).toHaveBeenCalledWith(
      tutorId,
      updateTutorDto,
    );

    expect(result).toEqual(updatedTutor);
  });

  it("should throw error if tutor not found during update", async () => {
    const tutorId = "999";
    const updateTutorDTO: UpdateTutorDTO = {
      name: "Non Existent Tutor",
      email: "nonexistent@example.com",
      zip_code: "00000-000",
    };

    (tutorService.updateTutor as jest.Mock).mockRejectedValue(
      new Error("Tutor not found"),
    );

    try {
      await tutorController.update(tutorId, updateTutorDTO);
    } catch (error) {
      expect(error.message).toBe("Tutor not found");
    }

    expect(tutorService.updateTutor).toHaveBeenCalledWith(
      tutorId,
      updateTutorDTO,
    );
  });
});
