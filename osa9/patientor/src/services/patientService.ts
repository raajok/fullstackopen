import data from "../../data/patients";
import { NewPatient, NonSensitivePatient, Patient } from "../types";
import { v1 as uuid } from 'uuid';

const patients: Patient[] = data;

export const getPatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

export const getPatient = (id: string): NonSensitivePatient | undefined => {
  return patients.find(patient => patient.id === id);
};

export const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    entries: [],
    ... patient
  };

  patients.push(newPatient);
  return newPatient;
};