"use client";

import { useAlertStore } from "@/components/ui/Alert";
import { useForm, useTextInput } from "@/hooks";
import { useCallback, useMemo, useState } from "react";
import { AdminLoginProps } from "../api/v1/admin/route";
import { AdminUser, useUserStore } from "@/contexts/zustand";
import { useRouter } from "next/navigation";

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
  const { login } = useUserStore();
  const router = useRouter();
  const onSubmit = useCallback(async () => {
    const res = await fetch("http://localhost:3000/api/v1/admin", {
      method: "POST",
      body: JSON.stringify({ id: idProps.value, pw: pwProps.value }),
    });
    const data = await res.json();
    if (res.status !== 200) {
      switch (data.message) {
        case "관리자가 아닙니다.":
          return alert(data.message, [{ onClick: idFocus }]);
        default:
          return alert(data.message, [{ onClick: pwFocus }]);
      }
    }

    const user: AdminUser = { ...data };

    alert(`안녕하세요, ${user.name} 원장님!`);
    login(user);
    router.push("/admin/" + user.uid);
  }, [idProps, pwProps, idFocus, pwFocus, alert, login, router]);

  return (
    <div className="h-dvh justify-center">
      <Form className="w-full" onSubmit={onSubmit}>
        <ID {...idProps} label="아이디" required />
        <PW {...pwProps} label="비밀번호" required pw />
        <SubmitButton onClick={() => alert("hello man!")} className="mt-2">
          관리자 로그인
        </SubmitButton>
      </Form>
    </div>
  );
};

export default AdminPage;
