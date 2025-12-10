import { useCallback } from "react";
import { useForm, useTextInput } from "../../components/hooks";
import { emailValidator } from "../../lib/validators";
import { Button } from "../../components/ui";
import { auth } from "../../lib";
import { useNavigate } from "react-router";

const AuthHome = () => {
  const { Form, handler } = useForm();
  const Email = useTextInput({
    validator: (email) => {
      const message = emailValidator(email as string);
      if (message) {
        return "이메일을 확인해주세요.";
      }
      return null;
    },
    value: "dexteryoon",
  });
  const Password = useTextInput({ value: "123123" });

  const navi = useNavigate();
  const onSubmit = useCallback(
    () =>
      handler(async () => {
        if (Password.message) {
          Password.focus();
          alert(Password.message);
          return;
        }
        try {
          const email = Email.value.includes("@")
            ? Email.value
            : Email.value + "@icloud.com";

          await auth.signInWithEmailAndPassword(email, Password.value);

          navi("/admin");
          alert("안녕하세요 원장님!");
        } catch (error: any) {
          switch (error.message) {
            case "Firebase: The email address is badly formatted. (auth/invalid-email).":
              Email.focus();
              alert("이메일을 확인해주세요.");
              return;
          }
          console.log(error.message);
        }
      }),
    [handler, Email, Password]
  );

  return (
    <Form
      onSubmit={onSubmit}
      className="gap-2 w-full max-w-75 mx-auto mt-5 border rounded-2xl p-5 bg-white"
    >
      <h1 className="text-center mb-3">관리자 로그인</h1>
      <Email.TextInput
        {...Email.props}
        label="관리자 아이디"
        required
        className="bg-gray-50 focus:bg-transparent"
      />
      <Password.TextInput
        {...Password.props}
        type="password"
        label="비밀번호"
        required
        className="bg-gray-50 focus:bg-transparent"
      />
      <Button.Submit>로그인</Button.Submit>
    </Form>
  );
};

export default AuthHome;
