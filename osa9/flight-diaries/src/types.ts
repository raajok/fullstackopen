/*
NOTE TO REVIEWERS:
I copied the types from GitHub of the given backend.
Newer version of typescript seems to have disallowed enums. I took a solution from here:
https://stackoverflow.com/questions/79688441/typescript-enum-alternative-following-the-use-of-erasablesyntaxonly-flag
to get rid of the enums. This is actually similar to what I do at work.
*/

export const WeatherEnum = {
  Sunny: 'sunny',
  Rainy: 'rainy',
  Cloudy: 'cloudy',
  Stormy: 'stormy',
  Windy: 'windy',
} as const;

export type Weather = typeof WeatherEnum[keyof typeof WeatherEnum];

export const VisibilityEnum = {
  Great: 'great',
  Good: 'good',
  Ok: 'ok',
  Poor: 'poor',
} as const;

export type Visibility = typeof VisibilityEnum[keyof typeof VisibilityEnum];

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment: string;
}

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;