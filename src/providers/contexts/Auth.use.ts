import { createContext, use } from "react";

interface Props {
  user: null | User;
  initialized: boolean;
  isOnline: boolean;
}

const initialState: Props = {
  user: null,
  initialized: false,
  isOnline: false,
};

export const Auth = createContext(initialState);
export const useAtuh = () => use(Auth);
