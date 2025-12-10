import z from "zod";

export function emailValidator(
  email: string,
  emails?: string[]
): ValidatorMessage {
  const schema = z.email(email as string);
  const { error } = schema.safeParse(email);
  if (error) {
    return JSON.parse(error.message)[0].message;
  }

  if (emails) {
    const found = emails.some((item) => item === email);
    if (found) {
      return "중복된 이메일입니다.";
    }
  }
  return null;
}
