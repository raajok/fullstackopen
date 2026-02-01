import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Gender, Patient } from "../types";
import patients from "../services/patients";
import { Female, Male, Transgender } from "@mui/icons-material";

function GenderIcon({ gender }: { gender: Gender }) {
  switch (gender) {
    case 'male':
      return <Male />;
    case 'female':
      return <Female />;
    default:
      return <Transgender />;
  }
}

export default function PatientPage() {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    if (id) {
      patients.getOne(id).then(data => setPatient(data));
    }
  }, [id]);

  if (!patient) {
    return null;
  }

  return (
    <div>
      <h1>{patient.name} <GenderIcon gender={patient.gender} /></h1>
      {patient.ssn && <p>ssn: {patient.ssn}</p>}
      {<p>occupation: {patient.occupation}</p>}
    </div>
  );
}