import { PrismaService } from "src/app/shared/prisma/prisma.service";
import PetsRepository from "../repository/pets.repository";
import PetsService from "./pets.service";
import { Test, TestingModule } from "@nestjs/testing";
import CreatePetDTO from "../dtos/create-pet.dto";
import TutorsRepository from "../../tutors/repository/tutors.repository";
import UpdatePetDTO from "../dtos/update-pet.dto";
import { NotFoundException } from "@nestjs/common";

describe("Pets Controller unit tests", () => {
  let petsService: PetsService;
  let petsRepository: Partial<PetsRepository>;
  let prismaService: Partial<PrismaService>;
  let tutorsRepository: Partial<TutorsRepository>;

  beforeEach(async () => {
    petsRepository = {
      createPet: jest.fn(),
      updatePet: jest.fn(),
      listAllPets: jest.fn(),
      findById: jest.fn(),
      deletePetById: jest.fn(),
    };

    tutorsRepository = {
      findTutorById: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PetsService,
        { provide: PetsRepository, useValue: petsRepository },
        { provide: TutorsRepository, useValue: tutorsRepository },
        { provide: PrismaService, useValue: prismaService },
      ],
    }).compile();

    petsService = module.get<PetsService>(PetsService);
  });

  it("should be create a pet successfully", async () => {
    const createPetDTO: CreatePetDTO = {
      name: "Bob",
      species: "Dog",
      carry: "Yes",
      weigth: 10,
      tutorId: "1",
    };

    (tutorsRepository.findTutorById as jest.Mock).mockResolvedValue({
      id: "1",
      name: "John Doe",
    });

    (petsRepository.createPet as jest.Mock).mockResolvedValue({
      id: "1",
      ...createPetDTO,
    });

    const result = await petsService.createPet(createPetDTO);

    expect(result).toEqual({ id: "1", ...createPetDTO });
    expect(tutorsRepository.findTutorById).toHaveBeenCalledWith("1");
    expect(petsRepository.createPet).toHaveBeenCalledWith(createPetDTO);
  });

  it("should find all pets successfully", async () => {
    const pets = [
      {
        id: "1",
        name: "Bob",
        species: "Dog",
        carry: "Yes",
        weigth: 10,
        tutor: {
          id: "1",
          name: "John Doe",
        },
      },
      {
        id: "2",
        name: "Lola",
        species: "Cat",
        carry: "No",
        weigth: 5,
        tutor: {
          id: "2",
          name: "Jane Doe",
        },
      },
    ];

    (petsRepository.listAllPets as jest.Mock).mockResolvedValue(pets);

    const result = await petsService.findAll();

    expect(result).toEqual(pets);
  });

  it("should find pet by id successfully", async () => {
    const petId = "1";
    const pet = {
      id: "1",
      name: "Bob",
      species: "Dog",
      carry: "Yes",
      weigth: 10,
      tutor: {
        id: "1",
        name: "John Doe",
      },
    };

    (petsRepository.findById as jest.Mock).mockResolvedValue(pet);

    const result = await petsService.findById(petId);

    expect(result).toEqual(pet);
  });

  it("should throw an error if pet is not found", async () => {
    const petId = "000";

    (petsRepository.findById as jest.Mock).mockResolvedValue(null);

    await expect(petsService.findById(petId)).rejects.toThrow("Pet not found");

    expect(petsRepository.findById).toHaveBeenCalledWith(petId);
  });

  it("should delete a pet successfully", async () => {
    const pet = {
      id: "1",
      name: "Bob",
      species: "Dog",
      carry: "Yes",
      weigth: 10,
      tutor: {
        id: "1",
        name: "John Doe",
      },
    };

    (petsRepository.findById as jest.Mock).mockResolvedValue(pet);
    (petsRepository.deletePetById as jest.Mock).mockResolvedValue(undefined);

    await petsService.deleteById(pet.id);

    expect(petsRepository.findById).toHaveBeenCalledWith(pet.id);
    expect(petsRepository.deletePetById).toHaveBeenCalledWith(pet.id);
  });

  it("should throw an error if pet is not found", async () => {
    const petId = "000";

    (petsRepository.findById as jest.Mock).mockResolvedValue(null);

    await expect(petsService.deleteById(petId)).rejects.toThrow(
      "Pet not found",
    );

    expect(petsRepository.findById).toHaveBeenCalledWith(petId);
  });

  it("should update a pet successfully", async () => {
    const petId = "1";
    const updatePetDTO: UpdatePetDTO = {
      name: "Rex",
      species: "Dog",
      carry: "Yes",
      weigth: 15,
      tutorId: "1",
    };

    const existingPet = {
      id: petId,
      name: "Bob",
      species: "Dog",
      carry: "Yes",
      weigth: 10,
      tutorId: "1",
    };

    const updatedPet = {
      id: petId,
      ...updatePetDTO,
    };

    (petsRepository.findById as jest.Mock).mockResolvedValue(existingPet);

    (petsRepository.updatePet as jest.Mock).mockResolvedValue(updatedPet);

    const result = await petsService.updatePet(petId, updatePetDTO);

    expect(result).toEqual(updatedPet);
    expect(petsRepository.findById).toHaveBeenCalledWith(petId);
    expect(petsRepository.updatePet).toHaveBeenCalledWith(petId, updatePetDTO);
  });

  it("should throw NotFoundException if pet is not found", async () => {
    const petId = "999";
    const updatePetDTO: UpdatePetDTO = {
      name: "Rex",
      species: "Dog",
      carry: "Yes",
      weigth: 15,
      tutorId: "1",
    };

    (petsRepository.findById as jest.Mock).mockResolvedValue(null);

    await expect(petsService.updatePet(petId, updatePetDTO)).rejects.toThrow(
      NotFoundException,
    );

    expect(petsRepository.findById).toHaveBeenCalledWith(petId);
  });
});
