export function convertDateToYMD(date: Date) {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  return { y, m, d };
}

export function convertDateToString(date: Date, format?: "YYYY-MM-DD"): string {
  const { y, m, d } = convertDateToYMD(date);
  console.log({ y, m, d });
  switch (format) {
    default:
      return `${y}-${m}-${d}`;
  }
}

export function convertStringToDate(string: string): Date {
  return new Date(string);
}

export function purifyString(string: string, replacedTo: string): string {
  return string.replaceAll(replacedTo, "");
}
export function convertString(
  string: string,
  replacedTo: string,
  indexes: number[]
): string {
  const copy = purifyString(string, replacedTo);

  let text = "";
  Array.from({ length: copy.length }, (_, i) => {
    if (indexes.some((index) => index === i)) {
    }
  });
  return copy;
}
