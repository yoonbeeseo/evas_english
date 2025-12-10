import { db } from "./firebase";

export const userRef = db.collection("users");

export const schoolRef = (uid: string) =>
  userRef.doc(uid).collection("schools");
export const lessonRef = (uid: string) =>
  userRef.doc(uid).collection("lessons");
export const parentRef = (uid: string) =>
  userRef.doc(uid).collection("parents");
export const studentRef = (uid: string) =>
  userRef.doc(uid).collection("students");
export const extraRef = (uid: string) => userRef.doc(uid).collection("extras");

export const bizinfoRef = (uid: string) =>
  userRef.doc(uid).collection("bizinfo");
