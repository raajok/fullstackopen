import axios from "axios";
import type { NewDiaryEntry, NonSensitiveDiaryEntry } from "../types";

const baseUrl = 'http://localhost:3000/api/diaries';

export async function getAllDiaryEntries() {
  return axios.get<NonSensitiveDiaryEntry[]>(baseUrl).then(response => response.data);
}

export async function createDiaryEntry(object: NewDiaryEntry) {
  return axios.post<NonSensitiveDiaryEntry>(baseUrl, object).then(response => response.data);
}