import { useMemo } from "react";

const StudentModal = ({}: ModalPayloadProps<Student>) => {
  const initialState = useMemo(() => payload ?? {}, [payload]);
  return <>StudentModal</>;
};

export default StudentModal;
