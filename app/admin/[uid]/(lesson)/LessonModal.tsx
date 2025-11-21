"use client";

import { useAlertStore } from "@/components/ui/Alert";
import { AdminComponent } from "@/components/ui/feature";
import { useAuth } from "@/contexts/react/AuthProvider";
import { useForm, useSelect, useTextInput } from "@/hooks";
import useLessons from "@/hooks/react_query/useLessons";
import {
  lessonCounts,
  lessonLengths,
  lessonSorts,
  subjects,
} from "@/lib/dummy";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

const LessonModal = ({
  onCancel,
  onSuccess,
  payload,
}: ModalPayloadProps<Lesson>) => {
  const initialState = useMemo<LessonPayload | Lesson>(
    () =>
      payload ??
      ({
        count_per_week: 0,
        length: 0,
        name: "",
        price: 0,
        sort: "",
        subject: "",
      } as LessonPayload),
    [payload]
  );

  const state = useState(initialState);

  const Sort = useSelect({ state, target: "sort" });
  const Count = useSelect({ state, target: "count_per_week" });
  const Length = useSelect({ state, target: "length" });
  const Subject = useSelect({ state, target: "subject" });
  const Name = useTextInput({ state, target: "name" });
  const Price = useTextInput({ state, target: "price" });

  const { alert } = useAlertStore();

  const router = useRouter();
  const handleCancel = useCallback(
    () =>
      alert(`${payload ? "수정" : "등록"}을 취소하시겠습니까?`, [
        { text: "계속" },
        { text: "취소", warning: true, onClick: onCancel ?? router.back },
      ]),
    [onCancel, payload, router, alert]
  );

  const { Form, handler, SubmitArea, SubmitButton, CancelButton } = useForm();
  const { user } = useAuth();
  const { onPOST, onPUT } = useLessons({ uid: user?.uid as string });
  const handleSubmit = useCallback(
    () =>
      handler(async () => {
        if (Sort.message) {
          return alert(Sort.message, [{ onClick: Sort.focusSelect }]);
        }
        if (Subject.message) {
          return alert(Subject.message, [{ onClick: Subject.focusSelect }]);
        }
        if (Count.message) {
          return alert(Count.message, [{ onClick: Count.focusSelect }]);
        }
        if (Length.message) {
          return alert(Length.message, [{ onClick: Length.focusSelect }]);
        }
        if (Price.message) {
          return alert(Price.message, [{ onClick: Price.focus }]);
        }
        if (Name.message) {
          return alert(Name.message, [{ onClick: Name.focus }]);
        }
        if (payload) {
          await onPUT(state[0]);
        } else {
          await onPOST(state[0]);
        }
        alert(`${payload ? "수정" : "등록"}되었습니다!`, [
          { onClick: onSuccess ?? router.back },
        ]);
      }),
    [
      alert,
      state,
      Sort,
      Count,
      Length,
      Subject,
      Name,
      Price,
      onSuccess,
      payload,
      handler,
      router,
      onPUT,
      onPOST,
    ]
  );
  return (
    <Form onSubmit={handleSubmit}>
      <AdminComponent.Back onClick={handleCancel}>
        {state[0].name.length === 0 ? "뒤로" : state[0].name}
      </AdminComponent.Back>

      <div className="row gap-2 items-start">
        <Sort.Select
          {...Sort.props}
          data={lessonSorts}
          container={{ className: "min-w-30" }}
          onSubmitEditing={Subject.focusSelect}
          label="분류"
        />
        <Subject.Select
          {...Subject.props}
          label="교육과목"
          data={subjects}
          container={{ className: "min-w-30" }}
          onSubmitEditing={Count.focusSelect}
        />
      </div>
      <div className="row gap-2 items-start">
        <Count.Select
          {...Count.props}
          data={lessonCounts}
          onSubmitEditing={Length.focusSelect}
          label="주(횟수)"
          container={{ className: "flex-1" }}
        />
        <Length.Select
          {...Length.props}
          data={lessonLengths}
          label="수업(분)"
          container={{ className: "flex-1" }}
          onSubmitEditing={Price.focus}
        />
        <Price.TextInput
          {...Price.props}
          label="원비(1개월 수강료)"
          container={{ className: "flex-2" }}
        />
      </div>
      <Name.TextInput
        {...Name.props}
        label="수업이름"
        placeholder="예) 윤비서101"
      />

      <SubmitArea>
        <CancelButton onClick={handleCancel}>취소</CancelButton>
        <SubmitButton className="flex-1">
          {payload ? "수정" : "등록"}
        </SubmitButton>
      </SubmitArea>
    </Form>
  );
};

export default LessonModal;
