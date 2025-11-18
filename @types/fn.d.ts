interface ModalProps<T> {
  payload?: T;
  isStudent?: boolean;
  queryKey: any[];
  onCancel?: () => void;
  onSuccess?: () => void;
}
