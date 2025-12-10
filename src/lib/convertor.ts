export function getPricePerMin(lesson: Lesson | LessonPayload): number {
  const cpw = parseInt(lesson.countPerWeek.split("회")[0]);
  const len = parseInt(lesson.lengthPerLesson.split("분")[0]);

  return lesson.price / (cpw * 4 * len);
}
