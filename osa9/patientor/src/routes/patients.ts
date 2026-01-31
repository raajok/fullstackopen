import express, { Response } from 'express';
import { NonSensitivePatient } from '../types';
import { addPatient, getPatients } from '../services/patientService';
import { toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(getPatients());
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something wnet wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;