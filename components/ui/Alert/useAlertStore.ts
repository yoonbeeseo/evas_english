import { create } from "zustand";

export interface AlertButton {
  text?: string;
  onClick?: () => void;
  primary?: boolean;
}

interface Props {
  state: boolean;
  message: string | null;
  title: string | null;
  buttons: AlertButton[];
  alert: (
    message: string | null,
    buttons?: AlertButton[],
    title?: string
  ) => void;
  hideAlert: () => void;
}

const useAlertStore = create<Props>()((set) => ({
  state: false,
  message: null,
  title: null,
  buttons: [],
  alert: (message, buttons = [], title) =>
    set({ message, buttons, title, state: true }),
  hideAlert: () =>
    set({ state: false, message: null, title: null, buttons: [] }),
}));

export default useAlertStore;
