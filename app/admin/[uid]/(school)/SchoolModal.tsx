"use client";

import { useAlertStore } from "@/components/ui/Alert";
import { useForm, useSelect, useTextInput } from "@/hooks";
import { useSchools } from "@/hooks/react_query";
import { schoolSorts } from "@/lib/dummy";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { IoChevronBack } from "react-icons/io5";

const SchoolModal = ({ payload, isStudent, queryKey }: ModalProps<School>) => {
  const initialState = useMemo<SchoolPayload>(
    () => payload ?? { level: null, name: "", sort: "" },
    [payload]
  );
  const state = useState(initialState);

  const { Form, handler, SubmitButton, SubmitArea, CancelButton } = useForm();
  const Sort = useSelect<SchoolPayload>({
    state,
    target: "sort",
    validator: (sort) => {
      if (sort.length === 0) {
        return "분류를 선택해주세요.";
      }
      return null;
    },
  });

  const Name = useTextInput<SchoolPayload>({
    state,
    target: "name",
    validator: (name) => {
      if (name.length === 0) {
        return "학교 이름을 입력해주세요.";
      }
      return null;
    },
  });

  const Level = useSelect<SchoolPayload>({ state, target: "level" });

  const router = useRouter();

  const { alert } = useAlertStore();
  const { onCreate, onUpdate } = useSchools({ queryKey });
  const onSubmit = useCallback(
    () =>
      handler(async () => {
        const { name, sort, level } = state[0];
        if (Sort.message) {
          return alert(Sort.message, [{ onClick: Sort.focusSelect }]);
        }
        if (Name.message) {
          return alert(Name.message, [{ onClick: Name.focus }]);
        }
        if (isStudent) {
          if (Level.message) {
            return alert(Level.message, [{ onClick: Level.focusSelect }]);
          }
        }
        if (payload) {
          await onUpdate(state[0]);
        } else {
          await onCreate(state[0]);
        }
        alert(`${payload ? "수정" : "등록"}되었습니다.`, [
          { onClick: router.back },
        ]);
      }),
    [
      state,
      handler,
      onCreate,
      alert,
      onUpdate,
      Name,
      Sort,
      Level,
      isStudent,
      payload,
      router,
    ]
  );

  return (
    <div>
      <div className="row">
        <button
          onClick={() =>
            alert(`${payload ? "수정을" : "등록을"} 취소하시겠습니까?`, [
              { onClick: router.back, text: "취소", warning: true },
              { text: "계속" },
            ])
          }
          className="text bg-transparent font-bold hover:text-blue-500"
        >
          <IoChevronBack />
          {payload ? state[0].name : "뒤로"}
        </button>
      </div>

      <Form
        className="max-w-125 p-5 border-t border-gray-200"
        onSubmit={onSubmit}
      >
        <div className="row">
          <Sort.Select
            data={schoolSorts}
            {...Sort.props}
            label="분류"
            onSubmitEditing={Name.focus}
          />
        </div>
        <Name.TextInput
          {...Name.props}
          placeholder="학교 이름"
          label="학교이름"
        />
        <SubmitArea>
          <CancelButton>취소</CancelButton>
          <SubmitButton className="flex-1">등록</SubmitButton>
        </SubmitArea>
      </Form>
    </div>
  );
};

export default SchoolModal;
