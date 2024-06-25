import AuthLayout from "../Layouts/AuthLayout";
import LoginForm from "../Templates/LoginForm";

const Login = () => {
  return (
    <AuthLayout
      title="Login"
      subTitle="Silahkan login ke akun anda"
      translate1="translate-x-none"
      translate2="-translate-x-none"
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
