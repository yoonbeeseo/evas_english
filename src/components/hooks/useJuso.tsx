import { useCallback, useId } from "react";
import JusoForm, {
  type JusoFormProps,
} from "../../pages/admin/parents/JusoForm";

const useJuso = () => {
  const id = useId();

  const Button = useCallback(
    ({ juso, onClick }: { juso: JusoAddress | null; onClick: Func }) => {
      return (
        <div className="gap-1">
          <label htmlFor={id} className="label">
            주소
          </label>
          <button
            type="button"
            id={id}
            className="bg-transparent flex-col"
            onClick={onClick}
          >
            {!juso ? (
              "주소를 입력하세요."
            ) : (
              <div>
                <p>전체주소</p>
                <div className="flex-row">
                  <span>우편번호</span>
                  <p>상세주소</p>
                </div>
              </div>
            )}
          </button>
        </div>
      );
    },
    [id]
  );

  const Form = useCallback(
    (props: JusoFormProps) => <JusoForm {...props} />,
    []
  );

  return { Form, Button, id };
};

export default useJuso;
