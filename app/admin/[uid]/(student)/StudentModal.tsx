"use client";

import { useForm, useModal, useTextInput } from "@/hooks";
import { convertDateToString } from "@/lib/convertor";
import { useMemo, useState, useEffect } from "react";
import AddressModal from "./AddressModal";

const StudentModal = ({ payload }: ModalPayloadProps<Student>) => {
  const initialState = useMemo<Student | StudentPayload>(
    () => payload ?? ({} as StudentPayload),
    [payload]
  );
  const state = useState(initialState);

  const Name = useTextInput({ state, target: "name" });
  const Dob = useTextInput({
    state,
    target: "dob",
    value: convertDateToString(
      new Date(
        `${new Date().getFullYear() - 10}/${
          new Date().getMonth() + 1
        }/${new Date().getDate()}`
      )
    ),
  });

  const Mobile = useTextInput();
  const Add = useModal();
  const Par = useModal();

  const { Form, handler, SubmitArea, CancelButton, SubmitButton } = useForm();

  console.log(
    convertDateToString(
      new Date(
        `${new Date().getFullYear() - 10}/${
          new Date().getMonth() + 1
        }/${new Date().getDate()}`
      )
    )
  );
  return (
    <Form>
      <div className="row gap-2 items-start">
        <Name.TextInput
          {...Name.props}
          label="이름"
          container={{ className: "flex-2" }}
          placeholder="예) 윤비서"
        />
        <Dob.TextInput
          {...Dob.props}
          label="생년월일"
          container={{ className: "flex-1" }}
          type="date"
          defaultValue={convertDateToString(
            new Date(
              `${new Date().getFullYear() - 10}/${
                new Date().getMonth() + 1
              }/${new Date().getDate()}`
            )
          )}
        />
      </div>
      <Mobile.TextInput
        {...Mobile.props}
        label="연락처"
        placeholder="예) 010-1234-1234"
        type="tel"
      />
      <button type="button" onClick={Add.handler}>
        click here to search
      </button>
      <Add.Modal {...Add.props}>
        <Add.Container>
          <AddressModal />
        </Add.Container>
      </Add.Modal>
      <div>학부모</div>
      <div>수강수업</div>
    </Form>
  );
};

export default StudentModal;
