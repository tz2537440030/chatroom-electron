import useRequest from "@/hooks/useRequest";
import { register } from "@/services/global";
import { Form } from "antd-mobile";
import AuthLayout from "@/pages/Layouts/AuthLayout";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { hashPassword } from "@/utils/utils";
import RegisterFormOrResetPasswordForm from "@/components/RegisterFormOrResetPasswordForm";

interface RegisterFormParams {
  username: string;
  password: string;
  nickname: string;
  code: string;
  passwordConfirm?: string;
}

const Register = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [timer, setTimer] = useState(0);

  // 注册
  const { loading, run } = useRequest<RegisterFormParams, any>(register, {
    onSuccess: () => {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    },
  });

  useEffect(() => {
    if (timer > 0) {
      setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
    }
  }, [timer]);

  const handleRegister = async (values: any) => {
    run({
      username: values.username,
      password: await hashPassword(values.password),
      nickname: values.nickname,
      code: values.code,
    });
  };

  const returnRegisterContent = () => {
    return (
      <RegisterFormOrResetPasswordForm
        form={form}
        onSubmit={handleRegister}
        loading={loading}
      />
    );
  };

  return (
    <>
      <AuthLayout title="注册" children={returnRegisterContent()} />
    </>
  );
};

export default Register;
