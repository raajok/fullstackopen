import express, { Response } from 'express';
import { NonSensitivePatient } from '../types';
import getPatients from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(getPatients());
});

export default router;