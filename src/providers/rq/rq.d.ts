interface MutationFunc<T> {
  payload: T;
  method: "POST" | "GET" | "PATCH" | "PUT" | "DELETE";
}

type SchoolSort =
  | "어린이집"
  | "유치원"
  | "초등학교"
  | "중학교"
  | "고등학교"
  | "대학교"
  | "직장"
  | "직접입력";

type SchoolLevel = "1학년" | "2학년" | "3학년" | "4학년" | "5학년" | "6학년";
interface School {
  name: string;
  sort: SchoolSort | "";
  level: null | SchoolLevel;
  id: string;
  created_at: Date;
  updated_at: Date;
  bizinfo_id: string;
}

type SchoolPayload = DBPayload<School, "bizinfo_id">;

interface PatchProps<T> {
  target: keyof T;
  value: any;
  id: string;
}

type LessonSort =
  | "유치부"
  | "초등부"
  | "중등부"
  | "고등부"
  | "성인부"
  | "직접입력";

interface Lesson {
  name: string;
  sort: LessonSort | "";
  id: string;
  created_at: Date;
  updated_at: Date;
  bizinfo_id: string;
  subject: string;
  countPerWeek: number;
  lengthPerLesson: number;
  price: number;
}

type LessonPayload = DBPayload<Lesson, "bizinfo_id">;
