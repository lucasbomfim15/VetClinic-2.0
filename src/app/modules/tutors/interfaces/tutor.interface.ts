import { Pet } from "@prisma/client";

export interface Tutor {
  id: string;
  name: string;
  email: string;
  password: string;
  zip_code: string;
  pets?: Pet[];
  createdAt: Date;
  updatedAt: Date;
}
