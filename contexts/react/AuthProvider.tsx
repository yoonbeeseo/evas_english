"use client";

import Spinner from "@/components/ui/Spinner";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import {
  createContext,
  PropsWithChildren,
  use,
  useEffect,
  useState,
} from "react";
import { AdminUser } from "../zustand";

interface Props {
  user?: null | AdminUser;
  isPending: boolean;
  initialized: boolean;
}

const initialState: Props = {
  isPending: false,
  initialized: false,
};

const Context = createContext(initialState);

export const useAuth = () => use(Context);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const { data, status } = useSession();
  const [initialized, setInitialized] = useState<boolean>(false);

  useEffect(() => {
    const fn = () => {
      if (status === "loading") {
        return setInitialized(true);
      }
      setInitialized(false);
    };
    fn();
    return () => {
      fn();
    };
  }, [status]);

  const {
    isPending,
    data: user,
    error,
  } = useQuery({
    queryFn: async () => {
      if (status !== "authenticated" || !data.user) {
        return null;
      }
      //@ts-expect-error: user token has uid
      const res = await fetch(`http://localhost:3000/api/v1/${data.user.uid}`);
      const fetchedData = await res.json();
      return fetchedData;
    },
    queryKey: [status, data, "user"],
  });

  return (
    <>
      {isPending ? (
        <Spinner />
      ) : (
        <Context.Provider value={{ user, isPending, initialized }}>
          {error && error.message}
          {children}
        </Context.Provider>
      )}
    </>
  );
};

export default AuthProvider;
