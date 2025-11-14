"use client";

import { useAlertStore } from "@/components/ui/Alert";
import { useForm, useTextInput } from "@/hooks";
import { useCallback, useMemo } from "react";
import { AdminLoginProps } from "../api/v1/admin/route";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const AdminPage = () => {
  const initialState = useMemo<AdminLoginProps>(
    () => ({
      id: process.env.NODE_ENV === "development" ? process.env.ADMIN_ID! : "",
      pw: process.env.NODE_ENV === "development" ? process.env.ADMIN_PW! : "",
    }),
    []
  );

  const { Form, SubmitButton } = useForm();

  const {
    TextInput: ID,
    props: idProps,
    focus: idFocus,
  } = useTextInput({ value: initialState.id });
  const {
    TextInput: PW,
    props: pwProps,
    focus: pwFocus,
  } = useTextInput({ value: initialState.pw });

  const { alert } = useAlertStore();
  const router = useRouter();
  const onSubmit = useCallback(async () => {
    // await signOut();
    const res = await signIn("credentials", {
      email: idProps.value,
      password: pwProps.value,
      redirect: true,
      callbackUrl: "/admin/login",
    });

    if (!res || !res.ok) {
      return alert("다시 한 번 확인해주세요.");
    }
  }, [idProps, pwProps, alert]);

  return (
    <div className="h-dvh justify-center">
      <Form className="w-full" onSubmit={onSubmit}>
        <ID {...idProps} label="아이디" required />
        <PW {...pwProps} label="비밀번호" required pw />
        <SubmitButton className="mt-2">관리자 로그인</SubmitButton>
      </Form>
    </div>
  );
};

export default AdminPage;
