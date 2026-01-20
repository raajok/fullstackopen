interface ExerciseValues {
  hours: number[];
  target: number;
}

type Rating = 1 | 2 | 3;
type Description = "Excellent work." | "Quite terrible." | "So close.";

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: Rating;
  ratingDescription: Description;
  target: number;
  average: number;
}

function parseExerciseArguments(args: string[]): ExerciseValues {
  if (args.length < 4) throw new Error("Not enough arguments");

  const target = Number(args[2]);
  if (isNaN(target)) {
    throw new Error('Provided target was not a number!');
  }

  let hours: number[] = [];
  for (let i = 3; i < args.length; i++) {
    const hour = Number(args[i]);
    if (isNaN(hour)) {
      throw new Error('Provided hours were not all numbers!');
    } else {
      hours.push(hour);
    }
  }

  return {
    hours,
    target
  }
}

function calculateExercises(hours: number[], target: number): Result {
  const average = hours.reduce(((prev, curr) => prev + curr), 0) / hours.length;

  let rating: Rating = 3;
  let ratingDescription: Description = "Excellent work.";
  const reachedPercentage = average / target;
  if (reachedPercentage < 0.5) {
    rating = 1;
    ratingDescription = "Quite terrible.";
  } else if (reachedPercentage < 1) {
    rating = 2;
    ratingDescription = "So close.";
  }

  return {
    periodLength: hours.length,
    trainingDays: hours.filter(hour => hour !== 0).length,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average,
  }
}

try {
  const { hours, target } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(hours, target));
} catch (error: unknown) {
  if (error instanceof Error) {
    console.error(error.message);
  } else {
    console.error("Something bad happened.");
  }
}