import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { useAtuh } from "../../../providers/contexts/Auth.use";
import { useLessons } from "../../../providers/rq";
import { useDexylect, useForm, useTextInput } from "../../../components/hooks";
import { lessonSorts } from "../../../lib";

const LessonForm = ({ payload }: FormPayload<Lesson>) => {
  const bizinfo_id = useSearchParams()[0].get("bizinfo_id");
  const initialState = useMemo(
    () =>
      payload ??
      ({
        countPerWeek: 1,
        lengthPerLesson: 45,
        name: "",
        price: 0,
        sort: "",
        subject: "",
      } as LessonPayload),
    [payload]
  );
  const state = useState(initialState);

  const { user } = useAtuh();
  const { createLesson, replaceLesson } = useLessons(user, bizinfo_id!);
  const { Form, handler } = useForm();

  const Sort = useDexylect({ state, target: "sort" });
  const Name = useTextInput({ state, target: "name" });
  const CPW = useDexylect({ state, target: "countPerWeek" });
  const LPL = useDexylect({ state, target: "lengthPerLesson" });
  const Price = useTextInput({ state, target: "price" });

  const PPM = useTextInput();

  useEffect(() => {
    const { countPerWeek, lengthPerLesson, price } = state[0];
  }, [state]);

  return (
    <Form className="max-w-75 w-full mx-auto countainer bg-white p-2 border rounded-xl gap-2">
      <div className="flex-row gap-2">
        <Sort.Select
          {...Sort.props}
          label="분류"
          className="gray"
          data={lessonSorts}
          onSubmitEditing={Name.focus}
        />
      </div>
      <Name.TextInput {...Name.props} label="클래스 이름" className="gray" />
      <div className="flex-row gap-4">
        <div className="flex-row gap-2">
          <CPW.Select
            {...CPW.props}
            label="횟수/주"
            data={Array.from({ length: 10 }, (_, i) => `${i + 1}회`)}
            placeholder="선택"
            onSubmitEditing={LPL.showPicker}
          />
          <LPL.Select
            {...LPL.props}
            label="수업시간"
            data={Array.from({ length: 36 }, (_, i) => `${(i + 1) * 5}분`)}
            placeholder="선택"
            onSubmitEditing={Price.focus}
          />
        </div>
        <PPM.TextInput
          {...PPM.props}
          readOnly
          label="분당단가"
          className="flex-1 border-Gray border-2 w-full gray"
        />
      </div>
      <Price.TextInput {...Price.props} label="원비" type="tel" />
    </Form>
  );
};

export default LessonForm;
