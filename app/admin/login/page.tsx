"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const AdminLogin = () => {
  const { status, data } = useSession();
  if (status === "authenticated")
    //@ts-expect-error: user has uid
    redirect(`/admin/${data.user.uid}`);
  return (
    <>
      <h1>{status}</h1>
    </>
  );
};

export default AdminLogin;
