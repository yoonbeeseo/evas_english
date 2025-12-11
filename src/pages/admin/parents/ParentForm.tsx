import React, { useCallback, useMemo, useState } from "react";
import { useDexylect, useForm, useTextInput } from "../../../components/hooks";
import { useParents } from "../../../providers/rq";
import { useAtuh } from "../../../providers/contexts/Auth.use";
import { useNavigate } from "react-router";
import { parentTitles } from "../../../lib";

const ParentForm = ({ payload }: FormPayload<Parent | ParentPayload>) => {
  const initialState = useMemo<Parent | ParentPayload>(
    () =>
      payload ??
      ({
        bizinfo_ids: [],
        contacts: [],
        has_privacy_policy: null,
        has_privacy_policy_on_behalf: null,
        name: "",
        student_ids: [],
        title: "",
      } as ParentPayload),
    [payload]
  );

  const state = useState(initialState);

  const Title = useDexylect({ state, target: "title" });
  const Name = useTextInput({ state, target: "name" });
  const Sort = useDexylect({ value: "휴대폰" });
  const Mobile = useTextInput();

  const { user, bizinfo } = useAtuh();
  const { createParent, replaceParent } = useParents(user, bizinfo?.id!);
  const { Form, handler } = useForm();
  const navi = useNavigate();

  const onSubmit = useCallback(
    () =>
      handler(async () => {
        if (Title.message) {
          Title.focusSelect();
          alert(Title.message);
          return;
        }
        if (Name.message) {
          Name.focus();
          alert(Name.message);
          return;
        }
        if (Mobile.message) {
          Mobile.focus();
          alert(Mobile.message);
          return;
        }

        if (payload) {
          await replaceParent(state[0] as Parent);
        } else {
          await createParent(state[0]);
        }

        if (
          confirm(
            `${payload ? "추가" : "수정"}되었습니다. 계속해서 추가하시겠습니까?`
          )
        ) {
          return state[1](initialState);
        }
        navi(-1);
      }),
    [
      handler,
      state,
      Title,
      Name,
      Mobile,
      payload,
      replaceParent,
      createParent,
      initialState,
      navi,
    ]
  );

  return (
    <Form className="mt-4 container w-full border max-w-75 mx-auto gap-2">
      <div className="flex-row">
        <Title.Select
          {...Title.props}
          label="관계"
          data={parentTitles}
          placeholder="선택"
          required
        />
      </div>
      <Name.TextInput {...Name.props} label="이름" required />
      <div className="flex-row gap-2">
        <Sort.Select
          {...Sort.props}
          label="분류"
          required
          data={["휴대폰", "일반전화"]}
          placeholder="선택"
        />
        <Mobile.TextInput {...Mobile.props} label="연락처" required />
      </div>
    </Form>
  );
};

export default ParentForm;
