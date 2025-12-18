import { useCallback, useMemo, useState } from "react";
import {
  useDexylect,
  useForm,
  useSwitch,
  useTextInput,
} from "../../../components/hooks";
import { useParents } from "../../../providers/rq";
import { useAtuh } from "../../../providers/contexts/Auth.use";
import { useNavigate } from "react-router";
import { parentTitles } from "../../../lib";
import JusoForm from "./JusoForm";
import useModal from "../../../components/hooks/useModal";

const ParentForm = ({
  payload,
  isParent,
  isAdmin,
}: FormPayload<Parent | ParentPayload> & {
  isParent?: boolean;
  isAdmin?: boolean;
}) => {
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
        address: null,
      } as ParentPayload),
    [payload]
  );

  const state = useState(initialState);

  const Title = useDexylect({ state, target: "title" });
  const Name = useTextInput({ state, target: "name" });
  const Sort = useDexylect({ value: "휴대폰" });
  const Mobile = useTextInput();

  const PP = useSwitch();
  const PPOB = useSwitch();
  const RAPP = useSwitch();
  const RAPPOB = useSwitch();

  const A = useModal();

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

        // RAPP 일 경우 학부모 알림 창에 요청 서류를 추가하고 학부모에게 서명요청이 왔습니다.
        if (payload) {
          const res = await replaceParent(state[0] as Parent);
          if (res) {
            //! 서명 요청시 props 필요
            // if(RAPP.state ){
            //   await parentRef(user?.uid!).doc(res.id).collection('requiry').add({})
            // }
          }
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
      PP,
      PPOB,
      RAPP,
    ]
  );

  return (
    <Form
      className="mt-4 container w-full border max-w-75 mx-auto gap-2"
      onSubmit={onSubmit}
    >
      <div className="flex-row">
        <Title.Select
          {...Title.props}
          label="관계"
          data={parentTitles}
          placeholder="선택"
          required
          onSubmitEditing={Name.focus}
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
          onSubmitEditing={Mobile.focus}
        />
        <Mobile.TextInput {...Mobile.props} label="연락처" required />
      </div>
      <button type="button" onClick={A.turnOn}>
        Open Juso Form
      </button>
      <A.Modal>
        <JusoForm />
      </A.Modal>
      <div className="gap-2">
        {isParent && (
          <>
            <PP.Switch {...PP.props} onSubmitEditing={PPOB.focus}>
              <b>[개인정보 처리방침]</b>에 동의합니다.
            </PP.Switch>
            <PPOB.Switch {...PPOB.props}>
              법정대리인으로 <b>[자녀의 개인정보 처리방침]</b>에 동의합니다.
            </PPOB.Switch>
          </>
        )}
        {isAdmin && (
          <>
            <RAPP.Switch {...RAPP.props}>
              학부모에게 <b>[개인정보 처리방침 동의]</b> 를 요청합니다.
            </RAPP.Switch>
            <RAPPOB.Switch {...RAPPOB.props}>
              법정대리인에게 <b>[미성년자 개인정보 처리방침 동의]</b> 를
              요청합니다.
            </RAPPOB.Switch>
          </>
        )}
      </div>
    </Form>
  );
};

export default ParentForm;
