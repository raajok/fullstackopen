import express, { Response } from 'express';
import getDiagnoses from '../services/diagnoseService';
import { Diagnosis } from '../types';

const router = express.Router();

router.get('/', (_req, res: Response<Diagnosis[]>) => {
  res.send(getDiagnoses());
});

export default router;