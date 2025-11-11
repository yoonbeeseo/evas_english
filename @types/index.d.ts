interface School {
  name: string;
  sort: SchoolSort | "";
  level: SchoolLevel | null;
  id: number;
  created_at: Date;
  updated_at: Date;
}
type SchoolLevel = "1학년" | "2학년" | "3학년" | "4학년" | "5학년" | "6학년";
type SchoolSort =
  | "어린이집"
  | "유치원"
  | "초등학교"
  | "중학교"
  | "고등학교"
  | "대학교"
  | "기타";

type SchoolPayload = Omit<School, "id" | "created_at" | "updated_at">;

interface SchoolEntity extends School {
  uid: string;
}

type LessonSort = "유치부" | "초등부" | "중등부" | "고등부" | "성인부";
interface Lesson {
  name: string;
  sort: LessonSort | "";
  id: number;
  created_at: Date;
  updated_at: Date;
  subject: string;
  count_per_week: number;
  price: number;
  length: number;
}

type LessonPayload = Omit<Lesson, "id" | "created_at" | "updated_at">;
interface LessonEntity extends Lesson {
  uid: string;
}

interface Parent {
  id: string;
  created_at: Date;
  updated_at: Date;
  name: string;
  relationship: ParentRelationship | string;
  mobile: string;
  has_privay_policy: Date | null;
  has_privay_policy_on_behalf: Date | null;
}
type ParentPayload = Omit<Parent, "id" | "created_at" | "updated_at">;
interface ParentEntity extends Parent {
  uid: string;
}

interface Student {
  id: string;
  name: string;
  mobile: string;
  dob: string;
  address: Address;
  payment_date: number;
  enrolled_at: Date;
  created_at: Date;
  updated_at: Date;
  lessons: Lesson[];
  schools: (School & { is_current: boolean })[];
  parents: Parent[];
}

type StudentPayload = Omit<Student, "id" | "created_at" | "updated_at">;

interface StudentEntity
  extends Omit<StudentPayload, "parents" | "schools" | "lessons"> {
  id: string;
  uid: string;
}
