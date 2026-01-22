import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.send({
      error: "malformatted parameters"
    });
  } else {
    res.send({
      weight: weight,
      height: height,
      bmi: calculateBmi(height, weight),
    });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.status(400).send("parameters missing");
  }

  const targetNum = Number(target);
  if (isNaN(targetNum)) {
    return res.status(400).send("malformatted parameters");
  }

  // Validate that the array has numbers only
  if (!(daily_exercises instanceof Array)) {
    return res.status(400).send("malformatted parameters");
  } else {
    let isMalformatted = false;
    daily_exercises.forEach(ex => {
      if (isNaN(Number(ex))) {
        isMalformatted = true;
      }
    });

    if (isMalformatted) {
      return res.status(400).send("malformatted parameters");
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const hours: number[] = daily_exercises;

  return res.send(calculateExercises(hours, targetNum));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});