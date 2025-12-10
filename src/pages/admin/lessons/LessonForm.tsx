import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useAtuh } from "../../../providers/contexts/Auth.use";
import { useLessons } from "../../../providers/rq";
import { useDexylect, useForm, useTextInput } from "../../../components/hooks";
import { lessonSorts } from "../../../lib";
import { Button } from "../../../components/ui";
import { getPricePerMin } from "../../../lib/convertor";

const LessonForm = ({ payload }: FormPayload<Lesson>) => {
  const bizinfo_id = useSearchParams()[0].get("bizinfo_id");
  const initialState = useMemo(
    () =>
      payload ??
      ({
        countPerWeek: "1회",
        lengthPerLesson: "45분",
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
    const fn = () =>
      PPM.props.onChangeText(getPricePerMin(state[0]).toFixed(2));

    fn();
    return () => {
      fn();
    };
  }, [state]);

  const navi = useNavigate();

  const onSubmit = useCallback(
    () =>
      handler(async () => {
        const lesson = state[0];
        if (Sort.message) {
          alert(Sort.message);
          Sort.focusSelect();
          return;
        }
        if (Name.message) {
          Name.focus();
          alert(Name.message);
          return;
        }
        if (CPW.message) {
          CPW.focusSelect();
          alert(CPW.message);
          return;
        }
        if (LPL.message) {
          LPL.focusSelect();
          alert(LPL.message);
          return;
        }
        if (Price.message) {
          Price.focus();
          alert(Price.message);
          return;
        }

        if (payload) {
          await replaceLesson(lesson as Lesson);
        } else {
          await createLesson(lesson);
        }
        if (
          confirm(
            `${payload ? "수정" : "추가"}되었습니다. 계속해서 추가하시겠습니까?`
          )
        ) {
          return state[1](initialState);
        }
        navi(-1);
      }),
    [handler, state, createLesson, replaceLesson, payload, initialState, navi]
  );

  return (
    <Form
      className="max-w-75 w-full mx-auto countainer bg-white p-2 border rounded-xl gap-2 mt-4"
      onSubmit={onSubmit}
    >
      <div className="flex-row gap-2">
        <Sort.Select
          {...Sort.props}
          label="분류"
          className="gray"
          data={lessonSorts}
          onSubmitEditing={Name.focus}
          placeholder="선택"
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
          label="분당단가*"
          className="flex-1 border-Gray border-2 w-full gray text-Gray"
        />
      </div>
      <Price.TextInput {...Price.props} label="원비" type="tel" />
      <div className="flex-row">
        <Button.Cancel className="px-4">취소</Button.Cancel>
        <Button.Submit className="flex-1">
          {payload ? "수정" : "추가"}
        </Button.Submit>
      </div>
    </Form>
  );
};

export default LessonForm;
