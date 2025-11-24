export function convertDateToYMD(date: Date) {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  return { y, m, d };
}

export function convertDateToString(date: Date, format?: "YYYY-MM-DD"): string {
  const { y, m, d } = convertDateToYMD(date);
  switch (format) {
    default:
      return `${y}-${m}-${d}`;
  }
}

export function convertStringToDate(string: string): Date {
  return new Date(string);
}
