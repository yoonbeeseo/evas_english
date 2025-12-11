import { createContext, use } from "react";

const initialState: AuthContext = {
  user: null,
  initialized: false,
  bizinfo: null,
  selectBizinfo: () => {},
};

export const Auth = createContext(initialState);
export const useAtuh = () => use(Auth);
