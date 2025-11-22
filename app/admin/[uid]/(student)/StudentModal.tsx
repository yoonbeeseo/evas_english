"use client";

import { useForm, useTextInput } from "@/hooks";
import { useMemo, useState } from "react";

const StudentModal = ({ payload }: ModalPayloadProps<Student>) => {
  const initialState = useMemo<Student | StudentPayload>(
    () => payload ?? ({} as StudentPayload),
    [payload]
  );
  const state = useState(initialState);

  const Name = useTextInput();
  const Dob = useTextInput();
  const Mobile = useTextInput();

  const { Form, handler, SubmitArea, CancelButton, SubmitButton } = useForm();

  return (
    <Form>
      <div className="row">
        <p>name</p>
        <p>dob</p>
      </div>
    </Form>
  );
};

export default StudentModal;
