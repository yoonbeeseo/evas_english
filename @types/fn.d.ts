interface ModalProps<T> {
  payload?: T;
  isStudent?: boolean;
  queryKey: any[];
  onCancel?: () => void;
  onSuccess?: () => void;
}

interface ModalPayloadProps<T = any> {
  payload?: T;
  isStudent?: boolean;
  onCancel?: () => void;
  onSuccess?: () => void;
}

interface ListItemProps<T = any> {
  index: number;
  item: T;
}
