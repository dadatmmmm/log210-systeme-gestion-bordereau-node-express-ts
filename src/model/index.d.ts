// interface EntityJSON {
//   id: string;
// }


interface GroupStudentJSON{
  group_id: string;
  student_id: string;
}

interface SemesterJSON  {
  name: string;
  start: string;
  end: string;
}
interface UserJSON  {
  first_name: string;
  last_name: string;
  id: string;
}

interface validUserJSON  {
  token: string;
  user: {
    first_name: string;
    last_name: string;
    id: string;
  }
}

export interface ScheduleJSON  {
  group_id: string;
  day: string;
  hours: string;
  activity: string;
  mode: string
  local: string
  teacher_id: string
}

export interface CourseJSON  {
  id: string;
  prealable: string;
  titre: string;
}

export interface StudentJSON extends UserJSON {
}

export interface TeacherJSON extends UserJSON {
  
}

export interface GradeJSON {
  student_id: string;
  group_id: string;
  type: string;
  type_id: number;
  note: number;
}

export interface Session {
  id: string;
  date: number;
  issued: number;
  expires: number;
}

export interface EncodeResult {
  token: string,
  expires: number,
  issued: number
}

export type DecodeResult =
  | {
        type: "Valide" | "Token invalide" | "Erreur d'intégrité";
        session: Session;
        id: string;
    }

export type ExpirationStatus = "expired" | "active" | "grace";

export type PartialSession = Omit<Session, "issued" | "expires">;


