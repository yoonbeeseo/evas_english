import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.SB_API_URL!,
  process.env.SB_ANON_KEY!
);

export enum Collection {
  ADMIN_TELS = "admin_tels",
  ADMIN_EMAILS = "admin_emails",
  ADMIN_ADDRESS = "admin_addresses",
  ADMIN_SUBJECTS = "admin_subjects",
  USERS = "users",
  SCHOOLS = "schools",
  LESSONS = "lessons",
  PARENTS = "parents",
  STUDENTS = "students",
}
