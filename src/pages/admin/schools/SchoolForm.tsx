import { useCallback, useMemo, useState } from "react";
import { useForm, useDexylect, useTextInput } from "../../../components/hooks";
import { Button } from "../../../components/ui";
import { schoolLevels, schoolSorts } from "../../../lib";
import { useAtuh } from "../../../providers/contexts/Auth.use";
import { useSchools } from "../../../providers/rq";
import { useNavigate } from "react-router";

const SchoolForm = ({
  onCancel,
  onDone,
  payload,
  isStudent,
}: FormPayload<School> & { isStudent: boolean }) => {
  const { Form, handler } = useForm();

  const initialState = useMemo<School | SchoolPayload>(
    () => payload ?? ({ level: null, name: "", sort: "" } as SchoolPayload),
    [payload]
  );

  const state = useState(initialState);

  const Name = useTextInput({ state, target: "name" });
  const Sort = useDexylect({ state, target: "sort" });
  const Level = useDexylect({});

  const { user } = useAtuh();
  const { createSchool, replaceSchool } = useSchools(user);
  const navi = useNavigate();

  const onSubmit = useCallback(
    () =>
      handler(async () => {
        console.log(Name.message, Name.value, Sort.message, state[0]);
        // return console.log(state[0]);
        if (Sort.message) {
          Sort.focusSelect();
          alert(Sort.message);
          return;
        }
        if (Name.message) {
          Name.focus();
          alert(Name.message);
          return;
        }

        try {
          !payload
            ? await createSchool(state[0])
            : await replaceSchool(state[0] as School);

          if (
            confirm(
              `${payload ? "수정" : "추가"}되었습니다.${
                !payload && " 새로운 학교를 추가하시겠습니까?"
              }`
            )
          ) {
            state[1](initialState);
            Sort.showPicker();
            return;
          }
          navi("/admin/schools");
        } catch (error: any) {
          alert(error.message);
        }
      }),
    [
      payload,
      Name,
      Sort,
      Level,
      isStudent,
      state,
      createSchool,
      replaceSchool,
      initialState,
      navi,
    ]
  );
  return (
    <Form
      className="w-full max-w-75 mx-auto container border rounded-xl gap-2"
      onSubmit={onSubmit}
    >
      <h1>학교 {payload ? "수정" : "추가"}</h1>
      <div className="flex-row">
        <Sort.Select
          {...Sort.props}
          required
          label="분류"
          data={schoolSorts}
          onSubmitEditing={Name.focus}
          placeholder="분류 선택"
          className="gray"
        />
      </div>
      <Name.TextInput
        {...Name.props}
        label="학교/직장 이름"
        className="gray"
        required
      />
      {isStudent && (
        <Level.Select
          {...Level.props}
          label="학년/직급"
          data={schoolLevels}
          required
        />
      )}
      <div className="flex-row gap-2">
        <Button.Cancel>취소</Button.Cancel>
        <Button.Submit className="flex-1">
          {payload ? "수정" : "추가"}
        </Button.Submit>
      </div>
    </Form>
  );
};

export default SchoolForm;
