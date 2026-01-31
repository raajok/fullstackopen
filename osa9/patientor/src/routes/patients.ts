import express, { NextFunction, Request, Response } from 'express';
import { NewPatient, NonSensitivePatient, Patient } from '../types';
import { addPatient, getPatients } from '../services/patientService';
import { newPatientSchema } from '../utils';
import z from 'zod';

const router = express.Router();

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => { 
  try {
    newPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(getPatients());
});

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
  const addedPatient = addPatient(req.body);
  res.json(addedPatient);
});

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => { 
  if (error instanceof z.ZodError) {
    // I set a different error message because the frontend wouldn't understand the { error: error.issues } response
    res.status(400).send(error.issues[0].message);
  } else {
    next(error);
  }
};

router.use(errorMiddleware);

export default router;