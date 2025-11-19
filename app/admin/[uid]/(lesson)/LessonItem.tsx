import React from "react";

const LessonItem = ({
  uid,
  item: lesson,
}: ListItemProps<Lesson> & { uid: string }) => {
  return <li>LessonItem</li>;
};

export default LessonItem;
