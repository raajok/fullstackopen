import z from "zod";
import { newPatientSchema } from "./utils";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {
  
}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Female = 'female',
  Male = 'male',
  Other = 'other',
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type NewPatient = z.infer<typeof newPatientSchema>;
export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;