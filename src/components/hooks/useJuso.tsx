import { useCallback, useId } from "react";
import JusoForm, {
  type JusoFormProps,
} from "../../pages/admin/parents/JusoForm";
import { twMerge } from "tailwind-merge";

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
            className={twMerge(
              "flex-col p-2 label h-12 justify-center",
              !juso ? "border rounded" : "h-auto"
            )}
            onClick={onClick}
          >
            {!juso ? (
              "주소를 입력하세요."
            ) : (
              <div className="items-start gap-1">
                <p>{juso.roadAddrPart1},</p>
                <div className="flex-row">
                  <span className="bg-primary text-white p-0.5 px-1 rounded">
                    {juso.zipNo}
                  </span>
                  <p className="ml-1">{juso.rest}</p>
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
