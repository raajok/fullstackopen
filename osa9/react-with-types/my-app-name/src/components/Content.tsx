import type { CoursePart } from "../types";
import Part from "./Part";

interface ContentProps {
  courseParts: CoursePart[];
}

export default function Content({ courseParts }: ContentProps) {
  return courseParts.map(part => <Part key={part.name} part={part} />);
}