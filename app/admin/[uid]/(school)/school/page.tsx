"use client";

import { useTextInput } from "@/hooks";
import { useMemo, useState } from "react";

const SchoolPage = ({ payload }: ModalProps<School>) => {
  const initialState = useMemo<SchoolPayload>(
    () => payload ?? { level: null, name: "", sort: "" },
    [payload]
  );
  const [props, setProps] = useState(initialState);
  const Sort = useTextInput();
  const Name = useTextInput();
  const Level = useTextInput();
  return (
    <div>
      <Name.TextInput {...Name.props} placeholder="학교 이름" />
    </div>
  );
};

export default SchoolPage;
