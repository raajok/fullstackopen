import z from "zod";
import { Gender, HealthCheckRating } from "./types";

export const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string(),
  entries: z.array(
    z.object({
      type: z.enum(["HealthCheck", "Hospital", "OccupationalHealthcare"]),
      description: z.string(),
      date: z.iso.date(),
      specialist: z.string(),
      diagnosisCodes: z.optional(z.array(z.string())),
      discharge: z.optional(z.object({
        date: z.string(),
        criteria: z.string(),
      })),
      employerName: z.optional(z.string()),
      sickLeave: z.optional(z.object({
        startDate: z.iso.date(),
        endDate: z.iso.date(),
      })),
      healtCheckRating: z.optional(z.enum(HealthCheckRating)),
    })
  )
});