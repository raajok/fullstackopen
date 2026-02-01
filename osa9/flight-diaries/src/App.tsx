import { useEffect, useState } from "react"
import { type Visibility, VisibilityEnum, WeatherEnum, type NonSensitiveDiaryEntry, type Weather } from "./types";
import { createDiaryEntry, getAllDiaryEntries } from "./services/diaryService";
import axios from "axios";

function App() {
  const [diaryEntries, setDiaryEntries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState<Visibility>('good');
  const [weather, setWeather] = useState<Weather>('cloudy');
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getAllDiaryEntries().then(data => {
      setDiaryEntries(data);
    });
  }, []);

  const diaryEntryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newDiaryEntry = { date, visibility, weather, comment };

    createDiaryEntry(newDiaryEntry)
      .then(data => {
        setDiaryEntries(diaryEntries.concat(data));
        setError('');
      }).catch(error => {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            setError(error.response.data);
          } else {
            setError(error.message);
          }
        }
      });
  }

  return (
    <div>
      <h1>Add new entry</h1>
      <p>{error}</p>
      <form onSubmit={diaryEntryCreation}>
        <div>
          date <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
        </div>
        <div>
          visibility {Object.values(VisibilityEnum).map(vis => {
            return <>
              {vis}
              <input type="radio" value={vis} onChange={() => setVisibility(vis)} />
            </>
          })}
        </div>
        <div>
          weather {Object.values(WeatherEnum).map(weather => {
            return <>
              {weather}
              <input type="radio" value={weather} onChange={() => setWeather(weather)} />
            </>
          })}
        </div>
        <div>
          comment <input value={comment} onChange={(event) => setComment(event.target.value)} />
        </div>
        <button type='submit'>add</button>
      </form>

      <h1>Diary entries</h1>
      {diaryEntries.map(entry => (
        <div key={entry.id}>
          <b>{entry.date}</b>
          <p>visibility: {entry.visibility}</p>
          <p>weather: {entry.weather}</p>
        </div>
      ))}
    </div>
  )
}

export default App;
