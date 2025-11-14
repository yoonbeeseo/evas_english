import { create } from "zustand";

export interface AdminUser {
  name: string;
  ceo: string;
  regi: string;
  emails: string[];
  tels: string[];
  address: null | { zipcode: string; rest: string; roadAddress: string };
  uid: string;
  subjects: string[];
  students: Student[];
  lessons: Lesson[];
  schools: School[];
  parents: Parent[];
}

interface Props {
  user: AdminUser | null;
  login: (user: AdminUser) => void;
  logout: () => void;
}

export const useUserStore = create<Props>()((set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
