import { Test, TestingModule } from "@nestjs/testing";
import PetsController from "./pets.controller";
import PetsService from "../services/pets.service";
import { PrismaService } from "src/app/shared/prisma/prisma.service";
import CreatePetDTO from "../dtos/create-pet.dto";
import UpdatePetDTO from "../dtos/update-pet.dto";

describe("PetsController", () => {
  let petsController: PetsController;
  let petsService: Partial<PetsService>;

  beforeEach(async () => {
    petsService = {
      createPet: jest.fn(),
      updatePet: jest.fn(),
      findById: jest.fn(),
      deleteById: jest.fn(),
      findAll: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PetsController],
      providers: [
        {
          provide: PetsService,
          useValue: petsService,
        },
        {
          provide: PrismaService,
          useValue: {},
        },
      ],
    }).compile();

    petsController = module.get<PetsController>(PetsController);
  });

  it("should be a create pet", () => {
    const createPetDTO: CreatePetDTO = {
      name: "Bob",
      species: "Dog",
      carry: "Yes",
      weigth: 10,
      tutorId: "1",
    };

    const createdPet = { id: "1", ...createPetDTO };

    (petsService.createPet as jest.Mock).mockResolvedValue(createdPet);

    const result = petsController.create(createPetDTO);

    expect(result).resolves.toEqual(createdPet);
  });

  it("should not be a create pet without a name", async () => {
    const createPetDTO: CreatePetDTO = {
      name: "",
      species: "Dog",
      carry: "Yes",
      weigth: 10,
      tutorId: "1",
    };

    (petsService.createPet as jest.Mock).mockRejectedValue(
      new Error("Name is required"),
    );

    await expect(petsController.create(createPetDTO)).rejects.toThrow(
      new Error("Name is required"),
    );

    expect(petsService.createPet).toHaveBeenCalledWith(createPetDTO);
  });

  it("should not be a create pet without a specie", async () => {
    const createPetDTO: CreatePetDTO = {
      name: "Bob",
      species: "",
      carry: "Yes",
      weigth: 10,
      tutorId: "1",
    };

    (petsService.createPet as jest.Mock).mockRejectedValue(
      new Error("Specie is required"),
    );

    await expect(petsController.create(createPetDTO)).rejects.toThrow(
      new Error("Specie is required"),
    );

    expect(petsService.createPet).toHaveBeenCalledWith(createPetDTO);
  });

  it("should not be a create pet without a carry", async () => {
    const createPetDTO: CreatePetDTO = {
      name: "Bob",
      species: "Dog",
      carry: "",
      weigth: 10,
      tutorId: "1",
    };

    (petsService.createPet as jest.Mock).mockRejectedValue(
      new Error("Carry is required"),
    );

    await expect(petsController.create(createPetDTO)).rejects.toThrow(
      new Error("Carry is required"),
    );

    expect(petsService.createPet).toHaveBeenCalledWith(createPetDTO);
  });

  it("should not be a create pet without a weigth", async () => {
    const createPetDTO: CreatePetDTO = {
      name: "Bob",
      species: "",
      carry: "Yes",
      weigth: null,
      tutorId: "1",
    };

    (petsService.createPet as jest.Mock).mockRejectedValue(
      new Error("Weigth is required"),
    );

    await expect(petsController.create(createPetDTO)).rejects.toThrow(
      new Error("Weigth is required"),
    );

    expect(petsService.createPet).toHaveBeenCalledWith(createPetDTO);
  });

  it("should not be a create pet without a weigth", async () => {
    const createPetDTO: CreatePetDTO = {
      name: "Bob",
      species: "",
      carry: "Yes",
      weigth: null,
      tutorId: "1",
    };

    (petsService.createPet as jest.Mock).mockRejectedValue(
      new Error("Weigth is required"),
    );

    await expect(petsController.create(createPetDTO)).rejects.toThrow(
      new Error("Weigth is required"),
    );

    expect(petsService.createPet).toHaveBeenCalledWith(createPetDTO);
  });

  it("should not be a create pet without a tutorId", async () => {
    const createPetDTO: CreatePetDTO = {
      name: "Bob",
      species: "",
      carry: "Yes",
      weigth: 10,
      tutorId: "",
    };

    (petsService.createPet as jest.Mock).mockRejectedValue(
      new Error("TutorId is required"),
    );

    await expect(petsController.create(createPetDTO)).rejects.toThrow(
      new Error("TutorId is required"),
    );

    expect(petsService.createPet).toHaveBeenCalledWith(createPetDTO);
  });

  it("should find all pets", async () => {
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
        name: "Alice",
        species: "Cat",
        carry: "No",
        weigth: 5,
        tutor: {
          id: "2",
          name: "Jane Doe",
        },
      },
    ];

    (petsService.findAll as jest.Mock).mockResolvedValue(pets);

    const result = await petsController.list();

    expect(petsService.findAll).toHaveBeenCalled();
    expect(result).toEqual(pets);
  });

  it("should find pet by id", async () => {
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

    (petsService.findById as jest.Mock).mockResolvedValue(pet);

    const result = await petsController.show("1");

    expect(petsService.findById).toHaveBeenCalledWith("1");
    expect(result).toEqual(pet);
  });

  it("should delete pet by id", async () => {
    const petId = "1";

    (petsService.deleteById as jest.Mock).mockResolvedValue(petId);

    const result = await petsController.delete(petId);

    expect(petsService.deleteById).toHaveBeenCalledWith(petId);
    expect(result).toEqual({
      statusCode: 204,
      message: "Pet deleted successfully",
    });
  });

  it("should be update a pet successfully", async () => {
    const petId = "1";
    const updatePetDTO: UpdatePetDTO = {
      name: "Rex",
      species: "Dog",
      carry: "Yes",
      weigth: 15,
      tutorId: "1",
    };

    const updatedPet = {
      id: petId,
      name: "Rex",
      species: "Dog",
      carry: "Yes",
      weigth: 30,
      tutorId: "1",
    };

    (petsService.updatePet as jest.Mock).mockResolvedValue(updatedPet);

    const result = await petsController.update(petId, updatePetDTO);

    expect(petsService.updatePet).toHaveBeenCalledWith(petId, updatePetDTO);
    expect(result).toEqual(updatedPet);
  });

  it("should throw an error if pet is not found", async () => {
    const petId = "999";
    const updatePetDTO: UpdatePetDTO = {
      name: "Rex",
      species: "Dog",
      carry: "Yes",
      weigth: 15,
      tutorId: "1",
    };

    (petsService.updatePet as jest.Mock).mockRejectedValue(
      new Error("Pet not found"),
    );

    try {
      await petsController.update(petId, updatePetDTO);
    } catch (error) {
      expect(error.message).toBe("Pet not found");
    }

    expect(petsService.updatePet).toHaveBeenCalledWith(petId, updatePetDTO);
  });
});
